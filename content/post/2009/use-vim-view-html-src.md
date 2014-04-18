
# 使用 Vim 查看 HTML 源码

- template: post.html
- pubdate: 2009-09-05
- tags: Vim, Browser
- toc: true

----


收集到一些修改浏览器 html编辑器，用vim从浏览器查看源代码的方法，其中有一些是较佳的解决方法，
这里将相关技巧一并整理于此。

## 针对Internet Explorer：

### 快捷方式+注册表^1^

* 创建 gvim 快捷方式，例如重命名为 ieVim，并置于 Vim 安装目录($VIMRUNTIME，如 D:\Vim\vim72)。
* 右键该快捷方式，属性，目标文本框中加入参数：
    ```
    "D:\Vim\vim72\gvim.exe" -c "set filetype=html" "%*"
    ```
* 修改注册表：
  `[Explorer\View Source Editor\Editor Name](HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Internet)=D:\\Vim\\vim72\\ieVim.lnk` <br />
  注意最后要加上 .lnk 后缀。
    ```
    HKEY_LOCAL_MACHINE
      |-- SOFTWARE
          |-- Microsoft
              |-- Internet Explorer
                  |-- View Source Editor
                      |-- Editor Name (默认)=D:\Vim\vim72\ieVim.lnk
    ```
    另外也可以将如下代码保存为 .reg 文件，引号中路径改成 Vim 安装路径即可
    ```
    Windows Registry Editor Version 5.00

    [Explorer\View Source Editor\Editor Name](HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Internet)
    @="D:\\Vim\\vim72\\ieVim.lnk"
    ```
    或者下载这个 [注册表文件](http://hotoo.googlecode.com/svn/trunk/vim/vim72/ievim.reg)，
    双击运行，或右键“合并”即可。
* 现在在IE里使用右键，“查看源代码”就可以使用 Vim 打开 html 源码。

### 批处理+注册表^2^

* 将如下代码保存为批处理文件，如 ievim.bat，例如放到 $VIMRUNTIME 下。
    ```
    "D:\\Vim\\vim72\\gvim.exe" --servername "VIEW SOURCE" --remote-silent "+set syn=html" %1
    ```
* 参照第 1 个方法的第 3 步，修改注册表的值为这个批处理文件的地址，如 `D:\Vim\vim72\ievim.bat`。
* 现在就可以使用 Vim 或其他外部编辑器打开 IE 的页面源代码了。
* 缺点：打开的批处理命令行窗口不会自动关闭，直到被打开的页面源代码编辑器被关闭。

## 针对Firefox^3^

* 修改浏览器配置
    * 在 Firefox 地址栏输入 `about:config` 并回车。
    * 点击“我保证会小心”按钮，确认进入。
    * 在“过滤器”输入 `view_source`，筛选出查看代码的部分选项。
    * 双击 `view_source.editor.external` 项，将值变成 `true`。
    * 双击 `view_source.editor.path`，输入 gvim.exe 安装（绝对）路径，如我的是 `E:\Vim\vim72\gvim.exe`。
    * 现在就可以使用 Vim 查看 Firefox 页面源代码了
* 使用插件
    * 安装 [ViewSourceWith](https://addons.mozilla.org/zh-CN/firefox/addon/394) 插件后，重启 Firefox。
    * 配置系统已有文本编辑器，如 `D:\Vim\vim72\gvim.exe`
    * 即可使用 Vim 或其他任意外部编辑器打开 Firefox 的页面源代码。
    * 缺点：需要安装插件，且所在右键菜单的层级较深。

## 针对Opera^4^

* 在 Opera 地址栏输入 `opera:config` 并回车。
* 在 Quick find 输入`source viewer`，筛选出查看代码部分的选项。
* 在 Source Viewer 中填入欲使用的外部编辑路径，如 `D:\Vim\vim72\gvim.exe`。
* 并将 `Source Viewer Mode` 改为 `2`<br />
  源码显示模式：<br />
  `1` 表示使用系统默认程序查看源码<br />
  `2` 表示使用自定义程序查看源码<br />
  `3` 表示使用Opera查看源码
* 保存即可，现在可以使用 Vim 或其他外部编辑器打开 Opera 的网页源代码了。

## 参考阅读

* [用 vim查看ie源代码的问题](http://www.douban.com/group/topic/5083531/)
* [View Source from Internet Explorer in gvim](http://vim.wikia.com/wiki/View_Source_from_Internet_Explorer_in_gvim)
* [Use gvim to view page source in Internet Explorer](http://vim.wikia.com/wiki/Use_gvim_to_view_page_source_in_Internet_Explorer) ^vbs^
* [改变查看页面源代码的程序](http://www.douban.com/group/topic/5083531/)
* [Opera首选项编辑器（opera:config）详解](http://cnxiaoyi.googlepages.com/Oconfig.htm)
