
# Javascript String 方法效率大比拼

- template: post.html
- pubdate: 2008-12-29
- tags: JavaScript, 性能, 算法

----

最初是通过 [梅子](http://blog.csdn.net/meizz)（[梅花雪](http://www.meizz.com/)）
关于大型字符串拼接效率（[1](http://blog.csdn.net/meizz/archive/2005/12/14/552260.aspx)，
[2](http://blog.csdn.net/meizz/archive/2006/01/04/569805.aspx)）的研究得到启发，
最近又看到 never-online 的 [从 trim 原型函数看js正则表达式的性能](http://www.never-online.net/blog/article.asp?id=259)，
里面有介绍正则表达式效率陷阱等问题，并提出解决方法。
我向来对这些鸡毛蒜皮感兴趣，也开始对大型字符串各种方法实现的效率进行比较，
并尝试提高这些方法的效率。

## 大型字符串拼接

[如梅子所言](http://blog.csdn.net/meizz/archive/2005/12/14/552260.aspx)，
使用数组的join方法确实是最好的实现，可以根据这个思路设计StringBuilder, StringBuffer类。


## 大型字符串trim

其实never-online在他的文章里有一些说的不准确的地方，代码也不算很精炼。
既然这是鸡毛蒜皮的小事，这些零碎东西当然要斤斤计较了。
我很久以前有收集到这样一些实现，I：

```javascript
String.prototype.trim = function(){
return this.replace(/(^\s+)(\s+$)/g, '');
};
```

为了避免正则表达式使用括号带来的消耗，可以写成这样，II：

```javascript
String.prototype.trim = function(){
    return this.replace(/(?:^\s+)(?:\s+$)/g, '');
};
```

另外有一套实现是这样的，III：

```javascript
String.prototype.lTrim = function(){
    return this.replace(/^\s+/, '');
};
String.prototype.rTrim = function(){
    return this.replace(/\s+$/, '');
};
String.prototype.trim = function(){
    return this.lTrim().rTrim();
};
```

其实调用函数也会多少有一点消耗，写成这样或许会快一点点（开个玩笑，这样写会带来
一些冗余代码，这时候就需要基于效率（时间）、代码量（空间）和可维护性方面的考量了），IV：

```javascript
String.prototype.trim = function(){
return this.replace(/^\s+/, '').replace(/\s+$/, '');
};
```

后来我对正则表达式有了更多的了解，知道了贪婪与非贪婪匹配，于是自作聪明写了这一段：

```javascript
String.prototype.trim = function(){
return this.replace(/^\s*(.*?)\s*$/, "$1"); // 两端空白字符贪婪匹配，中间字符非贪婪匹配。
};
```

我曾经为这段代码自鸣得意了好长一段时间，不过后来想到点号不包括换行符，字符串中间有换行符时，返回值就不正确了，于是不情愿的改成这样（多行模式效率也很低），V：

```javascript
String.prototype.trim = function(){
return this.replace(/^\s*((?:.\n)*?)\s*$/, "$1");
};
```

谁知，这样的代码遇到大家伙时效率会一落千丈，哎，失败。

原以为String.replace方法比String.substr、String.substring效率低，于是想，只使用正则表达式获得两头（或者一头）的索引位置，然后使用substring方法取出子串，VI：

```javascript
String.prototype.trim = function(){
    var l=this.length;
    /^[\s]*/.test(this);
    // /(?=[^\s])/.test(this);// -- never-online
    var s = RegExp.lastIndex;
    if(1==s && !Char.isBlank(this.charAt(0)))s=0;
    if(s==l){return '';}
    // /\s*$/.test(this);
    // var e=RegExp.index;
    var e=$lastIndexOf(function(c){return !Char.isBlank(c);});
    e=-1==e?l:e+1;
    return this.substring(s,e);
};
```

而最土的方法，莫过于两头都使用循环获得索引了，VII：

```javascript
String.prototype.trim = function(){
    var f=function(c){return !Char.isBlank(c);};
    var l=this.length, s=this.$indexOf(f), e=this.$lastIndexOf(f);
    if(-1==s)s=0;
    e= -1==e?l:e+1;
    return this.substring(s, e);
};
```

代码里老是for啊for的一大串，为了节省字节，而且有可能的话，也准备再优化一下循环，
就实现了$indexOf和$lastIndexOf两个方法，可以传递一个返回boolean值的函数作为参数
（本来还想也支持正则表达式参数的，想想以前扩展indexOf和lastIndexOf方法后的效率，
就算了），这样就可以求得第一个非空白和最后一个非空白字符的位置了。

```javascript
String.prototype.$indexOf = function(f){
    for(var i=0,c,l=this.length; i=0; i--){
        c=this.charAt(i);
        if(f(c)){return i;}
    }
    return -1;
};
String.prototype.$lastIndexOf = function(f){
    for(var i=this.length-1,c; i>=0; i--){
        c=this.charAt(i);
        if(f(c)){return i;}
    }
    return -1;
};
```

至于说要扩展到支持更长子串和起始索引，以后有需要再说了（顺便说一下，子串越长，
有优化算法可以得到更高效率）。

另一个辅助方法：

```javascript
var Char = {
    isBlank:function(c){
        //return /\s/.test(c);
        return ' '==c '\t'==c '\r\n'==c '\n'==c '\r'==c;
    }
};
```

到了永不在线([Google Translate翻译为](http://translate.google.com/translate_t#en%7Czh-CN%7Cnever-online)“永远在线”)的算法，VIII：

```javascript
String.prototype.trim = function(){
    var s = this.replace(/^\s+/, '');
    var l=s.length, e=l;
    if(0==l){return '';}
    for(var i=l-1; i>=0; i--){
        if(!Char.isBlank(s.charAt(i))){
            e=i+1;
            break;
        }
    }
    return this.substring(0,e);
};
```

最初这个算法让我很兴奋，直觉上，感觉这样效率肯定要高，不过事实并不是这么简单。

说到这些实现的效率，无法一概而论，因为不同的字符串，它们的效率比也大不同，甚至异乎寻常。

影响trim方法效率的，主要与字符串的总长度，前面空白字符串长度，后面空白字符串长度，
以及前中后的比例有关。详细的效率对比表有时间再上，这里只简要提一下：

对于较小的字符串，各种实现都有不错的表现，而对于大型字符串，则实现III,
IV表现较为稳定，甚至可以处理超大型字符串（修正：之前有误写成I，II两个较为稳定）。


## 大型字符串字节长度

即双字节长度为2。注意：这个提法其实也不正确，Javascript是使用Unicode字符集的，
所有的字符都（有可能）是双字节字符。将汉字等转换为双字节长度主要是为了某些应用。
最土的方法还是循环遍历所有字符，I：

```javascript
String.prototype.bytes = function(){
    var l=this.length, r=l, n=0xff;
    for(var i=l; i>=0; i--){
        if(this.charCodeAt(i)>n){
            r++;
        }
    }
    return r;
};
```

这里判断字符是否双字节有很多方法，效率较高的之间相差（大概）不大。

另一种实现则看起来很轻灵，寥寥几行，II：

```javascript
String.prototype.bytes = function(){
return this.replace(/[^\x00-\xff]/g,"xx").length;
};
```

多动脑子，则想法愈多（也常把简单的事情复杂化），我想如果可以快速取得表达式
(双字节/单字节)匹配次数，两值相加应该比较高效，III：

```javascript
String.prototype.bytes = function(){
    return this.length+this.replace(/[\x00-\xff]/g,"").length;
};
```

IV：

```javascript
String.prototype.bytes = function(){
    return this.length+(this.match(/[^\x00-\xff]/g)"").length;
};
```

另外看到梅花雪用数组能提供字符串拼接速度，也想：把字符串split为数组，
不想对大型字符串而言，这split一步就慢得不行。

bytes方法的效率：使用Javascript脚本循环大型字符串（I），确实远不如内置的
replace方法（II）快，而使用正则表达式match方法（IV）又比replace方法（III）稍快，
排名第二。

## 总结：

* replace方法因匹配而被替换的子串愈长，效率愈低。
* 根据目标字符串，选择合适的实现。
