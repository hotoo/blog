
# 每周异常：第 10期，异常评分算法

- template: post.html
- pubdate: 2013-09-25
- tags: 每周异常
- status: draft

----

> 本文同步发表于『[JavaScript 异常档案库](https://github.com/totorojs/javascript-exception-archives/issues/19)』，
> 欢迎 Star, Watch, Fork & Pull Request.


经过不知多少次的纠结、学习与尝试，我们来对异常评分算法做一个了结。

```js
function wilsonScore(phat, n, z){
  return (phat + z*z/(2*n) - z * Math.sqrt((phat*(1-phat)+z*z/(4*n))/n)) /
    (1+z*z/n);
}

function errorScore(error_pv, page_pv){
  var phat = error_pv * 1000 * 10 / page_pv;
  return wilsonScore(phat, page_pv, 1.96);
}
```

```sql
SELECT
  jserror.url AS url,
  jserror.pv AS pv,
  vist.pv_cnt AS page_pv,
  jserror.pv * 10000 / vist.pv_cnt AS pv_rate,
  jserror.uv AS uv,
  vist.client_ip_cnt AS page_uv,
  jserror.uv * 10000 / vist.client_ip_cnt AS uv_rate,
  (jserror.pv/vist.pv_cnt + 1.96*1.96/(2*vist.pv_cnt) - 1.96 * sqrt((jserror.pv/vist.pv_cnt*(1-jserror.pv/vist.pv_cnt)+1.96*1.96/(4*vist.pv_cnt))/vist.pv_cnt)) / (1+1.96*1.96/vist.pv_cnt) AS score,
  jserror.dt AS dt
FROM orgin_log_table vist
INNER JOIN(
  SELECT
    url,
    count(ip) as pv,
    count(distinct ip) AS uv,
    dt
  FROM jserror_origin_{YYYYMMDD-1D}
  WHERE
    file RLIKE '^https?://\\w+\\.example\\.com/'
    AND line != '0'
    AND top_level_domain = 'example.com'
    AND is_first_occur = '1'
  GROUP BY dt, url
) jserror
ON
  vist.full_url = jserror.url
  AND vist.dt = jserror.dt
  AND vist.pv_cnt > 10000
ORDER BY score DESC
```

## 参考

* [How Not To Sort By Average Rating](http://www.evanmiller.org/how-not-to-sort-by-average-rating.html)
* [基于用户投票的排名算法（一）：Delicious和Hacker News](http://www.ruanyifeng.com/blog/2012/02/ranking_algorithm_hacker_news.html)
* [基于用户投票的排名算法（二）：Reddit](http://www.ruanyifeng.com/blog/2012/03/ranking_algorithm_reddit.html)
* [基于用户投票的排名算法（三）：Stack Overflow](http://www.ruanyifeng.com/blog/2012/03/ranking_algorithm_stack_overflow.html)
* [基于用户投票的排名算法（四）：牛顿冷却定律](http://www.ruanyifeng.com/blog/2012/03/ranking_algorithm_newton_s_law_of_cooling.html)
* [基于用户投票的排名算法（五）：威尔逊区间](http://www.ruanyifeng.com/blog/2012/03/ranking_algorithm_wilson_score_interval.html)
* [基于用户投票的排名算法（六）：贝叶斯平均](http://www.ruanyifeng.com/blog/2012/03/ranking_algorithm_bayesian_average.html)
* [Binomial proportion confidence interval](http://en.wikipedia.org/wiki/Binomial_proportion_confidence_interval#Wilson_score_interval)
* [置信区间(Confidence_interval)](http://en.wikipedia.org/wiki/Confidence_interval)
