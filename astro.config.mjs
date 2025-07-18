// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import { rehypeShiki } from '@astrojs/markdown-remark';
import rehypeMermaid from 'rehype-mermaid';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.yaco.email',

  // 性能优化配置
  output: 'static',
  compressHTML: true,

  // 集成配置
  integrations: [
    preact({
      compat: true,
    }),
    icon({
      iconDir: 'src/icons',
    }),
    sitemap({
      filter: page =>
        !page.includes('/blog/tags') && !page.includes('/blog/techs'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],

  // Vite 配置
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: 'lightningcss',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['preact', 'preact/hooks'],
            utils: ['src/utils/languages.ts'],
          },
        },
      },
    },
    ssr: {
      noExternal: ['@astrojs/preact'],
    },
    // 优化开发服务器配置
    server: {
      hmr: {
        timeout: 30000, // 增加 HMR 超时时间
      },
      fs: {
        // 允许访问项目根目录之外的文件
        allow: ['..'],
      },
    },
    // 优化模块解析
    optimizeDeps: {
      include: ['preact', 'preact/hooks'],
      exclude: ['@astrojs/preact'],
      // 强制预构建依赖
      force: false,
    },
    // 缓存配置
    cacheDir: 'node_modules/.vite',
    // 增加超时时间
    define: {
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
    },
    // 性能优化
    esbuild: {
      target: 'es2020',
      keepNames: true,
    },
  },
  markdown: {
    shikiConfig: {
      // 从 Shiki 的内置主题中选择 (或者添加你自己的)
      // https://shiki.style/themes
      // theme: 'dracula',
      // theme: 'github-dark'
      // 或者, 提供多个主题
      // 请参阅下面的注释，了解如何使用双明/暗主题
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
    rehypePlugins: [
      // 脑图，流程图等，放在 Shiki 前加载
      [
        rehypeMermaid,
        {
          strategy: 'img-svg',
          dark: true,
          // 修复 Playwright 浏览器上下文问题
          launchOptions: {
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
          },
          // 添加错误处理
          errorFallback: (error, node) => {
            console.warn('Mermaid rendering failed:', error.message);
            return node;
          },
        },
      ],
      [
        rehypeKatex,
        {
          // 配置 KaTeX 选项
          strict: false, // 允许一些非标准的 LaTeX 语法
          trust: true, // 允许一些可能不安全的命令
          macros: {
            // 添加中文支持的宏
            '\\text': '\\mathrm',
            '\\textbf': '\\mathbf',
            '\\textit': '\\mathit',
          },
          // 错误处理
          errorColor: '#cc0000',
          throwOnError: false, // 不抛出错误，而是显示错误信息
        },
      ],
      rehypeShiki,
    ],
    remarkPlugins: [
      [
        remarkMath,
        {
          // 配置数学公式解析选项
          singleDollarTextMath: false, // 禁用单个 $ 符号的行内数学
          inlineMathDouble: true, // 启用 $$ 的行内数学
        },
      ],
    ],

    syntaxHighlight: false,
  },
});
