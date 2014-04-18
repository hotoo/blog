
# window.close()

- template: post.html
- pubdate: 2011-04-26
- tags: JavaScript

----

# window.close()

```js
window.opener=null;
window.open("","_self");
window.close();
```

onclick
return false;

IE5.5以下

```html
<OBJECT id="close" type="application/x-oleobject"
  classid="clsid:adb880a6-d8ff-11cf-9377-00aa003b7a11">
    <param name="Command" value="CLOSE">
</object>
<input type="button" onclick="close.Click()" value="关闭窗口">
```

## 延伸阅读

* [window.close](https://developer.mozilla.org/en/window.close)
* [Using the window.close method](http://www.javascript-coder.com/window-popup/javascript-window-close.phtml)
* [window close](http://javascript.about.com/library/blclose.htm)
* [window.opener=null;window.close()，只支持IE6不支持IE7,IE8的问题](http://www.cnblogs.com/jhxk/articles/1610920.html)
* [怎么去掉使用window.close()时弹出的提示框？（不用按钮）](http://topic.csdn.net/t/20020703/10/845994.html)
* [window.close关闭窗口，不弹出系统提示，直接关闭](http://www.blogjava.net/wangxinsh55/archive/2007/03/23/105743.html)
