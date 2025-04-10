
# website 文档

## 🎯 Overview
本项目使用 astro/neonmint 框架/模板 搭建
**NeonMint** is a minimalist and modern template designed for developers and digital creatives. Its dark-toned aesthetic with mint green accents offers a clean, elegant, and functional visual experience, ideal for portfolios, dashboards, or tech landing pages.

## 📁 项目结构

```bash
└── 📁website
    │── 📁public
    │   ├── favicon.ico
    │   ├── 📁images
    │   │   ├── 📁posts      # 博客 post 图片
    │   │   └── 📁projects   # 项目图片
    │   └── site.webmanifest # PWA configuration file
    │── 📁src
    │   ├── 📁components      # 可重复使用的UI组件库
    │   │   ├── 📁friend      # 友链
    │   │   ├── 📁link        # 链接
    │   │   ├── 📁blog        # 博客
    │   │   ├── 📁layout      # 主页
    │   │   ├── 📁portfolio   # 组合控件
    │   │   └── 📁ui          # 单个控件
    │   ├── 📁icons           # 图标 (.svg)
    │   ├── 📁layouts                           # 主页布局
    │   │   ├── Layout.astro                    # Main application layout
    │   │   ├── MarkdownAbout.astro             # About-me page layout
    │   │   ├── MarkdownPostLayout.astro        # Posts page layout
    │   │   └── ProjectLayout.astro             # Projects page layout
    │   ├── 📁pages                    # 网站页面
    │   │   ├── 📁projects             # 项目页面
    │   │   ├── 📁link                 # link页面
    │   │   ├── 📁friend               # 友链 
    │   │   ├── 📁blog
    │   │   │   ├── 📁posts              # 博客 提交
    │   │   │   ├── 📁tags               # 博客 标签
    │   │   │   ├── 📁techs              # 博客 技术栈/分类
    │   │   │   ├── all-posts.astro      # All posts page
    │   │   │   └── index.astro          # 博客主页
    │   │   ├── index.astro              # 主页内容
    │   │   ├── about-me.md              # 关于页面
    │   │   ├── robots.txt.ts            # robots.txt configuration
    │   │   └── rss.xml.js               # RSS 配置
    │   ├── 📁scripts
    │   │   └── menu.js                # 菜单 script
    │   ├── 📁styles
    │   │   └── global.css             # 全局 风格
    │   └── 📁utils
    │       └── languages.ts           # 技术栈 配置
    ├── .gitignore
    ├── astro.config.mjs
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── yarn.lock
    └── tsconfig.json
```
# 项目说明文档


## 🛠️ 技术栈

- **框架**: Astro v5.6.1
- **UI库**: Preact v10.26.2
- **样式**: TailwindCSS v4.0.8
- **图标**: astro-icon v1.1.5
- **语法高亮**: PrismJS v1.30.0
- **动画**: tailwindcss-animated v2.0.0
- **分析**: @vercel/speed-insights v1.2.0

## ✨ 主要特性

1. **🚀 性能优化**
   - 静态站点生成
   - 使用 Preact 的部分水合
   - 优化的图片和资源

2. **💻 现代开发体验**
   - TypeScript 支持
   - 热模块替换
   - ESLint 集成

3. **🔍 SEO 和分析**
   - 内置站点地图生成
   - RSS 订阅支持
   - Vercel 速度分析

4. **🎨 样式和 UI**
   - 使用 TailwindCSS 实现功能优先的样式
   - 动画组件
   - 响应式设计
   - 暗色模式支持

## 🚀 开始使用

1. **📦 安装**
   ```bash
   yarn install
   ```

2. **⚡ 开发**
   ```bash
   yarn dev
   ```

3. **🏗️ 构建**
   ```bash
   yarn build
   ```

4. **👀 预览**
   ```bash
   yarn preview
   ```

## ⚙️ 配置

项目通过以下几个关键文件进行配置：

- `astro.config.mjs`: Astro 主配置
- `tailwind.config.js`: TailwindCSS 配置
- `tsconfig.json`: TypeScript 配置

## 🎨 自定义

### 📄 添加新页面

在 `src/pages` 目录中创建新的 `.astro` 文件。文件名将决定路由。

### 🔧 添加新语言或技术

要将新的编程语言或技术工具整合到网站的胶囊中，请按照以下步骤操作：

1. **🖼️ 添加 SVG 图标**: 将语言或工具的 SVG 文件放在 `src/icons` 文件夹中。

   > **💡 建议**: 对于 SVG 图标，推荐使用 [SVGL](https://svgl.app/)，这是一个优秀的高质量矢量库，为大多数流行的语言和技术提供优化的图标。

2. **📝 注册语言**: 打开 `utils/languages.ts` 文件，按照以下格式向 languages 对象添加新条目：

   ```typescript
   html: {
       name: "HTML 5",
       iconName: "html",
   },
   ```

   其中：
   - `html`: 是语言的唯一标识符
   - `name`: 是将在界面中显示的名称
   - `iconName`: 是不带扩展名的 SVG 文件名（必须与 `src/icons` 中的文件名完全匹配）

完成这些步骤后，新的语言或技术就可以在网站的胶囊中使用了。您可以在创建或编辑项目或文章时选择它，相应的图标将在界面中正确显示。

如果在此过程中遇到任何问题，请尝试重启开发服务器。在某些情况下，对配置文件或静态资源的更改需要重启才能正确检测。

要验证新语言是否已正确添加，请在重启服务器后检查用户界面中的可用技术列表。

### 🎨 样式

- 使用 TailwindCSS 类进行样式设计
- 在 `src/styles/global.css` 中添加自定义样式

### 🧩 组件

- 在 `src/components` 中创建可重用组件
- 使用 `astro-icon` 导入图标

## 🚀 部署

该网站配置为在 Vercel 上部署，但也可以部署到任何静态托管服务。

## 🤝 贡献

1. Fork 仓库
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详见 LICENSE 文件。
