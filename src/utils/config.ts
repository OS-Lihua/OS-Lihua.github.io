/**
 * 网站配置管理
 */

// 网站基础信息
export const siteConfig = {
  name: 'YaCo',
  title: 'YaCo - Crypto & AI Developer',
  description: 'YaCo的个人网站，专注于加密货币和人工智能开发，分享技术博客和项目展示。',
  url: 'https://www.yaco.email',
  author: {
    name: 'YaCo',
    email: 'contact@yaco.email',
    twitter: '@yaco_dev',
    github: 'https://github.com/yaco-dev',
    linkedin: 'https://linkedin.com/in/yaco-dev',
  },
  defaultLanguage: 'zh-CN',
  defaultTheme: 'dark' as const,
  logo: '/images/logo.png',
  favicon: '/favicon.ico',
  ogImage: '/images/og-image.png',
} as const;

// 导航配置
export const navigation = {
  main: [
    { name: '首页', href: '/', icon: 'home' },
    { name: '博客', href: '/blog', icon: 'blog' },
    { name: '项目', href: '/projects', icon: 'briefcase' },
    { name: '友链', href: '/friends', icon: 'link' },
    { name: '关于', href: '/about-me', icon: 'person' },
  ],
  social: [
    { name: 'GitHub', href: siteConfig.author.github, icon: 'github' },
    { name: 'Twitter', href: `https://twitter.com/${siteConfig.author.twitter.replace('@', '')}`, icon: 'twitter' },
    { name: 'LinkedIn', href: siteConfig.author.linkedin, icon: 'linkedin' },
    { name: 'Email', href: `mailto:${siteConfig.author.email}`, icon: 'envelope' },
  ],
  footer: [
    { name: '隐私政策', href: '/privacy' },
    { name: '使用条款', href: '/terms' },
    { name: 'RSS', href: '/rss.xml' },
    { name: '站点地图', href: '/sitemap.xml' },
  ],
} as const;

// 博客配置
export const blogConfig = {
  postsPerPage: 10,
  excerptLength: 150,
  readingSpeed: 200, // 每分钟字数
  categories: [
    'Technology',
    'Cryptocurrency',
    'AI/ML',
    'Web Development',
    'Blockchain',
    'Tutorial',
    'Opinion',
  ],
  defaultCategory: 'Technology',
  featuredPostsCount: 3,
  relatedPostsCount: 3,
  enableComments: false, // 可以集成评论系统
  enableSearch: true,
  enableTags: true,
  enableCategories: true,
} as const;

// 项目配置
export const projectConfig = {
  projectsPerPage: 6,
  categories: [
    'Web Development',
    'Cryptocurrency',
    'AI/ML',
    'Mobile App',
    'Desktop App',
    'Open Source',
    'Client Work',
  ],
  technologies: [
    'JavaScript',
    'TypeScript',
    'React',
    'Vue',
    'Astro',
    'Node.js',
    'Python',
    'Rust',
    'Solidity',
    'Go',
  ],
  status: ['completed', 'in-progress', 'planned'] as const,
  featuredProjectsCount: 3,
} as const;

// SEO 配置
export const seoConfig = {
  defaultTitle: siteConfig.title,
  titleTemplate: '%s | YaCo',
  defaultDescription: siteConfig.description,
  defaultImage: siteConfig.ogImage,
  twitterHandle: siteConfig.author.twitter,
  keywords: [
    'YaCo',
    '加密货币',
    '人工智能',
    'Web开发',
    '区块链',
    '技术博客',
    'Cryptocurrency',
    'AI',
    'Blockchain',
    'Web Development',
  ],
  structuredData: {
    organization: {
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}${siteConfig.logo}`,
      sameAs: [
        siteConfig.author.github,
        siteConfig.author.linkedin,
        `https://twitter.com/${siteConfig.author.twitter.replace('@', '')}`,
      ],
    },
    person: {
      name: siteConfig.author.name,
      jobTitle: 'Crypto & AI Developer',
      worksFor: siteConfig.name,
      url: siteConfig.url,
      sameAs: [
        siteConfig.author.github,
        siteConfig.author.linkedin,
        `https://twitter.com/${siteConfig.author.twitter.replace('@', '')}`,
      ],
    },
  },
} as const;

