
# 每周异常：第 6期，JavaScript 异常监控脚本引发的 JavaScript 异常

- template: post.html
- pubdate: 2013-08-22
- tags: 每周异常

----

## 背景

早上收到比较重要的用户反馈说某个重要的系统的页面在 IE 浏览器中卡死，无法继续。

![2013-08-22 5 14 01](https://f.cloud.github.com/assets/143572/1007567/5214e9b4-0b0b-11e3-8d43-07d34947d198.png)
![2013-08-22 5 14 25](https://f.cloud.github.com/assets/143572/1007568/523e63de-0b0b-11e3-85bd-b3adee635aef.png)

问题很严重。

系统比较特殊复杂，不是一般人能登录进去的。找到对应同学在小概率重现的情况下终于拿到了第一手的问题源码。

## 分析

修改配置和采样率之后在本地跑起来，发现在 IE6 里非常有问题。

1. 性能这么大的问题，首先想到的是页面中大面积扫描 HTML 代码的部分，但是注释掉这部分仍然没有改善。
2. 再次把整个回调处理函数注释掉，仍然没有改善。
3. 直接把加载后置脚本的 seajs.use 注释掉之后，终于没问题了。（坑爹的缓存问题就不说了，好久之后才发现，都是泪~）
4. 这么看来有两种可能：
  1. 模块本身有性能问题。
  2. seajs 性能有问题（这个问题页面目前使用的 1.3.1）
5. 首先考虑自身的问题。return 整个 factory，性能无问题，因此不是模块过多导致 seajs 性能问题。
6. 逐步修改 return 位置（其实可以打断点），终于发现问题出在 [初始化事件绑定函数部分](https://github.com/totorojs/monitor.js/blob/2.2.0/src/monitor.js#L23)。

    <!-- baseline:11 -->
    ```js
    // 避免未引用先行脚本抛出异常。
    if(!win.monitor){
      M = win.monitor = {};
      M._DATAS = [];
      M._EVENTS = [];
    }

    var _events = M._EVENTS;
    var _evt = new Events();
    M.on = function(evt, handler){
      _evt.on(evt, handler);
    };
    for(var i=0,l=_events.length; i<l; i++){
      M.on(_events[i][0], _events[i][1]);
    }
    ```
7. 此时 _events = undefined。访问 undefined.length 或其他属性会导致浏览器挂起？ IE6 还有这样的坑？
8. 新建一个最小代码的新页面，直接 `script[src]` 引入这个脚本没有问题，IE 会正常的抛出异常，不会挂起。
9. 动态创建 script 插入脚本，仍然不会挂起，正常抛出异常。
10. 奇怪。各种尝试，最终加入前置脚本后在这个最小重现代码中重现了异常。
11. 然后发现是在 window.onerror 中出现问题。
12. 继续发现的模拟调用栈信息的算法出现问题。

cmd 模块在 define 的 factory 中本身抛出异常，会被前置脚本的 window.onerror 捕获，捕获过程中尝试 [还原函数调用栈](https://github.com/totorojs/monitor.js/blob/2.2.0/src/seer.js#L66)。模拟还原调用栈信息是通过 arguments.callee.caller 向上递归，直到找到函数调用的发起者。但是悲剧的是发现 seajs 这个调用栈是无穷无尽的：

```
at function(require, exports, module)
at function runInModuleContext(fn, module)
at function()
at function(uri)
at function(item, i, arr)
at function(arr, fn)  ........-
at function(arr, fn)          |
at function()                 |
at function preload(callback) |
at function()                 |
at function cb(module)        |
at function onFetched()       |
at function(fn)       ........-
at function(arr, fn)    ..........-
at function(arr, fn)              | 循环往复
at function()                     |
at function preload(callback)     |
at function()                     |
at function cb(module)            |
at function onFetched()           |
at function(fn)         ..........-
at function(arr, fn) .........-
at function(arr, fn)          | 无穷尽也
at function()                 |
at function preload(callback) |
at function()                 |
at function cb(module)        |
at function onFetched()       |
at function(fn)         ......-
```

这也就是为什么用户的浏览器会挂起的原因。

----
### 小结

用户浏览器被挂起，最终发现：

* 不是扫描整个文档的性能问题。
* 不是 seajs 加载多个模块的性能问题。
* 主要不是 cmd define 中报错的问题。
* 不是 window.onerror 捕获异常的问题。
* 而是获取异常函数调用栈出现无限循环链的问题，
* 这其实是 IE 的问题。
* 好吧，最终还是我的问题。


## 监控脚本自身的 cmd 模块定义的异常是怎么出现的？

monitor 2.2.0 新增了 [事件机制](https://github.com/totorojs/monitor.js/issues/18)，支持监控任意的自定义数据。

其中在前置脚本中新增了 `monitor.on()` 方法，将自定义事件处理函数临时存储在 `monitor._EVENTS` 属性中 [参考代码](https://github.com/totorojs/monitor.js/blob/2.2.0/src/seer.js#L18) 。后置脚本加载完成后，会复写 `monitor.on()` 方法，并将之前用户自定义事件处理函数绑定到对应事件，以使事件机制生效。

这些理论上都是非常不错的设计思路。

但是现实太残酷，全站公共区域被实际部署的情况有太复杂：

1. 有些系统没有完全引入前置脚本。
2. 有些系统仍然引用的老版本的前置脚本。

后置脚本对于后面的这个场景没有考虑到，因此这段保险栓未能正确执行导致后续脚本报错。

## 为什么这个异常会到生产环境？

都是我的错，没有考虑周全。没有考虑到这种特殊的系统部署环境，而且我也从来不能进去实际体验、验证。

## 如何处理这个异常？

1. 作为全站全局运行的代码，要详细评估考虑到各种系统变态的部署环境。
2. 打断循环调用栈
  1. 限制监控的最大函数调用栈深度。
  2. 对于已经调用的栈，不再深入递归，或现在递归次数（待评估，实际项目存在正常的递归或多次调用的代码。）

## 为什么 seajs define 模块中报错会出现函数调用栈无限递归？

这是 seajs 1.3.1 的 BUG，更准确的说，可能是 IE6,7,8闭包的问题。参考： https://github.com/seajs/seajs/issues/911
