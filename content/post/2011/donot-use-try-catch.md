
# 别用 try/catch

- template: post.html
- pubdate: 2011-07-05
- tags: JavaScript

----


实践证明：#JavaScript 用 try/catch 来忽略未定义的函数调用异常是不明智的，
效能太差了，尤其在 FF 里，还是 typeof 快点。

## See Also

* [Demo](http://hotoo.me/labs/fast-check-function.html)
