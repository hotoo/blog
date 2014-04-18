
# 实现文本转语音

- template: post.html
- pubdate: 2010-09-12
- tags: Text to Speech

----


又是心血来潮，想把文本转为语音朗读，通过听书的方式来多重利用时间。分心听书有效
吗，未可知也。不过还是想折腾下，心血来潮嘛。

刚开始以为一定需要下载个语音软件，用它将文本转成语音，通过调节字词之间的停顿，
来达到较好的视听效果。

因为很久以前有折腾过使用 Word 实现语音朗读的事，朗读效果非常不好，所以不想下载
那些大型的朗读软件，总感觉他们读出来的声音会让人恶心死。

群里请教了一下有没有推荐的，得到 [eGuideDog](http://www.eguidedog.net/)，但是
似乎仍然不甚理想，后来又发现了 [NeoSpeech](http://www.neospeech.com/)，里面提供
的试听效果非常好，尤其是日语朗读，跟真人朗读差不多。

于是继续寻找相关资料，在 VeryCD 上得到这些：[1](http://www.verycd.com/topics/2780296/)
[2](http://www.verycd.com/topics/2799359/) [3](http://www.verycd.com/topics/2780296/)

后来看到一张语音属性的图片，才进控制面板明白了一些事情。

看到有通过微软拼音输入法3.0的语音功能实现的介绍，不过我在微软拼音3.0和 2007 中
都没有找到对应菜单项。

通过 [Excel 2007中的文本到语音](http://blog.miyui.net/work/text-to-speech-in-excel-2007/)
知道 Excel 内置了语音朗读的功能，但是 Word 没有找到对应的。便找到了
[office2007文本到语音命令的问题](http://bbs.cfan.com.cn/viewthread.php?tid=661265)

## 详细步骤

1. 安装语音引擎，我下载的 [这个](http://www.verycd.com/topics/2799359/)，解压安装
    会自动设置控制面板里的语音选择，可以进入“控制面板”->“语音”->“语音选择”，
    系统默认是 "Microsoft Sam"，可以改为刚安装的语音，试听一下。
1. 打开 Excel (2007)，点击左上角（靠右侧的）三角下拉菜单（鼠标悬浮提示是
    “自定义快速访问工具栏”->“其他命令”->“不在功能区的命令”，
    添加“朗读单元格”和“朗读单元格 - 停止朗读单元格”，
    在单元格中输入文本，点击“朗读单元格”就会听到发声。
1. 要想让 Word 朗读发声，可以使用自定义宏：
    1. 按 `<Alt-F11>` 启动 Visual Basic 编辑器。
    1. 创建名为 `ReadRec` 的宏：

            Sub ReadSelection()
                Excel.Application.speech.speak Selection
            End Sub

    1. 单击VBE编辑器窗口中的“工具”菜单，选择“引用”命令，在弹出的
        “引用-Normal”对话框中选择“Microsoft Excel 12.0 Object Library”复选框。
    1. 确定，关闭Visual Basic编辑器返回Word窗口。
    1. 右击工具栏，选择“自定义”命令，切换到“命令”选项卡，在“类别”中
        选择“宏”，将命令中的“Normal NewMacros.ReadSelection”拖放到工具栏中。
    1. 现在在 Word 里选中文本，点击工具栏刚加入的按钮，就可以朗读选中文本了。

##  参考 & 延伸阅读

1. [NeoSpeech](http://www.neospeech.com/)
1. [NeoSpeech 语音下载(VeryCD)](http://www.verycd.com/topics/2780296/)
    [2](http://www.verycd.com/topics/2799359/)
    [3](http://www.verycd.com/topics/2780296/)
1. [Excel 2007中的文本到语音](http://blog.miyui.net/work/text-to-speech-in-excel-2007/)
1. [office2007文本到语音命令的问题](http://bbs.cfan.com.cn/viewthread.php?tid=661265)
    [2](http://blog.exiaoxue.cn/200815213528.html)
1. [Word 从文本到语音工具栏](http://blogimg.chinaunix.net/blog/upfile2/081226113747.rar)
1. [Word音标助手COM加载项(更新2009.6.30版)](http://club.excelhome.net/viewthread.php?tid=419686&page=1&extra=page%3D1)
1. [Word 2003如何实现文本朗读](http://www.gmw.cn/content/2005-03/18/content_198426.htm)
1. [Google's Text to Speech API : A PHP Wrapper Class](http://masnun.com/blog/2009/12/14/googles-text-to-speech-api-a-php-wrapper-class/)
