
# 每周异常：第 2 期（续）

- template: post.html
- pubdate: 2013-07-23
- tags: 每周异常

----
[上篇](weekly-topic-about-exceptions-2.md) 分析了上周的异常 TOP4，顺便发现 TOP3
和 TOP5 是同一个问题造成的异常。

下面我们来分析 TOP1 和 TOP 2 的异常，事实上，这两个异常也是由同一个问题造成的。

## TOP1

| KEY     | VALUE                                                                                                |
|---------|------------------------------------------------------------------------------------------------------|
| URL     | https://www.example.com/index.htm                                                                    |
| File    | https://a.example.com/??seajs/1.3.1/sea.js,seajs/1.3.1/plugin-combo.js,jquery/jquery/1.7.2/jquery.js |
| Line    | 35                                                                                                   |
| Message | 无法获取未定义或 null 引用的属性“length”                                                           |

| stack trace                                                                     | device | os          | browser           | engine      | count |
|---------------------------------------------------------------------------------|--------|-------------|-------------------|-------------|-------|
| at function(a,c,d)                                                              | pc/-1  | windows/6.1 | ie/10.0           | trident/6.0 | 2740  |
| at function(a,c,d)                                                              | pc/-1  | windows/6.1 | sg/2.x            | trident/6.0 | 868   |
| at function(a,c,d)                                                              | pc/-1  | windows/6.2 | ie/10.0           | trident/6.0 | 538   |
| at function(a,c,d)                                                              | pc/-1  | windows/6.1 | tao/3.2           | trident/6.0 | 236   |
| at function(a,c,d)                                                              | pc/-1  | windows/6.1 | baidu/2.x         | trident/6.0 | 113   |
| at function(a,c,d)                                                              | pc/-1  | windows/6.1 | tw/3.6.1.1        | trident/6.0 | 36    |
| at function(a,c,d)                                                              | pc/-1  | windows/6.2 | tao/3.2           | trident/6.0 | 26    |
| at function(a,c,d)                                                              | pc/-1  | windows/6.1 | mx/4.0.5.2000     | trident/6.0 | 25    |
| at function(a,c,d)                                                              | pc/-1  | windows/6.1 | mx/4.1.0.2000     | trident/6.0 | 20    |
| at function(a,c,d)                                                              | pc/-1  | windows/6.1 | mx/4.0.6.2000     | trident/6.0 | 15    |
| at function(a,c,d)                                                              | pc/-1  | na/-1       | ie/10.0           | trident/6.0 | 14    |
| at function(a,c,d)                                                              | pc/-1  | windows/5.0 | ie/10.0           | trident/6.0 | 12    |
| at function(a,c,d)                                                              | pc/-1  | windows/6.1 | mx/4.1.1.600      | trident/6.0 | 10    |
| at function(a,c,d)                                                              | pc/-1  | windows/6.1 | tw/3.6.1.0        | trident/6.0 | 10    |
| at function(a,c,d)                                                              | pc/-1  | windows/6.1 | mx/4.0.3.1000     | trident/6.0 | 8     |
| at function(a,c,d)                                                              | pc/-1  | windows/6.2 | mx/4.0.6.2000     | trident/6.0 | 8     |
| at function(a,c,d)                                                              | pc/-1  | windows/6.1 | tao/3.0           | trident/6.0 | 7     |
| at function(a,c,d)                                                              | pc/-1  | windows/6.1 | mx/3.4.5.2000     | trident/6.0 | 6     |
| at function(a,c,d)                                                              | pc/-1  | windows/6.1 | qq/6.14.15493.201 | trident/6.0 | 6     |
| at function(a,c,d)                                                              | pc/-1  | windows/6.1 | qq/7.3.11251.400  | trident/6.0 | 6     |
| at function(a,c,d)                                                              | pc/-1  | windows/5.1 | ie/10.0           | trident/6.0 | 4     |
| at function(a,c,d)                                                              | pc/-1  | windows/6.0 | ie/10.0           | trident/6.0 | 4     |
| at function(a,c,d)                                                              | pc/-1  | windows/6.1 | 360/3.2.0.6       | trident/6.0 | 4     |
| at function(a,c,d)                                                              | pc/-1  | windows/6.1 | lb/3.1.15.3877    | trident/6.0 | 4     |
| at function(a,c,d)                                                              | pc/-1  | windows/6.1 | mx/3.5.2.1000     | trident/6.0 | 4     |
| at function(a,c,d)                                                              | pc/-1  | windows/6.1 | mx/4.0.5.4000     | trident/6.0 | 4     |
| at function(a,c,d)                                                              | pc/-1  | windows/6.2 | tao/3.1           | trident/6.0 | 4     |
| at function setCaretToInput(input)<CR>at function(event)<CR>at function(a,c,d)  | pc/-1  | windows/6.1 | sg/2.x            | trident/6.0 | 3     |
| at function(a,c,d)                                                              | pc/-1  | windows/6.2 | tao/3.0           | trident/6.0 | 3     |
| at function(a,c,d)                                                              | pc/-1  | windows/6.1 | qq/7.3.8581.400   | trident/6.0 | 2     |
| at function setCaretToInput(input)<CR>at function (event)<CR>at function(a,c,d) | pc/-1  | windows/6.2 | ie/10.0           | trident/6.0 | 2     |
| at function(a,c,d)                                                              | pc/-1  | windows/6.1 | qq/6.14.14517.201 | trident/6.0 | 1     |
| at function setCaretToInput(input)<CR>at function (event)<CR>at function(a,c,d) | pc/-1  | windows/6.1 | sg/2.x            | trident/6.0 | 1     |
|                                                                                 |        |             |                   |             | 4744  |

