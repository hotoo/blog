
# Firefox Profile 及多实例运行

- template: post.html
- pubdate: 2009-10-22
- tags: Firefox

----

之前就知道Firefox 支持多账户，并允许各账户安装不同的插件，会话信息也完全独立。

方法是制作快捷方式，目标指向Firefox的安装路径，并加上 `-P` 参数：

```
"C:\Program Files\Mozilla Firefox\firefox.exe" -P
```

加引号是为了防止空格问题。这样会启动选择账户的对话框，如果想直接指定账户启动，
而不出现对话框，可以在 `-P` 参数后直接带账户的名称，如默认的 default：

```
"C:\Program Files\Mozilla Firefox\firefox.exe" -P default
```

如果想同时启动多个Firefox独立的账户实例，可以加上 `-no-remote` 参数。

```
"C:\Program Files\Mozilla Firefox\firefox.exe" -no-remote -P debug
```

受 Editplus 的影响，其`<C-b>` 快捷键可以使用内置的IE核心浏览器预览和 html
源码间快速切换（也可以使用外部浏览器）。

最近在定义 vimrc 时映射了 Cpp 的快速编译和运行快捷键，顺手一并映射了批处理和
X/HTML 文件类型的运行/预览快捷键，如下：

```
autocmd FileType xhtml,html nmap <F5> :exe '!start "C:\Program Files\Mozilla Firefox\firefox.exe" "'.expand("%").'"'<cr>
autocmd FileType dosbatch nmap <F5> :exe '!"'.expand("%").'"'<cr><cr>
```

由于 default 和 debug 账户都加上了 `-no-remote` 参数，Firefox 被设置为默认浏览器，
并使用外部程序打开链接是，会弹出如下警告：

> “Firefox 已经在运行，但是没有响应。如要打开新窗口，您必须先关闭该 Firefox
> 进程，或者重新启动您的系统。”

确定后会被直接退出，打开链接失败。

解决办法是的主账户启动时不带 `-no-remote` 参数，其他账户带此参数启动，此时从
外部程序打开的链接，会在此不带 `-no-remote` 参数的主账户中启动，另外还可以
带上 `-new-window` 或 `-new-tag` 参数。

另外还有一个问题是，每次按 `<F5>` 都会从新的页签或窗口中打开，而不是刷新已有的同路径页。

## 参考

* [同时运行两个 Firefox实例](http://blog.cathayan.org/item/1543)
* [Geek to Live: Manage multiple Firefox profiles](http://lifehacker.com/software/firefox/geek-to-live--manage-multiple-firefox-profiles-231646.php#c896803)
* [Command line arguments](http://kb.mozillazine.org/Command_line_arguments)
* [Profiles](http://support.mozilla.com/zh-CN/kb/Profiles)
* [firefox 啟動參數](http://dreamsouls.net/ds/archives/220)

另：

* [“Firefox 已经在运行，但是没有响应。”](http://www.inness.cn/archives/598.html)
* [Firefox 已经在运行，但是没有响应](http://www.anopos.com/ant/firefox-is-already-running-but-is-not-responding/)
    [2](http://hi.baidu.com/wlwlcy/blog/item/eab5e9ce05153f0493457e5d.html)
