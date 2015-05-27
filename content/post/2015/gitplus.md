
# git+, a hack of git, smart for you.

- template: post.html
- pubdate: 2015-05-27
- tags: git

----

为了信息安全，公司搭建了 gitlab.company.com 管理代码，同时限制了必须使用工作邮箱
hotoo@company.com 进行提交。

公司 gitlab 有大大小小很多仓库，不时的需要 clone 代码下来，有时忘记设置就开始提交，
提交了几次开始 push 到 gitlab 并准备提交 MR 时发现，push 被拒绝，或者 MR 无法
自动合并，因为没有使用公司的邮箱进行提交。只好取消之前的提交操作，修改邮箱配置
之后重新提交。

虽然 clone 下来配置一次就可以了，但是每个仓库都需要配置，每次 clone 都需要配置，
忘记设置了需要取消之前的提交并再来一次。

有没有办法自动进行配置呢？

于是 [gitplus](https://github.com/hotoo/gitplus) 出现了，它可以根据 git
的子操作命令，及其所在的仓库信息，自动的执行指定命令，帮助你完成一些自动化任务。
例如：

```
post-clone:
  gitlab.company.com:
    - git config user.name hotoo
    - git config user.email hotoo@company.com
pre-commit:
  '*':
    - jshint .
```

* 有了 gitplus，你再也不会忘记设置公司邮箱。因此也不需要取消提交再重复提交了。
* 还可以在提交前自动做校验工作。没有 gitplus 之前你只能给每个仓库设置 pre-commit hooks。
* 你也可以发挥自己的想象力，做更多其他的事情。
