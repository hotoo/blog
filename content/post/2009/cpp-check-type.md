
# C++如何判断声明为基类的对象，是否某子类型的实例?

- template: post.html
- pubdate: 2009-12-31
- tags: Cpp

----

我有如下类结构

```
BaseToken
|-- KeywordToken
     |-- ThisToken
     |-- IfToken
     |-- ...
```

并定义有：

```cpp
BaseToken lastToken;
```

有一个地方需要判断 lastToken 是否是 KeywordToken

```cpp
if(dynamic_cast<KeywordToken *>(lastToken)){}
```

但是编译时报错如下：

> LexicalAnalyzer.cpp|444| error: cannot dynamic_cast
> `((LexicalAnalyzer*)this)->LexicalAnalyzer::lastToken’ (of type
> `class BaseToken’) to type `class KeywordToken*’ (source is not a pointer)

貌似不能将父类型转为子类型，那么请问如何判断 `lastToken` 是 `KeywordToken` ?

经过“[帅的不敢出门](http://www.douban.com/people/2590444/) ”
[提点](http://www.douban.com/group/topic/9279355/?start=0&amp;post=ok#last) ：

> dynamic_cast < type-id > ( expression )<br>
> <br />
> The type-id must be a pointer or a reference to a previously defined
> class type or a “pointer to void”. The type of expression must be
> a pointer if type-id is a pointer, or an l-value if type-id is a reference.

`dynamic_cast` 需要的是一个指针，将代码改为如下即可：

```cpp
if(dynamic_cast<KeywordToken *>(&lastToken)){}
```


## 参考

1. [如何在运行时确定对象类型（RTTI）](http://www.vckbase.com/document/viewdoc/?id=653)
2. [dynamic_cast](http://www.cppreference.com/wiki/keywords/dynamic_cast)
