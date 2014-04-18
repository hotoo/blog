
# JavaScript 无块级作用域

- template: post.html
- pubdate: 2009-01-06
- tags: JavaScript

----

最近在做一系列JavaScript压缩工具，语法压缩，语义压缩，字符串压缩均有涉及（p.s.有趣的是，
压缩变量名之类的“有损压缩”不影响代码执行，但是字符串压缩这样的“无损压缩”却总是需要解压消耗）。

在实现压缩局部变量名时，最初的实现是将 if/else, for/in, do/while, switch/case/default,
try/catch/finally, with和Object实例对象（后面统称为“块级作用域”）与function一样，
都作为独立的作用域，但是测试发现在JavaScript中并不是这么回事。

尝试着在块级作用域里声明定义变量：

```js
if(true){
var bool=true;
}
document.write(bool); // output:true
```

会发现输出true，而且不论嵌套多深，也不论使用任何块级作用域进行嵌套，最后变量
依然如同在调用处之前，而且同级的作用域中定义的一样；值为在此之前，在块级作用域中所做改变的结果。
注意：如果块级作用域未被执行，则其中声明定义的变量会被声明（var name），但不被定义
（即未被初始化，此时name为undefined，引用name时不抛异常）。

```js
if(false){var bool=true;}
document.write(bool); // output:undefined
```

之前虽知道，IE里for(var i=0;...)里定义的i，在for之外也是可以使用的，但是现在才知道这种情况更为猖獗，
大出我的意料之外，而更意外的是，IE 7(IE6?), Firefox 3(FF1,FF2?), Opera 9, Chrome 1, Safari 3表现均丝毫不差。

虽然与某些编程规范不同，但是js就是这样了，唉。早知道这样，压缩变量名这部分也就不用那么费劲了，只得重写了。

