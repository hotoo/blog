
# JavaScript 异常初步

- template: post.html
- pubdate: 2011-04-03
- tags: JavaScript, Exceptions

----


* Error, TypeError, ReferenceError
* try/catch/finally
* window.onerror / window.addEventListener("error")
* on("error") events

----

异常处理

| Browser   | message | description | line | number | lineNumber | name | fileName | stack |
|-----------|---------|-------------|------|--------|------------|------|----------|-------|
| IE8       | √      | √          | ×   | ×     | ×         | √   | ×       | ×    |
| Firefox 5 | √      | ×          | ×   | ×     | √         | √   | √       | √    |
| Chrome 12 | √      | ×          | ×   | ×     | ×         | √   | ×       | √    |
| Safari 5  | √      | ×          | √   | ×     | ×         | √   | ×       | ×    |
| Opera 11  | √      | ×          | ×   | ×     | ×         | √   | ×       | √    |

属性描述：

message:: {String} 异常消息描述，全部浏览器都支持。
name:: 错误名称，一般等同于错误类型名，如 Error, TypeError, ReferenceError...。不过实际抛出的同一个错误，不同浏览器的 name 值可能不一致(下面讲述)。
description:: 异常描述，IE 中同 message，其他浏览器不支持。
line:: 错误行号，仅 Safari 支持。
number:: 错误编号，例如“缺少对象”是 -2146823281。“xx未定义”是 -2146823279。仅 IE 支持。
lineNumber:: 错误发生所在行号，仅 Firefox 支持。
fileName:: 发生错误的所在文件地址，仅 Firefox 支持。

构造函数的参数&顺序：

| 参数    | 1(个)                     | 2(个)                     | 3(个)                                |
|---------|---------------------------|---------------------------|--------------------------------------|
| Firefox | `Error(message)`          | `Error(message,fileName)` | `Error(message,fileName,lineNumber)` |
| IE      | `Error(<Number> number)`  | `Error(number,message)`   | >                                    |
| \/      | `Error(<String> message)` | \/                        | >                                    |
| Chrome  | `Error(message)`          | >                         | >                                    |
| Safari  | \/                        | >                         | >                                    |
| Opera   | \/                        | >                         | >                                    |

Note: IE, `new Error(String message)` - `<Object,Array,RegExp,...>.toString()`


JavaScript 有多种原生异常类型，包括最常见的 Error 和 EvalError, RangeError,
ReferenceError, SyntaxError, TypeError, URIError. 这些原生异常类型分别对应的
意义是：

Error:: 异常的基类。
EvalError:: 发生在 eval() 函数中的异常。
RangeError:: 数值超出 JavaScript 可表示的范围。
ReferenceError:: 使用了非法的引用。
SyntaxError:: 在 eval() 中发生了语法错误的异常。除此之外的语法错误异常，均无法通过 try/catch 和 onerror 捕获，这类异常会直接报告给浏览器。
TypeError:: 变量类型不是预期的。
URIError:: 在 encodeURI() 和 decodeURI() 函数中发生异常。

TODO: 每种异常类型都带有以下成员/方法。
message::
line::

值得注意的是，直接掷出 Error 之外的其他原生异常（如 `throw new EvalError("msg")`）
时，IE 浏览器是无法捕获异常消息的，统一的异常消息是“例外被抛出且未被接住”。

而在 try{}catch(ex){} 中可以拿到更详细的异常信息。

JavaScript 也可以掷出其他类型的异常，如 throw "xx error."

## 捕获异常

推荐的异常捕获方法是 `try/catch`，不过也可以简单使用全局异常捕获方式：

    window.onerror = function(msg, file, line){
        return true;
    };

`window.onerror` 事件可以捕获浏览器端掷出的所有异常，并可以拿到错误消息，所在文件，
及错误所在行。但是无法获得异常对象本身，及触发异常的事件对象。

注意：onerror 事件不在早期的 HTML4 规范中，只有 IE, Firefox 和后续的 Chrome 才有
支持，Safari, Opera 至今没有支持这个事件。

一般来说，绑定事件(addEventListener/attachEvent)的方式比给 HTML DOM 元素直接连接事件处理函数的方式要好。

但是为 window 绑定 error 事件却似乎不太理想。
IE 浏览器能得到 4 个参数（比 onerror 多一个），但有效的还是前面 3 个（跟 onerror 一致）。
而其他浏览器却只能得到一个参数，即错误事件（FF 得到的是 Error，Chrome 得到的 ErrorEvent。

题外话，对于 HTML 元素的 onerror 事件一般会触发在加载外部资源时。

## 无法捕获的异常

如果 `onerror` 所在 `<script>` 块本身有语法错误，会导致 `onerror` 错误处理脚本本身无法
被执行，也就无法初始化全局异常处理函数。

或者异常发生在初始化全局异常处理函数之前，这个异常也无法被全局处理函数捕获。

## 延伸阅读

* [Error - MDC Doc Center](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error)
* [window.onerror - MDC Doc Center](https://developer.mozilla.org/en/DOM/window.onerror)
* [onerror Event](http://msdn.microsoft.com/en-us/library/cc197053%28VS.85%29.aspx)
* [The onerror event of the window object](http://www.javascriptkit.com/javatutors/error.shtml)
    [2](http://www.javascriptkit.com/javatutors/error2.shtml)
    [3](http://www.javascriptkit.com/javatutors/error3.shtml)
    [4](http://www.javascriptkit.com/javatutors/error4.shtml)
* [TypeError](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/TypeError)
* [js判断错误类型](http://hi.baidu.com/fcl06/blog/item/c3721bfa2643689058ee9040.html)
* [解析IE浏览器中的Javascript Error对象](http://www.iefans.net/ie-javascript-error/)
* [DamnIT](https://damnit.jupiterit.com/home/learn)
* [ExceptionHub](http://www.exceptionhub.com/)
