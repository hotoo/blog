# 这是闲耘私人的博客

本博客由 [Jekyll](http://github.com/mojombo/jekyll) 转换成静态站点，托管在 GitHub。

# 目录结构

    /post/:title.html
    /archives/:year           指定年份的存档列表
    /archives/:year/:month    指定月份的存档列表
    /tags                     标签云列表
    /tag/:tag-name            特定标签的博文列表
    /categorys                分类名列表
    /category/:category-name  特定分类的博文列表
    /search                   搜索首页
    /projects
    /twitter
    /movies
    /musices
    /404

# TODO

智能增量编译：

只有在 .md 源文件的修改时间比 .html 目标文件更新，或者
.md 源文件使用的模板比 .html 目标文件更新时，才编译文档。

要求：输出的 .html 目标文件没有数值统计、分类、Tags 元数据信息。
方案：使用异步获取 json meta 信息。


洞悉世事胸襟阔；
阅尽人情眼界宽。

# License

本博客以下目录中的内容版权归`闲耘`所有。在没有许可的情况下，不得引用。

* _posts/
* images/

其他目录的内容遵循 MIT 协议许可，您可以自由使用模板等文件。
如果您使用了这些，请提供一个链接到 http://blog.hotoo.me 。