另外还有一些JavaScript作用域方面的文章：<br />
[http://www.blueidea.com/tech/web/2007/4855.asp JavaScript中的作用域]，好像是realazy翻译的，
文章很好，虽然有点文不对题（主要阐述this的作用域链问题）。<br />
[http://www.cnblogs.com/3zfp/archive/2008/10/24/528644.html js变量作用域及可访问性的探讨]，
详细介绍了各种变量的作用域及其可访问性问题。

附A 测试代码：

```js
// Global Scope
if (true){
  var v10 = true;
}else {
  var v00 = false;
}
document.write("v10 : "+v10+"<br />");
document.write("v00 : "+v00+"<br />");
document.write("<hr />");

// Function Scope
function functionScopes(){
  if (true){
      // 以下均执行
      var v11 = true;

      do{
          var v12 = true;
      }while (false);

      while (true){
          var v13 = true;
          break;
      }

      switch (1){
      case 1:
          var v14 = true;
      default:
          var v15 = true;
      }

      try{
          var v16 = true;
          throw new Error("");
      }catch(e){
          var v17 = true;
      }finally{
          var v18 = true;
      }

      for (var v19=0; v19<1; v19++){
          var v1a=true;
      }

      with(v11){
          var v1b = true;
      }

      function inn1(){
          var inn11 = false;
      }
  }else {
      // 以下均未执行
      var v01 = false;

      do{
          var v02 = false;
      }while (false);

      while (false){
          var v03 = false;
      }

      try{
          var v06 = true;
          throw new Error("");
      }catch(e){
          var v07 = true;
      }finally{
          var v08 = true;
      }

      switch (1){
      case 1:
          var v04 = true;
      default:
          var v05 = false;
      }

      for (var v09=0; v09<1; v09++){
          var v0a=true;
      }

      with(v01){
          var v0b = true;
      }

      function inn0(){
          var inn01 = false;
      }
  }
  document.write("v11 : "+v11+"<br />");
  document.write("v12 : "+v12+"<br />");
  document.write("v13 : "+v13+"<br />");
  document.write("v14 : "+v14+"<br />");
  document.write("v15 : "+v15+"<br />");
  document.write("v16 : "+v16+"<br />");
  document.write("v17 : "+v17+"<br />");
  document.write("v18 : "+v18+"<br />");
  document.write("v19 : "+v19+"<br />");
  document.write("v1a : "+v1a+"<br />");
  document.write("v1b : "+v1b+"<br />");
  document.write("<hr />");
  document.write("v01 : "+v01+"<br />");
  document.write("v02 : "+v02+"<br />");
  document.write("v03 : "+v03+"<br />");
  document.write("v04 : "+v04+"<br />");
  document.write("v05 : "+v05+"<br />");
  document.write("v06 : "+v06+"<br />");
  document.write("v07 : "+v07+"<br />");
  document.write("v08 : "+v08+"<br />");
  document.write("v09 : "+v09+"<br />");
  document.write("v0a : "+v0a+"<br />");
  document.write("v0b : "+v0b+"<br />");

  document.write("<hr />");
  try{alert(inn11);}catch(e){document.write((e.message||e)+"<br />");}
  try{alert(inn01);}catch(e){document.write((e.message||e)+"<br />");}
}
functionScopes();

document.write("<hr />");
try{alert(v11);}catch(e){document.write((e.message||e)+"<br />");}
try{alert(v12);}catch(e){document.write((e.message||e)+"<br />");}
try{alert(v13);}catch(e){document.write((e.message||e)+"<br />");}
try{alert(v14);}catch(e){document.write((e.message||e)+"<br />");}
try{alert(v15);}catch(e){document.write((e.message||e)+"<br />");}
try{alert(v16);}catch(e){document.write((e.message||e)+"<br />");}
try{alert(v17);}catch(e){document.write((e.message||e)+"<br />");}
try{alert(v18);}catch(e){document.write((e.message||e)+"<br />");}
try{alert(v19);}catch(e){document.write((e.message||e)+"<br />");}
try{alert(v1a);}catch(e){document.write((e.message||e)+"<br />");}
try{alert(v1b);}catch(e){document.write((e.message||e)+"<br />");}

try{alert(v01);}catch(e){document.write((e.message||e)+"<br />");}
try{alert(v02);}catch(e){document.write((e.message||e)+"<br />");}
try{alert(v03);}catch(e){document.write((e.message||e)+"<br />");}
try{alert(v04);}catch(e){document.write((e.message||e)+"<br />");}
try{alert(v05);}catch(e){document.write((e.message||e)+"<br />");}
try{alert(v06);}catch(e){document.write((e.message||e)+"<br />");}
try{alert(v07);}catch(e){document.write((e.message||e)+"<br />");}
try{alert(v08);}catch(e){document.write((e.message||e)+"<br />");}
try{alert(v09);}catch(e){document.write((e.message||e)+"<br />");}
try{alert(v0a);}catch(e){document.write((e.message||e)+"<br />");}
try{alert(v0b);}catch(e){document.write((e.message||e)+"<br />");}
```

附B 测试结果（IE 7, FF 3, Opera 9, Safari 3, Chorme 1均同）：

```
    v10 : true
    v00 : undefined
    v11 : true
    v12 : true
    v13 : true
    v14 : true
    v15 : true
    v16 : true
    v17 : true
    v18 : true
    v19 : 1
    v1a : true
    v1b : true
    v01 : undefined
    v02 : undefined
    v03 : undefined
    v04 : undefined
    v05 : undefined
    v06 : undefined
    v07 : undefined
    v08 : undefined
    v09 : undefined
    v0a : undefined
    v0b : undefined
    'inn11' 未定义
    'inn01' 未定义
    'v11' 未定义
    'v12' 未定义
    'v13' 未定义
    'v14' 未定义
    'v15' 未定义
    'v16' 未定义
    'v17' 未定义
    'v18' 未定义
    'v19' 未定义
    'v1a' 未定义
    'v1b' 未定义
    'v01' 未定义
    'v02' 未定义
    'v03' 未定义
    'v04' 未定义
    'v05' 未定义
    'v06' 未定义
    'v07' 未定义
    'v08' 未定义
    'v09' 未定义
    'v0a' 未定义
    'v0b' 未定义
```
