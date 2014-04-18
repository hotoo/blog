
# Firefox本地化及其切换

- template: post.html
- pubdate: 2008-11-14
- tags: Firefox

----

昨天用Firefox内置的下载管理器下载一个较大的文件，而且新搬来这边的网速慢到让我想起
令人怀念的大学时期（那时候的校园网，不是一般人能够忍受的），无意中我看到下载管理器里
当前下载的文件下显示着“第x小时，剩余x分钟”的提示（不超过一小时时，只显示“剩余x分钟”）。
看到这个提示，我当时有两种想法：

* Firefox下载管理器的剩余时间计算方法比较有趣，将每小时的下载分段，
  所以就有了第1小时，剩余20分钟的说法；
* 翻译问题，实际应该是剩余1小时又20分钟的意思。


这两种理解方式都有其道理，而且在我最初看来，是各占 50% 的。

为了打消疑问，我Google，Baidu试了个遍，但是没有找到一条符合的记录，
于是又尝试问一些对Firefox有/无兴趣的朋友，以及mozine的Gtalk群友，
但是大伙都没有注意到这个，只能给个猜测的结果。

为了找到答案，就需要知道Firefox英文版是怎么说的，但是我还不想为此再装一个英文版Firefox，
那么怎么切换本地化语言呢，又是大肆搜罗一番，找到一些近似的，这里整理如下：

## 切换方法 I:

* about:config
* general.useragent.locale由zh-CN改为en-US。
  （前提：Firefox/chrome/目录下有en-US.jar和en-US.manifest）

## 切换方法 II:

* http://releases.mozilla.org/pub/mozilla.org/firefox/releases/下载安装对应的语言包(.xpi)。
* 启用该语言包（安装后默认启用）并重启Firefox。

例如我的Firefox版本3.0.3，Windows，则语言包文件地址为：
http://releases.mozilla.org/pub/mozilla.org/firefox/releases/3.0.3/win32/xpi/en-GB.xpi
（粗体为Firefox对应的版本号）。

注意：http://releases.mozilla.org/pub/mozilla.org/firefox/releases/
下的目录并不会列出xpi文件，将正确的版本号替换粗体部分，直接拷贝到地址栏回车即可。

安装并重启之后，可以看到Add-ons - 语言页签下会列出刚安装的English(GB) Language Pack语言包，想撤回中文时，禁用此语言包，重启Firefox即可。

## III:

另外还有几个用来切换本地化语言的扩展，[Locale Switcher](https://addons.mozilla.org/en-US/firefox/addon/356) 和
[Quick Locale Switcher](https://addons.mozilla.org/zh-CN/firefox/addon/1333)，
它们可以让Firefox直接在菜单栏切换语言。

言归正传，话说回来，切换为英文语言后，尝试大文件下载发现原文是类似于
`2 hours, 8 minutes remaining` 这样的提示，意思是剩余2小时8分钟。

Firefox 中文版的这个翻译确实不怎么样。
