
# arguments to Array 之效率

- template: post.html
- pubdate: 2010-01-07
- tags: JavaScript, 性能

----


怿飞昨天发有一篇《[如何将函数的实际参数转换成数组](http://www.planabc.net/2010/01/06/arguments_to_array/)》
的日志，其实核心不是讲“如何如何”，而是比较了几种算法/语法的效率。
说到算法本身的性能，我和 [army 的看法](http://www.planabc.net/2010/01/06/arguments_to_array/#comment-5869)
一样，对这篇日志的观点提出质疑。

从语法原理上，Array.prototype.slice.call(arguments)是对数组的slice方法的原型直接引用，而[].slice.call(arguments)则需要创建数组对象。没有理由后者比前者的性能还要高的。

不过我还是写了 [测试](http://hotoo.googlecode.com/svn/trunk/test/toArray.html)
来证实自己的观点，为了尽量少的避免其他干扰（包括函数调用带来的消耗），
算法/语法都直接内联写在计时器一起。

这几个例子分别比较了：

   * `Array.apply(this,arguments)`
   * `Array.prototype.slice.call(arguments)`
   * `[].slice.call(arguments)`
   * Prototype 的 `$A(arguments)`
   * jQuery 的 `makeArray(arguments)`
   * 和最土的循环算法。

并在各个浏览器（Multi IE 6, IETester 5.5, IETester 6, IE 7, FF 3.5, Chrome 4,
Safari 4, Opera 10）下一一测试。也欢迎各位参与测试并将结果提交给我，
如果你觉得测试有不公平合理的地方也可以提出。

至于结论，也不是那么好确定，不过大致如下：
`Array.apply(this,arguments)` 在大部分情况下都能取得优胜；
而Prototype和jQuery其次，不过这两者不仅仅是针对arguments编写而且是直接调用其函数
（稍有消耗），这里只拿来比较一下，这两个还是非常出色的；
`Array.prototype.slice.call(arguments)` 和 `[].slice`.call(arguments)则旗鼓相当，
并没有说谁比谁一定更强，更浏览器实现有关，在部分浏览器中前者有稳定的微量优势；
至于老土的循环法，`arguments.length` 较小时表现不俗，较大时也更浏览器有关系。
而怿飞说的那点（不确定的）非关键或巨大性能优势，其实意义不大。

## 延伸阅读：

* [正则表达式拼接和构建零长度对象](javascript-regexp-concat-and-0-length-object.html)
* [Javascript String 方法效率大比拼](javascript-string.html)
* [Javascript 相等符(==)与完全相等符(===)之效率](efficiency-of-javascript-equals.html)
