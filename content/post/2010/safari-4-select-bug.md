
# 发现 Safari4 的 select 控件 bug

- template: post.html
- pubdate: 2010-01-05
- tags: Browser, BUG

----


昨天看了新的[淘宝首页](http://www.taobao.com/)，非常赞，有不少模仿/参考Yahoo 的成分。

当时用的Safari 4 Public Beta (528.16)（后来用同事的Safari 4.0.2 (530.19.1)也一样），偶然点到预订机票的页签，随便点了几下选择框(<select>)，2月，28天，正常；3月，28天？；4 月，28天！…

![](http://farm3.static.flickr.com/2659/4246970340_ee2cabeefc_o.png)

[Safari 4 select bug(Windows)](http://www.flickr.com/photos/hotoo/4246970340/)

另外在IE 7, FF3.5, Chrome 4, Opera 10上测试却都是正常的。

源码很易读，逻辑上没有什么问题，几点建议：

    * 清空选项框建议使用遍历并 `selDay.remove(0);`；
        （一时忘记在什么情况下 `selDay.options.length = 0;` 会有问题了）
    * 在创建好 Option 对象之后再 `selMonth.options[month].selected = true;` 和
        `selDay.options[day-startDay].selected = true;` 就可以了，无需在循环时一一判断；
   * 另外关于转换不存在的日期（如2月31日）时，在这里其实没有什么用处的，
        转出来的日期基本也不会是用户期望的日期（用户期望是2月某日，却跑到了3月），
        遇到这种情况，变成2月1日或2月28日就可以了，而无需给出任何（讨厌的alert）提示。

这都不是造成这个bug的原因，打印各个关键的运行时变量值都是正常的，但在界面是就是没有显示出来。

今天 5 号，把昨天没有确定（是当时机器，或者当时浏览器）的问题拿出来再看，
发现2,3,4…月都只有27天了，这个值与第一次产生的 `options.length`相等。
注释掉 519: `//startDay = now.getDate();` ，让 <select> 最初长度为31，
再转到2月，发现最后多了好几个不能点击的可见选项，此时浏览器也经常性崩溃。

这应该是渲染引擎的问题，而针对 IE 激活重新渲染的代码也无效：

    function reflow(){
        var b = document.body;
        //b.style.zoom = b.style.zoom=="1"?"100%":"1";
        //b.style.zoom = 1.1;
        //b.style.zoom = '';
        b.style.display = "none";
        b.style.display = "";
    }

但是淘宝紧邻预订机票左侧页签的“游戏快冲”却没有这个问题，于是怀疑是跟 Option 的个数有关。

经过更多的实验分析， *结论* 是超出24个 Option 之后的选项，渲染就会出问题，
而恰巧? Safari 4 默认最大下拉长度也是24个。
