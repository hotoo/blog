
# 让Vim支持html5

- template: post.html
- pubdate: 2009-11-01
- tags: Vim, HTML5

----

[html5](http://www.w3.org/TR/html5/) 呼之已出，众多的现代浏览器也已支持其大半新特性。

## HTML5 语法高亮

网上已有让 Vim 支持新的标签和属性的语法文件，安装好语法文件即可正确的高亮显示
HTML5 标记和属性。

详细方法参考 [VIM syntax highlight para HTML 5](http://rm.blog.br/2009/09/vim-syntax-highlight-para-html-5/)，
下载其 [html.vim](http://rm.blog.br/wp-content/uploads/2009/09/html.vim) 语法文件，
放至 `$VIM/vimfiles/syntax/` 目录下即可。

注：因为 html5 本身在不断更新，所以上面的脚本并不完整，我将持续关注并更新这个
[html.vim](http://hotoo.googlecode.com/svn/trunk/vim/vimfiles/syntax/html.vim) 脚本。

## html5 自动补全

不过貌似目前还未有让 Vim 完整支持 html5 自动完成（又称自动补全）之脚本。

我初步研究并修改了 `$VIM/vim72/autoload/htmlcomplete.vim` ，使其支持 html5
的自动完成。目前这个脚本逻辑基本可用，不过针对 html5 自动完成的数据
（ `$VIM/vim72/autoload/xml/html5.vim` ）还在收集调整中，
我也趁此机会深入学习一些 html5 知识。

## 安装详情

将 [htmlcomplete.vim](http://hotoo.googlecode.com/svn/trunk/vim/vim72/autoload/htmlcomplete.vim)
下载放至 `$VIM/vim72/autoload/` 目录下，覆盖原文件即可，
再将 [html5.vim](http://hotoo.googlecode.com/svn/trunk/vim/vim72/autoload/xml/html5.vim)
下载放至 `$VIM/vim72/autoload/xml/` 目录下即可。

注：这个 html5.vim近期会做一些更新补充，以支持更完整正确的 html5 语法。

## html5 合法性验证

参考我的前一篇 [在 Vim 中验证 X/HTML, Javascript 和 CSS](validator-for-vim.html)。
