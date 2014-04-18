
# 使用 Vimwiki 还是 Jekyll 作为博客系统？

- template: post.html
- pubdate: 2011-06-19
- tags: Vim, Blog

----


一直使用 Vimwiki 作为个人博客系统，今天非常荣幸收到加入
[Vim 中文星](http://planet.vim-cn.com/) 的邀请，需要我的提供 RSS/Atom 输出。

但是 Vimwiki 本质上是一个 wiki 系统，通常来说都是（个人推荐）作为平板结构
来放置信息，较少（但也支持）基于目录，尤其是基于日期时间格式的目录结构来存储
词条（或者说日志），所以要支持基于时间的 RSS/Atom 就有一定的困难，而且貌似
需求本身也不怎么合理，不过 github 的提交记录里是有 RSS 输出的，虽然作为博客
订阅的意义几近于无。

于是想是否有必要在 Wordpress 上同步更新博客（Blogger 被墙的厉害），但是发现
很久以前（还是在拥有 xianyun.org，并使用 mail@xianyun.org）注册的 Wordpress，
杯具的忘记密码了，注册的邮箱也不再使用，无法索取找回密码了。

于是想：迁移到 Jekyll 怎么样？

由于 github pages 的缘故，很早就大致了解了下 Jekyll，但是没有深入，一直主观的
认为 Jekyll 会根据模板动态转换 markdown/textile 文件。但是更深入的了解之后
发现，Jekyll 只是一个静态文件转换程序，通过模板引擎将数据（博客日志）和模板
转换成静态 HTML 文件。

* 支持 markdown, textile 语法。
* 支持生成 RSS, ATOM。
* ruby 脚本生成静态文件。
* 需要将安装 ruby 和 jekyll.

而 Vimwiki 是一个基于 Vim 的 wiki 客户端程序，提供便于管理和使用的本地 wiki 支持。

* 支持 wiki 语法。
* 不支持生成 RSS, ATOM。
* Vim script 生成静态文件。
* 需要安装 Vim, Vimwiki.

我个人目前最简单的需求，就是在 Vimwiki 的基础上实现 RSS 输出的支持。不过完整
、完美意义上来说，我还是希望有这样一个博客系统。

* 支持 wiki, markdown, textile 或其他语法。(Vimwiki, Jekyll)
* 支持生成 RSS/Atom 输出. (Jekyll)
* 通过 Vim(script) 或其他易于安装使用的程序，将日志+模板自动生成 HTML 文件。(Vimwiki, Jekyll)
* 日志原始文件通过 Dropbox 或其他云服务自动同步，无需 push 到 github。(Vimwiki)
* 只将生成好的静态 HTML 文件 push 到 github。(Vimwiki)

## 延伸阅读

* [像黑客一样写博客](http://kyle.xlau.org/2009/08/13/blogging-like-a-hacker.html)
* [使用github作为博客引擎](http://blog.leezhong.com/tech/2010/08/25/make-github-as-blog-engine.html)
* [告别wordpress，拥抱jekyll](http://www.yangzhiping.com/tech/wordpress-to-jekyll.html)
* [在heroku上用jekyll做博客](http://roylez.heroku.com/2010/02/04/jekyll-on-heroku.html)
* [轻量级博客工具: Jekyll vs ToTo](http://www.shaoshing.com/2010/04/03/blog-engine-jekyll-vs-toto/)
* [將Wordpress轉移到Jekyll及Disqus](http://blog.miaout17.net/2011/05/08/convert-wordpress-to-jekyll-and-disqus/)
