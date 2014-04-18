
# 样式表的书写风格

- template: post.html
- pubdate: 2009-08-12
- tags: CSS

----

按照样式定义的用途归类，采用横排+竖排结合的书写方式。

* 如果定义较少，则直接放在同一行即可。
* 否则，每一行书写同一类型的样式定义（如字体控制），
    不同类型的样式定义则放在不同的行。

另外，个人偏好：

* 第一个定义总是顶住左花括号，显得紧凑点，最后一个定义也紧靠着右花括号；
* 每个定义间用 1 个空格分隔；
* 每组定义从第 2 行开始都相对第 1 行缩进 2 个空格，每组定义间有层级关系的则缩进4个空格。
* 与“淘宝的css属性顺序书写规范^1^”不同的，我倾向于将color定义和
    background-color和border放在一起，因为他们都（可能）有颜色值的控制，
    也较常改变，而字体本身一般来说是不变的。

```css
.box{display:block; position:absolute; float:left; clear:both; cursor:pointer; /*...显示属性*/
  margin:0; padding:0; width:auto; height:auto; /*...盒模型*/
  vertical-align:top; white-space:normal; text-decoration:none; text-align:left; /*...排版*/
  color:#fff; font:15pt/17pt bold "Arial" normal; content:"."; /*...文字*/
  border:1px solid #ccc; background:transparent none; /*...边框背景*/}

    .box h3{/*...*/}

    .box p{/*...*/}
```

横排+竖排书写风格演示，参考“淘宝的css属性顺序书写规范”。

[http://farm4.static.flickr.com/3547/3814038548_230aa17c50_o.png](http://www.flickr.com/photos/hotoo/3814038548/)

## 参考阅读

* [CSS样式表书写风格](http://blog.rexsong.com/?p=425)
* [再谈CSS样式表书写风格](http://blog.rexsong.com/?p=5968)
* [淘宝的css属性顺序书写规范](http://www.google.com/search?hl=en&newwindow=1&q=%E6%B7%98%E5%AE%9D%E7%9A%84css%E5%B1%9E%E6%80%A7%E9%A1%BA%E5%BA%8F%E4%B9%A6%E5%86%99%E8%A7%84%E8%8C%83&lr=lang_zh-CN%7Clang_zh-TW&aq=f&oq=&aqi=)
  （出处未知，似乎是淘宝 [段正淳](http://htmlcssjs.com/blog/) 的作品，
    但是其博客及淘宝UED博客都无找到原版）^1^