## TOP2

| KEY     | VALUE                                                                                                |
|---------|------------------------------------------------------------------------------------------------------|
| URL     | https://www.example.com/index.htm                                                                    |
| File    | https://a.example.com/??seajs/1.3.1/sea.js,seajs/1.3.1/plugin-combo.js,jquery/jquery/1.7.2/jquery.js |
| Line    | 35                                                                                                   |
| Message | 无法获取未定义或 null 引用的属性“length”                                                           |

| stack trace        | device | os          | browser           | engine      | count |
|--------------------|--------|-------------|-------------------|-------------|-------|
| at function(a,c,d) | pc/-1  | windows/6.1 | ie/10.0           | trident/6.0 | 2192  |
| at function(a,c,d) | pc/-1  | windows/6.1 | sg/2.x            | trident/6.0 | 1255  |
| at function(a,c,d) | pc/-1  | windows/6.2 | ie/10.0           | trident/6.0 | 352   |
| at function(a,c,d) | pc/-1  | windows/6.1 | baidu/2.x         | trident/6.0 | 143   |
| at function(a,c,d) | pc/-1  | windows/6.1 | tw/3.6.1.1        | trident/6.0 | 42    |
| at function(a,c,d) | pc/-1  | windows/6.1 | mx/4.0.6.2000     | trident/6.0 | 33    |
| at function(a,c,d) | pc/-1  | windows/6.1 | tw/3.6.1.0        | trident/6.0 | 32    |
| at function(a,c,d) | pc/-1  | windows/6.1 | tao/3.0           | trident/6.0 | 13    |
| at function(a,c,d) | pc/-1  | windows/6.2 | tw/3.6.1.1        | trident/6.0 | 13    |
| at function(a,c,d) | pc/-1  | windows/6.1 | mx/3.4.5.2000     | trident/6.0 | 11    |
| at function(a,c,d) | pc/-1  | windows/6.1 | qq/7.3.8126.400   | trident/6.0 | 9     |
| at function(a,c,d) | pc/-1  | windows/6.2 | tao/3.0           | trident/6.0 | 9     |
| at function(a,c,d) | pc/-1  | windows/6.1 | 360/3.9.1.5       | trident/6.0 | 6     |
| at function(a,c,d) | pc/-1  | windows/6.1 | mx/3.4.1.1000     | trident/6.0 | 6     |
| at function(a,c,d) | pc/-1  | windows/6.1 | mx/4.0.3.3000     | trident/6.0 | 6     |
| at function(a,c,d) | pc/-1  | windows/6.1 | qq/6.14.14517.201 | trident/6.0 | 6     |
| at function(a,c,d) | pc/-1  | windows/6.1 | qq/6.14.15493.201 | trident/6.0 | 5     |
| at function(a,c,d) | pc/-1  | windows/6.1 | 360/3.2.0.2       | trident/6.0 | 4     |
| at function(a,c,d) | pc/-1  | windows/6.1 | qq/7.3.11251.400  | trident/6.0 | 4     |
| at function(a,c,d) | pc/-1  | windows/6.1 | 360/3.1.6.7       | trident/6.0 | 3     |
| at function(a,c,d) | pc/-1  | windows/6.2 | sy/-1             | trident/6.0 | 3     |
|                    |        |             |                   |             | 4147  |

