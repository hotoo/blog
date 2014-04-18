
# 计算主域名

- template: post.html
- pubdate: 2011-12-13
- tags: JavaScript

----


```js
document.domain = document.domain.split(".").slice(-2).join(".");
```
