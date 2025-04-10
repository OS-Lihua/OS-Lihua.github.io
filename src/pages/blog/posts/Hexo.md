---
layout: /src/layouts/MarkdownPostLayout.astro
title: Hexo 安装 和 配置
pubDate: 2023-07-14
author: YaCo
image:
    url: "https://image.yaco.email/hexo.png"
tags: ["博客"]
languages: ["hexo"]
---

# Hexo 

## Hexo 安装

```shell
npm install hexo -g
```

### 初始化博客

```shell
hexo init <dir>
```

安装依赖

```shell
npm install
```

### 预览

```shell
hexo serve -p prot
```

```html
ip:port
```

**注意**
__终端切换到目录下__


## Hexo 配置

### 文档

```
https://hexo.io/zh-cn/docs/index.html 
```

### 目录

```
node_modules	依赖包
public	存放生成的页面
scaffolds	生成文章的一些模板
source	用来存放你的文章
themes	主题
_config.yml: hexo 框架的配置文件 
_config.xxx.yml 主题配置文件
_config.butterfly.yml butterfly主题配置文件
```

```
clean 删除生成的文件和缓存。 
config 获取或设置配置。
deploy 部署网站。  d
generate 生成静态文件。  g
help 获取命令帮助。
init 创建一个新的Hexo文件夹。
list 列出网站信息
migrate 将您的网站从其他系统迁移到Hexo。
new 创建新文章。 n
publish 将草稿文章从 _drafts 移到 _posts 文件夹。
render 使用渲染器插件渲染文件。
server 启动服务器。
version 显示版本信息。
```

### 常用命令

```shell
cd <blog-dir>
npm install
hexo clean
-------
hexo g
hexo d
-------
hexo n <writings>
hexo g
hexo d
```

## 主题安装

```
https://hexo.io/themes/ 
```

