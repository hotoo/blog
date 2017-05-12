
# 时髦的 Git Diff

- template: post.html
- pubdate: 2017-04-09
- tags: Git, Diff
- status: draft

----

## 安装

```bash
$ npm i -g diff-so-fancy
```

## 使用

简单的一次性使用：

```bash
$ git diff --color | diff-so-fancy
```

git diff 默认时髦模式

```bash
$ git config --global core.pager "diff-so-fancy | less --tabs=4 -RFX"
```

.gitconfig

```
[core]
	pager = diff-so-fancy | less --tabs=4 -RFX
[pager]
  ; diff = diff-so-fancy
[color]
  pager = true
```

.gitconfig

```
[color "diff"]
  meta = 242 238
  frag = 239 236
  old = 167 normal
  new = 030 normal
  context = 240
  commit = 246 024

[color "diff-highlight"]
  ; oldHighlight = red bold 52
  ; oldNormal = red bold
  ; newHighlight = green bold 22
  ; newNormal = green bold

[page]
  log = diff-highlight | less
  show = diff-highlight | less
  diff = diff-highlight | less

[interactive]
  diffFilter = diff-highlight
```

## 参考

- https://github.com/so-fancy/diff-so-fancy/
