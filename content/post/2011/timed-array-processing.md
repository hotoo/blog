
# JavaScript 分时加载

- template: post.html
- pubdate: 2011-03-01
- tags: JavaScript, UED

----


使用原始数据（非副本）和索引访问（非shift()），在IE中性能大幅度提高，
其他浏览器对 concat()，尤其是 shift() 方法进行了优化，性能差别不大。

分时算法对于需要及时更新 UI 的情况非常有效，但是实际上分时算法性能非常不好
（当然分时算法追求的不是这个），不适合作为巨量数据的实时处理。

譬如说在树形控件中，原始数据提供了一个巨大的数组数据：

```js
var datas = [
    {id:"1", pid:"0", text:"Node 1"},
    {id:"2", pid:"0", text:"Node 2"},
    //...
];
```

我的处理方式是先将这份数据遍历一次，用 HashMap 进行缓存索引，便于后续的操作
更加快捷。但是这个遍历本身是非常耗时的，虽然它不产生界面变化，但同样会将页面
卡死。为了提高界面响应速度，我们会想到使用分时计算方式，不过这种方式会延长
缓存索引的过程变的更久，导致后续创建节点的操作无法及时执行，也就无法更新界面，
界面虽然可以操作，但是没什么可操作的（对于以树本身为主的页面来说）。

后来的做法是，根据树的实时装载能力（目前是十万个节点。经过缓存索引的数据，
跟节点层级深度无关）和实际应用作出判断，对于在超出浏览器处理能力的，使用异步
装载方式；处理能力以内的，不做要求。

## 延伸阅读

1. http://lifesinger.googlecode.com/svn/trunk/lab/2009/array-processing.html
1. [【优化】分时加载](http://www.cnblogs.com/bluedream2009/archive/2010/03/16/1687095.html) - Cauma
1. http://www.nczonline.net/blog/2009/08/11/timed-array-processing-in-javascript/
