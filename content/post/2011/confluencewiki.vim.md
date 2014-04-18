
# Confluence Wiki for Vi

- template: post.html
- pubdate: 2011-12-04
- tags: Vim, Wiki, Confluence

----

.ctags / ctags.cnf

```
--langdef=confluencewiki
--langmap=confluencewiki:.wiki
--regex-confluencewiki=/^h1.[ \t]+(.+)$/\1/h,header/
--regex-confluencewiki=/^h2.[ \t]+(.+)$/. \1/h,header/
--regex-confluencewiki=/^h3.[ \t]+(.+)$/.   \1/h,header/
--regex-confluencewiki=/^h4.[ \t]+(.+)$/.     \1/h,header/
--regex-confluencewiki=/^h5.[ \t]+(.+)$/.       \1/h,header/
--regex-confluencewiki=/^h6.[ \t]+(.+)$/.         \1/h,header/
```

.vimrc / _vimrc

    let tlist_confluencewiki_settings = 'confluencewiki;h:Headers'

这玩意很好使，同样是 .wiki 后缀，可以同时支持 Vimwiki 和 Confluence Wiki。

## See Also

* http://www.vim.org/scripts/script.php?script_id=1994
