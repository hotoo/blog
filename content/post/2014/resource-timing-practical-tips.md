
# 译：Resource Timing (资源计时) 使用技巧

- template: post.html
- pubdate: 2014-12-30
- tags: HTML5

----

[W3C Web 性能工作组](http://www.w3.org/2010/webperf/) 在 2012 年给我们带来了
[Navigation Timing](http://www.w3.org/TR/navigation-timing/)，这个 API 现在
基本上在主流浏览器上都可用。Navigation Timing 定义了一套用于测量主页面性能的
JavaScript API。例如：

```js
// Navigation Timing
var t = performance.timing,
    pageloadtime = t.loadEventStart - t.navigationStart,
    dns = t.domainLookupEnd - t.domainLookupStart,
    tcp = t.connectEnd - t.connectStart,
    ttfb = t.responseStart - t.navigationStart;
```

能够度量主页面的时间消耗真是太棒了，但是要诊断现实当中的性能问题，往往需要深入
到各个资源当中。所以我们拥有了更进一步的 Resource Timing （资源计时）规范，
这个 JavaScript API 提供类似 Navigation Timing 类似，但是精确到每一个资源的
计时信息。举个例子：

```js
// Resource Timing
var r0 = performance.getEntriesByType("resource")[0],
    loadtime = r0.duration,
    dns = r0.domainLookupEnd - r0.domainLookupStart,
    tcp = r0.connectEnd - r0.connectStart,
    ttfb = r0.responseStart - r0.startTime;
```

到目前为止，Resource Timing 被 Chrome, Chrome for Android, Opera, IE10 和 IE11
浏览器所支持，这可能超过了你的网站 50% 的流量，应该可以提供足够的数据来揭示这些
执行缓慢的资源。

使用 Resource Timing 看似很简单，但是当我写第一个达到生产环境品质的资源计时代码
时，我遇到了许多问题。这里我想分享一些现实当中记录 Resource Timing 指标的实用技巧。


## 1. 使用 `getEntriesByType("resource")` 而不是 `getEntries()`

在使用 Resource Timing 来获取当前页面的资源集合的资源耗时性能对象时，许多 Resource
Timing 示例都是使用 `performance.getEntries()`，这意味着唯一的 resource timing 对象
由该调用进行返回。但是 `getEntries()` 会一并返回潜在的 4 种类型的 timing 对象：
`resource`（资源），`navigation` （导航）, `mark` （标记）, 和 `measure` （测量）。

这并没有造成多大问题，因为目前 `resource` 是大多数网页的唯一类型。
`navigation` 类型是 Navigation Timing 2 的一部分，目前没有被任何浏览器所实现。
`mark` 和 `measure` 类型是从 User Timing 规范衍生出来的，在部分浏览器中可用，
但是还没有被广泛使用。

也就是说，`getEntriesByType("resource")` 以及 `getEntries()` 在今天可能返回相同
的结果，但是可能 `getEntries()` 将很快返回多种性能对象的混合集合，所以最好是
使用 `performance.getEntriesByType("resource")`，你可以明确的只获取 resource
timing 对象。（感谢 Andy Davies 给我解释这一点）

## 译者补充

* [Resource Timing practical tips](http://www.stevesouders.com/blog/2014/08/21/resource-timing-practical-tips/) - 原文出处。
