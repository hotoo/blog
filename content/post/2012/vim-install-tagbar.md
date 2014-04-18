
# 在 Vim 上安装使用 Tagbar

- template: post.html
- pubdate: 2012-10-28
- tags: Vim

----


```
git clone https://github.com/mozilla/doctorjs.git –recursive
cd doctorjs
sudo make install
```

会提示将 NODE_PATH 加入到环境变量 ~/.bash_profile ：

```
export NODE_PATH=/usr/local/lib/jsctags/:$NODE_PATH
```

## See Also

* [Tagbar](http://majutsushi.github.com/tagbar/)
* [Support for additional filetypes](https://github.com/majutsushi/tagbar/wiki)
* [Vim学习 Jsctags](http://ahchoo.me/blog/2012/03/08/learn-vim-3-post/)
* [Doctor.js](https://github.com/mozilla/doctorjs) - jsctags.
* [.ctags](https://github.com/hotoo/dotfiles/blob/master/.ctags)
* [Awesome vim support for javascript with jsctags and taglist-plus](http://jezng.com/2011/03/vim-support-javascript-taglist-plus/)
* [更好的用vim浏览Javascript代码](http://hikejun.com/blog/2011/05/07/%E6%9B%B4%E5%A5%BD%E7%9A%84%E7%94%A8vim%E6%B5%8F%E8%A7%88javascript%E4%BB%A3%E7%A0%81/)
