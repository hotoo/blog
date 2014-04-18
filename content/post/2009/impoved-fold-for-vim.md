
# 增强 Vim 的语法折叠

- template: post.html
- pubdate: 2009-12-04
- tags: Vim

----


1. 折叠多行注释

```
/*
 * This is file description.
 * @author 闲耘™ (@hotoo xianyun[AT]xianyun.org)
 */
```

折叠为：

```
/* This is file description. ... */
```

2. 折叠单行注释

```
// Line Comment 1.
// Line Comment 2.
// Line Comment 3.
```

折叠为：

```
// Line Comments 1. ...
```


3. 折叠导入外部定义

```
@import java.lang.*;
@import java.io.*;
@import java.net.*;
@import java.util.*;
```

折叠为：

```
@import java.lang.*; ...
```

```
#include <iostream>
#include "xxx.h"
#include "yyy.h"
```

折叠为：

```
#include <iostream> ...
```


4. 折叠作用域

```
window.setTimeout(function(){
    alert(0);
}, 1000);
```

折叠为：

```
window.setTimeout(function(){...}, 1000);
```

这属于语法折叠部分。

5. 折叠标记语言

```
<div id="demo" onclick="alert(0)">
    some thing.
</div>
```

折叠为：

```
<div id="demo">...</div>
```


```
<link type="text/css" rel="stylesheet" href="xx.css" />
<link type="text/css" rel="stylesheet" href="yy.css" />
<link type="text/css" rel="stylesheet" href="zz.css" />
```

折叠为：

```
<link type="text/css" rel="stylesheet" href="xx.css" /> ...
```


```
<script type="text/javascript" src="xx.js"></script>
<script type="text/javascript" src="yy.js"></script>
<script type="text/javascript" src="zz.js"></script>
```

折叠为：

    <script type="text/javascript" src="xx.js"></script> ...


    <script type="text/javascript">/*<![CDATA[*/
    alert(0);
    /*]]>*/</script>

折叠为：

    <script type="text/javascript">...</script>


以上是我目前想到的折叠方式，欢迎补充。

这里推荐一个 [增强的 Javascript 语法文件](http://www.vim.org/scripts/script.php?script_id=1491) ，
有非常多值得借鉴的地方。

遗憾：折叠文本(foldtext)没有状态栏(statusline)的居左、居右概念(以等号[=]分隔)，
比如想将在左侧放置折叠上下文文本，右侧放置被折叠的行数：

    if(true){...) ----------------------------------[3 lines]

目前只能通过计算 Vim 窗口宽度和折叠文本的长度来模拟。

这个折叠方法我已经在C,C++,Java,Javascript,CSS上实现，主要跟语法(syntax)
文件和折叠文本(foldtext) 有关。

另外我觉得被折叠的行应该和注释一样低调一点（desert主题使用金色的文本前景色）。

![](http://farm3.static.flickr.com/2490/4157973680_be7167ac77_o.png)
[@source](http://www.flickr.com/photos/hotoo/4157973680/)

![](http://farm3.static.flickr.com/2556/4157213437_144329fe89_o.png)
[@source](http://www.flickr.com/photos/hotoo/4157213437/)
