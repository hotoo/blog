
# 周数(Week Number, WeekNum)计算

- template: post.html
- pubdate: 2010-03-16
- tags: JavaScript, 算法

----


jQuery UI v1.8rc 版的日历控件已经非常完善，比之 v1.7.1 已经支持显示周数(WeekNum)，
而且计算 WeekNum 的算法可以自定义；而 [My97DatePicker](http://www.my97.net/dp/demo/index.htm)
的算法又有Bug。对于两年交接的周，有两种常见的算法：

每年 1月 1日所在的周均为该年的第 1周（如MS Excel的WeekNum()函数和 jQuery 实现）；

```js
/* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
   @param  date  Date - the date to get the week for
   @return  number - the number of the week within the year that contains this date */
iso8601Week: function(date) {
    var checkDate = new Date(date.getTime());
    // Find Thursday of this week starting on Monday
    checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
    var time = checkDate.getTime();
    checkDate.setMonth(0); // Compare with Jan 1
    checkDate.setDate(1);
    return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
},
```

每年最后 1天所在的周

```js
/**
 * @param date {Date} 每周第 1天。
 * @return {Number}
 */
calculateWeek:function(date){
    var d = new Date(date.getTime()+(6*86400000)), t=d.getTime();
    var start = new Date(d.getTime()); start.setMonth(0); start.setDate(1);
    return Math.floor((t - start.getTime())/86400000/7)+1;
}
```


而从自然语言中来说，这交接的一周即可以是头一年的最后一周，也可以是后一年的第 1周。
