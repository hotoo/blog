
# Date.now()

- template: post.html
- pubdate: 2011-09-18
- tags: JavaScript

----


以前做过一个 JavaScript 性能测试“框架”，也看过其他人做性能比较的时候，基本上
也都是使用 `new Date()` 来记时，会“耍点小花样”的同学会使用 `+new Date()`。

现在又想做另一种性能监控的方法，便着重考量了下各种记时方案，尽量减少因为
性能监控代码对业务代码的影响。

下面是循环 100000 次，过程中只有计数器操作，得到的时间(ms)对照表
([Demo](http://hotoo.me/labs/Date.now.html ))。

| Browser  | new Date() | new Date().getTime() | new Date().valueOf() | +new Date() | Date.now() |
|----------|------------|----------------------|----------------------|-------------|------------|
| IE8      | 469        | 391                  | 375                  | 406         | -          |
| Firefox6 | 266        | 258                  | 257                  | 259         | 236        |
| Chrome13 | 46         | 29                   | 29                   | 35          | 20         |
| Opera11  | 246        | 242                  | 246                  | 244         | 222        |
| Safari5  | 256        | 232                  | 239                  | 255         | 222        |

由此可以对照出，`Date.now()` 确实有很明显的性能优势，另外 `Date.now()` 返回是
number 类型的数值，并不产生 Date 对象。

不过目前只有 IE9, Firefox3+, Chrome5+, Opera10.50+, Safari4+ 支持，对于不支持
的浏览器，可以继续使用 `new Date().valueOf()` 方法（个人不推荐用 `+new Date()`）：

```js
// @return {Number}
function now(){
    return ("function"==typeof Date.now) ? Date.now() : new Date().valueOf();
}
```

## 日期相关

```js
new Date()          // now.
new Date(null);     // 1970/01/01 00:00:00(UTC)
new Date(undefined);// IE:NaN; Others:Invalid Date.
```

## 参考阅读

* [Date.now Function (JavaScript) - MSDN](http://msdn.microsoft.com/en-us/library/ff679974(v=vs.94).aspx)
* [Data.now() - MDN](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/now)
