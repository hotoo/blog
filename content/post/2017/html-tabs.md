
# HTML Tabs 最佳实践

- template: post.html
- pubdate: 2017-03-21
- tags: Code, Tabs

----

Tabs 面板的显示和隐藏一般以 display 来控制显示和隐藏，但是如果默认未显示的 Tabs 面板中渲染需要知道面板宽高的组件
（如 Canvas，某些轮播组件等）时，就会因为面板在 display:none 的状态下无法拿到宽高导致渲染组件异常。

这里建议 Tabs 使用 position:absolute 来将不可见的组件移动到用户不可见的负坐标区域，需要时再将面板移动到可见区域，
来避免面板不可见时渲染内部组件异常的问题。而且也可以做一些滑动显示的动画效果。

<!-- more -->

简单示例代码：

HTML:

```html
<div class="tabs">
  <ol class="tabbar">
    <li class="active"><a href="#tab1">Tab 1</a></li>
    <li><a href="#tab2">Tab 2</a></li>
  </ol>
  <ol class="tabpanel">
    <li class="active">
      Tab Panel 1
    </li>
    <li>
      Tab Panel 2
    </li>
  </ol>
</div>
```

LESS:

```less
.tabs {
  .tabpanel {
    position: relative;
    li {
      position: absolute;
      top: -999999px;
      left: -9999px;
      width: 100%; /* 避免浮动导致宽度不对 */
    }
    li.active {
      /* 不要使用 position:absolute 并且改变坐标的方式，
       * 避免 Tabs 脱离文档流，父元素高度为 0，导致下面的其他元素错位。
       */
      position: static;
    }
  }
}
```

## 切换 Tab 时，面板所在位置问题

无论使用 display 还是 position 方案，切换 tab 的时候，面板的位置会停留在上个显示的面板离开时的同一位置（默认是 0）。

有两个解决方案：

1. 对于可以固定面板高度的场景（如整个页面都是 Tab），固定面板容器的高度，则 position 方案在切换 Tab 的时候，
  默认就定位在当前面板之前停留的位置，但是需要使用 iScroll 类似的方案来实现上下拉回弹，及刷新、加载更多的功能
  （也可以使用 Native 默认的上下拉回弹功能，但是 Tabbar 会随着整个 webview 一起拉动，体验不是太好）。
2. 切换 Tab 时，记录各个面板的所在位置，切换回来时使用 scrollTo(x, y) 的方式来滚动到面板上次的位置。
