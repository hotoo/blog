
# 搜索的体验

- template: post.html
- pubdate: 2009-07-29
- tags: UED, Seach

----

准备升级博客模板，用js提供高级特性，比如和vim类似的键盘命令模式，和内联搜索模式。
主要提高搜索的体验，包括一下几点。

* 检查来自Google,Baidu等搜索引擎和本地搜索的搜索关键字，并高亮之。
* 内联搜索模式，在底部fixed搜索框，并支持快捷键，最好能支持正则匹配模式，参考vim。
* 使用搜索框附近fixed工具按钮，提供下一个、上一个搜索关键字的跳转，参考Eclipse。
* 在滚动条附近使用(fixed)条纹，标识每个搜索结果在整屏中对应的大概位置，
    点击条纹可以跳转到对应结果项，拖放滚动条到对应的条纹处，
    页面也正好滚动到对应的结果项，参考Eclipse, Chrome。

这里只是初步想法，受我“[[the-god-of-editor|编辑器之神]]”的想法发散而来，
目前已经初步模拟了滚动条附近的搜索大纲，和命令模式的命令列表(完全模仿vim)。

[http://farm4.static.flickr.com/3475/3768956114_2562cf5b10_o.png](http://www.flickr.com/photos/hotoo/3768956114/)

[http://farm4.static.flickr.com/3470/3768173303_ffbf2028cb_o.png](http://www.flickr.com/photos/hotoo/3768173303/)
