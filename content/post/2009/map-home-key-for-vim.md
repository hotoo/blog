
# Vim映射Home键到首个非空字符

- template: post.html
- pubdate: 2009-10-22
- tags: Vim

----

许多编辑器有相关选项，可以直接设置让 `<Home>` 键在首个非空字符和行首之间跳转。

Vim 也有快捷键，normal 模式下：

* `0` 跳转到行首；
* `^` 跳转到首个非空字符；
* `$` 跳转到行尾。

目前未知跳转到最后一个非空字符的快捷键，有个网友提供了一个很好玩的技巧：

```
nmap <End> /\S\s*$<CR>:nohl<CR>
```

为了将 `<Home>`和 `End>` 键映射到其他编辑器常用的设置，我写了个可以用的代码，请高手不吝赐教。

```
" Dynamic bind <HOME> key
" if caret/cursor not at the frist non-white-space character
"   move caret/cursor to there
" else
"   move to beginning
function HomeBind(offset)
    let cursor=getpos('.')
    let s0=getline(line('.'))
    let s1=substitute(s0, "^\\s\\+", "", "")
    let x=len(s0)-len(s1)+1
    if col('.') == x-a:offset
        let x=1
    endif
    call setpos('.', [cursor[0], cursor[1], x, cursor[3]])
endfunction
imap <silent> <Home> <Esc>:call HomeBind(1)<cr>i
nmap <silent> <Home> :call HomeBind(0)<cr>
vmap <silent> <Home> <Esc>:call HomeBind(1)<cr>

" Dynamic bind <END> key
" if caret/cursor not at the end
"   move caret/cursor to there
" else
"   move to last non-white-space character.
function EndBind(offset)
    let cursor=getpos('.')
    let s0=getline(line('.'))
    let s1=substitute(s0, "\\s*$", "", "")
    let x=len(s0)+a:offset
    if col('.') == x
        let x=len(s1)+a:offset
    endif
    call setpos('.', [cursor[0], cursor[1], x, cursor[3]])
endfunction
imap <silent> <End> <Esc>:call EndBind(0)<cr>a
nmap <silent> <End> :call EndBind(0)<cr>
vmap <silent> <End> :call EndBind(0)<cr>
"nmap <End> /\S\s*$<CR>:nohl<CR>
```

## 参考

这里还有几个实现很优雅，但稍有问题的脚本：

* [SmartHome and SmartEnd over wrapped lines](http://vim.wikia.com/wiki/SmartHome_and_SmartEnd_over_wrapped_lines)
* [Crazy Home Key](http://www.vim.org/scripts/script.php?script_id=2772)
    [blog](http://chenkaie.blogspot.com/2009/09/vim-crazy-home-key-crazyhomekeyvim.html)
* [c9s: smart_home_end.vim](http://gist.github.com/214532)
