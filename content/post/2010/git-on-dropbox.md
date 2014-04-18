
# 用 Dropbox 做私有 Git 服务器

- template: post.html
- pubdate: 2010-11-12
- tags: Dropbox, Git

----


这几记录一下如何做一个本地版本库，关键命令是：`git clone --bare test test.git`

```
mkdir test
cd test
git init

# for Windows.
echo NUL > README
# for Unix-like.
touch README

git add .
git commit -m "first commit."

cd ..
git clone --bare test test.git

# for Windows.
mkdir "D:\My Dropbox\codes\repositories"
copy test.git "D:\My Dropbox\codes\repositories"
# for Unix-like
mkdir ~/Dropbox/codes/repositories
mv test.git ~/Dropbox/codes/repositories

cd test
# for Windows.
git remote add "file:///D:\My Dropbox\codes\repositories\test.git"
# for Unix-like.
git remote add origin file:///Users/{name}/Dropbox/codes/repositories/test.git

vi README
git add .
git commit -m "make changes."
git push origin master
```


## 延伸阅读

1. [用dropbox做私有git服务器](http://roylez.heroku.com/2010/01/16/git-dropbox.html)
1. [方便而又强大：本地 Git 操作完全指南](http://blog.williamyao.com/archives/232)
1. [Hosting a Git Repo on Dropbox](http://andre.engelbrechtonline.net/blog/2010/04/22/hosting-git-repo-dropbox/)
1. [GitBox - Git repository hosting inside Dropbox folders](http://forums.dropbox.com/topic.php?id=23772)
    [@github](https://github.com/karalabe/gitbox)
