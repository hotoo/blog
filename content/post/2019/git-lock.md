# Git index.lock

- template: post.html
- pubdate: 2019-07-11
- tags: Git

----

在使用 Git 时，突然提示 `fatal: Unable to create 'xxx/.git/index.lock': File exists.`

```
Another git process seems to be running in this repository, e.g.
an editor opened by 'git commit'. Please make sure all processes
are terminated then try again. If it still fails, a git process
may have crashed in this repository earlier:
remove the file manually to continue.
```

原来在使用较费时操作（例如可交互模式）时，Git 会生成一个 .lock 文件锁，
避免同时操作出现问题。正常情况下结束可交互模式时会自动删除 .lock 文件，
但是当使用强制手段终止这个较费时的操作时，可能会无法正常删除 .lock 文件。
下次再操作 Git 时，Git 发现目前项目正在被锁定无法操作，就会提示上面的信息。

如果你确定没有正在进行中的其他 Git 操作，可以手动删除 .lock 文件。

```bash
$ rm .git/index.lock
```