----

TOP1 和 TOP2 两个异常都是中 memberprod 系统的注册页面上（重要程度不想而知），
一个页面是注册的起始页，一个是注册的完成页。我们先分析起始页。

打开异常所在文件第 35行，搜索异常栈信息中的 `function(a,c,d)`，我们发现有 3 个如下：

```js
each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a}
map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)}
prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}}
```

再找异常信息中的关键字 `length`，发现上面的 prop 方法中并没有这个关键字，
所以可以排除。剩下的两个函数对应的原始码如下：

```js
// args is for internal usage only
each: function( object, callback, args ) {
  var name, i = 0,
      length = object.length,
      isObj = length === undefined || jQuery.isFunction( object );

  if ( args ) {
    if ( isObj ) {
      for ( name in object ) {
        if ( callback.apply( object[ name ], args ) === false ) {
          break;
        }
      }
    } else {
      for ( ; i < length; ) {
        if ( callback.apply( object[ i++ ], args ) === false ) {
          break;
        }
      }
    }

    // A special, fast, case for the most common use of each
  } else {
    if ( isObj ) {
      for ( name in object ) {
        if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
          break;
        }
      }
    } else {
      for ( ; i < length; ) {
        if ( callback.call( object[ i ], i, object[ i++ ] ) === false ) {
          break;
        }
      }
    }
  }

  return object;
},

// arg is for internal usage only
map: function( elems, callback, arg ) {
  var value, key, ret = [],
    i = 0,
    length = elems.length,
    // jquery objects are treated as arrays
    isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;

  // Go through the array, translating each of the items to their
  if ( isArray ) {
    for ( ; i < length; i++ ) {
      value = callback( elems[ i ], i, arg );

      if ( value != null ) {
        ret[ ret.length ] = value;
      }
    }

  // Go through every key on the object,
  } else {
    for ( key in elems ) {
      value = callback( elems[ key ], key, arg );

      if ( value != null ) {
        ret[ ret.length ] = value;
      }
    }
  }

  // Flatten any nested arrays
  return ret.concat.apply( [], ret );
},
```

这两个函数都有可能性，但是从经验上 each 方法用的更多，我猜这个命中率更高。
但是单纯的从这些异常信息字面量来看，已经没有了更多信息。我们当时还没有注意到
异常都是 Trident 6.0 抛出的。

----

打开页面标准模式或兼容模式下都没有抛出这个异常，只是兼容模式下有个
『找不到成员。』的异常。

手贱点了表单第一个输入框，终于重现了梦寐以求的异常。它就是 each 方法中抛出的。
从调用堆栈信息中可以看到 `this.items` 是 undefined，导致 each 失败。

![2013-07-23 9 12 58](https://f.cloud.github.com/assets/143572/860087/e82abdc4-f595-11e2-9f61-abdee317416e.png)


而 `this.items` 为 undefined 是由于 validator 的 core 模块中 setup() 函数中
设置 novalidator 属性异常导致后续代码没有执行造成。

```js
setup: function() {

  //disable html5 form validation
  this.element.attr('novalidate', 'novalidate');

  //Validation will be executed according to configurations stored in items.
  this.items = [];

  //...

}
```

至此，上周支付宝全站 TOP5 的异常均已告破，他们都是同一个问题造成的。

## 如何解决这个异常？

Validator 组件已于 3个月前的 v0.9.3 版本得到修复，请升级到 Validator 最新版。

## 一个问题？

基础组件中小版本升级修复各种 BUG 的过程中，如何同步推动业务代码的对应升级？
