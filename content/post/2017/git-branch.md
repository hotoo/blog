
# Git 提效篇

- template: post.html
- pubdate: 2017-05-12
- tags: Git

----

## 分支备注

集团的流程工具会生成一团奇形怪状的分支名称，要记忆这些分支名是一项难题，默认的 `git branch` 列出的本地分支都是几乎无法识别的乱码，如果快速标识并识别出这些分支呢？

### 备注分支

```bash
$ git config branch.ANT01942367_20170510_wealthbffweb.description "小聚宝 2.1"
$ git branch
  ANT01730954_20170224_wealthbffweb
  ANT01785082_20170316_wealthbffweb
  ANT01824187_20170329_wealthbffweb
* ANT01942367_20170510_wealthbffweb
$ git config branch.ANT01942367_20170510_wealthbffweb.description
小聚宝 2.1
```

还可以使用 `git branch --edit-description` 命令编辑复杂的备注信息。

<!--more-->

### 显示备注

默认 `git branch` 列出的本地分支不会附带备注信息，git 内置的 `git config branch.{branch_name}.description` 可以显示单个分支的备注。

以下方法可以一次性列出所有分支，并附上各个分支对应的备注信息。

```bash
$ npm install git-br -g
$ git config --global alias.br !git-br
$ git br
  ANT01730954_20170224_wealthbffweb 资产质押 250
  ANT01785082_20170316_wealthbffweb 小聚宝 2.0
  ANT01824187_20170329_wealthbffweb 中间页
* ANT01942367_20170510_wealthbffweb 小聚宝 2.1
```

## 分支别名

上面的方法备注了一团乱码的分支名，但真正要切换到这种分支时，仍然需要 `git br` 列出所有分支，并从中找出目标分支，复制，`git co <C-v>`，有没有更便捷的方法呢，答案是肯定的。

### git symbolic-ref

Git 内置了强大的 symbolic-ref 方法，可以给分支增加引用（别名）：

```bash
$ git symbolic-ref refs/heads/{aliasName} refs/heads/{未知分支}
$ git co {aliasName}
Switched to branch '{aliasName}'
; 这时候会切换到 {未知分支}
```

## 参考

- https://github.com/bahmutov/git-branches
- https://gist.github.com/mauricerkelly/0b12b20a870d1e38081e
