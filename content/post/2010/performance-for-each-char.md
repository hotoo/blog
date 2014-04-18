
# 遍历字符的性能

- template: post.html
- pubdate: 2010-07-29
- tags: JavaScript, Performance, 性能

----


1. `s.charAt(i)`
1. `s.split("")[i]`

[Test](http://hotoo.github.com/labs/preformance-for-each-chars.html)

在 IE7, Firefox3.6.8, Chrome5.0, Safari5.0, Opera10 上测试，
除了 Firefox 之外，所有的浏览器均是第 2 种表达式更快速。
