
# 获取元素所绑定的事件列表

- template: post.html
- pubdate: 2011-08-19
- tags: JavaScript

----


技术上有什么办法获得指定 HTMLElement 上有绑定那些 #JavaScript 函数事件，及其处理函数么？

比如我有一个按钮，想知道他绑定了那些事件？ click 事件的处理函数是什么？

`elem.onclick` 这种只能绑定唯一的一个事件处理函数，可以直接取到。

DOM Level 3 有
[http://www.w3.org/TR/2001/WD-DOM-Level-3-Events-20010823/events.html#Events-EventListenerList eventListenerList]
接口，但是现在还没有浏览器实现。

不过可以通过框架包装的方式获取列表。
另外 Google Chrome 浏览器的开发者工具有提供查看元素绑定了哪些事件的特性，
猜测是通过解析页面及其引入的 JavaScript 源码得到的
（据我所知，Firebug 的性能分析就是通过 inject 代码到各个函数中来实现的）。

## 延伸阅读

* http://www.w3.org/TR/2001/WD-DOM-Level-3-Events-20010823/events.html#Events-EventListenerList
* http://www.quirksmode.org/js/events_advanced.html
