
# 带套翻墙

- template: post.html
- pubdate: 2009-10-24
- tags: GFW

----

因为众所周知的原因(?)，最近GFW变本加厉，穷凶极恶，处处昭示着它即将灭亡的预兆。
不过在它消亡的前夕，我们还是需要翻墙来争取自己的自由，戴套就是一种不错的方法。
不过最近的套套出了点问题，下面讲修复的办法：

1. 到这里下载 [Tor Cache](http://www.filedropper.com/tor)
1. 然后将里面的文件释放到（%USER% 替换成你的计算机用户）：
    * Windows XP(?): `C:\Documents and Settings\%USER%\Application Data\Tor`
    * Vista: `C:\Users\%USER%\AppData\Roaming\Application Data\Tor\torrc`
    * Windows 7: `C:\Users\%USER%\AppData\Roaming\Vidalia`

1. 启动 Vidalia ，在设置里面，设置”高级”，配置目录为（不同操作系统参考上面及实际地址，
    下面以XP为例）：

    Tor Configuration File:<br>
    `C:\Documents and Settings\%USER%\Application Data\Tor\torrc`<br />
    Data Directory:<br>
    `C:\Documents and Settings\%USER%\Application Data\Tor`


## 参考：

* [连不上 tor 的解决方法](http://www.bugx.org/128)
* [关于近期 Tor 无法连接的问题，请统一在此帖中问、答，谢谢。](http://tieba.baidu.com/f?kz=647422480)
* [ Tor Cache 和使用方法](http://tieba.baidu.com/f?kz=647146360)
* [近期用不了 tor 的同学请进（zt）](http://tieba.baidu.com/f?kz=647221300)
* [连不上TOR了](http://tieba.baidu.com/f?kz=646922417) (参考第30条回复)
* [Tor.zip](http://www.filedropper.com/tor)
* [连不上 tor 的解决方法（综合）](http://blog.sina.com.cn/s/blog_5e9836180100fti1.html)
