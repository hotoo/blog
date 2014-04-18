
# 反向搜索的设计

- template: post.html
- pubdate: 2009-12-31
- tags: Search, UED

----


文本搜索是一项非常常用的功能，在文本编辑器中更是一个不可或缺的功能。

而反向搜索（搜索光标之前的文本）的设计，最初也非常原始：

![pic](http://farm5.static.flickr.com/4030/4231137828_a3e4fd8031_o.jpg)

[Windows Notepad](http://www.flickr.com/photos/hotoo/4231137828/)

![pic](http://farm5.static.flickr.com/4023/4230370125_a8f522ca80_o.png)
[Editplus 2.3](http://www.flickr.com/photos/hotoo/4230370125/)

![pic](http://farm3.static.flickr.com/2574/4230370157_461d09e194_o.jpg)
[UltraEdit 11](http://www.flickr.com/photos/hotoo/4230370157/)

![pic](http://farm5.static.flickr.com/4050/4231137878_b2046bd82c_o.png)
[Eclipse 3.4](http://www.flickr.com/photos/hotoo/4231137878/)


这基本算是可用了，不过还是有一些非常用心的改进的：

![pic](http://farm3.static.flickr.com/2741/4231137916_5c5f7ca33a_o.jpg)
[Editplus 3](http://www.flickr.com/photos/hotoo/4231137916/)

![pic](http://farm5.static.flickr.com/4055/4231137964_93518fe61d_o.jpg)
[Windows Internet Explorer 7](http://www.flickr.com/photos/hotoo/4231137964/)

![pic](http://farm3.static.flickr.com/2768/4230370195_7b954cda56_o.png)
[Google Chrome 4](http://www.flickr.com/photos/hotoo/4230370195/)

![pic](http://farm3.static.flickr.com/2790/4230370185_092763befc_o.png)
[Apple Safari 4](http://www.flickr.com/photos/hotoo/4230370185/)

![pic](http://farm5.static.flickr.com/4024/4230370225_b39a29718a_o.png)
[Mozilla Firefox](http://www.flickr.com/photos/hotoo/4230370225/)

这些细小的改进都有一个共性，就是可以快捷的反向搜索，快速定位到上次匹配到的地方。
作为 Vim 爱好者，她的反向搜索功能（包括搜索功能）更是华丽的惊人，normal 模式下
正向搜索(/keyword)， n 键下一个匹配， N 键前一个匹配；如果是反向搜索(?keyword)，
则相反。
