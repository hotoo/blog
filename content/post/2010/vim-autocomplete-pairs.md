
# Vim 自动补全成对的括号和引号

- template: post.html
- pubdate: 2010-06-20
- tags: Vim

----


炫日分享了一个 [自动补全成对的括号](http://aoyme.wordpress.com/2010/05/31/%E5%9C%A8vim%E4%B8%AD%E5%B0%86%E6%8B%AC%E5%8F%B7%E8%87%AA%E5%8A%A8%E8%A1%A5%E5%85%A8%EF%BC%9A/)
的脚本，【注】：原文代码中引号被转义成了中文引号，下面是修正后的脚本。

```
inoremap ( ()<ESC>i
inoremap ) <c-r>=ClosePair(')')<CR>
inoremap { {}<ESC>i
inoremap } <c-r>=ClosePair('}')<CR>
inoremap [ []<ESC>i
inoremap ] <c-r>=ClosePair(']')<CR>
inoremap < <><ESC>i
inoremap > <c-r>=ClosePair('>')<CR>

function ClosePair(char)
    if getline('.')[col('.') - 1] == a:char
        return "\<Right>"
    else
        return a:char
    endif
endf
```


经启发我增加了对括号和引号更为智能的补全支持，
不过中文全角的括号和引号目前无法通过映射来实现，
对于转义的符号对的支持不佳。

支持 2000 行以内（可以根据系统性能自行配置）文档的全局括号对识别能力。
也就是 2000 行以内的文档，支持跨行的括号对智能匹配能力；当文档行数超出预设值，
则使用行内括号对智能补全。

* OpenPair:
    1. 如果当前行的括号已经成对匹配，则自动补全右括号 `(I)`
    1. 如果左括号比右括号多，则自动补全  `I(()` `(I()` `((I)` `(()I`
    1. 如果左括号比右括号少，<br />
        `I())` 原样输出，不自动补全<br />
        `(I))` 同上<br />
        `()I)` 同上<br />
        `())I` 自动补全：左括号较少，且光标之后字符串进行一次递归上面的条件
* ClosePair:
    1. 如果光标之后是一个右括号，向右移动一列 `(I)` `((I)` `(I))` `()I)`
    1. 否则原样输出。

代码见 [gist: 449512](http://gist.github.com/449512)

## 更新 (2010/6/24)

## 最后更新 (2010/7/9)

## 相关脚本

* [delimitMate.vim](http://www.vim.org/scripts/script.php?script_id=2754)
  ([src](http://github.com/Raimondi/delimitMate))
* [Making Parenthesis And Brackets Handling Easier](http://vim.wikia.com/wiki/Making_Parenthesis_And_Brackets_Handling_Easier)
