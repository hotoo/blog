
# 用 Google Code 管理与发布 Wiki

- template: post.html
- pubdate: 2010-05-20
- tags: Vim, Vimwiki, Google

----


由于 [Dropbox 的墙掉](Dropbox-died-in-China.html)，https 协议访问 dl 或 dl-web 子域
的方法也随之失效，虽然可以通过修改 hosts 来继续同步文件，但是 Public 目录再也
不能输出文化了。

我之前 [在 Dropbox Public 目录搭建的博客和 Wiki 系统](use-vimwiki-for-blog.html)
也无法在线浏览了，为了能够继续 辅助文化局输出文化，我便利用万恶的资本主义国家
的 Google Code 来为我们服务了。

由于可以继续使用 Dropbox 来自动同步私有文件，所以可以保持 .wiki 文件在 Dropbox
中，其他自动同步的软件也可以用来做类似的事情。

将 Vimwiki 的 `path_html` 修改为 Google Code 的某个 svn 或 Hg 目录：

```
let g:vimwiki_list = [{...},
    \ {...},
    \ {...},
    \ {
        \ 'path'        : 'D:\My Dropbox\blog',
        \ 'path_html'   : 'D:\hotoo\blog',
        \ 'html_header' : 'D:\My Dropbox\blog\template\header.tpl',
        \ 'html_footer' : 'D:\My Dropbox\blog\template\footer.tpl'
    \ }
    \ ]
```

虽然 Vimwiki 目前的 toHTML 方法还不支持重新生成仅更新过的 wiki 文件，但是 svn
可以判断文件是否有真正被修改过。

另外 http://hotoo.googlecode.com/svn/wiki 目录存放的是 Google Code 的 Wiki 文件，
这里面的 wiki 文件无需通过 Vimwiki 导出 HTML，Google Code 会自动完成这一工作，
并可以通过 http://code.google.com/p/hotoo/w/list 浏览。而 Vimwiki 是 Google Code
Wiki 语法的一个子集，所以基本可以天衣无缝的配合使用。

这也是不错的一个方案，除了需要 commit 之外，Google Code 比 Dropbox 的 Public
有过之而无不足，域名也是杠杠的。

另外不小心发现还有其他的托管方案，让防火墙筑的更高些吧，当局者把自己当猪圈养起来
比较好，做个专职的脑子又笨，目光又短浅的墙脚之猪也可以提高幸福指数的。
