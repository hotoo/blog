
# 迁移博客到 Jekyll

- template: post.html
- pubdate: 2013-02-13
- tags: Blog, Jekyll

----

## _posts 文件结构

Jekyll 支持两种结构：

1. 平铺所有文件，每个文件使用日期前缀。
1. 按照完整的日期目录结构。

## 静态链接(Permalink)

我的个人博客并非用于发布新闻，即使非常旧的博客，也会不断更新维护，
所以无需添加时间标识，直接使用 title 即可。

如果需要多个版本，为避免出现冲突，可以在 title 中添加序号。如 `II` 或 `2`。

## 草稿(Draft)

Jekyll 支持 `published` 标记，设置为 `false` 就可以避免被转换发布。
这本身很不错，但是这些草稿和正常发布的文件混淆在一起，无法清晰区分。

所以我创建了 `_draft` 目录，用于存放草稿。在文章准备好之后拷贝到 `_posts `
目录即可。

p.s. 话说相比 `published` 标记，我更喜欢 `draft`，如果支持的话。

## more

[Creating Excerpts in Jekyll with Wordpress-style &lt;!--more--&gt; HTML Comments](http://www.jacquesf.com/2011/03/creating-excerpts-in-jekyll-with-wordpress-style-more-html-comments/)

<!--more-->

## 存档(Archive)

[enaeher / tiered_archives.rb](https://gist.github.com/enaeher/88cda643aa7e3b0ca1e5)

## 目录(TOC)

http://stackoverflow.com/questions/9602936/how-to-add-a-table-of-contents-to-jekyll-blog-post
http://stackoverflow.com/questions/13481572/jekyll-automatic-table-of-contents
http://du1abadd.org/2010/usr/make_toc_support_for_jekyll_with_rdiscount.html

## 标签(Tags)

## 代码高亮

## 分页

    <div class="pagination">
      {.% if paginator.previous_page == 1 %}
        <a href="/" class="previous">上一页</a>
      {.% else if paginator.previous_page %}
        <a href="/page{.{paginator.previous_page}}" class="previous">上一页</a>
      {.% else %}
        <span class="previous">上一页</span>
      {.% endif %}
      <span class="page_number">页码：{.{paginator.page}} / {.{paginator.total_pages}}</span>
      {.% if paginator.next_page %}
        <a href="/page{.{paginator.next_page}}" class="next">下一页</a>
      {.% else %}
        <span class="next">下一页</span>
      {.% endif %}
    </div>

### 参考：

* [Jekyll Draft Publishing Plugin](http://jeffreysambells.com/2013/02/01/jekyll-draft-publishing-plugin)
* [Jekyll Draft Posts](http://tqcblog.com/2012/08/22/jekyll-drafts/)

## 与 Vimwiki 结合

之前的博客使用 Vimwiki 管理，可以无需转换或发布，直接使用 Vim 即可简单浏览。


    let g:vimwiki_list = [
      \ {
        \ 'path'        : '~/Dropbox/blog.hotoo.me/_posts',
        \ 'index'       : '_index',
        \ 'ext'         : '.md',
        \ 'nested_syntaxes' : {'javascript': 'javascript', 'python': 'python', 'c++': 'cpp'}
      \ }
    \]

## 不足

`_posts/*.md` 文档理论上只会作为内容输出，其中的代码（尤其是 Jekyll 使用的模板
代码，及其 `pre > code` 中的代码，应该合理转义处理。但是实际上 Jekyll 没有这样
做，导致一些代码没有符合期望。
