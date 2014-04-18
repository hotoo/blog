
# 转换 Vimwiki 为 Markdown

- template: post.html
- pubdate: 2014-03-31
- tags: Vimwiki, Markdown

----

> `sed -f ex -i *.md`

## README

相对 Wiki 语法，和 Wiki 对应工具支持情况，我更加喜欢 Markdown 了。
本地配合使用 Vimwiki 来编辑查看，发布使用 nico 来转换，而且有 Github 的原生支持，
使用 Markdown 是不二之选。

为了减少转换工作量，我简要写了这个脚本，可以初步将 vimwiki 语法的项目，
自动转换成 markdown 语法。

<!--more-->

转换的内容包括：

* header
* codes
* wikiword.
* links
* images
* comments
* %toc
* %title
* %nohtml

## Usage

假设上面的脚本保存结构如下：

```
/
|- convert.sh
|- ex
|- vimwiki/
  |- index.wiki
  `- vim.wiki
```

在 convert.sh 同级目录执行：

```
$ ./convert.sh vimwiki/*.wiki
```

然后自动或手动调整之后，删除 `.wiki` 文件即可。


## Codes

### convert.sh

```bash
#!/usr/bin/env bash

for x
do
  filename=$(echo $x|sed -e "s/\.wiki$/.md/")
  sed -f ex $x > $filename
done
```

### ex

```
s/# \(.*\)$/* \1/g
s/^= \(.*\) =$/# \1/g
s/^== \(.*\) ==$/## \1/g
s/^=== \(.*\) ===$/### \1/g
s/^==== \(.*\) ====$/#### \1/g
s/^===== \(.*\) =====$/##### \1/g
s/^====== \(.*\) ======$/###### \1/g
s/{{{class="brush: *\([^"]*\)"/\`\`\`\1/g
s/{{{class="\([^"]*\)"/\`\`\`\1/g
s/{{{/\`\`\`/g
s/}}}/\`\`\`/g
s/\[\([^] ]\{1,\}\)\]\([^](]\)/![pic](\1)\2/g
s/\[\([^] ]\{1,\}\)\]$/![pic](\1)/g
s/\[\[\(\([^|]\{1,\}\)\|\)\([^]]\{1,\}\)\]\]/[\3](\2.md)/g
s/\[\[\([^]]\{1,\}\)\]\]/[\1](\1.md)/g
s/\[\(https\{0,1\}:\/\/[^ ]*\) \([^]]*\)\]/[\2](\1)/g
s/%% \(.*\)/<!-- \1 -->/g
/%toc.*/d
s/%title \(.*\)/# \1/g
s/%nohtml/- status: draft/g
```
