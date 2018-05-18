# Git 提效篇

- template: post.html
- pubdate: 2017-05-12
- tags: Git

----

集团的流程工具会生成一团奇形怪状的分支名称，要记忆这些分支名是一项难题，默认的
`git branch` 列出的本地分支都是几乎无法识别的乱码，如何快速标识、识别、打开这些丑陋的分支名呢？

## 1. 备注分支

```bash
$ git config branch.WTF01942367_20170510_wtfbffweb.description "什么鬼迭代 1.0"
$ git branch
  WTF01730954_20170224_wtfbffweb
  WTF01785082_20170316_wtfbffweb
  WTF01824187_20170329_wtfbffweb
* WTF01942367_20170510_wtfbffweb
$ git config branch.WTF01942367_20170510_wtfbffweb.description
什么鬼迭代 1.0
```

还可以使用 `git branch --edit-description` 命令编辑复杂的备注信息。

<!--more-->

## 2. 显示备注

默认 `git branch` 列出的本地分支不会附带备注信息，git 内置的
`git config branch.{branch_name}.description` 可以显示单个分支的备注。

以下方法可以一次性列出所有分支，并附上各个分支对应的备注信息。

```bash
$ npm i -g git-br

$ git br
  WTF01730954_20170224_wtfbffweb 什么鬼迭代 0.1
  WTF01785082_20170316_wtfbffweb 什么鬼迭代 0.2
  WTF01824187_20170329_wtfbffweb 什么鬼迭代 0.3
* WTF01942367_20170510_wtfbffweb 什么鬼迭代 1.0
```

## 2. 分支别名

上面的方法备注了一团乱码的分支名，但真正要切换到这种分支时，仍然需要 `git br`
列出所有分支，并从中找出目标分支，复制，`git co <C-v>`。

有没有更便捷的方法呢，答案是肯定的。

### git symbolic-ref

Git 内置了强大的 symbolic-ref 方法，可以给分支增加引用（别名）：

```bash
$ git symbolic-ref refs/heads/{分支别名} refs/heads/{目标分支名}
$ git symbolic-ref refs/heads/v1.0 refs/heads/WTF01942367_20170510_wtfbffweb
$ git co v1.0
Switched to branch 'v1.0'
; 这时候会切换到 WTF01942367_20170510_wtfbffweb
$ git pull origin v1.0
$ git checkout feat/one
$ git rebase v1.0
```

### git-branch-alias

直接使用 symboilc-ref 虽然可以满足需求，但是用起来非常不方便，这时候可以使用
git-branch-alias 工具来方便管理分支别名。

```bash
$ npm i -g git-branch-alias

; 给当前分支设置别名
$ git co WTF01942367_20170510_wtfbffweb
$ git bralias v1.0

; 或者指定目标分支名称
$ git branch-alias v1.0 WTF01942367_20170510_wtfbffweb
```

## 提交 MR/PR 时自动找到找到目标分支

特性分支需要合并到迭代分支、主干分支时，要手工找到目标分支也是很困难的，这时候
可以使用 [gitopen](https://github.com/hotoo/gitopen) 这个小工具来帮忙。

```bash
$ npm i -g gitopen
$ git checkout feat/one
$ git push origin feat/one
$ gitopen mr
```

gitopen 会自动找到目标分支，并打开创建 MR 的在线地址，一键提交 MR。

gitopen 还有很多其他方便的特性。

## 参考

- https://github.com/bahmutov/git-branches
- https://github.com/hotoo/gitopen
- https://github.com/hotoo/git-branch-alias
- https://gist.github.com/mauricerkelly/0b12b20a870d1e38081e
