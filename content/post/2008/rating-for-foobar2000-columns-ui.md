
# Rating for Foobar2000 columns UI

- template: post.html
- pubdate: 2008-08-14
- tags: Music, Tools, Foobar2000

----

给Foobar2000 的Columns UI设置标星功能：

## I. 显示歌曲标星级别。

* 文件 -> 参数设置。
* 显示 -> Columns UI -> Playlist view。
* 切换到Columns页签，新建（New）一个列。

http://4.bp.blogspot.com/_POl6bUDELqY/SJ6_G0igVlI/AAAAAAAAD20/IMyH4NToL1c/s1600-h/viewRating.jpg

如图，Display里的代码是：

```
$if(%rating%,
$select(%rating%,
*,
**,
***,
****,
*****),
)
)
```

其实也可以简单是输入：`%rating%`。


## II. 设置标星级别功能。

* 右键播放列表某首歌曲 -> 标签 -> 管理脚本。
    http://3.bp.blogspot.com/_POl6bUDELqY/SKKI6GFCmTI/AAAAAAAAD3g/8mBCeRyB4k8/s320/0.right+menu.GIF
* 打开“批量标签”窗口。
    http://4.bp.blogspot.com/_POl6bUDELqY/SKKPQ-kgaBI/AAAAAAAAD3o/9a8J60zWdRM/s320/1.tags.GIF
* 点击“准备的任务”中的“添加”按钮，选择动作类型为“从另一个字段格式化值...”，确定。
    http://1.bp.blogspot.com/_POl6bUDELqY/SKKPbKbESKI/AAAAAAAAD3w/5FbcHoTmX68/s320/2.select+action.GIF
* 目标字段名：RATING <br />
    格式化原型：`$if($greater(6,$add(%RATING%,1)),$add(%RATING%,1),5)` <br />
    http://2.bp.blogspot.com/_POl6bUDELqY/SKKPrZHkhrI/AAAAAAAAD34/yPDpKB5d3gA/s320/3.0.format+add+value.GIF
* 保存为rating++，名称可以自定，点击“运行”按钮。
    http://3.bp.blogspot.com/_POl6bUDELqY/SKKPrqTAO5I/AAAAAAAAD4I/h9QuR4fIlow/s320/3.2.run.jpg
* 重复第3步。
* 重复第4步，目标字段名：RATING <br />
    格式化原型： `$if($greater(%RATING%,0),$sub(%RATING%,1),0)` <br />
    保存为：rating-- <br />
    点击“运行”按钮。


## III. 设置标星界面（操作按钮）：

* 右键工具栏，点击 Customise...
    http://2.bp.blogspot.com/_POl6bUDELqY/SKKgVMPR42I/AAAAAAAAD4Q/x3tqs58BTf4/s320/customise.JPG
* 添加(Add)一个按钮(button)，并点击Change...按钮。
    http://2.bp.blogspot.com/_POl6bUDELqY/SKKgVKCZ3zI/AAAAAAAAD4Y/8rHQn7SXnq4/s320/custonise+buttons.jpg
* Command group中选择“Context menu items”，Item group中选择“Now Playing item”，
    Command中选择“标签/脚本/rating++”。OK保存后回到Command picker窗口，设置按钮图片什么。
    注：支持bmp和png格式的图片，但是png图片如果有透明的部分，则可能不会显示。
    http://4.bp.blogspot.com/_POl6bUDELqY/SKKgVeJuaXI/AAAAAAAAD4g/ToVomGPvQSA/s320/command+picker.jpg
* 重复第2步。Command中选择“标签/脚本/rating--”其他雷同。
* 最后OK保存就可以了，下面是配置完成的界面，两个带星星的按钮功能分别是标星自减和自增。

![pic](http://4.bp.blogspot.com/_POl6bUDELqY/SKRIW4GiHEI/AAAAAAAAD4o/fN-UJ17Kp1Q/s320/foobar200.jpg)
