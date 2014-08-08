
# Form 表单最佳实践

- template: post.html
- pubdate: 2010-10-27
- tags: Forms, Web Design

----


## 前言

这份文档献给我身边某些可爱的 Java 工程师，感谢你们激怒了我 :)

“Form 表单”其实是一种错误的叫法，Form 本身就是表单，不过这样叫似乎比较顺口。

这里所谓的“最佳实践”只是标题党。


## POST & GET

表单有一般使用 POST 或 GET 方式提交数据到服务器端，如果你理解这两个词，这里就
不再赘述了；如果不理解，那也没什么好讲的，就以下面通俗的“所见即所得”理解吧。

### GET:

所谓 GET 方式，通俗的讲，就是地址栏可见所有提交的信息：

    <form action="http://example.com/get.htm" method="get">
        <input type="text" name="key" value="value" />
        <input type="submit" name="search" value="搜索" />
    </form>

这个表单提交之后，地址栏就包含了所有的提交信息：
`http://example.com/get.html?key=value&search=%CB%D1%CB%F7`

可以直接在地址栏修改：
action: 即 `http://example.com/get.html` 部分。
data/param: 即 key=value&search=%CB%D1%CB%F7 这些参数部分。

广义上，通俗的讲，包括地址栏上手写并回车，点击链接，或者 method="get" 的表单，
以及通过 AJAX get 提交的都是 get 方式。get 请求，刷新时还是 get 请求。

### POST:

通俗的讲，POST 就是地址栏看不到提交请求所带的数据（又称为“参数”）。

    <form action="http://example.com/post.html" method="post">
        <input type="text" name="data" />
        <input type="submit" value="提交">
    </form>

这个表单提交之后，地址栏除了 `http://example.com/post.html` 外不包含其他信息。

广义上，通俗的讲，method="post" 的表单，AJAX post 都是 post 方式。
post 提交后，刷新仍是 post 提交相同的数据。


## 编码(Encoding)

在客户端页面和服务器端程序编码不同时，提交数据非常容易出现编码问题，即所谓的
“乱码”。

解决这个问题，可以多种方式：

1. 最根本的，就是统一客户端和服务器端的编码。建议都使用 utf-8。<br />
    目前服务器上均是使用 utf-8 接受数据，所以可以考虑统一使用 utf-8 编码，
    要做的有一下几点：
    * 修改页面的 charset 设置
    * .vm 文件本身保存为 utf-8 编码。
    * 修改编码设置：
    milan-web-base-2.0-SNAPSHOT.jar\META-INF\webx\pipeline.xml

        <valve class="com.example.turbine.pipeline.SetLocaleValve"
            defaultLocale="zh_CN" defaultCharset="UTF-8"/>

    milan-web-base-2.0-SNAPSHOT.jar\META-INF\webx\webx-default.xml

        <service name="VelocityService"
            class="com.example.service.velocity.DefaultVelocityService" earlyInit="true">

            <property name="input.encoding" value="UTF-8"/>
            <property name="parser.pool.size" value="100"/>
            <property name="velocimacro.library" value="macros.vm"/>
        </service>
1. 设置 form 元素的 accept-charset 属性为服务器接收数据使用的编码。<br />
    Hack in IE: `onsubmit="document.charset='utf-8';"`
1. 通过 JavaScript 的 `encodeURIComponent(key)` 函数转码，一般用于 AJAX 提交。<br />
    另有两个转码函数：`escape()`, `encodeURI()`<br />
    解码函数分别是：`unescape()`, `decodeURI()`, `decodeURIComponent()`


## onsubmit

Form 表单的 onsubmit 事件在表单真正向服务器发送请求之前执行，一般用于验证表单
的数据完整性和合法性。如果处理函数返回 false，则不向服务器发送请求。

绑定 onsubmit 事件处理函数的方法有 3 种：
* 一般简单的页面，直接在 form 标签中添加 onsubmit 属性:
    `<form onsubmit="return validater(this);">...</form>`
