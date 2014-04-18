
# 在 Vim 页签中打开文件

- template: post.html
- pubdate: 2010-06-25
- tags: Vim

----


这两天折腾让文件在 Vim 的新页签中打开（类似 Firefox 等浏览器）的特性，
发现让文件在页签中打开有非常多的优点：

1. 打开文件的速度更快（免去了启动 Vim 的时间）
1. 占用内存等资源更少（单个 Vim 窗口比多个窗口节省资源）
1. 任务栏更节省可用空间（不过 Windows 7 中还未支持任务栏多页签内容预览）。
1. 编辑过程中文件间可以快速跳转，缓冲区也可以共享。

我参考前辈的方案，做了更 [自动化的处理脚本](http://github.com/hotoo/Edit-with-Vim-tabs)，
将其中的 edit.with.vim.tabs.reg 合并到注册表就可以了。如果想还原为用窗口打开的方式，
再将 edit.with.vim.window.reg 合并到注册表中。

这个设置会让双击默认编辑器为 Vim 的文件，或者右键 -> Edit with Vim 都将文件在页签中
打开。开始用着确实挺爽，右键菜单中也没有了那些动态增加进来的已打开的文件的菜单项。
不过后来又发现不止如此，连“用 Vim 比较”(Diff with Vim)的项也没了。

重装了好几次，终于搞清楚了一些东西。注册表的

    [HKEY_CLASSES_ROOT\*\shellex\ContextMenuHandlers\gvim]
    @="{51EEE242-AD87-11d3-9C1E-0090278BBD99}"

是关键项，他根据 gvimext.dll 来附加右键菜单的动态项，包括 Diff with Vim。
如果你不想有默认的新窗口中打开文件的“用 Vim 编辑 (&V)”(Edit with Vim)，
就需要把上面这项删除，不过这也会殃及 Diff with Vim。

我实在没有特别好的办法，我在注册表中做了一个 "Diff with Vim" 的项，但是这个菜单命令
会针对选中的多个文件各自执行一次；而不是执行一次，并将多个选中的文件作为参数
一次传入。这个肯定也能做到的，参看 Vim 默认的行为，和 WinMerge 等就知道，只求高手来帮忙了。

我目前不希望没有这个选中多个文件并 Diff 的功能（虽然它连快捷键都没有），
所以只好保留了这个注册表项，为了避免快捷键冲突，只好修改了在页签中打开文件的
注册表项的快捷键。

或者用其他的文本比较工具，如 WinMerge，BeyondCompare。这样的话，直接删除上面的注册表项。

如果你有好主意，快来快来告诉我 : )

## 其他
另外给页签加上序号是非常有用的：

    set guitablabel=%N.%t


尤其是在设置了这样的快捷键之后：

    imap <C-tab> :tabnext<cr>
    nmap <C-tab> :tabnext<cr>
    imap <C-S-tab> :tabprevious<cr>
    nmap <C-S-tab> :tabprevious<cr>
    imap <M-1> <Esc>:tabfirst<cr>
    nmap <M-1> :tabfirst<cr>
    imap <M-2> <Esc>2gt
    nmap <M-2> 2gt
    imap <M-3> <Esc>3gt
    nmap <M-3> 3gt
    imap <M-4> <Esc>4gt
    nmap <M-4> 4gt
    imap <M-5> <Esc>5gt
    nmap <M-5> 5gt
    imap <M-6> <Esc>6gt
    nmap <M-6> 6gt
    imap <M-7> <Esc>7gt
    nmap <M-7> 7gt
    imap <M-8> <Esc>8gt
    nmap <M-8> 8gt
    imap <M-9> <Esc>9gt
    nmap <M-9> 9gt
    imap <M-0> <Esc>:tablast<cr>
    nmap <M-0> :tablast<cr>

更多，但是不推荐(因为跟默认快捷键冲突)的快捷键设置：

    " [CONFLICT] back tag history
    imap <C-t> <Esc>:tabnew<cr>
    nmap <C-t> :tabnew<cr>
    " [CONFLICT] window shortcut key.
    imap <C-w> <Esc>:tabclose<cr>
    nmap <C-w> :tableclose<cr>
    imap <C-S-w> <Esc>:tabonly<cr>
    nmap <C-S-w> :tabonly<cr>

## 更新 (2010/6/26)

今天想折腾一下 gvimext.dll ，因为这个是问题的本源，只要将它里面的“用 Vim 编辑”(Edit with Vim)加上参数，
改成新页签中打开的方式就好了，而且选中多个文件进行比较，好像也必须使用动态连接库的方式实现，
于是找到了这个 [gvimext.dll](http://www.vim.org/scripts/script.php?script_id=1720)
它让 Vim 7 支持新页签中打开。试用了一下，感觉有点啰嗦了，它让新窗口和新页签打开文件的方式共存，并且快捷键
仍然设置在新窗口打开的菜单项上。不过里面带有源码，我们可以改成自己喜欢的方式。

## 参考链接

* [Vimfaq - Ubuntu 中文](http://wiki.ubuntu.org.cn/index.php?title=Vimfaq&amp;variant=zh-cn)
* [vi/vim使用技巧: 在标签页中打开文件 (windows)](http://easwy.com/blog/archives/vim-tips-windows-open-file-in-tab/)
* [如何通过使用注册项 (.reg) 文件添加、修改或删除注册表子项和值](http://support.microsoft.com/kb/310516/zh-cn)
* [Context menu issues with gVim in Windows 7 x64](http://davidvielmetter.com/?p=1094)
* [Add open-in-tabs context menu for Windows](http://vim.wikia.com/wiki/Add_open-in-tabs_context_menu_for_Windows)
* [Show tab number in your tab line](http://vim.wikia.com/wiki/Show_tab_number_in_your_tab_line)
* [为gVim Portable添加右键菜单](http://hi.baidu.com/mimimo/blog/item/e742243f3fe865e755e72351.html)
* [Vim 的标签页功能](http://liyanrui.is-programmer.com/posts/1857.html)
