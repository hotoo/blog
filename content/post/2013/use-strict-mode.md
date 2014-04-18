
# JavaScript Strict Mode

- template: post.html
- pubdate: 2013-05-19
- status: draft

----

ECMAScript 5 定义了严格模式。开发者在代码中写上 `"use strict"` 标识，浏览器就会
按照严格模式来执行 JavaScript。

而且还非常强大的支持局部作用域，不影响其他外部作用域使用非严格模式。
多么贴心的服务。

很多人（包括我之前）的直觉会认为这是非常好的特性，向前兼容，严格模式也必定是未来的趋势。

但是我想说的是：严格模式是未来的趋势也许没有错，但绝对不会是让开发者手工在各个
作用域中到处写 `"use strict"`。

使用严格模式是开发者的事，所以最重要、也是最直接有效的方式是在开发阶段就完成
严格模式的所需的所有工作，包括代码静态分析、校验等待。`"use strict"` 选项应该
在 IDE/编辑器中配置而不是写在代码中。

同时像 HTML 的严格模式一样，浏览器运行时使用严格/非严格模式只需要在 DOCTYPE
中声明一次，而无需不同作用域使用不同的模式。

肯定有人站出来说，对于历史遗留的非严格模式的代码怎么办，支持作用域模式不是应该
考虑的兼容性问题么？

确实，历史遗留代码的兼容性问题比较麻烦，我很同情我们。

但是想想我们从 HTML 转到 XHTML 的痛苦经历，难道我们应该允许文档中某些 DOM
片段是不标准的，另外一些片段写上一些特殊属性声明自己是遵循标准使用严格模式的吗？

完全没有，我们只有一个 DOCTYPE。

不标准的代码只有重写，就是这样。

----

我认为：

* 严格模式是未来的趋势。
* 严格模式应该在 IDE/编辑器和浏览器中声明。
* 严格模式无需也不应该在各个 JavaScript 作用域片段中到处声明。

## 参考

* [ECMA-262-5 in detail. Chapter 2. Strict Mode.](http://dmitrysoshnikov.com/ecmascript/es5-chapter-2-strict-mode/)
* [译：It’s time to start using JavaScript strict mode](http://blog.csdn.net/liumf2005/article/details/7427700)
* [ECMAScript 5 Strict Mode, JSON, and More](http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/)
* [Strict Mode (JavaScript)](http://msdn.microsoft.com/en-us/library/ie/br230269(v=vs.94\).aspx)
* [What does “use strict” do in JavaScript?](http://caioproiete.net/en/what-does-use-strict-do-in-javascript/)
* [What does “use strict” do in JavaScript, and what is the reasoning behind it?](http://stackoverflow.com/questions/1335851/what-does-use-strict-do-in-javascript-and-what-is-the-reasoning-behind-it)
* [JavaScript语法支持严格模式：”use strict”](http://www.cnblogs.com/sniper007/archive/2012/10/30/2746482.html)
