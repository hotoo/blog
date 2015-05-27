
# 译：严重混乱的 Resource Timing

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

## Resource Timing 回顾

[Resource Timing 规范](http://www.w3.org/TR/resource-timing/) 定义了收集网页中
所有资源耗时统计的 API。现在可用于 Chrome, Chrome for Android, IE 10-11, 和 Opera。
可以通过 `getEntries()`, `getEntriesByType()` 和 `getEntriesByName()` 得到一个
`PerformanceEntry` 列表，一个 `PerformanceEntry` 对象包含以下属性：

* `name` – URL 地址
* `entryType` – 通常是 “resource”
* `startTime` – 开始处理这个资源的时间（相对开始导航到页面时的毫秒数）
* `duration` – 处理这个资源的总耗时（毫秒）

上面的属性在所有的资源中都可用，包括同域和跨域的。而同域的资源拥有另外一些可以
访问的附加属性，这些属性定义在 `PerformanceResourceTiming` 接口中。这些属性名称
很简洁清晰，完全可以见名思意，并且以时间顺序排序：

* redirectStart
* redirectEnd
* fetchStart
* domainLookupStart
* domainLookupEnd
* connectStart
* connectEnd
* secureConnectionStart
* requestStart
* responseStart
* responseEnd

这里有个权威的 [处理模型(processing model)](http://www.w3.org/TR/resource-timing/#processing-model) 图
显示了这些属性所在的各个不同阶段。备注：`duration` 相当于 `responseEnd - startTime`。

![processing model graphic](http://www.w3.org/TR/resource-timing/resource-timing-overview.png)

如何使用 Resource Timing 的详细信息，可以参考我的文章 [Resource Timing Practical Tips](http://www.stevesouders.com/blog/2014/08/21/resource-timing-practical-tips/) 『[译者的中文翻译](./resource-timing-practical-tips)』


## `duration` 中出乎意外的 blocking 膨胀

出于隐私的考虑，同源资源的 PerformanceResourceTiming 属性是受限的。（备注：
任何资源可以通过 `Timing-Allow-Origin` 响应头达到“同源”效果。）现在大约有一半
的资源是跨域的，因此 `duration` 是度量加载时间的唯一方式。而且即使是同源资源，
`duration` 也是唯一以增量方式提供的属性，大概是因为它度量了最重要的阶段。
这样一来，所有我见过的 Resource Timing 实现都以 `duration` 做为主要的性能指标。

不幸的是，`duration` 比下载时间要大，它包含了阻塞时间（blocking time）—— 浏览器
意识到需要下载一个资源，到这个资源实际被下载直接的时间延迟。阻塞会在几种情况时
发生，最典型的资源数量比 TCP 连接数要多的情况。大多数浏览器为每个主机开放了 6
个 TCP 连接，IE10（8个连接）和 IE11（12个连接）例外。

这个 [Resource Timing 阻塞测试页面](http://stevesouders.com/tests/rt-blocking.php)
有 16 个图片，因此无论哪个浏览器都会阻塞一部分图片。每个图片被编程为在服务器
有 1 秒的延迟，这 16 个图片，每个图片都显示了 `startTime` 和 `duration`。
另外还有这个测试页面在 WebPagetest 中通过 [Chrome](http://www.webpagetest.org/result/141125_4T_11FT/),
[IE10](http://www.webpagetest.org/result/141125_BN_11FY/) 和
[IE11](http://www.webpagetest.org/result/141125_5K_11CB/) 加载的测试结果，
可以通过查看截屏来分析时序结果。注，为什么所有的图片的 `startTime` 大致都相同？
英文这个时间是浏览器解析 IMG 标签并意识到需要下载改资源的时间，由于先下载的图片
阻塞的原因，但在页面出现后，图片的 `duration` 值大约步进 1 秒左右。


## 译者补充

* [SERIOUS CONFUSION with Resource Timing](http://www.stevesouders.com/blog/2014/11/25/serious-confusion-with-resource-timing/) - 原文出处。
