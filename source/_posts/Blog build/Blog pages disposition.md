title: Blog pages 配置
date: 2023/07/17 00:00:30
tags: 博客页面
categories: 博客
cover: https://image.yaco.email/hexo_github.png
---

## 用于一系列页面的配置

**页面分类**

- tags
- categories
- link

```
// 创建新的页面类型
hexo n page xxxxx
```

**Page Front-matter 用于页面配置**

```
---
title:
date:
updated:
type:
comments:
description:
keywords:
top_img:
mathjax:
katex:
aside:
aplayer:
highlight_shrink:
random:
---
```

| 写法             | 解释                                                         |
| ---------------- | ------------------------------------------------------------ |
| title            | [必需]页面标题                                               |
| date             | [必需]页面创建日期                                           |
| type             | [必需]标签、分类和友情链接三个页面需要配置                   |
| updated          | [可选]页面更新日期                                           |
| description      | [可选]页面描述                                               |
| keywords         | [可选]页面关键字                                             |
| comments         | [可选]显示页面评论模块 (默认 true)                           |
| top_img          | [可选]页面顶部图片                                           |
| mathjax          | [可选]显示mathjax (当设置mathjax的per_page: false时，才需要配置，默认 false) |
| katex            | [可选]显示katex (当设置katex的per_page: false时，才需要配置，默认 false) |
| aside            | [可选]显示侧边栏 (默认 true)                                 |
| aplayer          | [可选]在需要的页面加载aplayer的js和css,请参考文章下面的音乐 配置 |
| highlight_shrink | [可选]配置代码框是否展开 (true/false) (默认为设置中highlight_shrink的配置) |
| random           | [可选]友情链接是否随机排序（默认为 false)                 |

## 用于单个文章的配置
**Post Front-matter 用于文章页配置**

```
---
title:
date:
updated:
tags:
categories:
keywords:
description:
top_img:
comments:
cover:
toc:
toc_number:
toc_style_simple:
copyright:
copyright_author:
copyright_author_href:
copyright_url:
copyright_info:
mathjax:
katex:
aplayer:
highlight_shrink:
aside:
abcjs:
---

```

| 写法                  | 解释                                                         |
| --------------------- | ------------------------------------------------------------ |
| title                 | [必需]文章标题                                               |
| date                  | [必需]文章创建日期                                           |
| updated               | [可选]文章更新日期                                           |
| tags                  | [可选]文章标签                                               |
| categories            | [可选]文章分类                                               |
| keywords              | [可选]文章关键字                                             |
| description           | [可选]文章描述                                               |
| top_img               | [可选]文章顶部图片                                           |
| cover                 | [可选]文章缩略图(如果没有设置top_img,文章页顶部将显示缩略图，可设为false/图片地址/留空) |
| comments              | [可选]显示文章评论模块(默认 true)                            |
| toc                   | [可选]显示文章TOC(默认为设置中toc的enable配置)               |
| toc_number            | [可选]显示toc_number(默认为设置中toc的number配置)            |
| toc_style_simple      | [可选]显示 toc 简洁模式                                      |
| copyright             | [可选]显示文章版权模块(默认为设置中post_copyright的enable配置) |
| copyright_author      | [可选]文章版权模块的文章作者                                 |
| copyright_author_href | [可选]文章版权模块的文章作者链接                             |
| copyright_url         | [可选]文章版权模块的文章连结链接                             |
| copyright_info        | [可选]文章版权模块的版权声明文字                             |
| mathjax               | [可选]显示mathjax(当设置 mathjax 的 per_page: false 时，才需要配置，默认 false ) |
| katex                 | [可选]显示 katex (当设置 katex 的 per_page: false 时，才需要配置，默认 false ) |
| aplayer               | [可选]在需要的页面加载 aplayer 的 js 和 css,请参考文章下面的音乐 配置 |
| highlight_shrink      | [可选]配置代码框是否展开(true/false)(默认为设置中 highlight_shrink 的配置) |
| aside                 | [可选]显示侧边栏 (默认 true)                                 |
| abcjs                 | [可选]加载 abcjs (当设置 abcjs 的 per_page: false 时，才需要配置，默认 false ) |


​	
​	
**注意：如果想添加多个，比如tags,categories,使用以下方法**
```
tags:
    - tag1
    - tag2
    - tag3
```
​	
​	
​	
​	
​	
​	
​	
