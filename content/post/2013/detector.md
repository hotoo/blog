
# 客户端识别的设计

- template: post.html
- pubdate: 2013-05-17
- status: draft

----

detector 是一个 JavaScript CMD 模块，用于检测用户所处的客户端环境，
检查信息包括：

* 硬件设备
* 操作系统
* 浏览器
* 浏览器渲染引擎

----

在 detector 出现之前，已经有了很多的前辈。但是尽管如此，detector 的出现还是
如此有必要。

后面会介绍的前辈们包括：

* jQuery
* YUI
* Kissy
* light
* Mootools
* [PrototypeJS](http://api.prototypejs.org/Prototype/Browser/)
  [@github](https://github.com/sstephenson/prototype/blob/1fb9728/src/prototype.js#L75)
