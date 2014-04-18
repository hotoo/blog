
# Vimlike.js

- template: post.html
- pubdate: 2011-07-08
- tags: JavaScript, Vim

----


很久之前做了一个 [Vimlike 的 HTML(5) Slide](https://github.com/hotoo/Vimlide)，
很小的一个玩意，但是很好玩。里面支持 normal, search, command, help 等模式，
最初是每个单独自己 Copy 的一份，然后精简成各个模式自己需要的键映射。

一直想把这个 Vimlike 的键映射部分抽象提取处理，前段时间 Google+ 出来的时候，
看到 mattn 做的一个用来
[支持 +, c, s ... 等快捷键的 user-script](https://github.com/mattn/GooglePlusCommander)，
我就立即提议实现 gg, G, gh, gp, gP 这些键盘映射，并把这个 Vimlike 键映射抽取好了。

抽取的过程基本还顺利，只遇到一点点小问题，另外还做了些优化。

之前为了避免无映射的键 push 到 history 中造成无法正确触发键映射的问题
（比如只映射了 `<Esc>` 键，其他的 abc 之类的键会 push 到 histroy 中，
尝试对应的映射是找不到的，后续的键就无法触发了），采用优先触发当前键事件的方式。

仔细想了想，优先考虑当前 key 是不合理的，比如同时映射了 j 和 gj，
由于优先原则的干扰，造成 gj 永远都不会被触发。

接着以为针对 `<Esc>`, `<CR>`, `<Tab>` 等键特殊处理，遇到这种键直接触发，
不放到 history 中就差不多可以了。

继续深入思考，仍然不够，其实完整的 Vim-like 如果要支持 mark, g+, z+, \+,
等一系列的扩展支持，都需要有内置支持，否则就是需要类似
map("m[a-zA-Z0-9]", function(){}) 这样的模糊映射支持了。

实现增强版的内置扩展键支持，还是实现模糊映射支持，这是个问题？

## See Also

* [Vimlike.js@github](https://github.com/hotoo/Vimlike.js),
    [Demo](http://hotoo.me/Vimlike.js/Vimlike.html)
