
# gitopen, smart partner of git, hg and svn.

- template: post.html
- pubdate: 2015-07-24
- tags: git

----

使用 Git 的你，想必会更喜欢在终端（命令行）中使用 Git。在终端中，可以将 Git
的特性发挥的淋漓尽致。

```
$ git co -b feat-sample
$ git add .
$ git ci -m "feat(sample): Add sample commit."
$ git push origin feat-sample
```

咦，我想立即提交一个 Pull/Merge Request 怎么办，还要打开浏览器，输入 Git
仓库的 URL 地址，点击进入 PR 列表，再点击新建 PR，选择 feat-sample 分支，
点击确认按钮，balabala...

嗯，好麻烦。

于是 Git 的最佳伴侣 [gitopen](https://github.com/hotoo/gitopen) 横空出世了。

push 了新分支，想立即提交 PR/MR，So simple.

```
$ gitopen pr
```

她会把当前分支提交一个新的 PR。

如果你是使用的 GitHub，在发布了新版时可能还想写个 Release Note：

```
$ git tag 1.0.0
$ git push origin 1.0.0
$ gitopen release new 1.0.0
```

咦，有个新的想法，提交个 Issue 先：

```
$ gitopen issue
```

再来个 milestone 尝尝：


```
$ gitopen milestone
```

这货支持

* git, hg, svn.
* Mac OS X, Linux, Windows.
* GitHub (Enterprise), GitLab (CE, EE), BitBucket (Atlassian), GitCafe (Enterprise) ...

更多功能参考：

```
$ npm install gitopen -g
$ gitopen @hotoo/gitopen
```
