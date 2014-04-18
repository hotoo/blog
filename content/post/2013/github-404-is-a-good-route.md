
# Github 的 404 页面是个好路由

- template: post.html
- pubdate: 2013-03-24
- tags: Github, 404

----

上周五周会上 @玉伯 做了个微分享：由于新浪微博的 BUG，不会将 https 的 URL 自动
转成可点击的链接，于是玉伯给 lifesinger.github.com Project 做了个 index.html
页面：

```js
<script>
  var id = parseInt(location.search.substring(1))
  location.replace(
      'https://github.com/lifesinger/lifesinger.github.com/issues' +
          (id ? '/' + id : '?labels=blog'))
</script>
```

然后就可以通过 [http://lifesinger.github.com/?126](http://lifesinger.github.com/?126)
这个链接来访问对应的 issues (玉伯的博客使用 Github 的 issues 管理发布)

我看到这个 URL 第一感觉是不爽，立即想到可以用 404 页面来做路由跳转页，然后访问
地址可以改成 `http://lifesinger.github.com/126` 这样。

于是玉伯的分享完败，也为下一个我要做的分享加了分 XD

今天仔细想了想，使用 404 页面做路由跳转的思路本身很不错，
但是 `http://lifesinger.github.com/126` 这样的 URL 其实是不具有可扩展性的，
也没有良好的语义性，而且也不是很好验证 URL 的业务合法性。于是可以改成如下：

`http://lifesinger.github.com/blog/126`

好了，根据 URL 前缀信息，404 页面可以扩展成你需要的任意路由跳转页，
或者非路由的 404 原始页了。

散花~
