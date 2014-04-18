
# 就近原则：JavaScript 块级作用域的变量定义

- template: post
- pubdate: 2013-04-25
- tags: JavaScript

----

> 代码是写给人看的，顺便给机器执行。[1]

## 引子

上周有位前端同学周报里分享了段 for 循环的『好代码』：

```js
for (var i = 0, item; item = list[i]; i++) {
  // 将 ltem = list[i]当做条件判断语句，当i下标溢出时，返回undefined，循环结束
  // 居然省了一个变量呢～
}
```

这位同学是看了 jQuery 里类似下面这种用法之后做的这个分享：

```js
// If no nodeType, this is expected to be an array
for ( ; (node = elem[i]); i++ ) {
    // Do not traverse comment nodes
    ret += getText( node );
}
```

jQuery 还有不少地方使用这种用法，也有不少地方是传统的使用 length 方法。
但是 jQuery 这样用有其特定场景，需要正视。我回复说：

1. 如果数组项中有 0, false, null, undefined, ""，代码就出 bug 了。
2. 好像没看到少了变量，一定要少的话，典型的 for 写法也可以少（但是不推荐）。
3. 代码是写给人读的，顺便给机器执行。
4. 另外，对 list 本身有操作，尤其是长度有影响的操作要特别注意。

我个人推荐下面这种写法：

    for(var i=0,l=list.length; i<l; i++){
      list[i]
    }

