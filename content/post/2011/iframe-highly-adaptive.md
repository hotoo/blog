
# 深入 Iframe 自适应高度

- template: post.html
- pubdate: 2011-08-24
- tags: JavaScript

----


DOCTYPE(CSS1Compat): HTML5, HTML4.01 Strict, HTML4.01 Transitional,
XHTML1.0 Frameset, XHTML1.0 Strict, XHTML1.0 Transitional, XHTML1.1.

| browser | documentElement |              | body         |              |
|---------|-----------------|--------------|--------------|--------------|
|         | scrollHeight    | offsetHeight | scrollHeight | offsetHeight |
| IE      | √              | ×           | √           | √           |
| FF      | √              | √           | √           | √           |
| Chrome  | √              | √           | √           | √           |
| Safari  | √              | √           | √           | √           |
| Opera   | √              | √           | √           | √           |

non-doctype(BackCompat): 无 DOCTYPE, IE: DOCTYPE 前有非空白字符（包括注释）。

| browser    | documentElement |              | body         |              |
|------------|-----------------|--------------|--------------|--------------|
|            | scrollHeight    | offsetHeight | scrollHeight | offsetHeight |
| IE8        | ×              | ×           | √           | ×           |
| FF5        | √              | √           | √           | √           |
| Chrome13   | √              | √           | √           | √           |
| Safari5    | √              | √           | √           | √           |
| Opera11.50 | √              | √           | √           | ×           |

测试环境：Windows Server 2003.

综上所述：使用 `document.body.scrollHeight` 是最合适的。

# 计算高度的时机

父窗口检测子窗口：

    iframe[onload=handler]

本窗口自检测：

```js
dom-ready = handler;
window.onload = handler;
body[onload=handler]
```

## 子窗口获取自身在父窗口的 iframe 元素

如果父窗口有名字的话，可以直接通过 frames[name] 直接引用。

```js
// 求教更恰当的命名。
function getParentFrame(){
  if(parent == window){return null;}
  if(window.name){return parent.frames[window.name];}
  var ifr = parent.document.getElementsByTagName("iframe");
  for(var i=0,l=ifr.length; i<l; i++){
    if(window == ifr[i].contentWindow){
      return ifr[i];
    }
  }
  var ifr = parent.document.getElementsByTagName("frame");
  for(var i=0,l=ifr.length; i<l; i++){
    if(window == ifr[i].contentWindow){
      return ifr[i];
    }
  }
  return null;
};
```

## 其他相关

上面的 `getParentFrame` 通过窗口名字直接取得元素本身，这里要注意的一点，
以前写代码的时候有这样的代码定义：

```js
function(){
  var elem = "elem",
      name = "name",
      desc = "desc";
}
```

后来要增加一个变量，但是不小心写错标点符号。

```js
  function(){
      var elem = "elem",
+         id = elem.id;
          name = "name",
          desc = "desc";
  }
```

然后 name 就成了全局变量，无意中修改了 `window.name` 的值。
所以如果使用 name 作为局部变量的时候，千万要小心，否则执行这段代码之后，
`a[target=oldName]` 的链接会因为找不到 `frames[oldName]` 而弹出新窗口。

## 延伸阅读

* [再谈iframe自适应高度](http://ued.koubei.com/?p=243)
* [三谈Iframe自适应高度](http://ued.koubei.com/?p=1217)
