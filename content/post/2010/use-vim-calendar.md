
# 使用 calendar.vim

- template: post.html
- pubdate: 2010-07-23
- tags: Vim, Calendar

----


最初看到明城 [推荐使用 Vim Calendar 插件](http://www.gracecode.com/archives/674/)，
于是很小白的尝试了一下，然后就没有了然后。

最初尝试的过程已经基本忘记，恍惚记得在 Calendar 的日期上回车，窗户貌似在右侧窗口
打开的（后来发现我记错了，这是 Vimwiki-diary的支持）；至于明城推荐设置的 `ca`
快捷键，后来才知道是与 text-object 冲突的。

再后来就用上了 Vimwiki，做个人 Wiki 之余，还用它的 diary 写日记。总体来说，Vimwiki
的 diary 是比较强大的，我甚至还提了几个被接受的建议。

但是随着使用的深入，发现通常 Wiki 项目下是不需要 diary 的，而 diary 也基本不需要
Wiki，把这两种整合在一起也许就是个错误。我们真正需要的是一个更强的 Calendar diary，
而不是 Wiki 附加的 diary 支持。

如果真的希望 Vimwiki 有 diary 的支持，我也希望这个 diary 和 Wiki 是相互独立的，
Wiki 项目中无需 diary，diary 无需包含在每个 Wiki 项目里。

另外基于 Wiki 的原因，所有的 diary-wiki 文件都放在同一个目录下，当 diary 日渐增多，
目录变得臃肿起来也不是什么好事。

我需要的是一个更强的 Vim Calendar。基于这个想法，我便尝试着手增强 Calendar。
目前已经支持 `:CalendarSearch` 和更好的 diary 打开方式。更多的想法见
[这里](http://github.com/hotoo/calendar-vim/blob/master/TODO)。
