
# 在 Vim 中验证 X/HTML, Javascript 和 CSS

- template: post.html
- pubdate: 2009-10-25
- tags: Vim, HTML, CSS, JavaScript
- toc: true

----

Unix/Linux（以下统称Unix）下可参考[这里](http://blog.whatwg.org/vim-checker )
和 [这里](http://natalian.org/archives/2008/05/17/vim-web-ide/)，
因为介绍和代码都是现成的，而且我没有实验过，所以不多作介绍。

*原理* ：
改变makeprg，make时使用curl向指定的检测服务地址发送数据，通过管道，
使用sed编辑整理返回的数据后在Quickfix窗口中显示。

我在Windows 7 下做了部分改动，由于对Unix命令不了解，目前还有一下输出格式的问题待修正。

大部分代码参考[这个Project](http://svn.natalian.org/projects/html5/)，
里面的.sh文件都是 Unix中的脚本，Windows下可以改为.bat，有部分格式不同出需要修改，
如Unix下的 $1，Windows下是%1，注释符合也不同，另外Sed for Windows是不支持使用
单引号(?)的，需要改成双引号，里面的双引号需要转义，cURL和Sed这部分我目前没搞清楚，
所以少讲少错些的好。

下面讲详细步骤：

## 校验X/HTML

1. 安装cURL for Windows：
    1. 到 [这个页面](http://curl.haxx.se/download.html) 找“Win32 – Generic”，
        下载下面带或不带ssl的都可以；
    1. 把解压的 curl.exe 放到 Path 环境变量所在的目录（如 C:\Windows）
    1. 另外还需要几个动态链接库，如 libeay32.dll, libssl32.dll 直接在网上搜索
        下载并放到 Path 环境变量所在目录下即可。
    1. 命令行下运行 curl 测试是否安装成功。
1. 安装Sed for Windows：
    1. 到 [这里](http://gnuwin32.sourceforge.net/packages/sed.htm)
        下载Binaries 版本，将解压的 sed.exe 放至系统 Path 环境变量所在目录。
    1. 另外需要的 libintl-2, libiconv-2, regex 这几个动态链接库，sed下载页的
        底部都有链接，放至系统 Path 环境变量所在目录。
    1. 命令行下运行 sed 测试是否安装成功。
1. 下载这个 [validate-html.sh](http://svn.natalian.org/projects/html5/validate-html.sh)，
    重命名为 validate-html.bat，放至系统 Path所在路径，并编辑修改为以下内容：

    ```
    :: sudo ln -s `pwd`/validate-html.sh /usr/bin/validate-html.sh
    :: Many thanks to Anselm Garbe for helping me with the blasted sed regexp

    @echo off
    ::curl -s -F laxtype=yes -F parser=html5 -F level=error -F out=gnu -F doc=@%1 "http://validator.nu" | sed 's,^.*":,'"%1:"','
    curl -s -F laxtype=yes -F parser=html5 -F level=error -F out=gnu -F doc=@%1 "http://validator.nu" | sed "s,^.*"":,""%1:"","
    ```

    上面指定以 html5 标准来校验，如果你使用其他标准，可以自行修改。
1. 下载这个 [html.vim](http://svn.natalian.org/projects/html5/html.vim) ，将里面的
    ```
    set makeprg=validate-html.sh\ %
    ```

    改成

    ```
    set makeprg=validate-html.bat\ %
    ```

    放至 `$VIM/vimfiles/ftplugin/` 目录下。
1. 修改 _vimrc，加入如下代码：

    ```
    autocmd FileType html,xhtml nmap <F9> :make<cr><cr>:copen<cr>
    ```

1. 现在，打开.html类型的文件，按<F9>键既可校验当前的html文档合法性了。

![pic](http://farm3.static.flickr.com/2753/4043041358_09704d3424_o.png)

[ref](http://www.flickr.com/photos/hotoo/4043041358/)

## 校验CSS

方法和上面的类似，从第3大步开始：
1. 下载这个 validate-css.sh ，重命名为 validate-css.bat 放至 Path 环境变量所在目录，
    并修改为如下代码：

    ```
    :: WORK-IN-PROGRESS
    curl -s -F "file=@%1;type=text/css" -F output=text "http://jigsaw.w3.org/css-validator/validator/"
    ```

1. 复制一份 $VIM/vimfile/ftplugin/ 下的 html.vim，重命名为 css.vim，并修改以下内容为：

    ```
    set makeprg=validate-css.bat\ %
    ```

1. 修改 _vimrc 加入如下代码：

    ```
    autocmd FileType css nmap <F9> :make<cr><cr>:copen<cr>
    ```

1. 至此，打开CSS文件，按下<F9>就可以校验CSS代码了。

![pic](http://farm3.static.flickr.com/2465/4042318385_7da39f37e7_o.png)

[ref](http://www.flickr.com/photos/hotoo/4042318385/)

另外还有一个插件支持验证CSS：[css.vim : CSS compiler file](http://www.vim.org/scripts/script.php?script_id=1577)

## 校验Javascript

这个已有单机应用程序版本，更多资料可以参考 [jsLint for Vim](http://www.gracecode.com/archives/2902/)
和 [javaScriptLint.vim (script#2578)](http://www.vim.org/scripts/script.php?script_id=2578) ，
另外，还是很期待 X/HTML 和 CSS 也有类似的版本的。


## 参考

* [HTML5 conformance checking in Vim](http://blog.whatwg.org/vim-checker)
* [VIM IDE for Web applications](http://natalian.org/archives/2008/05/17/vim-web-ide/)
* [Project html5 (download)](http://svn.natalian.org/projects/html5/)
* [Validator.nu](http://validator.nu/)
* [cURL](http://curl.haxx.se/)
* [Sed for Windows](http://gnuwin32.sourceforge.net/packages/sed.htm)
* [jsLint for Vim](http://www.gracecode.com/archives/2902/)
* [javaScriptLint.vim : Displays JavaScript Lint warnings in the quickfix error window](http://www.vim.org/scripts/script.php?script_id=2578)
* [W3C Validator](http://www.maxsworld.org/index.php/how-tos/w3c-validator-installation)
* [JSLint, The JavaScript Code Quality Tool](http://www.jslint.com/)
