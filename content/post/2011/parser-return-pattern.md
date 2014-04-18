
# 多种不同结果的返回模式

- template: post.html
- pubdate: 2011-06-08
- tags: 设计模式

----


探讨个问题哈，我现在再做一个 HTML 校验工具，先将 HMTL 源码解析成 DOM 树，
其间可能遇到语法错误，为了发现更多的错误，会跳到下一个分界点继续解析；
然后将解析得到的 DOM 树返回给 lint 工具继续进行进一步的语法、语义解析。
其过程是：

```js
var dom = parse(html){cap(err); return dom;};
var lintErr = lint(dom){return err;};
```

最终需要将 parse 和 lint 的错误收集到一起反馈给服务端。

请问，parse 有什么好的方式来返回解析时错误信息？

之前先是将 parse 设计成了函数式，但是我觉得下面这种返回方式很不好：

```js
return {
    dom: dom,
    err: err
};
```


## 另外一种思路

HTMLParser 设计成独立的类（而不是上面的函数方式）

```js
var HTMLParser = function(){
    var err = [];
    this.parse = function(html){
        var dom = {};

        err.push(new Error("this is not error."));
        err.push(new Error("err is not error."));

        return dom;
    };
    this.getErrors = function(){
        return err;
    };
};

function main(html){
    var parser = new HTMLParser();
    var dom = parser.parse(html);
    var err = parser.getErrors();
    var result = HTMLint(dom);

    // concat array to err.
    Array.prototype.push.apply(err, result);

    return err;
};
```

貌似这种方式比上面的稍好一点，不过我又不想为此将原本很简单的函数式改成
对象式。

## 外部数据存储

```js
var Console = (function(){
    var _err = [];
    function log(err){
        _err.push(err);
    }
    function getErr(){
        return _err;
    }

    return {
        log: log,
        getErrors: getErr
    };
});
var HTMLParse = function(){
    Console.log(new Error("syntax error."));
    Console.log(new Error("parse error"));

    return dom;
};
var HTMLint = function(dom){
    var err = [];
    err.push(new Error("lint error."));
    err.push(new Error("lint error."));
    return err;
};
function main(html){
    var dom = HTMLParse(html);
    var parseErr = Console.getErrors();
    var lintErr = HTMLint(dom);

    Array.prototype.push.apply(parseErr, lintErr);

    return parseErr;
}
```

对于只有一个实例（或运行一次）的情况，第三方独立的 `console` 是合适的。
但是一旦需要多个实例（或运行多次，每次Parse的结果都各自独立，
每个html的parse和lint的错误结果各自拼接一起，但是不是所有的html的parse+lint错误结果拼接在一起）
的情况，还是将解析异常信息和解析器本身绑定在一起（比如类）的方式比较合适。

上面的文字有点绕，表达式：

```
err0 = parseError0 + lintError0;
err1 = parseError1 + lintError1;
```

err0 和 err1 是各自独立的，实例化多个第三方独立的有专用的Console，不如用类的方式好了。

## 寻求指教

对于这种需要返回多种不同数据的函数式，
如果你有其他的方案，欢迎回帖、回邮，或回博交流指导 ：）


## 更新 (2013)

事件机制可能是最好的选择：

```js
parser.on("error", function(err){
});
```
