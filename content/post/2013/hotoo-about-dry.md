
# 糊说 DRY

- template: post.html
- pubdate: 2013-05-15
- status: draft

----

[lifesinger/lifesinger.github.com#152](https://github.com/lifesinger/lifesinger.github.com/issues/152)


1. jQuery 是 All-in-One 非内聚的
2. lifesinger/lifesinger.github.com#152 里说到的 YUI 要依赖太多模块的问题，
    根本不是问题。这个应该由工具自动管理依赖和打包，人无需钻进去纠结。
3. lifesinger/lifesinger.github.com#158 里玉伯提到的自然法则，在这里也适用。
    人自然的进行编码，自然的使用依赖。

如果已有简单可靠的方案在模块中够用，我赞同内置在模块中，比如 isString 之类。
但我还是觉得依赖可靠的独立模块是毫无问题而且理所当然的。『高内聚、低耦合』也是有待商榷的，或者我们理解的有差异。

我理解的『高内聚、低耦合』：单个模块是高内聚的；非这个模块要做的事情不要放置在这个模块中，降低或解除这样耦合。
