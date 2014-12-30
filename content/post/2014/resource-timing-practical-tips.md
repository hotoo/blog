
# 译：Resource Timing (资源计时) 使用技巧

- template: post.html
- pubdate: 2014-12-30
- tags: HTML5

----

W3C Web 性能工作组在 2012 年给我们带来了 Navigation Timing，这个 API 现在基本上
在主流浏览器上都可用。Navigation Timing 定义了一套用于测量主页面性能的
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
时，我遇到了许多问题。这里我想分享一些现实当中记录资源计时指标的实用技巧。
