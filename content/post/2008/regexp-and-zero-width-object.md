
# 正则表达式拼接和构建零长度对象

- template: post.html
- pubdate: 2008-03-31
- tags: RegExp, Javascript

----

之前在网上收集到一个正则表达式拼接的方法/函数，一直没有注意，直到昨天用 jsdoc
生成 api 文档时才看到。
心里想这样的方法实际应用中大概没什么意义，但是出于好奇就拿出来玩了一下，
这一玩不要紧啊，这么精炼的东西差点成垃圾。

可能是网络编辑器的原因，原始代码有bug，经过修正和测试，现在的代码如下：代码I

```javascript
/**
 * 连接两个正则表达式。
 * 题外话：获得字符串常量""的长度，比构建空数组再求其长度效率高（忽略构建过程，求长度消耗时间相同）。
 * @param {RegExp} r 指定被连接的正则表达式对象。
 * @param {String} p 连接后的表达式使用的选项，由"i","g","m"组合而成。
 * @return {RegExp} 返回连接后的正则表达式。
 */
RegExp.prototype.concat = function(r, p){
  var i=(this.source.match(/\((?!\?:)/g) || "").length; // 正向预搜索。
  return new RegExp(this.source+r.source.replace(/\\(\d)/g, function($0, $1){
    return "\\" + (i+($1 | 0)); // 修正第二个表达式中的反向引用。注意这里的位运算。
  }), p);
};
```

原方法名是contact，现在为了和字符串类的一致，换为concat，至于bug/不足这里不做解读。
这个实际应用意义不大的小程式却有值得称道的几点：

* 正向预搜索匹配第一个表达式里左括号（不包括非捕获组(?:)）的个数。
* 当第一个表达式没有匹配时返回 0 长度对象（再求其长度），
  可以构建空数组（[]）和空字符串（""），这里使用空字符串，理由下面再解释。
* 修正反向引用时用的位运算（），这里将匹配到的数值字符串与0位或没有其他意义，
  只是将数值字符串转型为数值，相当于 `parseInt()` 函数。

下面介绍为什么使用空字符串而不是空数组构建0长度对象。代码II

```javascript
var I = 10000;

var d = new Date();
for (var i=0; i<I; i++){
"".length;
}
d = new Date()-d;

var d2 = new Date();
for (var i=0; i<I; i++){
[].length;
}
d2 = new Date()-d2;

document.write(d+":"+d2);
```

一万次循环叠加可以发现构建空字符串比构建空数组求长度快1到3倍。

再将代码改为：代码III

```javascript
var I = 10000;
var s="";
var d = new Date();
for (var i=0; i<I; i++){
s.length;
}
d = new Date()-d;

var a=[];
var d2 = new Date();
for (var i=0; i<I; i++){
a.length;
}
d2 = new Date()-d2;

document.write(d+":"+d2);
```

可以发现，求空字符串长度与空数组长度的过程效率相当。可见，代码 II 处空数组效率
多余的消耗主要在构建空数组对象上。
