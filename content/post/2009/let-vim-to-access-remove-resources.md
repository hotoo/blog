
# 让 gvim 访问网络资源

- template: post.html
- pubdate: 2009-09-12
- tags: Vim

----

当我还是 Vim 超级菜鸟的时候，我就知道 Vim 可以和 Editplus、UltraEdit 一样，
访问网络资源，操作方式也很类似：

* 使用菜单栏的“文件”->“打开”命令；
* 或者使用工具栏的“打开”按钮；
* 会打开“编辑文件”对话框，此时在默认光标获焦的“文件名”文本框中输入网络资源定位符；
* 回车，或点击“打开”按钮；
* Vim 就会加载网站资源文件的内容。

没有错，作为超级菜鸟，我们就是这样被当作什么都不懂，什么都不会的小孩一样来教导的。

本来这样已经可以了，我们还有强求什么呢？真是得寸进尺啊，我发现 gvim 使用命令
是无法正常访问网络资源的。

```
:vi http://www.xianyun.org/
:vim http://www.xianyun.org/
:gvim http://www.xianyun.org/
:e http://www.xianyun.org/
:sp http://www.xianyun.org/
:tabnew http://www.xianyun.org/
:Nread http://www.xianyun.org/
```

虽说 Vim 从 7.0 就已经默认集成安装了 netrw. Vim 了，支持网络资源访问，
但是如果使用上面的命令，gvim 会告诉你说：

> **error** (netrw) neither the wget nor the fetch command is available<br/>
> ——————————————————————————————–<br/>
> “NetrwMessage” –缓冲区无内容–

向人请教得到解答：
这是因为缺少访问网络资源的程序（wget）
Windows下需要下载 [WGET for Windows (win32)](http://users.ugent.be/~bpuype/wget/)，
将 wget.exe 放到某个系统环境变量 Path 包含的位置（如 c:\windows）即可。
如果是Linux，直接安装wget即可。

现在还有一点问题，gvim使用上面的某个命令访问网络资源时，会打开命令行窗口：

```
C:\WINDOWS\system32\cmd.exe /c wget -q -O "C:\DOCUME~1\WB-TIA~1\LOCALS~1\Temp\VICC3E.tmp" "http://www.vim.org/"
Hit any key to close this window...
```

需要再敲一个键，才能关闭这个命令行窗口（Windows 7因为安全的原因，还有更多一步麻烦），
并将网络资源的内容读到 Vim，目前不知有什么完美的方法，不需要打开，或者能够自动关闭这个窗口？
而使用菜单或功能按钮等 gui 操作方式，是没有这些东西的，只是在同步加载远程资源时，
不能进行其他操作。

## 参考讨论

* [Vim 网络读写功能的问题](http://groups.google.com/group/vim-cn/browse_thread/thread/ca34e99e9d02d25d)
