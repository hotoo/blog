
# 配置 Vim 作为 C++ 开发环境初步

- template: post.html
- pubdate: 2009-10-19
- tags: Vim, Cpp

----

一般来说，如果你使用 Vim 开发完整的项目，使用 Makefile 并直接 `:make` 就可以了。

将下面的代码写入到 vimrc 中， Vim 会捕获编译过程中出现的消息并显示在 Quickfix 窗口。

```
autocmd FileType cpp,c nmap <F9> :make<CR> :copen<CR> <C-W>10_
```

但是如果你是 C/C++ 新手，目前较多书写单个的 C/C++ 代码文件，或者只是想快速测试
某段代码的话，使用 gcc/g++ 直接编译或许是更简单的方式。你可以直接在 Vim 中执行
外部 gcc/g++ 命令，也可以想这样映射快捷键：

```
autocmd FileType cpp nmap <F10> :w<cr>:exe "!gcc -o ".expand("%:r").".exe ".expand("%")<cr>
```

不过这样使用外部命令， Vim 并不能捕获编译过程的输出消息，就无法在 Vim 中根据
错误消息有效的定位到错误行了。

有更好的方法：

```
autocmd FileType cpp nmap <F10> :w<cr>:exe ":set makeprg=g++\\\ -Wall\\\ -o\\\ ".expand("%:r").".exe\\\ ".expand("%")<cr>:make<cr><cr>:cw<cr>
autocmd FileType c nmap <F10> :w<cr>:exe ":set makeprg=gcc\\\ -Wall\\\ -o\\\ ".expand("%:r").".exe\\\ ".expand("%")<cr>:make<cr><cr>:cw<cr>
autocmd FileType cpp,c nmap <F5> :exe "!".expand("%:r").".exe"<Left>
autocmd FileType javascript nmap <F9> :call JsonLint()<cr>
```

再补充映射一些 Quickfix 模式中快速跳转的快捷键：

```
map <F4> :cclose<CR>
map <F8> :cn<CR>
map <F7> :cp<CR>
```

完整的设置可以参考 [我的 vimrc](http://hotoo.googlecode.com/svn/trunk/vim/_vimrc)

更多讨论 [看这里](https://groups.google.com/group/vim-cn/browse_thread/thread/79652cb66297881f)。

## 参考

* [vim 使用进阶: 剑不离手 – quickfix](http://easwy.com/blog/archives/advanced-vim-skills-quickfix-mode/)
    [2](http://blog.zdnet.com.cn/html/30/422230-2881199.html)
