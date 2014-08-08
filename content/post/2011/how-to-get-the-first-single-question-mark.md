
# 如何取 URL 中第一个单独的问号(?) 位置

- template: post.html
- pubdate: 2011-06-22
- tags: JavaScript, RegExp

----



新版 Arale 通过 nginx 服务支持使用双问号的访问方式：

```
https://www.example.com/??module.js
```

访问 `https://www.example.com/module.js`

通过正则的正向预搜索有办法获得第一个单问号的位置么？

```
var r = /\?(?!\?)/;
```

会匹配双问号的第 2 个问号：

```
https://www.example.com/??modu.js
                         ^
```

```js
var path = function(uri){
    var idx = uri.indexOf(";jsessionid=");
    if(idx >= 0){return uri.substr(0, idx);}

    do{
        idx = uri.indexOf("?", idx);
        if(idx < 0){break;}
        if("?" == uri.charAt(idx+1)){
            idx += 2;
        }else{
            break;
        }
    }while(idx >= 0);

    return idx < 0 ? uri : uri.substr(0, idx);
};
```

目前是通过循环方式计算的，无心比较遍历和正则之间无优劣，
纯粹对于正则的实现很有兴趣 :)


## 答案一：

```js
var path = function(uri){
    return uri.replace(/;jsessionid=.*$/, "")
        .replace(/^(.*?[^?])\?[^?]/, "$1");
};
```


## 答案二：

上面用了两个相同规则的分组，这里可以减少到一个分组

```
"asdfadf??a?a".replace(/([^\s])\?\1/, '$1*$1'); // "asdfadf??a*a"
```

但是这种做法对于问号(?)在字符串首尾时没有办法匹配

```js
var temp= "12345???89?asdf".search(/(?:[^?]|^)\?(?!\?)/);
var index = temp ? temp + 1 : temp; // index的就想要的索引值
```
