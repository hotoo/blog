
# 说说渐进加载

- template: post.html
- pubdate: 2011-07-08
- tags: UED, 算法

----


1. google+, quora, twitter... 这些网站都使用渐进加载数据的方式，
类似的还有淘宝图片的懒加载，都是等用户真正滚到最后之后才开始去加载，
提前一些预加载体验不是更好么。

2. 到最后一页了还是有“更多”，直到点击最后一个更多没加载到数据才告诉用户
没更多数据了，这不是蛋疼么？

估计是基于算法上的考虑，比如每页 10 条：

```js
dataList = select top 10 * from table where id > 10 * page;
for(var i=0,l=dataList.length; i<l; i++){}
hasMore = select top 1 * from table where id > 10*(page+1);
```

这样要查询 2 次。

不过只查数据库一次也是可以的：

```
datas = select top 11 * from table where id > 10*page;
for(var i=0,l=min(data.length, 10); i<l; i++){}
hasMore = datas.length == 11;
```

好久不写后端程序，不知道他们这么做是否有基于其他的考虑？

p.s. Google+ 个笨蛋居然剔除行首的有效空白，而不剔除行尾的无效空白。。。

## See Also

* [@Google+](https://plus.google.com/108314985261981078822/posts/WrYSxHJnDXW)
