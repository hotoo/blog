
# 『逻辑与』是个好东西

- template: post.html
- pubdate: 2012-05-01
- tags: JavaScript

----


一直很想实现 WebForms2 的语义化表单验证，最近才开始动手，执行力真差啊。

一个表单元素可以同时存在多种校验方案，比如：

* required.
* data type: number, date, url, email...
* minlength, maxlength, min, max.
* pattern
* 用户自定义验证函数。
* 异步访问服务器进行业务校验。

通常可以通过逻辑判断进行处理：

```js
function verifyFormInput(input){
  if(!verifyRequired()){return false;}
  if(!verifyMinLength()){return false;}
  if(!verifyMaxLength()){return false;}
  if(!verifyInputType()){return false;}
  if(!verifyMin()){return false;}
  if(!verifyMax()){return false;}
  if(!verifyPattern()){return false;}
  if(!verifyUserRules()){return false;}
  if(!verifySync()){return false;}
  return true;
}
function verifyForm(form){
    var flags = [];
    for(var i=0,l=form.elements.length; i<l; i++){
        // 一次只能校验一个表单元素异常。
        //if(!verifyFormInput(form.elements[i])){return false;}

        // 可以同时校验所有元素异常。但是需要辅助循环进行检查。
        flags[i] = verifyFormInput(form.elements[i]);
    }
    // 辅助循环检查。
    for(var i=0,l=flags.length; i<l; i++){
        if(!flags[i]){return false;}
    }
    return true;
}
```

实际代码中，各个 `verifyXXX` 函数可能内联在 `verifyFormInput` 函数中，
代码显得多而有点乱，甚至有点冗余。

想起模拟电路课程上学到的『与门』，只有所有电路都是通路时，整个电路才是通路。

而表单验证也是这样：

* 某个表单元素的所有验证逻辑都通过验证时，这个表单元素才算通过验证。
* 整个表单的所有表单元素都通过验证时，才算这个表单通过验证。

同时基于『逻辑与』表达式的语言特性，一旦前面的条件可以判断逻辑失败，立即返回
失败，不再进行后面的条件判断。

LogicalANDExpression:

> *Semantics*
>
> The production LogicalANDExpression : LogicalANDExpression &&
> BitwiseORExpression is evaluated as follows:
>
>   1. Evaluate LogicalANDExpression.
>   2. Call GetValue(Result(1)).
>   3. Call ToBoolean(Result(2)).
>   4. If Result(3) is *false*, return Result(2).
>   5. Evaluate BitwiseORExpression.
>   6. Call GetValue(Result(5)).
>   7. Return Result(6).

BitwiseORExpression:

>   *Semantics*
>
>   The production A : A@B, where @ is one of the bitwise operators in the
>   productions above, is evaluated as follows:
>
>   1. Evaluate A.
>   2. Call GetValue(Result(1)).
>   3. Evaluate B.
>   4. Call GetValue(Result(3)).
>   5. Call ToInt32(Result(2)).
>   6. Call ToInt32(Result(4)).
>   7. Apply the bitwise operator @ to Result(5) and Result(6). The result is
>   a signed 32 bit integer.
>   8. Return Result(7).


于是验证算法改良如下：

```js
function verifyFormInput(input){
    var certified = true;
    certified = certified && verifyRequired();
    certified = certified && verifyMinLength();
    certified = certified && verifyMaxLength();
    certified = certified && verifyInputType();
    certified = certified && verifyMin();
    certified = certified && verifyMax();
    certified = certified && verifyPattern();
    certified = certified && verifyUserRules();
    certified = certified && verifySync();
    return certified;
}
function verifyForm(form){
    var certified = true;
    for(var i=0,flag,l=form.elements.length; i<l; i++){
        // 一次只能校验一个表单元素异常。
        //certified = certified && verifyFormInput(form.elements[i]);

        // 可以同时校验所有元素异常。无需辅助循环进行检查。
        flag = verifyFormInput(form.elements[i]);
        certified = certified && flag;
    }
    return certified;
}
```

## 延伸

以前也 Hack 的用过逻辑与表达式，比如：

```js
flag && action();
```

但这个用法只是用到了条件判断的作用，类似于：

```js
if(flag){action();}
```


## 参考阅读

* [ECMAScript](http://www.ecmascript.org/)
* [逻辑与](http://zh.wikipedia.org/wiki/%E9%80%BB%E8%BE%91%E4%B8%8E)
    [Logical_conjunction](http://en.wikipedia.org/wiki/Logical_conjunction)
* [与门](http://zh.wikipedia.org/wiki/%E4%B8%8E%E9%97%A8)
    [AND_gate](http://en.wikipedia.org/wiki/AND_gate)
