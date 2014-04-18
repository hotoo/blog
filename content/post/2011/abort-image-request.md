
# 丢弃图片的 HTTP 请求

- template: post.html
- pubdate: 2011-06-23
- tags: JavaScript, HTTP

----


| OS       | Browser        | ""    | null  | remove | delete | stop | StopImage | Stop | Button | Timeout    |
|----------|----------------|-------|-------|--------|--------|------|-----------|------|--------|------------|
| Windows  | IE6,7,8        | √(e) | √(e) | II     | ×     | ×   | ×        | ×   | ×     | 21s (e)    |
| \/       | FF4,5          | II    | II    | II     | ×     | II   | ×        | ×   | II     | 21s (e)    |
| \/       | Chrome12       | ×    | ×    | ×     | ×     | II   | ×        | ×   | II     | 21s (e)    |
| \/       | Safari4,5      | ×    | ×    | ×     | ×     | II   | ×        | ×   | II     | 21s (e)    |
| \/       | Opera9         | ×    | √(e) | ×     | ×     | II   | ×        | ×   | II     | 47s (e)    |
| \/       | Opera11        | II    | √(e) | II     | II     | II   | ×        | ×   | II     | 47s (e)    |
| Mac OS X | Safari5        | ×    | ×    | ×     | ×     | II   | ×        | ×   | II     | 1.2m (e)   |
| \/       | Chrome12       | ×    | ×    | ×     | ×     | II   | ×        | ×   | II     | 1.2m (e)   |
| \/       | FF4,5          | II    | II    | II     | ×     | II   | ×        | ×   | II     | 1m'15s (e) |
| Ubuntu   | FF4,5          | II    | II    | II     | ×     | II   | ×        | ×   |        | 3m'9s (e)  |
| \/       | Chrom(e/ium)12 | ×    | ×    | ×     | ×     | II   | ×        | ×   |        | 3.2m (e)   |

* Windows XP, Server 2003, 7.
* Mac OS X 10.6.7
* Ubuntu 11.04

*标题注解：*

"":: `img.src = ""`
null:: `img.src = null`
revmove:: `img.removeAttribute("src")`
delete:: `delete img["src"]`
stop:: `window.stop()`
StopImage:: `document.execCommand("StopImage")`
Stop:: `document.execCommand("Stop")`
Button:: Browser Stop Button.

*图标注解：*

√:: 能够 Abort 图片请求，并回调 (e)onerror/(a)onabort/(l)onload 函数。
II:: 能够 Abort 图片请求，但不触发任何事件进行回调。
≈:: 部分版本支持。如 Stop/StopImage 在 .NET Framework 3.0 中取消了支持。
×:: 不能 Abort 图片请求，或不支持该方法。

## 事件回调

    var img = new Image();
    img.onload = function(){out.innerHTML += "loaded.";};
    img.onabort = function(){out.innerHTML += "aborted.";};
    img.onerror = function(){out.innerHTML += "errored.";};
    window.setTimeout(function(){
        out.innerHTML += "before.";
        // abort.
        img.src = null;
        out.innerHTML += "after." + img.complete;
    }, 2000);

测试结果：

IE:: before.errored.after.
Opera:: before.after.errored.
FF:: before.after.
Chrome:: before.after.
Safari:: before.after.


## TODO:丢弃 jsonp 请求？

为什么不是 script/link?

使用 document.createElement("script") 创建元素并设置 src 属性，
appendChild 到 DOM 中会去请求指定资源，可以到底向日志服务器发送数据的要求。

但是使用这种方式有一下几点弊端：

1. 创建脚本带来的危险性。
2. 会向 DOM 中附加元素，影响 DOMLint 校验。
3. 无法 abort，无论设置 `script = null;`, `script.src="";`, `script.src=null;`,
    `script.removeAttribute("src");`, `document.body.removeChild(script);`
    都无法实现 abort.
4. 引入资源不触发 onload/onerror/onabort 事件，除非使用 jsonp 的方式，
    对元素本身无法得到回调。


## See Also

* http://stackoverflow.com/questions/930237/javascript-cancel-stop-image-requests
* http://www.sysopt.com/forum/archive/index.php/t-177147.html
* http://stackoverflow.com/questions/1671717/javascript-image-onabort-event-not-firing-in-firefox-chrome
* http://stackoverflow.com/questions/4506160/abort-active-image-requests
* http://www.devguru.com/technologies/ecmascript/quickref/image.html
* [Javascript: Cancel/Stop Image Requests](http://stackoverflow.com/questions/930237/javascript-cancel-stop-image-requests)
* [Can't you stop images from loading?](http://www.google.com/support/forum/p/Chrome/thread?tid=4bf113154d53d101&hl=en)
* `window.stop()`
    * http://stackoverflow.com/questions/930237/javascript-cancel-stop-image-requests
    * http://stackoverflow.com/questions/3146200/stop-loading-of-images-on-a-hashchange-event-via-javascript-or-jquery
    * https://developer.mozilla.org/en/DOM/window.stop
* `execCommand`
    * [execCommand Method](http://msdn.microsoft.com/en-us/library/ms536419%28v=vs.85%29.aspx)
    * http://msdn.microsoft.com/en-us/library/ms536419%28v=vs.85%29.aspx
    * http://msdn.microsoft.com/en-us/library/ms533049%28v=vs.85%29.aspx
    * https://developer.mozilla.org/En/Document.execCommand
* [IE6下链接ONCLICK事件处理中的请求被ABORTED](http://www.xiahaixia.com/2010/11/19/ie6%E4%B8%8B%E9%93%BE%E6%8E%A5onclick%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86%E4%B8%AD%E7%9A%84%E8%AF%B7%E6%B1%82%E8%A2%ABaborted/)
* [What does (Aborted) mean in HttpWatch?](http://www.cnblogs.com/zhyt1985/archive/2009/05/27/1490755.html)
    [来源](http://www.sanotes.net/html/y2008/165.html)
* http://blog.httpwatch.com/2007/11/20/error_internet_invalid_url-httpwatch/
* [HttpWatch工具简介及使用技巧](http://www.cnblogs.com/mayingbao/archive/2007/11/30/978530.html)
