# 带滑块的进度条

- template: post.html
- pubdate: 2018-04-11
- tags: 算法

----

在支付宝钱包，“我的 - 总资产”里面，有一个累计收益的卡片，其中还有一个带滑块的进度条，
显示我的收益对比同地区理财的用户中，处于什么样的一个水平。

![我的 - 总资产 - 累计收益卡片](https://gw.alipayobjects.com/zos/rmsportal/YKAjtnKzJWUpuLWOaMkK.PNG)

这种带滑块的卡片，如果不假思索简单处理，做出的效果就会出现进度 0% 和 100% 时在左右超出顶格，滑块只显示一半。

为了解决这个问题，开发者最早的方案考虑的特别复杂，

## 纯 CSS 实现

http://gitlab.alipay-inc.com/h5_release/wealth/blob/3.6.11/src/index/asset/components/profitRate/index.jsx
http://gitlab.alipay-inc.com/h5_release/wealth/blob/3.6.11/src/index/asset/components/profitRate/index.less

## JS + CSS 的复杂不完美实现


## JS + CSS 的简单完美实现

![算法示意图](https://gw.alipayobjects.com/zos/rmsportal/bvsIRbcSHMcpsyBSnoKc.png)
