
# 每周异常：第 1 期

- template: post.html
- pubdate: 2013-07-15
- tags: 每周异常

----

2013-07-15 14:00~14:03，来自[北京市时代互联(180.184.99.37)](http://www.ip.cn/?q=180.184.99.37)
的 pc/-1|windows/6.2|firefox/22.0|gecko/20100101 用户向支付宝 katongweb 系统发起
1480次猛烈的总攻，详情如下：

| KEY        | VALUE                                 |
|------------|---------------------------------------|
| Ref        | https://ref.example.com/ref.htm       |
| URL        | https://www.example.com/index.htm     |
| File       | chrome://grabword/content/grabword.js |
| Line       | 0                                     |
| Message    | Script error.                         |
| stacktrace |                                       |

该用户通过 Ref 页面到目标 URL 之后，连续不断的通过 Firefox 插件脚本触发脚本异常。

----

通过最近的几次异常报警来看，由客户端连续发起攻击引起的 JavaScript 异常 PV
非正常波动，对异常监控数据有比较大的影响。

因此考虑以下方案来提升监控数据的稳定有效性：

* 监控 JavaScript 异常 UV(根据 Session)
* 监控 JavaScript 异常独立 IP 数。
* 排除客户端本地脚本引起的异常（多数攻击是由客户端脚本发起）
    * 今日客户端脚本异常率：45.14%
    * 正常情况下客户端脚本异常率：3.45%

----

下图是排除了客户端本地脚本抛出的异常之后的结果：


![2013-07-16 3 14 24](https://f.cloud.github.com/assets/143572/803190/d77e2dea-ede7-11e2-92cb-1717857ecdbc.png)

（当天数据对比，图中圆点是开启过滤客户端本地异常的时间点，下同）

![2013-07-16 3 16 22](https://f.cloud.github.com/assets/143572/803189/d77f22cc-ede7-11e2-9412-25920ec1c4d6.png)

（相近2天数据对比）
