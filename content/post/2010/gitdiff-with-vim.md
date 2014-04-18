
# 用 gvim 比较 git diff

- template: post.html
- pubdate: 2010-08-01
- tags: Vim, Git

----


## for Windows

参考 [http://gist.github.com/502217 gist:502217]

1. 在用户目录下的 .gitconfig 中加入：

        [diff]
          external = git_diff_wrapper.bat
        [pager]
          diff =

1. 创建 git_diff_wrapper.bat 文件放到 $PATH 目录下，内容为：

        path\to\gvim.exe -d "%2" "%5"


        gvim -d "$2" "$5"

    注意其中的 path\to\ 要改为 gvim.exe 所在目录。

## for Linux

参考 [Git Diff with Vimdiff](http://technotales.wordpress.com/2009/05/17/git-diff-with-vimdiff/)
