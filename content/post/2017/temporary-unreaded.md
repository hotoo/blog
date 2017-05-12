
# 暂时未读

- template: post.html
- pubdate: 2017-02-09
- tags: Code
- status: draft

----

```js
let lastUnreadTime = localStore.get('LAST_UNREAD_TIME') || 0;
const now = Date.now(); // 模拟规则中，now 可以是 [0,9]

let rules = [
  { startTime: 1, endTime: 5},
  { startTime: 3, endTime: 8},
];

//
const unread = rules.some(rule => {
  return lastUnreadTime < rule.startTime &&
    rule.startTime <= now && now <= rule.endTime;
});
```
