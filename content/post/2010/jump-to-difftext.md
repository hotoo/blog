
# Diff 模式下，让光标直接跳转到被修改的文本处

- template: post.html
- pubdate: 2010-08-30
- tags: Vim

----


Vim 的 Diff 功能非常优秀。有一个我非常喜欢的特性是：完全相同的地方，
会被折叠隐藏起来(上下文除外)。还可以很方便的在各个差异点之间做出修改合并和快速跳转。

不过默认的 `[c` 和 `]c` 两种跳转方式，目前只能跳转到差异点的行首。对于只修改了
行内部分文本内容（一般底色是浅红色）时，我更希望直接跳转到有变化的文本（底色是
深红色的部分）上。

感谢 tocer ，我初步实现了两个版本 [gits:556810](http://gist.github.com/556810)

1. v1: 仅支持跳转到 DiffChange 的第一个 DiffText
1. v2: 支持 DiffChange 行多个 DiffText

## 参考

1. `:h synIDattr`
1. `:h diff_hlID`
1. [@twitter](https://twitter.com/hotoo/status/22227282177)
1. [vimdiff 的跳转](http://groups.google.com/group/vim-cn/browse_thread/thread/8a0b5b7ed335782b)
1. [vimdiff: Jump to next difference inside line?](http://superuser.com/questions/145940/vimdiff-jump-to-next-difference-inside-line)
