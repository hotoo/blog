
# Vim 字体设置

- template: post.html
- pubdate: 2009-09-14
- tags: Vim

----

明城有 “[苹果的 Courier 字体不错](http://www.gracecode.com/archives/1545/)”
和“[Windows 下 gVim 的雅黑字体配置](http://www.gracecode.com/archives/2402/)”
两篇介绍 Vim 下设置推荐字体的文章，里面提供的设置代码及提高的下载资源都很赞。

家里的 Windows 7 用了 Courier New 字体后，体验很好。

但是搬到公司的 Windows XP 上却比原来 Windows 自身的 Courier New 没多大提高。

今天看了蟠盛写的“[几种不错的编程字体](http://blog.htmlor.com/2007/10/14/good_programming_fonts/)”，
顺便看了下 [使用 ClearType 增强屏幕字体](http://support.microsoft.com/kb/306527/zh-cn)，按步骤 果然好了很多。

这里记录完整的设置：

1. 下载 [Apple Courier字体](http://hotoo.googlecode.com/svn/trunk/fonts/Apple_Courier_Gracecode.zip)
    [2](http://www.box.net/shared/zf08nmhc8g)
    [3](http://lifesinger.googlecode.com/files/apple_courier_font.zip) ，并安装。安装方法：
    * for Windows 7: 右键字体文件，安装即可。
    * for Windows XP:
        1. 资源管理器中打开系统盘下的 fonts 目录（如`C:\WINDOWS\Fonts`，或运行 `fonts`）
        1. 文件 -> 安装新字体；
        1. 驱动器和文件夹定位到字体所在位置，字体列表将自动列出找到的字体；
        1. 选中要安装的字体，点击确定即可。
        1. 或直接将字体文件拷贝到Fonts文件夹亦可，系统将自动启动安装过程。
1. ClearType
    1. 控制面板 -> 显示（或右键桌面 -> 属性） -> 外观 -> 效果；
    1. 选中“☑ 使用下列方式使屏幕字体的边缘平滑”；
    1. 并切换下面的下拉框，选中“清晰(ClearType)”；
    1. 确定即可。
1. Vim设置
    1. 在 _vimrc 中加入如下代码：
    ```
    set guifont=Courier_New:h11:cANSI
    ```
    1. 中文的宋体已经非常好了，不过仍然可以单独设置中文字体：
    ```
    set guifontwide=YouYuan:h11:cGB2312
    ```
    1. 此时，新启动vim即可使用新设置的字体了。

![pic](http://farm4.static.flickr.com/3462/3919344550_f5cd6656c8_o.png)

[ref](http://www.flickr.com/photos/hotoo/3919344550/)

## 白露非提供的字体

[下载](http://8.nf/dxa)

设置：

    guifont=Microsoft_YaHei_Mono:h11:cANSI

## See Also

* [@twitter](https://twitter.com/#!/belleveinvis/status/19308677508894720 )
