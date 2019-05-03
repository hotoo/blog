# 可恢复的 rm 删除

- template: post.html
- pubdate: 2019-03-04
- tags: rm, Trash, Mac, Terminal

----

用过终端（Terminal）的人都知道， rm 删除的文件，不会像 Mac Finder 里删除文件、文件夹
一样，会先进入到废纸篓（Trash），一旦 rm 删除，就很难撤销、恢复。

但是作为程序员，做终端里 rm 删除文件是稀松平常的事，那么如何保障在终端中可以放心
大胆的删除文件、文件夹，而不用担心误删后不可恢复呢？

最直接的想法就是 rm 删除的文件也像 Finder 一样先进废纸篓。

<!--more-->

我网上搜寻一番，发现了以下几个工具：

## AppleScript

在 [Mac 下使用命令行或脚本删除文件到废纸篓](https://blog.csdn.net/TinyJian/article/details/78195316)
这篇文章中介绍，Mac Finder 中删除的文件其实是进入到 ~/.Trash 文件夹。
但是如果简单的讲文件 mv 到 ~/.Trash 文件夹，是无法做废纸篓里右键恢复到原处的，
因为这个移动操作没有记录完整的操作行为。

通过 AppleScript 可以通知 Finder 删除文件：

```bash
#!/bin/bash

fp=/absolute/path/to/file
osascript << EOF
tell application "Finder"
    posix path of ((delete posix file "${fp}") as unicode text)
end tell
EOF
```

优点：

1. 删除时有声效。
2. 有操作记录可“放回原处”。

缺点：

1. 首次使用是有授权提示，可接受。

## rmtrash 1

在网上找到好几个不同版本但命名相同的 rmtrash 程序，有的是 shell 脚本，有的是
Xcode 程序。

```bash
brew install rmtrash

vi ~/.bashrc
alias rm='rmtrash'
source ~/.bashrc
```

缺点：

1. 删除时没有声效。
2. 在废纸篓不可直接“放回原处”。

## rmtrash 2: Objective-C

- http://www.nightproductions.net/cli.htm

这个版本的 rmtrash 是用 Objective-C 编写的应用程序，但是版本有点老，下载安装好
rmtrash 发现并不能在 macOS Mojave (10.14) 中正常运行。

```
$ rmtrash
zsh: bad CPU type in executable: rmtrash
```

缺点：不支持 macOS Mojave。

## rmtrash 3: Shell

https://github.com/LaiJingli/rmtrash

从源码上看，被删除的文件是进入了自定义的 ~/.rmtrash/ 文件夹（这不是期望的），
另外还有一堆其他的功能，例如 list, mv, restore, empty。

缺点：代码写的太烂，我是不会用的。

## rm-trash: Shell

https://github.com/nateshmbhat/rm-trash

```bash
$ rm-trash ~/tmp
rm-trash: line 165: realpath: command not found
usage: dirname path
usage: cp [-R [-H | -L | -P]] [-fi | -n] [-apvXc] source_file target_file
       cp [-R [-H | -L | -P]] [-fi | -n] [-apvXc] source_file ... target_directory
Error copying the /Users/hotoo/tmp to trash. Trying to move /Users/hotoo/tmp with the name /Users/hotoo/tmp (0)
```

不过 ~/tmp 实际已被删除到未知域。

优点：

1. 支持 Linux。
2. 代码写的很漂亮。

缺点：

1. 不太支持 macOS，可以删除文件但在 macOS 下执行有报错。
2. 删除的目录不是 macOS 的 .Trash 目录，无法在 macOS 的废纸篓中找到并放回原处。
3. 安装有点麻烦。

## rmtrash: Shell

https://github.com/PhrozenByte/rmtrash

## rmtrash for Mac OS X: Objective-C

- https://github.com/sebikeller/rmtrash-for-Mac-OS-X

## 参考

- [Why doesn't the 'rm' command dump file in Trash?](https://apple.stackexchange.com/questions/194672/why-doesnt-the-rm-command-dump-file-in-trash/194868)
- [How can I make 'rm' move files to the trash can?](https://apple.stackexchange.com/questions/17622/how-can-i-make-rm-move-files-to-the-trash-can)
- https://github.com/andreafrancia/trash-cli
- [回收站功能在 Linux 中的实现](https://www.ibm.com/developerworks/cn/linux/1410_licy_linuxtrash/)

## 总结

基于上面的这么多的对比，我实现了一个便于安装、使用的脚本，欢迎使用。

https://github.com/hotoo/rm-trash

```bash
$ npm i -g rm-trash
```
