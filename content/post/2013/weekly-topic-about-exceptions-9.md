
# 每周异常：第 9期，搜狗浏览器中神一样的 try/catch 特性

- template: post.html
- pubdate: 2013-09-13
- tags: 每周异常

----

## 背景

某日 16时 30分，监控实时大盘中全站 JavaScript 异常和 404 异常分别朝着不同的方向延伸，
橙色的 JavaScript 异常急剧上升。

![bac3c01389cadbb12d4873520b3bd2a9](https://f.cloud.github.com/assets/143572/1136611/435cbfac-1c48-11e3-8856-8fc7ef13ce5a.png)

详细数据中我们看到一向高标准高质量的收银台出现异常大量的异常。

![2013-09-13 4 00 58](https://f.cloud.github.com/assets/143572/1136701/ae74db38-1c4a-11e3-9d2d-1101c0b61a79.png)

## 排查

我们发现其中有两个页面异常最多，而这两个页面中异常最多的『一个异常』详情如下：

* File: 同页面 URL
* Line: 1
* Message: Uncaught SyntaxError: Unexpected token a

客户端信息：

* pc/-1;windows/5.1;sg/2.x;webkit/535.1
* pc/-1;windows/6.1;sg/2.x;webkit/535.1

堆栈信息：

```
at function parse()
    at function ()
    at function (data)
    at function ()
    at function ()
```

分析过程非常艰辛，重现异常的过程也是一波三折，这里不做赘述，最终分析得出：

* 搜狗浏览器的 userAgent 太坑爹，几乎所有版本都是 2.x，开发者太不专业了。最终找到内核为 webkit/535.1 的是 3.2 版。
* 重现到老版 arale 中的 ajax 模块中对 JSON 有特殊的处理，如果浏览器内置的 JSON 不支持非标准的 JSON （如 `{a:1}`）则 hack 做兼容。

    ```js
        function W3CParse(data) {
            if (validJSON(data)) {
                return window.JSON.parse(data)
            } else {
                return null;
                arale.error("Invalid JSON: " + data)
            }
        }

        function defaultParse(data) {
            if (validJSON(data)) {
                return (new Function("return (" + data + ")"))()
            } else {
                return null;
                arale.error("Invalid JSON: " + data)
            }
        }
        var ok_wrong_json = function () {
            try {
                JSON.parse("{ a: 1 }");
                return true
            } catch (x) {
                return false
            }
        };
        if (window.JSON && window.JSON.parse && ok_wrong_json()) {
            parseJSON = function (data) {
                return W3CParse.call(this, data)
            }
        } else {
            parseJSON = function (data) {
                return defaultParse.call(this, data)
            }
        }
    ```
* 抛出异常的代码是 `JSON.parse("{a: 1}")`
* 但奇怪的是这段代码是放在 try/catch 中，为什么还会有异常被监控捕获？
* 最终发现这是搜狗浏览器 3.2版极速(webkit)模式中的特性：即使 try/catch 住的异常，
  同样会被 window.onerror 捕获，但并未因此中断业务逻辑，后续的代码仍然会按照正确的
  try/catch 异常处理流程进行，所以对业务本身没有影响。
* p.s. 搜狗浏览器没有控制台，用户不会知道出了异常。
* 另外收银台之前异常量少的主要原因是主要的页面没有引入前端监控，用户抛出了异常而我们不知道而已。

## 相关截图

![2013-09-13 4 39 14](https://f.cloud.github.com/assets/143572/1136977/316cd2d8-1c51-11e3-9f7e-4bbebec06108.png)
![2013-09-13 4 39 33](https://f.cloud.github.com/assets/143572/1136980/32da28aa-1c51-11e3-8dc4-5773fc84f885.png)
![2013-09-13 4 40 26](https://f.cloud.github.com/assets/143572/1136981/331bb9f0-1c51-11e3-93bf-8cd2dcdf5d7f.png)
![2013-09-13 4 40 12](https://f.cloud.github.com/assets/143572/1136982/331f90c0-1c51-11e3-8d08-8d61c08512dc.png)
![2013-09-13 4 41 03](https://f.cloud.github.com/assets/143572/1136983/332ad480-1c51-11e3-991f-b4b0db932f69.png)

## 解决方案

最初虽然有些争议，但我们最终决定的处理方案是监控中临时排除 sg/2.x|webkit/535.1 中
`Uncaught SyntaxError: Unexpected token a` 异常。

### 是否要排除这个浏览器中所有的异常？

呃，考虑到搜狗浏览器的份额，我们的策略是只排除已知的异常，未知的异常看最终分析结果再考虑。

## 广告

这个异常排查的主要功臣 @wsvn53，我们在排查过程中频繁使用了他开发的工具
[Fedit](https://github.com/wsvn53/fedit)，可以直接修改线上代码。
排查线上故 障、线下接⼝什么的都非常⽅方便。强烈建议⼤家都装上⽤用。

## 最后

我仅代表我自己，想说某些毫无责任心的国产浏览器壳厂商们，你们没有创造价值，
只是在各种不同方式的索取。
