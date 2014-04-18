
# 让 Editplus 和 Everything 结合，快速搜索

- template: post.html
- pubdate: 2010-01-27
- tags: Editor, Search Engine, Tools

----


今天朋友向我分享了他新学的一个小技巧：将 Everything 搜索集成到 Editplus。

毫无疑问，[Everything](http://www.voidtools.com/) 是 NTFS磁盘下，
本地文件快速搜索的极品，而 [Editplus](http://www.editplus.com/) 也是Windows下非常优秀的文本编辑器。

虽然 Editplus 本身也有文件搜索功能，而且支持内容搜索，不过这个集成也非常有意思。

   * 首先需要安装（绿色的也可以）有Everything本身。
   * 下载面向命令行界面的 [es.exe](http://www.voidtools.com/download.php)
        ^[2](http://xbeta.info/everything/download.htm)^ 程序，放至 Everything 安装目录。
   * 打开 Editplus ， “工具” -> “配置用户工具” -> “添加工具”
   * “菜单文本”可以随便命名，
   * “命令”填入 es.exe 所在的完整路径，如 E:\Everything\es.exe
   * “参数”填 `$(FileDir) $(CurSel)`
   * 选中捕获输出
   * 确定，现在选中一串文本，就可以使用 <Ctrl-N> 快捷键或菜单执行搜索了，搜索结果集会输出在输出窗口中。

谢谢晓东的分享。有时间的话可以为 Vim 也写一个插件，搜索结果在 QuickFix 窗口中输出。

注意：一定要记得先选定文本一串，否则会搜索出所有的文件，如果参数没有加入当前文件所在的目录，还会更惨 ^_^! 。不过作为 Vim 插件就可以更灵活了，不需要选定文本，直接执行类似命令就可以了。

    :ES ${keyword}[ ${path}]
