
# 非递归遍历 DOM 结构

- template: post.html
- pubdate: 2011-07-10
- tags: JavaScript, 算法

----


上次在Google+ 上说 [实现了非递归遍历 DOM 结构](https://plus.google.com/108314985261981078822/posts/ithY3w7tEWR)，
有朋友想让分享，我当然很高兴，但是很遗憾这本身没有什么值得分享的，大致如下，
给大家随便看一下：

常见的递归方式遍历方式，下面是 Douglas Crockford 写的递归实现：

```js
function walkTheDOM (node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walkTheDOM(node, func);
        node = node.nextSibling;
    }
}
```

然后有人自称写出了更快的遍历 DOM 方式。

```js
var elems = document.getElementsByTagName("*");
for(var i=0,l=elems.length; i<l; i++){
    handler(elems[i]);
}
```

最初找到有详细对照的文章地址没有找到，这个是
[类似的一篇](http://geekswithblogs.net/mparsons/archive/2006/03/02/71175.aspx)，
而且也是非递归式的。

确实是很快的，但只是快还是不够的，这个实现有很多弊端：

1.  注释等元素未必会被遍历。
2.  树形数据结构被整理成了平板结构，无法实现遍历过程的 in/out 处理。

然后今天的主角隆重登场：

```js
function walk(node, enter, leave){
    var tmp, n=node;
    label:
    do{
        enter(n);
        if(tmp = firstNode(node)){ // firstChild(HTMLElement)
            n = tmp;
        }else if(tmp = nextNode(n)){ // nextSibling(HTMLElement)
            n = tmp;
        }else if(n.parentNode){
            do{
                n = n.parentNode;
                leave(n);
                if(n == node){break label;}
                if(tmp = nextNode(n)){
                    n = tmp;
                    continue label;
                }
            }while(node);
        }else{
            break;
        }
    }while(n && n!=node);
}
```

上面只是一个精简版，实际过程中还需要考虑节点类型的问题，一般会过滤
1:HTMLElement, 8:Comment, 9:Document Type, 10:DocType 之外的节点。

其实也不过如此嘛，飘过~~

## See Also

* [W3C DOM -Introduction - ppk](http://www.quirksmode.org/dom/intro.html)
