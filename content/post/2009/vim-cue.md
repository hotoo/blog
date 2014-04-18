
# 让 Vim 支持 cue

- template: post.html
- pubdate: 2009-11-06
- tags: Vim

----

## 自动识别文件类型

在 $VIM/vim72/filetype.vim 中加入以下代码：

```
au BufRead,BufNewFile *.cue setfiletype cue
```

## 语法高亮

下载 [cue.vim](http://hotoo.googlecode.com/svn/trunk/vim/vimfiles/syntax/cue.vim)
放至 `$VIM/vimfiles/syntax/` 目录下。

## 自动补全

如果已安装 [snipMate](http://www.vim.org/scripts/script.php?script_id=2540)。
下载 [cue.snippets](http://hotoo.googlecode.com/svn/trunk/vim/vimfiles/snippets/cue.snippets)
放至 `$VIM/vimfiles/snippets/` 目录下即可。
