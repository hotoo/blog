
# 用 Vimwiki 写博客

- template: post.html
- pubdate: 2010-03-29
- tags: Vim, Vimwiki, Dropbox, Blog

----


由于众所周知的缘故，[我的博客](http://blog.xianyun.org/) 被消失了。
在国内买域名或主机都是十分不靠谱的事，所以目前没有重新开独立博客的打算。
而使用第三方博客服务也同样不靠谱，目前只同步在 Google Blogger 上。

把东西都放在自己的计算机里算是比较可靠的方式了，
我计划使用 Vim + Vimwiki + Dropbox 来搭建自己的特殊博客系统。

## 原理

使用 Vim 这个极致的编辑器，加上 Vimwiki 这个优秀的插件，
可以用 Wiki 语法来写日志，~~1. 然后由 Dropbox 自动同步与发布，~~
~~2. 已经改为 SVN 提交到 Google Code（生成的 HTML 文件需要设置 svn:mime-type 为 text/html），~~
3. 现在是用 Git 提交到 [hotoo.github.com](http://hotoo.github.com)。
整体上来说这个系统基本完好，~~除了域名稍稍缺憾之外，~~Github 支持绑定第三方域名。

## 搭建步骤

如果你看过 [Vim Script 文档中文计划](http://code.google.com/p/vim-script-cn/)
的介绍，下面有写内容大概已经熟悉，这里作为完整的技巧一并介绍：

1. 确认正确安装了 [Vim](http://www.vim.org) 和
    [Vimwiki](http://www.vim.org/scripts/script.php?script_id=2226)。
1. 如果安装了 [snipMate](http://www.vim.org/scripts/script.php?script_id=2540)
    在 $VIM/vimfiles/snippets/ 下新建一个 vimwiki.snippets 文件（已有则打开文件）。
    在 vimwiki.snippets 中添加自己的博客格式模板，例如我的：

        snippet blog
            %\title $1 (注意："title" 前面的 "\" 去掉)

            = ${1:title} =
            ${2:content}

             blog:datetime=`strftime("%Y/%m/%d %H:%M:%S")`:tags=${3}

1. 因为 Vimwiki 和 snipMate 的 `<Tab>` 热键冲突，
    可以将 $VIM/vimfiles/ftplugin/vimwiki.vim 中的

        inoremap <expr> <buffer> <Tab> vimwiki_tbl#kbd_tab()

    换成其他的热键，例如：

        inoremap <expr> <buffer> <C-Tab> vimwiki_tbl#kbd_tab()

1. 到此，在 .wiki 文件中输入 `blog<Tab>` 就展开博客模板了。
1. 在 vimrc 的 `g:vimwiki_list` 中加入一个 wiki，例如我的：

        let g:vimwiki_list = [
            \ {...},
            \ {...},
            \ {...},
            \ {
                \ 'path'        : 'D:\My Dropbox\blog',
              " \ 'path_html'   : 'D:\My Dropbox\Public\blog',
              " \ 'path_html'   : 'D:\wrokbench\hotoo.googlecode.com\blog',
                \ 'path_html'   : 'D:\wrokbench\hotoo.github.com\blog',
                \ 'html_header' : 'D:\My Dropbox\blog\template\header.tpl',
                \ 'html_footer' : 'D:\My Dropbox\blog\template\footer.tpl'
            \ }
        \ ]

## 技巧

这样我使用 `4<leader>ww`(一般是`4\ww`) 就可以快速启动博客 Wiki 首页并进行编辑了。
Wiki 文件保存在 Dropbox 私有目录下，生成的 html 文件保存在公开目录。

草稿日志的 Wiki 文件中加入 `%nohtml` 不转成 HTML，索引页用 HTML 注释
`< !-- -->` （去掉 ! 前面的空格）就可以了。写好想发布时，
修改对应代码并 `:Vimwiki2HTML` 即可。

## 模板

可以直接查看源码得到，或者这里 [下载](http://dl.dropbox.com/u/1151037/dl/vimwiki/wiki.template.zip)。

## 评论系统

可以使用 [disq.us](http://disqus.com/)。

## 搜索

使用 Google AJAX Search API，详细可以参考老肥博客的
[打造完美的 ajax 版 Google 自定义搜索](http://fis.io/ajax-google-custom-search-engine.html)
