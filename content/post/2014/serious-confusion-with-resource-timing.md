
# 译：严重的 Resource Timing 混乱

- template: post.html
- pubdate: 2014-12-30
- tags: HTML5, 翻译

----

# 或者说『耗时包含了 Blocking 部分的时间』

用 [Resource Timing](http://www.w3.org/TR/resource-timing/) 来同统计资源下载性能
是非常赞的方式，但不幸的是，几乎所有和我聊过的人都是使用 [`duration` 属性](http://www.w3.org/TR/resource-timing/#duration-attribute)，
而且他们都没有意识到 `duration` 包含了 blocking 时间。结果 `duration` 时间
比实际的下载时间要长很多，超出了开发者意料之外的结果。这个问题在跨域资源中
尤为糟糕，`duration` 是唯一可用的。在这篇博文中我将解释这个问题，并提出解决方案。


## 译者补充

* [SERIOUS CONFUSION with Resource Timing](http://www.stevesouders.com/blog/2014/11/25/serious-confusion-with-resource-timing/) - 原文出处。
