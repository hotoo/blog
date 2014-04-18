
# 让 Vim 支持 LOG 文件

- template: post.html
- pubdate: 2010-05-13
- tags: Vim, .LOG

----


日志(.LOG)文件的基本上无章可循，各成风格。所以一般都是在纯文本模式下查看。
以普通文本的方式显示日志，基本没有清晰度和阅读舒适感。

不过一般来说，日志中是会有日期时间（格式非常多样），错误产生的地址，行号，
列号，日志类型（错误(ERROR)，信息(INFO)，调试(DEBUG)，警告(WARN)等）

据此，我为 .LOG 文件定义了一些语法着色的规则，将
[log.vim](http://hotoo.googlecode.com/svn/trunk/vim/vimfiles/syntax/log.vim)
放至 `$VIM\vimfiles\syntax`(Windows) 目录，并在 `$VIM\vim72\filetype.vim` 中加入：

```
au BufNewFile,BufRead *.log         setf log
```

现在就可以在 Vim 中较清晰的查看 .LOG 日志了。

![](http://farm5.static.flickr.com/4051/4623711702_81901313f9_o.jpg)

你也可以针对自己的实际情况，来自定义语法。
