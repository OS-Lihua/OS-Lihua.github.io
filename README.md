
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
    │   │   │   └── 📁posts              # 博客 提交
    │   │   │       └── index.astro           # All posts page
    │   │   │   ├── 📁tags               # 博客 标签
    │   │   │   ├── 📁techs              # 博客 技术栈/分类
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
    ├── package.json
    ├── pnpm-lock.yaml
    ├── README.md
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
   - 静态站点生成 (SSG)
   - 使用 Preact 的部分水合
   - 图片自动优化 (WebP/AVIF)
   - 字体预加载和优化
   - 代码分割和懒加载
   - 性能监控和 Web Vitals

2. **💻 现代开发体验**
   - TypeScript 严格模式
   - ESLint + Prettier 代码规范
   - 热模块替换 (HMR)
   - 自动类型检查
   - VS Code 集成配置
   - Git Hooks 和 Husky

3. **🔍 SEO 和分析**
   - 完整的 SEO 元数据
   - 结构化数据 (JSON-LD)
   - 自动站点地图生成
   - RSS 订阅支持
   - Open Graph 和 Twitter Cards
   - Vercel 速度分析

4. **🎨 样式和 UI**
   - TailwindCSS v4 最新版本
   - 响应式设计
   - 暗色模式支持
   - 动画和过渡效果
   - 自定义设计系统
   - 可访问性优化

5. **🛡️ 安全和质量**
   - 内容安全策略 (CSP)
   - 错误边界和异常处理
   - 依赖安全扫描
   - 代码质量检查
   - 自动化测试准备

## 🚀 开始使用

1. **📦 安装依赖**
   ```bash
   pnpm install
   ```

2. **⚡ 开发模式**
   ```bash
   pnpm dev
   ```

3. **🔍 代码检查**
   ```bash
   pnpm lint        # 运行 ESLint 检查并自动修复
   pnpm lint:check  # 仅检查，不修复
   pnpm format      # 格式化代码
   pnpm type-check  # TypeScript 类型检查
   ```

4. **🏗️ 构建项目**
   ```bash
   pnpm build
   ```

5. **👀 预览构建**
   ```bash
   pnpm preview
   ```

6. **🧹 清理缓存**
   ```bash
   pnpm clean
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

<!-- ---
### 🧷 Favicon Setup

要自定义您网站的 favicon 和网络应用图标，您可以使用 [favicon.io](https://favicon.io/favicon-converter/) 生成所有必要的变体。上传您的徽标或图标，该工具将为各种设备和平台创建一整套优化文件。
将生成的文件放置在 📂 public 目录中，如下所示：

```bash
📂 public
├── 📄 android-chrome-192x192.png
├── 📄 android-chrome-512x512.png
├── 📄 apple-touch-icon.png
├── 📄 favicon-16x16.png
├── 📄 favicon-32x32.png
├── 📄 favicon.ico
└── 📄 site.webmanifest
```

> 💡 别忘了更新 site.webmanifest 的内容，以匹配您应用的名称、描述和主题颜色，以获得完整的 PWA 体验。
--- -->

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
