
# placeholder 最佳实践

- template: post.html
- pubdate: 2010-12-06
- tags: JavaScript, HTML5

----


[placeholder](http://dev.w3.org/html5/spec/Overview.html#the-placeholder-attribute)
[2](http://www.whatwg.org/specs/web-apps/current-work/multipage/common-input-element-attributes.html#the-placeholder-attribute )
是 HTML5 中的标准属性，它用于定义显示在输入框中的简短提示信息，并在适当的时机
（比如在输入框获得焦点时）隐匿起来。

在早期的浏览器中，只能通过 JavaScript 自定义函数来实现。而在早期的实现中又五花八门。

在 HTML 方面，一般是使用自定义的 hint 或者 title 属性放置提示消息。

而在 JavaScript 上，最常见的是通过修改 input 本身的 value 及其 CSS 样式实现。
一般有直接修改 input 的样式，或者添加 class 两种，后者从某种程度上来说更好些。

早期的实现中还有一个比较不好的问题是，代码里直接判断 input.value 是否为空，
或者是否为占位符提示的值，如果用户输入的内容如果碰巧和占位符提示相同，则会出现误判。

下面可以说是早期思想中一个较佳的实现：

    $("input[placeholder]").each(function(){
        var o=$(this);
        if(!o.val()){
            o.val(o.attr("placeholder"));
            o.addClass("placeholder")
        }
        o.focus(function(){
            if(o.hasClass("placeholder")){
                o.val("");
                o.removeClass("placeholder");
            }
        }).blur(function(){
            if(""==o.val()){
                o.val(o.attr("placeholder"));
                o.addClass("placeholder");
            }
        });
    });

但是即使如此，直接修改 input.value 同样会有一个几乎无法避免的问题：假如用户在必填项中没有
输入任何内容，但是占位符会填充其内容，在提交表单时，当然也可以通过判断 input 是否包含
`placeholder` 样式类来针对性处理。但是特殊地，当页面出现脚本错误（这应该说不少见），导致
表单验证函数未能正确处理而直接提交到服务器，这时服务器是较难准确确认输入框中的内容是占位符，
还是用户输入的内容的，它只知道这个满足非空条件。

于是后来有了一种更有趣的实现，它不是直接修改 input.value，而是使用一个附加的元素，占位符消息
放置在这个元素中，并通过恰当控制这个元素的显示/隐藏，来达到更真实和优秀的体验。

这种实现甚至可以轻易的实现只有用户在输入框中输入内容之后，占位符提示消息才消失。

这个实现要注意以下几点：

* 字体大小等样式要尽量和 input 一致（颜色例外）。
* 使用 label 作为占位符消息的容器标签，可以加上恰当的 for 属性，实现自动关联。
* 占位符的位置，可以直接使用 CSS 的相对位置实现，也可以使用 JavaScript 计算获得。

比如下面的实现：

    $('input[placeholder],textarea[placeholder]').each(function(){
        var ME=$(this), id=ME.attr('id'), txt=ME.attr('placeholder');
        if(!id){
            id="rand_ID_"+Math.random().toString().substr(2);
            ME.attr('id', id);
        }
        var holder=$('<label for="'+id+'" class="placeholder">'+txt+'</label>')
        if(holder.width>ME.width()){
            holder.css({"width":ME.width()});
        }
        ME.before(holder);
        function hanlder(){
            if(ME.val()){
                holder.hide();
            }else{
                holder.show();
            }
        }
        if("keyup"==placeholder_handler){
            ME.keyup(hanlder);
        }else{
            ME.focus(function(){
                holder.hide();
            });
        }
        ME.blur(hanlder);
        if(!ME.val()){holder.show();}
    });

另外对于已经支持 `placeholder` 的浏览器可以忽略上面的代码，而使用浏览器的默认实现。

    if(!("placeholder" in document.createElement("input"))){
        // ...
    }

## 延伸阅读

* [diveintohtml5.org#placeholder](http://diveintohtml5.org/forms.html#placeholder)
* [让所有的浏览器都支持 HTML5 placeholder 属性，基于MooTools](http://cssrainbow.cn/demos/892.html)
* [跨浏览器的HTML5 placeholder 实现](http://www.quanlei.com/2010/09/%E8%B7%A8%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84html5-placeholder-%E5%AE%9E%E7%8E%B0/)
* [Inline Form Labels](http://www.zhoumingzhi.com/2009/12/17/inline-form-labels/)，
    [Inline Form Labels（2）](http://www.zhoumingzhi.com/2010/08/10/inline-form-labels-2/)
* [JQuery HTML5 placeholder fix](http://www.kamikazemusic.com/quick-tips/jquery-html5-placeholder-fix/)
