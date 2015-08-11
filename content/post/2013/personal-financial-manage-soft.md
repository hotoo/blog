
# 个人资金管理软件

- template: post.html
- pubdate: 2013-02-17
- tags: 金融管理, 软件, Mac OS X, iOS

----

过年花掉不少钱，而其中有一部分是喜酒之类的礼金，按照礼尚往来的习俗，这些礼金
早晚都是要被送回来的，而被送回来的途径，则是喜酒回请。

这些俗礼，即使不是为了收回礼金，回请对方也是必须的。

为了避免忘记吃过的酒席（前几年的都忘记差不多了），也为了对自己的资金有更清晰
的掌握，于是开始记账。

我现在用上了 Macbook Pro 和 iPhone，于是想找一个可以运行于 Mac OSX 和 iOS 平台
的软件，两者同步数据是必须的要求。毕竟移动设备记账有很多的便利优势，而 PC 做
更细致的管理与分析则更为方便和强大。

<!--more-->

## GNUCash

[GNUCash](http://www.gnucash.org/) 非常有名，也是我最早知道的开源金融管理软件
之一，复式记账一直是我觉得很厉害但是又不明白的概念。后来看了一些金融相关不入门
的信息，才有所了解。

以前也在 Windows 下使用过 GNUCash，本身还是很不错的，但是当时我没有坚持下来。

这次下载最新版回来在 Mac 上安装好之后发现，除了菜单之外，界面上中文全部是乱码，
一行中文被缩挤到第一列。新建账户或者其他任何操作都是不知所以，完全没法用。
最奇怪的是，网络上各个搜索引擎居然都搜索不到 GNUCash 乱码的内容，偶尔有一篇，
还是将数据库的。原来 GNUCash 使用的是 MySQL 存储数据？

GNUCash 目前支持 Windows, Mac, Linux, 和 Android 平台。

## iCash

后来看到有人推荐使用 [iCash](http://www.maxprog.com/site/software/personal-finance/icash_sheet_us.php)，
Mac 下 `i` 系列的好像都不错，于是尝试了下。

iCash 支持 Windows, Mac 平台，也有中文支持。

但就是觉得操作不算便利，一大堆莫名其妙的表单，有些会自动根据后面的表单自动适配，
不需要显示但居然安排在最前面，后来我才知道可以不填。

界面有点点土，用户体验也不好。概览里管理资金账户，如果需要更新交易，则需要
切换到『交易』页签，然后选择是哪个账户的交易。表单恐惧症~

填了不到 50条左右（存储的 .icash 文件有 23.8M 这么大）就烦了，
于是继续寻找其他软件。

## Money

最后才找到 [Money by jumsoft](http://www.jumsoft.com/money/) 界面设计非常赞，
大部分使用体验也很棒，有部分瑕疵，而最要命的启动速度非常慢，导入从 iCash
导出的 QIF 格式数据(.money 文件 500+KB) 启动时间大概需要 10秒。

另外如果上次退出 Money 的时候没有打开的文档（每个 .money 文件是一个文档）的话，
下次启动会要求创建新文档，只好打开最近的文档，再等 10秒钟。所以建议直接
`<Command-q>` 退出文档 & 程序，不要使用 `<Command-w` 之类的关闭文档。

另外还有 iOS(iPhone, iPad)版本，收费也不贵。可以通过 Wi-Fi 或 iCloud 同步数据。
虽然呼声很高，目前还不支持 Dropbox 同步。不过像其他重要资料一样，我的 .money
文件存储在 Dropbox 中。

总之是很赞啦，如果解决了性能问题就更好了，还有就是缺少中文本地化，另外 Mac 版
显示全部交易也不好，还有那啥~