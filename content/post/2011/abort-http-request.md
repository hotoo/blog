
# Abort HTTP 请求

- template: post.html
- pubdate: 2011-07-22
- tags: Web Design

----


英文不好，请教个问题：

*abort* 这个单词，好像有丢弃，中断之类的意思。

AJAX 发一个请求，然后 abort 掉，那么这个请求只是客户端一厢情愿的丢弃，
服务端仍然可以接收到并处理请求呢；还是直接中断这个请求，
导致服务器端也会丢弃/忽略这个请求？

如果翻译，应该翻成 *丢弃 HTTP 请求* 还是 *中断 HTTP 请求* ？

-- Update --

搜索了一番，跟想象中的一致，只是客户端的一厢情愿，丢弃服务端的返回而已，
并不是服务端丢弃处理请求。

所以应该翻作： *丢弃* 。

## 延伸阅读

* http://weblogs.asp.net/dwahlin/archive/2007/07/17/aborting-ajax-requests.aspx
* http://stackoverflow.com/questions/446594/kill-ajax-requests-using-javascript-using-jquery
* http://topic.csdn.net/u/20090206/14/c43249df-29a9-4167-9dc3-e3a8f738248d.html
* http://book.51cto.com/art/200810/91493.htm
* [@Google+](https://plus.google.com/108314985261981078822/posts/6PF4sMpegXP)
