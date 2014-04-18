
# Vim 中文帮助文档

- template: post.html
- pubdate: 2010-03-15
- tags: Vim

----


前两天不知道为什么，帮助文档又跑会英文了（隐约是用 Vimball 安装了 Vimwiki
或者 *重复*安装了 TwitVim 的缘故）。

    :set helplang=cn

无效。

    let helptags=$VIM.'\vimfiles\doc'

亦无效。

很早以前不知道从哪里抄来的这个：

    cp -R doc $VIM.'\vimfiles\doc\'

从一开始就是报错的，一直被注释，从未被启用。

在注册表中找到两个相关的项：

    HKEY_CLASSES_ROOT\TypeLib\{0F0BFAE0-4C90-11D1-82D7-0004AC368519}\1.1\HELPDIR
    (默认)    d:\Vim\vim72

将默认值修改为：

    d:\Vim\vimfiles

或：

    d:\Vim\vimfiles\doc

重启系统，均无效。

另一个注册表项的路径是正确的，无需改变：

    HKEY_LOCAL_MACHINE\SOFTWARE\Classes\TypeLib\{0F0BFAE0-4C90-11D1-82D7-0004AC368519}\1.1\HELPDIR
    (默认值)    d:\Vim\vimfiles\doc


万般无奈，只好重装了中文文档。

中文文档可以从 [vimCdoc.sf.net](http://vimcdoc.sourceforge.net/) 下载，也可以从
[vimdoc.sf.net](http://vimdoc.sourceforge.net/) 找到链接，下载回来的是一个 .exe
可执行安装文件，研究了下安装过程：

1. 前面都是在抽取中文文档文件(.cnx)，并放至合适的位置：(如 D:\Vim\vim72\..\vimfiles\doc)
1. 抽取 tags-cn 并输出到文档同一目录 D:\Vim\vim72\..\vimfiles\doc
1. 抽取 help_cn.vim 输出到 D:\Vim\vim72\..\vimfiles\syntax
1. 抽取 vimcdoc.vim 输出到 D:\Vim\vim72\..\vimfiles\plugin
1. 抽取 README,INSTALL,LICENSE,AUTHORS,guides.txt 到 C:\Program Files\vimcdoc

其中设置 Vim 帮助的默认语言的步骤，即是在 vimcdoc.vim 中，因为 plugin 比 vimrc
加载要晚([参考](http://forum.ubuntu.org.cn/viewtopic.php?f=68&t=190529))，
所以在 vimrc 中的设置会被 vimcdoc.vim 覆盖掉。
