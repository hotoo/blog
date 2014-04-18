
# 笔试后双方最好能当面讨论题解

- template: post.html
- pubdate: 2009-03-26
- tags: Web Design

----

最近有好几次进阿里集团的笔试经验，有一个小体会：笔试后招聘方和应聘方最好能一起交流讨论题解
（记得学校考试的时候，对题目有疑问时可以举手提问，老师也有出错题的时候，但是考场上发现后会立即处理。
不过由于笔试时间短，出现意外再改的话时间会很仓促，所以建议在笔试后讨论，题可以先按照“常理”解答）。

前两次分别在 [淘宝UED](http://ued.taobao.com/) 和 [阿里妈妈](http://www.alimama.com/)
的笔试题里，有一道很相似的题：给数值对象（Number）扩展一个原型方法，
将数值格式化为指定长度的字符串（另外还有一个条件，淘宝UED给的是“能指定格式最好”，
阿里妈妈则是“能指定进制最好”）。

淘宝UED：
想到数值可能是小数，但题目没有知道小数保留长度等条件，这里只考虑整数位。

```js
Number.prototype.format = function(len, format){
  var a=this.toString().split("."), l=a[0].length;
  if(l>=len) return a.join(".");
  return new Array(len-l+1).join("0")+a[0] + (a[1]?"."+a[1]:"");
};
```

阿里妈妈：
同样有小数问题，而且小数转进制的话也有特殊的地方，这里忽略小数。

```js
Number.prototype.format = function(len, dem){
  var s = this.toString(dem), l=s.length;
  if(l>=len) return s;
  return new Array(l-len+1).join("0") + s;
};
```

好在两个部门笔试后都有相关讨论，对这一问题做了及时的初步探讨。

今天又去参加了 [阿里巴巴](http://china.alibaba.com/) 的笔试，这次的题没有重复的，
但是也有一个问题压轴题。

大意是用CSS控制3个DIV，布局如下图（图是随手画的，不计较大小比例）：

![图](http://3.bp.blogspot.com/_POl6bUDELqY/ScpP_IbKQOI/AAAAAAAAH94/2CpARReFJww/s320/Alibaba-CSS.jpg)

当时解答的时候，在我看来，似乎是只给3个兄弟关系的div，没有辅助标记，让写css控制布局。

css虽不是我所最擅长，但是这个布局还是可以做出来的，但是难点只在于不使用辅助标记，哪怕是div。
当时我的解法如下（这里是调试后正确的代码，当时思想相同，但代码没有写完整，也没有经过调试验证）：

```css
#box0{border:1px solid #f00;width:200px;height:400px;margin-bottom:10px;}
#box1{border:1px solid #0f0;width:200px;height:250px;}
#box2{border:1px solid #00f;width:600px;height:650px;position:relative;top:-664px;left:210px;}
```

```html
<div id="box0"></div>
<div id="box1"></div>
<div id="box2"></div>
```

虽然效果基本相同，而且没有使用辅助标签，但总觉得有点ugly，因为这里的区域尺寸都是固定像素的，
所以较好控制，当遇到未知高度时，#box2的top就不知道要设置为多少了，还是加一个辅助标签简单灵活。

如果可以使用辅助标记，我的题解如下：

```css
#box{float:left;width:200px;border:0px solid #000;}
#space0{width:200px;height:400px;border:1px solid #f00;margin-bottom:10px;}
#space1{width:200px;height:250px;border:1px solid #0f0;}
#space2{width:600px;height:650px;float:left;border:1px solid #00f;margin-left:10px;}
```

```html
<div id="box">
  <div id="space0"></div>
  <div id="space1"></div>
</div>
<div id="space2"></div>
```

还有一个问题是，因为有边框和间隔的关系，左右两个区域是无法上下对齐的。
另外实际应用中还要考虑到清除浮动，父级元素等情况。

当时有想过打破（可能是自己臆想的）规则，用辅助div实现，但是由于尝试在规则之中实现，
结果用了过多的时间，还答的一塌糊涂。

由于这次有多人一同笔试，而且时间很晚（预约18:30分），无法安排讨论，我对这道题也耿耿于怀，
回来请教我那 [牛逼的朋友](http://www.hxblog.net/)，第一选择也是使用辅助div。
不知道阿里巴巴这道题的作者是怎么想的，难道是故意的？