// 性能配置
export const performanceConfig = {
  // 图片优化
  images: {
    formats: ['avif', 'webp', 'jpg'] as const,
    quality: 80,
    sizes: {
      thumbnail: 150,
      small: 300,
      medium: 600,
      large: 1200,
      xlarge: 1920,
    },
    lazyLoading: true,
    placeholder: 'blur',
  },
  
  // 字体优化
  fonts: {
    preload: [
      '/fonts/montserrat-400.woff2',
      '/fonts/montserrat-600.woff2',
      '/fonts/opensans-400.woff2',
    ],
    display: 'swap' as const,
  },
  
  // 缓存配置
  cache: {
    staticAssets: '1y', // 1年
    images: '1M', // 1个月
    pages: '1d', // 1天
    api: '1h', // 1小时
  },
  
  // 预加载配置
  preload: {
    criticalImages: ['/images/yaco.png'],
    criticalFonts: [
      'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap',
    ],
  },
} as const;

// 分析配置
export const analyticsConfig = {
  // Google Analytics
  googleAnalytics: {
    measurementId: '', // 在生产环境中设置
    enabled: false, // 在生产环境中启用
  },
  
  // Vercel Analytics
  vercelAnalytics: {
    enabled: true,
  },
  
  // 自定义事件跟踪
  events: {
    pageView: 'page_view',
    click: 'click',
    download: 'download',
    externalLink: 'external_link',
    search: 'search',
    contact: 'contact',
  },
} as const;

// 功能开关
export const featureFlags = {
  // 开发功能
  development: {
    showPerformanceMetrics: true,
    enableErrorBoundary: true,
    enableAccessibilityEnhancer: true,
    enableDebugMode: false,
  },
  
  // 生产功能
  production: {
    enableAnalytics: true,
    enableServiceWorker: false, // 可以启用 PWA
    enableWebVitals: true,
    enableErrorReporting: true,
  },
  
  // 实验性功能
  experimental: {
    enableDarkModeToggle: true,
    enableLanguageSwitch: false,
    enableComments: false,
    enableSearch: true,
    enableNotifications: false,
  },
} as const;

// 主题配置
export const themeConfig = {
  colors: {
    primary: {
      50: '#ecfdf5',
      100: '#d0fbe5',
      200: '#a4f4cf',
      300: '#6ce9b7',
      400: '#31d69a',
      500: '#0dbc82',
      600: '#03986a',
      700: '#027a58',
      800: '#056047',
      900: '#054f3c',
      950: '#012d22',
    },
    secondary: {
      50: '#f0fdfa',
      100: '#cbfcf1',
      200: '#96f7e4',
      300: '#5cecd5',
      400: '#2bd6c1',
      500: '#12baa8',
      600: '#0b9689',
      700: '#0e776f',
      800: '#105f5a',
      900: '#124f4b',
      950: '#03302f',
    },
  },
  fonts: {
    sans: ['Montserrat', 'system-ui', 'sans-serif'],
    serif: ['Georgia', 'serif'],
    mono: ['Fira Code', 'monospace'],
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

// 环境配置
export const env = {
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,
  baseUrl: import.meta.env.BASE_URL,
  siteUrl: import.meta.env.SITE || siteConfig.url,
} as const;

// 导出所有配置
export const config = {
  site: siteConfig,
  navigation,
  blog: blogConfig,
  project: projectConfig,
  seo: seoConfig,
  performance: performanceConfig,
  analytics: analyticsConfig,
  features: featureFlags,
  theme: themeConfig,
  env,
} as const;

export default config;
