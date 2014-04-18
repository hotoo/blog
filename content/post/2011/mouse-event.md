
# 鼠标事件研究(Mouse Event)

- template: post.html
- pubdate: 2011-07-16
- tags: JavaScript

----


| Event       | type   | IE       | >         | FF     | >     | Chrome   | >     | Safari   | >     | Opera    | >     |
| \/          | \/     | button   | which     | button | which | button   | which | button   | which | button   | which |
|-------------|--------|----------|-----------|--------|-------|----------|-------|----------|-------|----------|-------|
| onmousedown | left   | 1        | undefined | 0      | 1     | 0        | 1     | 0        | 1     | 0        | 1     |
| \/          | middle | 4        | undefined | 1      | 2     | 1        | 2     | 1        | 2     | 1        | 2     |
| \/          | right  | 2        | undefined | 2      | 3     | 2        | 3     | 2        | 3     | 2        | 3     |
| onmouseup   | left   | 1        | undefined | 0      | 1     | 0        | 1     | 0        | 1     | 0        | 1     |
| \/          | middle | 4        | undefined | 1      | 2     | 1        | 2     | 1        | 2     | no event | >     |
| \/          | right  | 2        | undefined | 2      | 3     | 2        | 3     | 2        | 3     | 2        | 3     |
| onclick     | left   | 0        | undefined | 0      | 1     | 0        | 1     | 0        | 1     | 0        | 1     |
| \/          | middle | 0        | undefined | 1      | 2     | 1        | 2     | 1        | 2     | no event | >     |
| \/          | right  | no event | >         | 2      | 3     | no event | >     | no event | >     | no event | >     |

Windows 2003 Server.<br />
IE8, FF5, Chrome12, Safari5, Opera11.

Note:

* `document.onmousedown` === `document.addEventListener` === `document.attachEvent("onmousedown")`
* `document.onmouseup` === `document.addEventListener("mouseup")` == `document.attachEvent("onmouseup")`
* `document.onclick` === `document.addEventListener("click")` == `document.attachEvent("onclick")`

```js
document.onmousedown = function(evt){
    evt = window.event || evt;
    var mouse = {
        left:   evt.which ? evt.which==1 : evt.button==1,
        middle: evt.which ? evt.which==2 : evt.button==4,
        right:  evt.which ? evt.which==3 : evt.button==2
    };
};
```

## See Also

* [Event properties - ppk](http://www.quirksmode.org/js/events_properties.html)
* [Demo](http://hotoo.me/labs/mouse-event.html)
