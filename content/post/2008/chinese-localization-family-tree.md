
# 汉化Family Tree Builder

- template: post.html
- pubdate: 2008-11-21
- tags: Tools, Family Tree

----

前文有言 [理想的族谱软件Family Tree Builder](family-tree-builder-professional-genealgy-software.md) 说虽有中文站，
但是软件本身没有中文化，因为很喜欢并且很需要这款软件，就自己动手汉化了过来。

![pic](http://3.bp.blogspot.com/_POl6bUDELqY/SSbaNcRhqkI/AAAAAAAAGp0/Y6WjfhFSPqg/s400/family+tree+builder.jpg)

汉化原理很简单：

* 备份软件安装目录下，Lang子目录中的English.lang（也可以是其他国家的语言文件）。
* English.lang其实属于一种属性文件（properties），将每一行的第二部分翻译成中文
  （或合适的文本）即可。
* 备份安装目录下，Res子目录中的English.bmp图片。
* 制作一张32x28像素，bmp格式的中国国旗图片，命名为English.bmp，放到Res目录。
* 启动程序，菜单“工具(Tools)”-“选项(Options)”，<br />
    “名字(Names)”-“Display people's names”设置为 `Last First (Armstong John)`，<br />
    即让姓氏(Last Name)放在名字(First Name)之前，符合中文习惯。<br />
    “日期(Dates)”，Day/Month/Year format 设置为 `%y%-%m%-%d%`，<br />
    “Month/Year format”设置为 `%y%-%m%`。可以根据自己的习惯设置，<br />
    其中 `%m%` 是使用英文短格式，如Mon，在English.lang改为数字即可。

注意：部分文本不可以翻译为中文，如日期选择按钮类的，提示文本为中文时，显示乱码。
另外程序本身左侧的列表(List)的姓名列，中文也显示列表（好像所有List View都不支持中文）。

下载文件 [托管在Google Code](http://code.google.com/p/familytreebuildercn/) 上，
同时支持SNV提交，有兴趣的朋友联系我，希望大家来共同完成。
