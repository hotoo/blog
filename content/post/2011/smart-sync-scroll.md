
# 智能同步滚动条

- template: post.html
- pubdate: 2011-09-01
- tags: JavaScript

----


| Browser | documentElement.scrollTop | body.scrollTop |
|---------|---------------------------|----------------|
| IE      | √                        | ×             |
| Firefox | √                        | ×             |
| Chrome  | ×                        | √             |
| Safari  | ×                        | √             |
| Opera   | √                        | ×             |

TODO: 其他的 get 方式。尝试智能判断是否设置成功，非通过浏览器性别判断。
