
# 译：Resource Timing (资源计时) 使用技巧

- template: post.html
- pubdate: 2014-12-30
- tags: HTML5, 翻译

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

<!--more-->

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
由该调用进行返回。但是 `getEntries()` 会一并返回潜在的 [4 种类型的 timing 对象](http://www.w3.org/wiki/Web_Performance/EntryType)：
`resource`（资源），`navigation` （导航）, `mark` （标记）, 和 `measure` （测量）。

这并没有造成多大问题，因为目前 `resource` 是大多数网页的唯一类型。
`navigation` 类型是 [Navigation Timing 2](http://www.w3.org/TR/navigation-timing-2/) 的一部分，据我所知目前没有被任何浏览器所实现。
`mark` 和 `measure` 类型是从 [User Timing](http://www.w3.org/TR/user-timing/) 规范衍生出来的，在部分浏览器中可用，
但是还没有被广泛使用。

也就是说，`getEntriesByType("resource")` 以及 `getEntries()` 在今天可能返回相同
的结果，但是可能 `getEntries()` 将很快返回多种性能对象的混合集合，所以最好是
使用 `performance.getEntriesByType("resource")`，你可以明确的只获取 resource
timing 对象。（感谢 [Andy Davies](http://calendar.perfplanet.com/2012/an-introduction-to-the-resource-timing-api/) 给我解释这一点）

## 2. 使用 Navigation Timing 测量主页面的请求。

当通过典型的请求获取一个网页的主 HTML 文档，但是这个资源并不能通过
`performance.getEntriesByType("resource")` 得到返回，要得到这个主页面 HTML 文档
的 timing 信息，需要使用 Navigation Timing 对象（`performance.timing`）。

虽然不太可能，当页面上没有其他资源时，这可能会导致错误发生。
例如，刚才 Resource Timing 示例使用如下代码：

```js
performance.getEntriesByType("resource")[0]
```

如果一个页面唯一的资源就是主页面的 HTML 文档，然后 `getEntriesByType("resource")`
返回一个空数组，这时候应用 `element[0]` 会引起 JavaScript 异常。如果你找不到
没有引用子资源的页面，你可以试试 http://fast.stevesouders.com/

## 3. 小心 `secureConnectionStart` 的问题。

[`secureConnectionStart`](http://www.w3.org/TR/resource-timing/#dom-performanceresourcetiming-secureconnectionstart)
属性我们衡量 SSL 协商需要多长时间。这非常重要，我经常
看到 500 毫秒以上的 SSL 协商时间，甚至更多。`secureConnectionStart` 有 3 种
可能的值：

* 如果该属性不可用，则必须设置为 `undefined`。
* 如果不使用 HTTPS 的，则必须设置为 0.
* 如果该属性可用，并且使用了 HTTPS，则必须设置为一个时间戳。

关于 `secureConnectionStart`，有三件事情需要了解下：

首先，在 Internet Explorer 中，`secureConnectionStart` 的值总是 `undefined`，
因为它是不可用的（该值被埋在 [WinINet](http://msdn.microsoft.com/en-us/library/windows/desktop/aa383630(v=vs.85\).aspx) 之下）。

其次，在 Chrome 中有个 BUG 会导致 `secureConnectionStart` 被错误的设置为 0 的问题。
如果获取一个资源时使用预先存在的 HTTPS 连接，则 `secureConnectionStart` 将被设置
为 0，而实际上它应该是一个时间戳。（详情请参考 [bug 404501](https://code.google.com/p/chromium/issues/detail?id=404501) ）
为了避免这个问题，测量 SSL 协商时间时，一定要检查 `secureConnectionStart` 既不是
`undefined` 也不是 `0`：

```js
var r0 = performance.getEntriesByType("resource")[0];
if ( r0.secureConnectionStart ) {
    var ssl = r0.connectEnd - r0.secureConnectionStart;
}
```

第三，规范中关于 [这一行](http://www.w3.org/TR/resource-timing/#dom-performanceresourcetiming-secureconnectionstart)
有一些误导：“...如果当前页面的协议是 HTTPS，这个属性必须立即返回用户代理(user agent)开始握手过程的时间...”
（我的重点）。有可能当前页面是 HTTP，但仍然包含我们需要测量 SSL 协商时间的 HTTPS 资源。
规范应该改为：“...如果资源的协议是 HTTPS 协议，该属性必须立即返回用户代理开始握手过程的时间...”。
幸运的是，浏览器是使用纠正后的行为，而已就是说， `secureConnectionStart` 可用于
HTTP 页面中的 HTTPS 资源。

## 4. 给跨域资源添加 `Timing-Allow-Origin` HTTP 响应头

出于隐私保护的原因，在获得资源的 Resource Timing 详情时有[跨域限制](http://www.w3.org/TR/resource-timing/#cross-origin-resources)。
默认情况下，与主页面不同域的资源，下列属性被设置为 0：

* redirectStart
* redirectEnd
* domainLookupStart
* domainLookupEnd
* connectStart
* connectEnd
* secureConnectionStart
* requestStart
* responseStart

在某些情况下，仍然希望测量跨域资源的性能，例如，当网站使用不用域名的 CDN（例如
"youtube.com" 使用 "s.ytimg.com"），以及某些第三方资源（例如 "ajax.googleapis.com"）。
如果资源返回 [Timing-Allow-Origin](http://www.w3.org/TR/resource-timing/#timing-allow-origin)
响应头，跨域资源的 timing 详情将被授权访问。这个头信息指定了被允许访问 timing
详情的（主页面）来源列表，多数情况下，会使用通配符(`*`) 允许所有来源访问。
举个例子，http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js 返回
的 Timing-Allow-Origin 响应头信息是：

```
Timing-Allow-Origin: *
```

当第三方添加这个响应头信息时，真是太棒了。它允许站长来统计在他们网页上使用的
第三方资源的性能。感谢 [Ilya Grigorik](http://googledevelopers.blogspot.com/2013/12/measuring-network-performance-with.html)
报告了一些添加了这个响应头的第三方资讯，下面是一些指定了 `Timing-Allow-Origin: *`
的资源例子：

* Google Hosted Libraries: http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
* Google+ widgets: https://apis.google.com/js/plusone.js
* Google Fonts:  http://fonts.gstatic.com/s/opensans/v9/DXI[snip...]N3Vs.woff2
* Facebook widgets: http://connect.facebook.net/en_US/all.js
* Disqus widgets: http://go.disqus.com/embed.js

当需要访问有限制的 timing 属性时，决定统计 Resource Timing 是非常重要的。
可以通过检测（上面列出的，secureConnectionStart 除外）限制性属性是否为 0 的方式
来避免限制性问题，我总是使用 `requestStart`。下面是用于在计算详细的性能指标之前，
检测和计算限制性属性是否可用的代码片段：

```js
// Resource Timing
var r0 = performance.getEntriesByType("resource")[0],
    loadtime = r0.duration;
if ( r0.requestStart ) {
    var dns = r0.domainLookupEnd - r0.domainLookupStart,
        tcp = r0.connectEnd - r0.connectStart,
        ttfb = r0.responseStart - r0.startTime;
}
if ( r0.secureConnectionStart ) {
    var ssl = r0.connectEnd - r0.secureConnectionStart;
}
```

做这些检测是非常重要的，否则，当访问这些受限属性时，你不会得到任何异常，除了
这些虚假的数据。当属性受限访问时，它们的值被设置为 0，例如 `domainLookupEnd - domainLookupStart`
翻译成 `0 - 0`，它返回一个似是而非的结果 `0`，而这可能并不是真实 DNS 查询时间。
这将导致过多的指标为 `0` 而让你过于乐观。

## 5. 理解 0 意味着什么。

在第 4 节当中提到，一些因为跨域导致的受限访问的 Resource Timing 属性会被设置为
0。再强调一次，在访问属性详情之前，要检查属性状态是非常重要的。
但是即使受限属性都是可访问的，度量计算的返回结果也有可能是 0，所以理解这意味着
什么非常重要。

例如，（假设没有访问限制）`domainLookupStart` 和 `domainLookupEnd` 的值是两个
时间戳，这两个值之差是该资源在 DNS 解析上耗时。通常情况下，一个页面中指定的域名
只有一个非 0 的 DNS 解析耗时，因为浏览器会缓存 DNS 解析，所有后续的请求都使用
这个缓存的 DNS 解析。而且由于跨页面的 DNS 解析缓存，一个页面所有的 DNS 解析
计算结果可能都是 0。关键点：DNS 解析耗时为 0 意味着资源是从缓存中读取的。

同样，对于指定的主机名，如果重复利用已存在的 TCP 连接，那么建立 TCP 连接（`connectEnd - connectStart`）
的耗时也会是 0。每个主机有大约 6 个独立的 TCP 连接，这表明应该有 6 个非 0 的
TCP 连接测量值，但是这个主机后续的请求将使用已存在的 TCP 连接，并且他们的
TCP 连接耗时为 0。关键点：TCP 连接耗时为 0 意味着重复使用了已存在的 TCP 连接。

这同样适用于计算 SSL 协商（`connectEnd - secureConnectionStart`）。这个可能
有 6 个以上的资源，但是同一主机名的所有的后续请求可能都使用同一个已存在的 HTTPS
连接，以至于它的 SSL 协商时间为 0。

最后，如果属性持续的为 0，这可能意味资源是从缓存中读取的。

## 译者补充

* [Resource Timing practical tips](http://www.stevesouders.com/blog/2014/08/21/resource-timing-practical-tips/) - 原文出处。
