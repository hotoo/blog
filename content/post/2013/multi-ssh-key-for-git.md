
# 多个 SSH KEY

- template: post.html
- pubdate: 2013-11-25
- tags: JavaScript, Exceptions
- status: draft

----

```
Host github.com
  HostName github.com
  User hotoo
  IdentityFile ~/.ssh/id_rsa

Host gitlab.example.com
  HostName gitlab.example.com
  User user.name@email.address
  IdentityFile ~/.ssh/id_rsa_gitlab_example_com

Host example.com
  HostName www.example.com
  User admin

Host shterm
  HostName shterm.example.com
  User user.name
```

## git config --local

```
git config --local user.name username
git config --local user.email user@email.com
```

project/.git/config

```
[user]
        name = username
        email = user@email.com
```

## 延伸阅读

* [多个github帐号的SSH key切换](http://omiga.org/blog/archives/2269)
* [Generating SSH Keys](https://help.github.com/articles/generating-ssh-keys)
* [ssh-keygen 中文手册](http://linux.chinaunix.net/techdoc/beginner/2010/01/12/1153509.shtml)
