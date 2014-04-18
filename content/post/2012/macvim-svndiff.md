
# 使用 MacVim 做 svn diff

- template: post.html
- pubdate: 2012-10-31
- tags: MacVim, Vim, SVN

----


## 对于终端的 vim

1. `~/.subversion/config`

    ```
    [helpers]
    diff-cmd = /usr/local/bin/svndiff
    ```

2. 将下面的代码保存为 svndiff：

    ```
    #!/bin/sh

    DIFF="/usr/bin/vimdiff"
    LEFT=${6}
    RIGHT=${7}
    $DIFF $LEFT $RIGHT
    ```

3. 拷贝到 `/usr/local/bin/svndiff` 并设置权限：

    ```
    sudo chmod +a /usr/local/bin/svndiff
    ```

## 对于 MacVim

修改 `/usr/local/bin/svndiff` 内容如下：

```
#!/bin/bash

LEFT=${6}
RIGHT=${7}
TMPLEFT="/tmp/${LEFT##*/}.$$"
TMPRIGHT="/tmp/${RIGHT##*/}.$$"

cp "$LEFT" "$TMPLEFT"
cp "$RIGHT" "$TMPRIGHT"

mvim --servername SVNDIFF --remote-tab-silent +"vertical diffsplit $TMPLEFT|wincmd w" "$TMPRIGHT"
sleep 0.1

SN=`mvim --serverlist | grep "SVNDIFF"`
until [ "$SN" == "SVNDIFF" ]; do
  sleep 0.1
  SN=`mvim --serverlist | grep "SVNDIFF"`
done

rm -f "$TMPLEFT" "$TMPRIGHT"
```

之前尝试过修改终端方案中的

```
DIFF="/usr/bin/vimdiff"
```

为：

```
DIFF="gvim -d"
```

未遂，右侧的代码会为空。

## See Also

* [svn diffの結果をMacVimで。](http://twitter.com/ntakushima/statuses/27518378028)
  * [diffwrap.sh](https://gist.github.com/629457)
