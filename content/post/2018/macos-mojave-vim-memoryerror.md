# macOS Mojave 的 Vim 出现 Exception MemoryError

- template: post.html
- pubdate: 2018-09-29
- tags: MacOS
- status: draft

----

手贱升级到 macOS Mojave，惊喜的地方不多，问题却遇到了不少，其中之一就是终端的 vim
运行不起来了。启动时直接抛出 `Vim: Caught deadly signal SEGV` 退出。

```bash
Vim: Caught deadly signal SEGV
Error detected while processing function <SNR>120_PollServerReady[7]..<SNR>120_Pyeval:Vim: Finished.

line    4:
Exception MemoryError: MemoryError() in <module 'threading' from '/System/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/threading.pyc'> ignored
[1]    1040 segmentation fault  vim
                                   %
```

Google 了相关关键字都没找到相关的问题。

看错误信息是 Python MemoryError 异常，其中还有 `function <SNR>120_PollServerReady`
相关信息，于是判断是有 Vim 插件
