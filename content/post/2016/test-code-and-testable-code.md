
# 测试代码和可测试代码

- template: post.html
- pubdate: 2016-06-04
- tags: Code

----

项目中有一个要将指定时间和当前时间比较，计算相对时间的逻辑（比如显示 `3 分钟前`），
由于当前时间和执行测试用例的时机有关，每次执行用例都会不同，如何让这个代码可测试呢？
有些人可能想到 Mock 当前时间，测试的时候让当前时间凝固，于是有了如下代码：

```js
// 实际业务代码中：
// 虽然本来只需要 moment() 就可以了，但是为了方便测试，传入了一个可 Mock 的 Date.now
const now = moment(Date.now());

// 测试用例中，Mock Date.now 方法：
mm(Date, 'now', () => 1464969293129);
```

这个业务代码是 **可测试** 的代码吗？我认为不是。

<!--more-->

这个业务代码为了测试，使用了一个不必要的方法，而且让测试代码和业务逻辑相互依赖，
一旦业务代码重构，测试代码将不可测试。这个代码是为测试写的，称之为 **测试** 代码
而不是 **可测试** 代码更合适点。

再举一个例子，还是时间相关的动态数据输入问题：

项目中有一个今日收益更新的提醒消息，只有是今天的更新才显示，所以第一直觉应该是造一个
收益更新时间是今天的测试数据，而不是造一个固定的数据（可能固定测试数据比较偷懒方便），
然后篡改业务逻辑中当前时间的计算。

```js
// 业务代码正常该怎么写怎么写，不用管测试怎么活。
const today = moment().format('YYYYMMDD');
if (data.updateDate === today) {
  // show message.
}

// 活的测试数据
data.updateDate = moment().format('YYYYMMDD');
```

> 测试代码应该只关注正常的数据输入和输出 _（即使输入、输出是难以预测的）_。
>
> 而不应该关注业务实现逻辑，试图篡改业务代码，让测试可以进行。

更好一点的可测试代码，可以将当前时间传入以便让输入、输出可以预测：

```js
// 业务抽象
// 计算两个时间差，格式化为 `3 分钟前` 等相对时间。
// @param {Date|Number} date1 较早的时间或时间戳。
// @param {Date|Number} date2 较晚的时间或时间戳，默认当前时间。
// @return {String} 相对时间差
function dateDiff(date1, date2 = Date.now()) {
  // ...
}

// 业务调用
dateDiff(data.datetime);

// 测试代码
assert(dateDiff(new Date(2016,0,1,0,0,0,0), new Date(2016,0,1,0,0,0,10)) === '刚刚');
assert(dateDiff(new Date(2016,0,1,0,0,0,0), new Date(2016,0,1,0,3,0,0)) === '3 分钟前');
assert(dateDiff(new Date(2016,0,1,0,0,0,0), new Date(2016,0,1,1,0,0,0)) === '1 小时前');
```

## 2017-02-09 更新

群里又有了类似的一个案例，开发想写测试用例来测 location.href 的赋值是否正确，
用以测试页面跳转逻辑是否正确。于是想通过重载 location 对象来监听给 location.href
赋值时，所赋值是否符合期望。

还辛苦找到 [Chrome 出了个小 bug：论如何在 Chrome 下劫持原生只读对象](https://zhuanlan.zhihu.com/p/24342684)
这么牛逼变态到令人折服的方法。但是，这是正确的方法吗？我认为不是。

location 的案例中，我觉得应该是测试赋值给 location.href 的 **值**本身是否正确，
而不是测试企图篡改 location 来监听 href 属性是否正确。即：

```js
// 业务代码
function getUrl(){}
location.href = getUrl(...args);
```

单元测试用例只需要测试 getUrl 在各种边界输入条件下，输出是否符合期望就可以了。
