
# 轉換編碼筆記

- template: post.html
- pubdate: 2010-04-07
- tags: Encoding

----


今天發現一個顯示為亂碼的 html 頁面，發現是當前頁面和 reference 頁面編碼
不一致造成的，reference 編碼為 gbk，當前頁面編碼是 utf8。

雖然各自 head 里的 charset 和其文件存儲的編碼一致，但某些瀏覽器（如Firefox）
從 reference 轉過來時，默認當前頁面的 charset 和 reference 的一致，導致亂碼
顯示。

由于 reference 所使用的編碼是整站的基準編碼，所以把當前頁面的 fileencoding
轉成和 reference 一致即可，不過轉碼時遇到一個問題是，文件中存在特殊字符，無法
由 utf8 正常轉碼為 gbk。

文檔中無法用肉眼看出那些特殊字符，于是備份后使用 notepad 或 editplus 強行轉碼
（注：會丟失那些特殊的字符），然后將轉碼后的文檔和原始備份檔比較，來查找特殊
字符，編輯（刪除無意義的，轉義有用的）保存即可。

注：Vim `:set fenc=gbk`，可以轉碼，但 `:wq!` 無法正常保存；UltraEdit 本身的編碼
支持不夠好，不建議用來轉碼。

注2：Vim diff 可以比較出不同，找出特殊字符，但可能無法正常編輯（如刪除）它們，
特殊字符是非常怪異的；BeyondCompare 和 WinMarge 基本可以勝任。
