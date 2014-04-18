
# 让 Vim 支持 CSS3

- template: post.html
- pubdate: 2009-11-06
- tags: Vim, CSS, CSS3

----

和 [HTML5](http://www.w3.org/TR/html5/) 一样，[CSS3](http://www.w3.org/TR/css3-roadmap/)
也是目前热门的技术，为了在 Vim 中更舒适的编辑 CSS ，我整理补充了 CSS3
的语法高亮和自动补全部分。

## 语法高亮

下载这个 [css.vim](http://hotoo.googlecode.com/svn/trunk/vim/vimfiles/syntax/css.vim)
，放至 `$VIM/vimfiles/syntax/` (Windows) 或 `~/.vim/syntax/` (*nix) 目录下即可。

*更新* ：

将 [css.vim](http://hotoo.googlecode.com/svn/trunk/vim/vim72/syntax/css.vim)
下载放置 `$VIM/vim72/syntax/` 下，覆盖源文件，这个版本补充和修正了CSS3的伪类支持。

## 自动补全

下载这个 [csscomplete.vim](http://hotoo.googlecode.com/svn/trunk/vim/vim72/autoload/csscomplete.vim)
放至 `$VIM/vim72/autoload/` 目录下，覆盖原文件即可。

其中 vim72 中的 72 是 Vim 版本号。

如果安装有 snipMate，可以参考这个
[css.snippets](http://hotoo.googlecode.com/svn/trunk/vim/vimfiles/snippets/css.snippets)

## 语法验证

可以参考这篇 [在 Vim 中验证 X/HTML, Javascript 和 CSS](validator-for-vim.html)

## 参考：

* [CSS 3.0 参考手册 (中文版)](http://webteam.tencent.com/css3/)
