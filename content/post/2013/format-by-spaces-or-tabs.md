
# 使用 Space 还是 Tab 缩进代码？

- template: post.html
- pubdate: 2013-01-06
- tags: Code, Indent
- status: draft

----

![tabs or spaces](/static/images/tabs-or-spaces.jpg)

这也是一个经典的问题吧。很长一段时间以来我都是被影响为使用空格，而且似乎大多数
人都使用 4 个空格吧。。

## 可视空间

空格：

* 几乎所有编辑器或代码查看器中的占位一致，缩进风格统一。

<!--more-->

Tab:

* 每个编辑器可视占位空间可能不一致，但大多数编辑器可以设置，所以每个用户可以
  使用自己的视觉习惯。

## 缩进风格

K&R风格：
由Kernighan & Ritchie 给出的格式而得名，又称“核心风格”，因为UNIX核心应用了这种编程风格。
每一层缩进使用8个空格（或者一个制表符），有时也使用4个空格，但很少。

```
if (cond) {
     <body>
}
```


Allman风格：
因Eric Allman而得名，Eric Allman是伯克利的一名黑客，写了大量BSD程序，（这种风格又称BSD风格）
每一层缩进使用8个空格，4个空格也经常被使用。

```
if (cond)
{
     <body>
}
```


Whitesmiths风格：
这种风格来源于早期一种C语言的商用编译器。
每一层缩进使用8个空格，4个空格也偶尔被使用。

```
if (cond)
        {
        <body>
        }
```


GNU风格:
不用说，自然是来自GNU了。
每一层缩进总是使用4个空格。在“{”和“}”号的缩进则使用半个缩进位。

```
if (cond)
  {
    <body>
  }
```



## 展开阅读

* [Indent style](http://en.wikipedia.org/wiki/Indent_style)
* [Editor war](http://en.wikipedia.org/wiki/Editor_war)
* [Tabs versus Spaces: An Eternal Holy War.](http://www.jwz.org/doc/tabs-vs-spaces.html)
* [Why I love having tabs in source code.](http://www.derkarl.org/why_to_tabs.html)
* [Tabs versus Spaces: An Eternal Holy War.](http://www.jwz.org/doc/tabs-vs-spaces.html)
* [Tab versus space indentation in C#](http://stackoverflow.com/questions/268538/tab-versus-space-indentation-in-c-sharp)
* [Tabs versus spaces—what is the proper indentation character for everything, in every situation, ever?](http://programmers.stackexchange.com/questions/57/tabs-versus-spaceswhat-is-the-proper-indentation-character-for-everything-in-e)
* [Tabs vs. spaces for indentation](http://nithinbekal.com/2011/tabs-vs-spaces-for-indentation/)
* [Death to the Space Infidels!](http://www.codinghorror.com/blog/2009/04/death-to-the-space-infidels.html)
* [Indent with tabs, align with spaces](http://vim.wikia.com/wiki/Indent_with_tabs,_align_with_spaces)
* [Indentation: Tabs vs. Spaces](http://christian.roy.name/blog/indentation-tabs-vs-spaces)
* [tabs or spaces?](http://discuss.fogcreek.com/joelonsoftware/default.asp?cmd=show&ixPost=3978)
* [Why tabs are clearly superior](http://lea.verou.me/2012/01/why-tabs-are-clearly-superior/)
* [Indent style](http://en.wikipedia.org/wiki/Indent_style)
* [Indent style](http://www.fact-index.com/i/in/indent_style.html)
* [C语言编码风格（一）——缩进和空白](http://www.cxybase.com/201104/c%E8%AF%AD%E8%A8%80%E7%BC%96%E7%A0%81%E9%A3%8E%E6%A0%BC%E7%BC%A9%E8%BF%9B%E5%92%8C%E7%A9%BA%E7%99%BD/)
* [文章段落起首空格（缩进）风格的讨论](http://blog.sina.com.cn/s/blog_4d1c49700100im2b.html)

----

* [代码缩进 tab space](http://my.opera.com/justnewbee/blog/code-indent-tab-space)
* [用空格还是制表符缩进有什么好争的？](http://www.keakon.net/2010/11/30/%E7%94%A8%E7%A9%BA%E6%A0%BC%E8%BF%98%E6%98%AF%E5%88%B6%E8%A1%A8%E7%AC%A6%E7%BC%A9%E8%BF%9B%E6%9C%89%E4%BB%80%E4%B9%88%E5%A5%BD%E4%BA%89%E7%9A%84%EF%BC%9F)
* [写代码时，缩进使用 tab 还是空格？](http://www.zhihu.com/question/19960028)
