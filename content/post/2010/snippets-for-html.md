
# 针对 HTML 的 Snippets

- template: post.html
- pubdate: 2010-04-06
- tags: Vim, snipMate, HTML

----


```
# @see http://www.blueidea.com/tech/web/2009/6547.asp
snippet cc:ie
  <!--[if IE${1}]>${2}<![endif]-->${3}
snippet cc:ie5
  <!--[if IE 5]>${1}<![endif]-->${2}
snippet cc:noie5
  <!--[if !IE 5]>${1}<![endif]-->${2}
snippet cc:ie6
  <!--[if IE 6]>${1}<![endif]-->${2}
snippet cc:ie6+
  <!--[if gt IE 6]>${1}<![endif]-->${2}
snippet cc:ie6+=
  <!--[if gte IE 6]>${1}<![endif]-->${2}
snippet cc:ie6-
  <!--[if lt IE 6]>${1}<![endif]-->${2}
snippet cc:ie6-=
  <!--[if lte IE 6]>${1}<![endif]-->${2}
snippet cc:noie6
  <!--[if !IE 6]>${1}<![endif]-->${2}
snippet cc:ie7
  <!--[if IE 7]>${1}<![endif]-->${2}
snippet cc:ie7+
  <!--[if gt IE 7]>${1}<![endif]-->${2}
snippet cc:ie7+=
  <!--[if gte IE 7]>${1}<![endif]-->${2}
snippet cc:ie7-
  <!--[if lt IE 7]>${1}<![endif]-->${2}
snippet cc:ie7-=
  <!--[if lte IE 7]>${1}<![endif]-->${2}
snippet cc:noie7
  <!--[if !IE 7]>${1}<![endif]-->${2}
snippet cc:ie8
  <!--[if IE 8]>${1}<![endif]-->${2}
snippet cc:ie8+
  <!--[if gt IE 8]>${1}<![endif]-->${2}
snippet cc:ie8+=
  <!--[if gte IE 8]>${1}<![endif]-->${2}
snippet cc:ie8-
  <!--[if lt IE 8]>${1}<![endif]-->${2}
snippet cc:ie8-=
  <!--[if lte IE 8]>${1}<![endif]-->${2}
snippet cc:noie8
  <!--[if !IE 8]>${1}<![endif]-->${2}
# @see http://code.google.com/p/zen-coding/wiki/ZenHTMLElementsEn
snippet link:css
  <link rel="stylesheet" type="text/css" href="${1:style.css}" media="${2:all}" />
snippet link:icon
  <link rel="shortcut icon" type="image/x-icon" href="${1:favicon.ico}" />
snippet link:favicon
  <link rel="shortcut icon" type="image/x-icon" href="${1:favicon.ico}" />
snippet link:rss
  <link rel="alternate" type="application/rss+xml" title="${1:RSS}" href="${2:rss.xml}" />
snippet link:atom
  <link rel="alternate" type="application/atom+xml" title="${1:Atom}" href="${2:atom.xml}" />
```
