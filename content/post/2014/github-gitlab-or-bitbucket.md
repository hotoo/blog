
# GitHub, GitLab, or BitBucket?

- template: post.html
- pubdate: 2014-08-03
- tags: Git

----

> GitHub 是汇集了众多开源项目的闭源系统，
>
> GitLab 是汇聚了较多闭源项目的开源系统。
>
> -- [@hotoo](https://twitter.com/hotoo/status/417483811212238848)


对于个人开发者，不可避免的会有私有项目的需求。

目前比较靠谱的私有项目托管服务有：

* GitHub
* GitLab
* BitBucket

下面我们稍做评比。

<!--more-->

## GitHub

GitHub 当下大红大紫，主要在于其社交性质。

对于开源项目来说，上面大量的开发者参与带来了非常活跃的开发氛围。

但是对于私有仓库来说，个人觉得价格偏贵（屌丝气质暴露）。

而且个人账户下的私有仓库，不能共享给个人所拥有的团队账户，因此如果团队账户需要
私有仓库，则需要另外再为团队账户购买。

如果不缺钱，可以考虑 GitHub，甚至还有 Enterprise 版本。


## GitLab

GitLab 是当下最火的 Git 仓库管理的开源项目，有提供的 [gitlab.com](https://gitlab.com/)
服务，同时可以自行部署。

gitlab.com 服务可以创建不限数量的私有仓库，除了少量的缺点外，GitLab 几乎可以
媲美 GitHub。

但是，作为完美主义者，真的受不了 GitLab 的一些小伤疤。


## BitBucket

BitBucket 是 [Atlassian](https://www.atlassian.com/) 公司的产品
（还有 Confluence，JIRA， HipChat 等著名产品）。

个人觉得除了 Issues 不够简洁之外，其他都很完美。
适合小团队私有项目托管。

## 对比

|            | GitHub                                   | GitLab                                                 | BitBucket                   |
|------------|------------------------------------------|--------------------------------------------------------|-----------------------------|
| 私有仓库   | 收费<br/>教育身份赞助 2年的 Micro Plan   | 免费，无限制                                           | 免费，限制协作人数          |
| 权限控制   | 个人账户无控制<br/>团队账户有限控制      | 仓库级控制<br/>指定一个保护分支                        | 分支级控制                  |
| Transfer   | 完美                                     | 几乎完美                                               | 完美                        |
| 仓库重命名 | 完美                                     | 不能修改 clone 地址                                    | 完美                        |
| 仓库名     | 完美                                     | 不能使用 `.`，自动修改为 `-`                           | 完美                        |
| Issues     | 完美                                     | 功能复杂，但界面简洁<br/>早期有 Issues ID 缺陷，已修复 | 功能复杂，界面不够简洁      |
| Issues URL | 完美                                     | 完美                                                   | 默认附加可选的标题信息      |
| Pages      | username.github.io 仓库<br/>gh-page 分支 | demo 分支                                              | username.bitbucket.org 仓库 |
| 自定义域名 | 每个仓库都可以自定义域名                 | 无                                                     | 个人 Profile 页             |

## 小结

* GitHub 适合开源项目管理。不缺钱的同学，私有项目也适合统一在 GitHub 管理。
* GitLab 和 BitBucket 都很适合私有项目的管理。
* GitLab 是开源项目，活跃程度很高，未来很有潜力，如果不在乎那些小硬伤，个人更推荐 GitLab。
* BitBucket 系出名门，产品本身也非常好，没有明显的伤疤，作为完美主义者，我目前稍喜欢这个。
