// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap"
import icon from "astro-icon";
import { rehypeShiki } from "@astrojs/markdown-remark";  
import rehypeMermaid from "rehype-mermaid";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
  site: "https://www.yaco.email",
  
  integrations: [preact(), icon(), sitemap({
    filter: (page) =>
      !page.includes("/blog/tags") &&
      !page.includes("/blog/techs"),
  }),],

  vite: {
    plugins: [tailwindcss()],
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
        }  
      ],  
      rehypeKatex,
      rehypeShiki,  
    ],
    remarkPlugins: [
      remarkMath, 
    ],

    syntaxHighlight: false,
  },
});