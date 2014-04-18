
# IE6 的 CSS:hover 伪类

- template: post.html
- pubdate: 2010-09-15
- tags: CSS, IE6

----


众所周知，IE6 不支持 a:hover 以外的 CSS 伪类，解决办法一般有 3 种方案：

## 使用 JavaScript 事件

直接使用 JavaScript 的 onmouseover/onmouseenter 和 onmouseout/onmouseleave
事件进行针对性开发，这大概没什么好详细介绍的。

## 使用 CSS 表达式

辅以 CSS 表达式中 JScript 同样也有 onmouseover/onmouseenter 和
onmouseout/onmouseleave 事件，用以实现 :hover 效果。<br />
注意：其中冒号之前的事件名称可以随意，关键是 expression() 里面的事件。

    ul li{
        onmouseout:expression(onmouseout=function(){this.style.backgroundColor=''});
        onmouseover:expression(onmouseover=function(){this.style.backgroundColor='yellow'});
    }
    ol li{
        onmouseleave:expression(onmouseleave=function(){this.style.backgroundColor=''});
        onmouseenter:expression(onmouseenter=function(){this.style.backgroundColor='yellow'});
    }

不过应该说使用 CSS class 是更好的实践。

    table tr{
      onmouseout:expression(onmouseout=function(){
        try{this.className=this.className.replace(' hover','')}catch(ex){}});
      onmouseover:expression(onmouseover=function(){this.className+=' hover'});
    }
    table tr.hover td{background:yellow;}

onmouseout 事件处理函数中加了 try/catch 是为了避免 IE5.5 因为不支持 `replace()`
而报脚本错误。当然为了避免这个错误，还是其他的实现方式：

    table tr{
        onmouseenter:expression(onmouseout=function(){
            var c=this.className, h=' hover', l=h.length;
            var s=c.indexOf(h);
            this.className=c.substring(0,s)+c.substr(s+l);
        });
        onmouseleave:expression(onmouseover=function(){this.className+=' hover'});
    }
    table tr.hover td{background:yellow;}

## 使用 CSS behavior 行为

使用 [Whatever:hover](http://www.xs4all.nl/~peterned/csshover.html)

[csshover3.htc](http://www.xs4all.nl/~peterned/htc/csshover3.htc)

    <!--[if lte IE 6]>
    <style type="text/css">
    body{behavior:url("csshover3.htc"); }
    </style>
    <![endif]-->

## 延伸阅读

1. [强大的CSS表达式 -- expression](http://blog.csdn.net/andyyukun/archive/2007/07/03/1676963.aspx )
1. [CSS Expression 的优化](http://www.planabc.net/2009/09/21/optimization_of_css_eexpression/ )
