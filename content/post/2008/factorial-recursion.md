
# 阶乘(factorial) & 尾递归(Tail Recursion)

- template: post.html
- pubdate: 2008-04-08
- tags: 算法

----

今天看了dennis的《[用递归计算阶乘咋不行呢？](http://www.blogjava.net/killme2008/archive/2008/03/18/187071.html)》
受益良多，这里做下小结。

传统的递归算法写起来很漂亮，代码很简洁，但是每递归一次就需要更深一层的堆栈支持，
可能会造成内存溢出而失败，所以递归和goto语句一样声名狼藉。

> 甚至《代码大全》的作者有这样一句话：如果为我工作的程序员用递归去计算阶乘，那么我宁愿换人。
> 作者对递归的态度相当谨慎，这在静态命令式语言中显然是正确的，但是在函数式语言中，
> 由于有尾递归优化的存在，递归反而是最自然的形式，况且我打心里认为递归更符合人类思维。
> (by dennis)


尾递归就是从最后开始计算，每递归一次就算出相应的结果，
也就是说，函数调用出现在调用者函数的尾部，因为是尾部，
所以根本没有必要去保存任何局部变量，直接让被调用的函数返回时越过调用者，
返回到调用者的调用者去。举例说明。

线性递归（传统递归方式）：

```javascript
function recursion(n){
    return n==1?1:n*recursion(n-1);
}
```

尾递归：

```javascript
function tailRecursion(n, a){
    a = a||1; // 尾递归之尾，即上次递归结果。
    return n==1?a:tailRecursion(n-1, a*n);
}
```

这里将基于尾递归的求数值阶乘算法贴下：

```javascript
Math.factorial_III = function(n){
    var a = arguments[1]||1;
    return n<=1?a:Math.factorial_III(n-1, a*n);
};
```

效率上和循环迭代、[阶乘改进算法](http://blog.xianyun.org/2007/12/26/improved-factorial/)
相当甚至稍胜出（ie6,firefox2,safari3），普通递归的效率最为底下，且需要深入堆栈。

# 参考

* 《[尾递归](http://baike.baidu.com/view/1439396.htm)》-百度百科
* 《[用递归计算阶乘咋不行呢？](http://www.blogjava.net/killme2008/archive/2008/03/18/187071.html)》-dennis