p.s. 使用 Vim snipMate 的同学可以参考
[javascript.snippet](https://github.com/hotoo/snipmate.vim/blob/master/snippets/javascript.snippets#L56)
这个代码片段模板。


好了，使用溢出判断数组循环结束的讨论到此就结束了，但是好戏还在后头。

由于 JavaScript 作用域的问题，有同学建议说将 `i`, `l` 变量定义在 `for` 循环之外。
于是进入另一个变量定义的话题。

<!--more-->

----

## 如何定义块级作用域中使用的变量？

持有变量应前置定义观点的同学，估计有不少是受了《JavaScript 权威指南》或其他权威著作的影响。

《JavaScript 权威指南》第 4 章 4.3.1 小节 [2] 详细分析了块级作用域中变量定义的问题。

由于 JavaScript 只有函数作用域，没有块级作用域，因此在 `for`, `if/else`,
`do/while`, `switch/case`, `try/catch` 这些块中定义的变量，实际在块之外也可以使用。

```js
function functionScope(){
    for(var i=0,l=5; i<l; i++){
        var blockVariable = i;
    }
    alert(i); // 5
    alert(blockVariable); // 4
}
```

例如上面的代码，在 for 这个块之中定义的变量，在 for 之外也可以使用。
这在其他支持块级作用域(如C/C++ [3], Java)的编程语言中是无法理解，甚至不可接受的。

这是 JavaScript 设计的 BUG，书中作者建议将所有变量声明集中放置在函数开头，
说这是个好习惯。

> This example illustrates why it is good programming practice to place all of
> your variable declarations together at the start of any function.

JavaScript 传教士老道也有
[类似的教诲](http://javascript.crockford.com/code.html#variable declarations)：

> The var statements should be the first statements in the function body.
>
> ...
>
> JavaScript does not have block scope, so defining variables in blocks can
> confuse programmers who are experienced with other C family languages.
> Define all variables at the top of the function.

他们的理由是，既然在块级作用域之内定义的变量可以被块级作用域之外使用，
那么就应该把变量定义在块级作用域之外，让它们看起来和它们实际的作用域表现一致。

```js
function functionScope(){
    var i, l=5, blockVariable;

    // more codes ...

    for(i=0; i<l; i++){
        blockVariable = i;
    }
}
```

----

但是这个我稍微持不同的观点 ：）

实际上我们定义 `i`, `l` 是为了给 `for` 用的，JavaScript 解释器在执行的时候可以
给块级作用域外面用，不代表就应该定义在外面。
定义在外面给人的暗示是这个变量是给整个 function 用的，而不只是 for 循环，
就会给人『在外面用也没关系』的错觉。但这其实不是我们定义 `i`, `l` 的本意。

另外变量前置声明，会导致变量声明、定义和使用之间分离，变量含义自我解释性被削弱，
而且容易造成误清理、或遗漏清理变量的问题。


对于 JavaScript 的这个糟粕，让人来适应机器的问题而修改代码，甚至改变本性习惯，
和另一个使用逗号连续定义变量的话题是何其的相似。
为什么不让机器来适应人，在编辑器中编辑、或在编译器中编译 JavaScript 代码时，
发现块级作用域之外有使用块级作用域内部定义的变量时，给予恰当的警告。
这是否更合理呢。

如果遵循权威的教诲，把变量定义在函数前面，编辑器和编译器都没有办法帮我们了。

我认为：

1. 定义在块级作用域之内的变量不应该被块级作用域之外使用。
2. 如果被块级作用域之外使用了：
    1. 要么这是一个错误的用法，会带来隐患。<br/>
        _人、编辑器、编译器、甚至将来的解释器可以发现这个问题并给出警告。_

    2. 或者确实有这样的使用需求，那么这个变量应该被声明在块级作用域之外。


所以我比较认同 `就近原则` [4] 这种更合理、更人性的风格。

* 文档、注释应尽可能的靠近代码。
* 变量声明应尽可能的靠近变量使用。
* 应尽量限制变量的作用域。


## 那么

请问你持什么样的观点呢？


----

### 注

1. 出自《Structure and Interpretation of Computer Programs》，中文版《计算机程序的构造和解释》
    > Thus, programs must be written for people to read, and only incidentally
    > for machines to execute.
    >
    > -- by Harold Abelson and Gerald Jay Sussman with Julie Sussman
2. 《JavaScript 权威指南》第六版章节和标题有所变更。第六版对应章节在第 3 章
    第 3.10.1 小节：函数作用域和声明提前。
    第六版中，关于变量声明提前的结束语中相对中立了很多。

    > In programming languages with block scope, it is generally good programming
    > practice to declare variables as close as possible to where they are used and
    > with the narrowest possible scope. Since JavaScript does not have block scope,
    > some programmers make a point of declaring all their variables at the top of
    > the function, rather than trying to declare them closer to the point at which
    > they are used. This technique makes their source code accurately reflect the
    > true scope of the variables.

    大意是说：<br/>
    在支持块级作用域的编程语言中，变量就近定义是一个非常好的编程实践。
    变量定义尽量靠近变量使用，变量尽量限制在最小的作用域之内。
    由于 JavaScript 没有块级作用域，一些程序员提出将变量定义在函数的顶部，
    而不是靠近使用变量的地方。这使得源码准确反映了其真正的作用域范围。

3.  早在 [C89 规范](http://flash-gordon.me.uk/ansi.c.txt) 中，规定了变量必须声明在作用域的最前面，
    但是 [C99](http://www.open-std.org/jtc1/sc22/wg14/www/docs/n1336.pdf)
    和 C++ 取消了这个限制，支持就近声明变量。

    由于就近声明可以让变量作用于恰当的作用域之中，而且变量声明更靠近变量的使用，
    因此也更容易理解。`就近原则` 在很多编程语言当中都是最佳实践，JavaScript 也不例外。
4. [就近原则(The Principle of Proximity)](http://en.wikipedia.org/wiki/The_Proximity_Principle) 是一项社会心理学
    的理论，实际在 [计算机编程](http://www.approxion.com/?p=120) 、
    [视觉设计](http://desktoppub.about.com/od/designprinciples/tp/Principles_of_Design.htm) 、
    [网页设计](http://www.webdesignerdepot.com/2010/01/the-principle-of-proximity-in-web-design/)
    领域也有很多的延伸与实践。
