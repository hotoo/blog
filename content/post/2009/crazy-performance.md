
# 疯狂的性能

- template: post.html
- pubdate: 2009-08-23
- tags: JavaScript

----

> Performance is Everything.<br/>
> 工作中最重要的是提高效率。– 约·艾迪生

单元测试是开发人员必做的功课之一，而精益求精的开发人员又会为性能而癫狂。

目前很少有发现 JavaScript 的性能测试工具，程序员在比较几段为同一目标，
但实现方式不同的代码效率时，总需要一行行的写new Date()和document.write()。
应该说，这不是什么大不了的事，因为 JavaScript 的性能测试本身就很简单，代码量也不算多。

不过，如果我们可以做的更好，更简单，更直观的话，那就动手吧。

这里我初步写了一个
[性能测试的框架](http://hotoo.googlecode.com/svn/trunk/labs/js/crazy/Crazy.html)，
实话实说，是抛砖引玉，因为这个本身没有什么值得骄傲的，
请大家多提意见和建议，来共建一个更好的性能测试框架。

## 延伸阅读：

* [Performance is Everything](http://bdn.backbase.com/blog/sjoerd/performance-is-everything)
* [Javascript performance test](http://wd-testnet.world-direct.at/mozilla/dhtml/funo/jsTimeTest.htm)
* [Chrome称王 五款浏览器性能大比拼－软件评测](http://www.wangchao.net.cn/bbsdetail_1883293.html)
* [浏览器 JavaScript 大比拼，Opera 9.5胜出！](http://www.ie92.com/thread-29531-1-2.html)
* [主流浏览器JS性能大比拼](http://www.javaeye.com/news/1416-js-mainstream-browser-performance-competition)
