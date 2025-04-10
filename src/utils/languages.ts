export interface Language {
  name: string;
  iconName: string;
  className?: string;
}

export const languages: Record<string, Language> = {
  cpp: {
    name: "Cpp",
    iconName: "cpp",
  },
  astro: {
    name: "Astro",
    iconName: "astro",
  },
  cloudflare: {
    name: "Cloudflare",
    iconName: "cloudflare",
  },
  html: {
    name: "HTML 5",
    iconName: "html",
  },
  javascript: {
    name: "JavaScript",
    iconName: "javascript",
  },
  mysql: {
    name: "MySQL",
    className: "!bg-[#f6ece1]",
    iconName: "mysql",
  },
  hexo: {
    name: "Hexo",
    iconName: "hexo",
  },
  node: {
    name: "Node.js",
    iconName: "node",
  },
  docusaurus: {
    name: "Docusaurus",
    iconName: "docusaurus",
  },
  figma: {
    name: "Figma",
    iconName: "figma",
  },
  markdown: {
    name: "Markdown",
    iconName: "markdown",
  },
  git: {
    name: "Git",
    iconName: "git",
  },
  css: {
    name: "CSS",
    iconName: "css",
  },
  vitepress: {
    name: "Vitepress",
    iconName: "vitepress",
  },
  cursor: {
    name: "Cursor",
    iconName: "cursor-ia",
  },
  deepseek: {
    name: "DeepSeek",
    iconName: "deepseek",
  },
  go: {
    name: "Go",
    iconName: "go",
  },
  solidity: {
    name: "Solidity",
    iconName: "solidity",
  },
  java: {
    name: "Java",
    iconName: "java",
  },
};

export const getLanguage = (lang: string): Language => {
  return languages[lang] || languages.html;
}; 