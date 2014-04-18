
# 右键菜单的细节

- template: post.html
- pubdate: 2009-07-27
- tags: UED

----

在 Web 客户端编程中，绑定 JavaScript 的 contextmenu 事件来驱动触发自定义右键菜单，
并通过停止事件冒泡来阻止Windows默认菜单，是一种比较常见的自定义菜单实现方式，
自定义菜单的基准位置是基于事件的触发位置得来的。

[http://farm3.static.flickr.com/2475/3761004107_8f9f25efc1_o.png](http://www.flickr.com/photos/hotoo/3761004107/)

就右键菜单的本意来说，这基本没什么问题，不过Windows PC键盘上有一个右键功能键。

[http://farm3.static.flickr.com/2583/3760929801_31e0e4b6c8_o.png](http://www.flickr.com/photos/hotoo/3760929801/)

通过按这个功能键来触发右键菜单，除了Firefox （v3.5，其他版本未测试）外，均表现不正常。

[http://farm4.static.flickr.com/3529/3761023363_50cd93a685_o.png](http://www.flickr.com/photos/hotoo/3761023363/)

IE 事件触发对象的坐标仍是鼠标所在的坐标位置。

[http://farm4.static.flickr.com/3529/3761015003_552bdedc82_o.png](http://www.flickr.com/photos/hotoo/3761015003/)

Safari和Chrome均不能触发自定义右键菜单，呈现浏览器默认菜单
（Safari在使用鼠标邮件激活自定义右键菜单后，自定义右键菜单消失前，不呈现浏览器默认菜单）。

Opera不支持contextmenu事件，默认情况下也禁止脚本控制右键菜单。

而标准的桌面应用程序中使用这个键，和右击鼠标是基本一致的，基准位置参照焦点对象的位置。

[http://farm3.static.flickr.com/2591/3760955767_8fb08f8007_o.png](http://www.flickr.com/photos/hotoo/3760955767/)

右键功能键是为无鼠标或鼠标不可用情况设计的，所以使用右键功能键激活的右键菜单，
应该呈现在焦点对象附近，并且自定义菜单应该（至少在视觉上）获得焦点，
以便于通过方向键控制选中的菜单项。

这在很大程度上应该属于浏览器的问题，不过在现实的情况下，如果前端开发者可以解决掉这个问题，
就不要寄希望于浏览器将来的新版本。

> 不过更好的方式也许是：严谨区分鼠标和键盘事件。

## 参考阅读：

* [Opera下自定义右键菜单的研究](http://blog.csdn.net/spring21st/archive/2009/02/04/3862606.aspx)
