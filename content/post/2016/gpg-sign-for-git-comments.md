
# 使用 GPG 签名 Git Commits

- template: post.html
- pubdate: 2016-06-11
- tags: Git, GPG

----

前段时间 GitHub 支持在 Git Commits 中使用 GPG 签名验证，可以避免其他人使用你的
Email 进行 commit。

## 安装 GPG

下载地址： https://www.gnupg.org/download/

Mac 下有两个可选工具，分别是 [Mac GPG](http://gpgtools.org/) 和 GnuPG for OS X，我都尝试了下，觉得
Mac GPG 相对比较容易点，安装过程中同时引导创建一个 GPG key 存储到 GPG keychain
中，并且在 Git 提交时记住 passphrase，避免每次提交输入 passphrase。

<!--more-->

## 生成 GPG key

> 如果在安装过程中，自动引导生成了 GPG key 的话，这一步可以省略。

除了安装时引导生成的 GPG key 之外，你还可以手动生成 GPG key：

```bash
$ gpg --gen-key
gpg (GnuPG/MacGPG2) 2.0.28; Copyright (C) 2015 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Please select what kind of key you want:
   (1) RSA and RSA (default)
   (2) DSA and Elgamal
   (3) DSA (sign only)
   (4) RSA (sign only)
Your selection?
RSA keys may be between 1024 and 4096 bits long.
What keysize do you want? (2048)
Requested keysize is 2048 bits
Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0) 1y
Key expires at 日  6/11 22:33:50 2017 CST
Is this correct? (y/N) y

GnuPG needs to construct a user ID to identify your key.

Real name: xxx
Email address: xxx@yyy.com
Comment:
You selected this USER-ID:
    "xxx <xxx@yyy.com>"

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit?
Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O
You need a Passphrase to protect your secret key.

We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
gpg: key B5DB6617 marked as ultimately trusted
public and secret key created and signed.

gpg: checking the trustdb
gpg: 3 marginal(s) needed, 1 complete(s) needed, PGP trust model
gpg: depth: 0  valid:   3  signed:   0  trust: 0-, 0q, 0n, 0m, 0f, 3u
gpg: next trustdb check due at 2017-06-11
pub   2048R/B5DB6617 2016-06-11 [expires: 2017-06-11]
      Key fingerprint = 3AE5 19D5 8A58 C59B B029  6CEA 8566 6A47 B5DB 6617
uid       [ultimate] xxx <xxx@yyy.com>
sub   2048R/1F4A9B85 2016-06-11 [expires: 2017-06-11]
```

## 配置 Git

配置好 GPG key 之后，可以配置让 git 在某个仓库所有的 commits 都添加 GPG key 验证：

```bash
git config commit.gpgsign true
```

也可以让本地所有的仓库都进行 GPG 验证：

```bash
$ git config --globall commit.gpgsign true
```

## 验证 Git commits

如果没有设置局部仓库或全局仓库默认开启 commits GPG 验证，提交时可以附加 `-S` 参考，
要求进行 GPG 验证。

```bash
$ git commit -S -m "comment"
```

如果提交使用的账户信息和 GPG 签名不一致，则无法通过 GPG 验证，会导致提交失败。

```bash
$ git ci -m "test"
gpg: skipped "ZZZ <xxx@yyy.com>": No secret key
gpg: signing failed: No secret key
error: gpg failed to sign the data
fatal: failed to write commit object
```

正常的话，会提示输入 passphrase 解锁 PGP 密钥，此时可以选中保存到 Mac OS X 系统
的 Keychain 中，避免每次输入 passphrase。

```bash
$ git add .
$ git ci -m "test"

You need a passphrase to unlock the secret key for
user: "xxx <xxx@yyy.com>"
4096-bit RSA key, ID C0B176D7, created 2016-06-11

[master (root-commit) 163d909] test
 1 file changed, 3 insertions(+)
 create mode 100644 README.md
```

## 将 GPG 密钥添加到 GitHub

这时 push 到 GitHub 仓库的 commits，查看 commits 记录会显示 `unverified`。

```bash
$ gpg --list-secret-keys
/Users/xxx/.gnupg/secring.gpg
-------------------------------
sec   4096R/C0B176D7 2016-06-11 [expires: 2020-06-11]
uid                  xxx <xxx@yyy.com>
ssb   4096R/E00F263F 2016-06-11

$ gpg --armor --export C0B176D7
-----BEGIN PGP PUBLIC KEY BLOCK-----
Comment: GPGTools - https://gpgtools.org

****************************************************************
****************************************************************
****************************************************************
************************************************
*****
-----END PGP PUBLIC KEY BLOCK-----
```

将上面 export 出来的 GPG 密钥添加到 GitHub 的 [SSH and GPG keys](https://github.com/settings/keys) 即可。

## 参考

- [GPG signature verification](https://github.com/blog/2144-gpg-signature-verification)
- [Signing commits using GPG](https://help.github.com/articles/signing-commits-using-gpg/)
- [Generating a new GPG key](https://help.github.com/articles/generating-a-new-gpg-key/)
- [Adding a new GPG key to your GitHub account](https://help.github.com/articles/adding-a-new-gpg-key-to-your-github-account/)
- [GnuPG - download](https://www.gnupg.org/download/)

## 延伸阅读

- [A Git Horror Story: Repository Integrity With Signed Commits](https://mikegerwitz.com/papers/git-horror-story)
- [Git 使用中的教训：签名提交确保代码完整可信](http://www.oschina.net/translate/git-horror-story)
- [使用 GPG 签名 Git 提交和标签](http://arondight.me/2016/04/17/%E4%BD%BF%E7%94%A8GPG%E7%AD%BE%E5%90%8DGit%E6%8F%90%E4%BA%A4%E5%92%8C%E6%A0%87%E7%AD%BE/)
- [Step-by-step guide on how to create a GPG key on keybase.io, adding it to a local GPG setup and use it with Git and GitHub](https://github.com/pstadler/keybase-gpg-github)
