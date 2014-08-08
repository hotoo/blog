
# 每周异常：第 2 期

- template: post.html
- pubdate: 2013-07-22
- tags: 每周异常

----

这是全站排名第 4 的一个异常，详情如下：

| KEY     | VALUE                                                                                                |
|---------|------------------------------------------------------------------------------------------------------|
| URL     | https://www.example.com/console/selectStrategy.htm                                                   |
| File    | https://a.example.com/??seajs/1.3.1/sea.js,seajs/1.3.1/plugin-combo.js,jquery/jquery/1.7.2/jquery.js |
| Line    | 35                                                                                                   |
| Message | 找不到成员。<CR><CR>                                                                                 |

| Stack Trace        | Device | OS          | Browser           | Engine      | Count |
|--------------------|--------|-------------|-------------------|-------------|-------|
| at function(a,b,d) | pc/-1  | windows/6.1 | ie/10.0           | trident/6.0 | 826   |
| at function(a,b,d) | pc/-1  | windows/6.1 | sg/2.x            | trident/6.0 | 423   |
| at function(a,b,d) | pc/-1  | windows/6.2 | ie/10.0           | trident/6.0 | 151   |
| at function(a,b,d) | pc/-1  | windows/6.1 | baidu/2.x         | trident/6.0 | 27    |
| at function(a,b,d) | pc/-1  | windows/6.1 | mx/3.4.5.2000     | trident/6.0 | 10    |
| at function(a,b,d) | pc/-1  | windows/6.1 | tw/3.6.1.1        | trident/6.0 | 10    |
| at function(a,b,d) | pc/-1  | windows/6.2 | mx/4.0.6.2000     | trident/6.0 | 3     |
| at function(a,b,d) | pc/-1  | windows/6.1 | lb/undefined      | trident/6.0 | 2     |
| at function(a,b,d) | pc/-1  | windows/6.1 | mx/3.5.2.1000     | trident/6.0 | 2     |
| at function(a,b,d) | pc/-1  | windows/6.1 | mx/4.0.5.3000     | trident/6.0 | 2     |
| at function(a,b,d) | pc/-1  | windows/6.1 | mx/4.0.5.4000     | trident/6.0 | 2     |
| at function(a,b,d) | pc/-1  | windows/6.1 | mx/4.0.6.2000     | trident/6.0 | 2     |
| at function(a,b,d) | pc/-1  | windows/6.1 | qq/7.3.11251.400  | trident/6.0 | 2     |
| at function(a,b,d) | pc/-1  | windows/6.2 | tw/-1             | trident/6.0 | 2     |
| at function(a,b,d) | pc/-1  | windows/6.1 | 360/3.7.1.6       | trident/6.0 | 1     |
| at function(a,b,d) | pc/-1  | windows/6.1 | 360/4.0.3.6       | trident/6.0 | 1     |
| at function(a,b,d) | pc/-1  | windows/6.1 | 360/4.0.5.2       | trident/6.0 | 1     |
| at function(a,b,d) | pc/-1  | windows/6.1 | mx/2.5.15.1000    | trident/6.0 | 1     |
| at function(a,b,d) | pc/-1  | windows/6.1 | mx/2.5.16.100     | trident/6.0 | 1     |
| at function(a,b,d) | pc/-1  | windows/6.1 | mx/4.0.3.6000     | trident/6.0 | 1     |
| at function(a,b,d) | pc/-1  | windows/6.1 | mx/4.0.5.2000     | trident/6.0 | 1     |
| at function(a,b,d) | pc/-1  | windows/6.1 | mx/4.1.0.2000     | trident/6.0 | 1     |
| at function(a,b,d) | pc/-1  | windows/6.1 | qq/6.13.13719.201 | trident/6.0 | 1     |
| at function(a,b,d) | pc/-1  | windows/6.1 | qq/6.14.15493.201 | trident/6.0 | 1     |
| at function(a,b,d) | pc/-1  | windows/6.1 | tw/3.4.0.5        | trident/6.0 | 1     |
| at function(a,b,d) | pc/-1  | windows/6.1 | tw/3.6.1.0        | trident/6.0 | 1     |
| at function(a,b,d) | pc/-1  | windows/6.2 | mx/3.5.2.1000     | trident/6.0 | 1     |
| at function(a,b,d) | pc/-1  | windows/6.2 | mx/4.0.5.3000     | trident/6.0 | 1     |
|                    |        |             |                   |             | 1478  |

----

首先我们找到异常所在文件的第 35行，在上面的异常栈信息中我们可以知道异常从
压缩后的匿名函数 `function(a,b,d)` 中抛出，这个函数是：

```js
set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}
```

对应压缩前的源码是：

```js
	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret;
			ret = elem.getAttributeNode( name );
			return ret && ( fixSpecified[ name ] ? ret.nodeValue !== "" : ret.specified ) ?
				ret.nodeValue :
				undefined;
		},
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				ret = document.createAttribute( name );
				elem.setAttributeNode( ret );
			}
			return ( ret.nodeValue = value + "" );
		}
	};
```

这个代码是用来兼容 IE6/7 的属性操作（代码注释中号称几乎修复了 IE6/7 所有的问题），
页面中的业务源码中我们找到不少 DOM 属性的操作，其中有一些看起来几乎不会有问题，
另外一些则出现问题的可能性更高。

我们从这些可能性更高的部分着手，最终发现 IE10 兼容模式下会抛出『[找不到成员。](https://github.com/totorojs/javascript-exception-archives/blob/master/content/wiki/member-not-found.md)』
的异常，这时我们注意到，异常详情中全部都是 Trident 6.0 内核的浏览器抛出的异常。
看来我们这个增加兼容模式信息的 [Issues#13](https://github.com/totorojs/monitor.js/issues/13)
是正确的。

我们看到兼容模式下表单中的 Select 模拟组件显示不正常，最初以为是 Select 组件设置属性造成的异常。

![1c00b54eaad3a6f45ffec0d7526abc6e](https://f.cloud.github.com/assets/143572/834321/3db467be-f2bb-11e2-93c0-007ec07ba729.png)

（正常情况下的 Select 模拟组件）

![0aafc43da07d07423e1f67199cf5c5b9](https://f.cloud.github.com/assets/143572/834325/57343714-f2bb-11e2-84aa-fb8834763fce.png)

（兼容模式下的 Select 模拟组件）

IE10 的调试工具还是不错的，最终我们发现在设置 "novalidate" 属性时抛出这个异常，
想到 Validator 的相关 [Issues#30](https://github.com/aralejs/validator/issues/30)

![edde87186b5919bd49a4d74874c7ce36](https://f.cloud.github.com/assets/143572/834340/6db729a6-f2bb-11e2-8558-a8f9681f99bf.png)


于是这个异常就破解完成。

## 如何修复这个异常？

找回密码的这个页面使用的 Validator@0.8.9，而 novalidate 属性造成的异常在
Validator@0.9.3 及其后续版本中得到修复。建议升级到最新版本。