* 按照“内容与行为分离”的思想，我们一般可以在 JavaScript 加载完成后对表单进行
    事件绑定：

      //var form = document.getElementById("formId");
      form.onsubmit = function(){
          if(ie){document.charset="utf-8";}
          return !!this["k"].value;
      };

* 更专业的事件绑定方法（考虑到兼容性问题，这里使用 jQuery 代码）：

      $("#formId").submit(function(){
          return this.k.value;
      });



## 普通提交数据的表单

对于普通提交数据的表单，比如新增、修改数据，使用 POST 方式提交数据即可。
删除的方式一般有两种：
1. 删除链接的 href 指向执行删除操作的地址，链接元素绑定 onclick 事件：
    `<a href="del.html?id=1" onclick="return window.confirm('确认删除？');">`<br />
    这是 GET 提交方式。绑定事件处理函数的技巧同上面的 onsubmit。
1. 绑定 onclick 事件，并执行 AJAX 提交， return false；回调函数中可以使用动态
    更新 DOM 的方式或其他。

呃，其实最好体验也许是：删除操作时不要求确认（弹出确认对话框），但在事后可以
执行 [撤销](cancel-vs-undo.html) 删除操作。


## 多个提交按钮的表单

某些时候，单个表单中可能存在 2 个及其以上的提交按钮。

首先，考虑清楚这多个按钮是否真的都需要向服务器提交数据。像关闭，返回，后退，
或者失传已久的重置操作，就不要使用按钮了，至少不要使用绑定 onclick 并

    form.action = "back.html";
    form.submit()

或 `location.href="back.html"` 这样的按钮。

这些按钮在实践上使用链接来实现更好更简单：`<a href="back.html">后退</a>`

对于确实需要多个提交操作的按钮，可以通过提交按钮的 name 来区分。

    <input type="submit" name="event_submit_do_publish" value="发布" />
    <input type="submit" name="event_submit_do_draft" value="保存为草稿" />


## 多个相同操作的表单

类似于搜索引擎结果页，页面上、下均有功能相同的搜索框（为方便用户使用，虽然
实际受惠的用户可能并不多），这两个搜索框分别由两个表单组成，但是可以统一使用
同一个 onsubmit 事件处理函数。

    <form onsubmit="return validater(this);">
        <input type="text" name="k" />
        <input type="submit" value="搜索" />
    </form>

    搜索结果列表...

    <form onsubmit="return validater(this);">
        <input type="text" name="k" />
        <input type="submit" value="搜索" />
    </form>

    function validater(form){
        return form["k"].value;
    }


## 搜索

搜索建议使用 GET 方式提交，过滤参数和当前页码这些信息全部带在地址中。
`http://example.com/search.html?k=keywrod`

翻页链接（上一页，下一页...）
`http://example.com/search.html?k=keywrod&p=2`

翻页系统一般还允许用户手动输入页码并直接跳转到指定页，这个翻页表单建议和
搜索表单分离，分别是不同的 form 组成。

下面是搜索关键字 key 并翻页到第 2 页之后的状态：

    <form action="search.html" method="get">
        <input type="text" name="k" value="key" />
        <input type="submit" value="搜索" />
    </form>

    搜索结果列表...

    <a href="search.html?k=key&p=1">上一页</a>
    <a href="search.html?k=key&p=3">下一页</a>
    <form action="search.html" method="get">
        <input type="hidden" name="k" value="key" />
        <input type="text" name="p" value="3" />
        <input type="submit" value="翻页" />
    </form>


## 可爱的陋习

不要在表单中为 button 类型的按钮绑定 onclick 事件，并在事件处理函数中执行
`form.submit();` ，然后费尽心思实现“在输入框中也可以回车提交”这种蠢事。

也不要为了~~解决~~避免编码问题而在 onsubmit 处理函数中做
`input.value=encodeURIComponent(input.value);`，然后为了避免这个带来的
“乱码(被编码的字符)瞬间出现在表单中”而把搜索框做成隐藏域，再附加一个傀儡
输入框用于输入。


## Demo

[搜索表单演示](http://hotoo.me/labs/form-search.html|)
