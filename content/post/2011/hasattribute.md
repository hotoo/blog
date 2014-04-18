
# 深入 hasAttribute

- template: post.html
- pubdate: 2011-05-19
- tags: JavaScript

----


众所周知，IE 的 HTMLElement 对象不支持 hasAttribute 方法，于是有了如下实现：
它针对不支持 hasAttribute 方法的浏览器，检查 getAttribute 得到的是否等于 null，
如果是 null 则表明这个 HTMLElement 不存在指定的 Attribute。很聪明的一个方法。

```js
function hasAttr(elem, attr){
    if(elem.hasAttribute){
        return elem.hasAttribute(attr);
    }
    return null!=elem.getAttribute(attr);
}
```

最近写了个原理简单的基于 Select+Input 的可编辑 [Combox](http://hotoo.me/labs/combox.html)
控件，用到了这个方法来检查目标 select
对象是否存在如 multiple, editable 这样的属性，来实现不同的 Combox 版本。其他
浏览器上跑的很好，但是在 IE6 上却总是被初始化为 multiple 的实例，很明显，这个
hasAttribute 的实现出问题了。

原来针对 IE6，还有稍多一点的特殊性：

* `input.getAttribute("checked")` 返回 Boolean 值，true/false；
    * `input[type=checkbox|radio].getAttribute("checked")` 根据他的 checked 状态相关；
    * `input[type=others...].getAttribute("checked")` 始终返回 false；
* `select.getAttribute("multiple")` 返回 Boolean 值；
* `select>option.getAttribute("selected")` 返回 Boolean 值。

虽然可以通过 getAttribute("checked") 判断 checkbox/radio 的属性状况，但对于
其他类型的 input 元素，是无法准确获得 checked 属性的。

TODO: checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected

下面是比较完整一点的实现：

    function hasAttr(elem, attr){
        var tag = elem.tagName.toLowerCase();
        attr = attr.toLowerCase();
        if(elem.hasAttribute){
            return elem.hasAttribute(attr);
        }
        if(navigator.userAgent.indexOf("MSIE 6")>0 &&
          (("input"==tag && "checked"==attr) ||
          ("option"==tag && "selected"==attr) ||
          ("select"==tag && "multiple"==attr))){
            return elem.getAttribute(attr);
        }
        return null!=elem.getAttribute(attr);
    }

-- Update 2011/07/26 --

继续发现新坑：IE 中下面的代码

    <p></p>
    <q onclick="alert(0);"></q>

    <script>
        p.onclick = function(){};

        alert(p.getAttribute("onclick"));
        alert(q.getAttribute("onclick"));
    </script>

输出：

    function(){}

    function onclick()
    {
    alert(0);
    }

所以上面的 `hasAttr` 函数是无法正确返回这种在脚本中设置 `onclick` 值的。

对策：

    var hasAttr = function(elem, attr){
        if(!elem || 1!=elem.nodeType){return false;}
        if(elem.hasAttribute){return elem.hasAttribute(attr);}
        // for IE, not perfect.
        // @see http://www.patmullin.com/weblog/2006/04/06/getattributestyle-setattributestyle-ie-dont-mix/
        attr = attr.toLowerCase();
        if("style" == attr){return "" !== elem.style.cssText;}
        if(navigator.userAgent.indexOf("MSIE 6")>0 &&
          (("input"==tag && "checked"==attr) ||
          ("option"==tag && "selected"==attr) ||
          ("select"==tag && "multiple"==attr))){
            return elem.getAttribute(attr);
        }
        var val = elem.getAttribute(attr);
        if(null == val){return false;}
        else if("function" == typeof(val)){
            return val.toString().indexOf("function "+attr+"()") == 0;
        }else{return true;}
    };

----- Update 2011/10/26 ------

继续新坑，IE5,6,7 的 `script.getAttribute("src") === ""`，正常的 DOM 方法已经
阻止不了 IE 了，hack 方案可以解析 wrapHTML(node){return outerHTML.startTag;}，
判断是否有 src 属性。

如果在这里你真的可以忽略 IE，最佳方案还是屏蔽 IE 吧。
