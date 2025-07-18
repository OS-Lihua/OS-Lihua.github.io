/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

// 全局类型定义
declare global {
  interface Window {
    // 性能监控
    announceToScreenReader?: (
      message: string,
      priority?: 'polite' | 'assertive'
    ) => void;
    trapFocus?: (element: HTMLElement) => void;

    // 主题切换
    toggleTheme?: () => void;

    // 错误处理
    reportError?: (error: Error) => void;
  }
}

// 组件 Props 类型
export interface BaseComponentProps {
  class?: string;
  id?: string;
  'data-testid'?: string;
}

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export interface ImageProps extends BaseComponentProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  sizes?: string;
  quality?: number;
  format?: 'webp' | 'avif' | 'png' | 'jpg' | 'jpeg';
}

// Markdown 文件类型定义
export interface MarkdownFrontmatter {
  title: string;
  description: string;
  pubDate: string;
  tags?: string[];
  languages?: string[];
  image?:
    | string
    | {
        url: string;
        alt?: string;
      };
  author?: string;
  draft?: boolean;
  featured?: boolean;
  [key: string]: any;
}

export interface MarkdownPost {
  frontmatter: MarkdownFrontmatter;
  url?: string;
  file?: string;
  Content?: any;
  compiledContent?: () => string;
  rawContent?: () => string;
  getHeadings?: () => Array<{
    depth: number;
    slug: string;
    text: string;
  }>;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  iconName?: string;
  iconPosition?: 'left' | 'right';
}

export interface LanguageInfo {
  name: string;
  iconName: string;
  color?: string;
  category?: string;
}

export interface ProjectData {
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  category?: string;
  startDate?: string;
  endDate?: string;
  status?: 'completed' | 'in-progress' | 'planned';
}

export interface BlogPostData {
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  tags: string[];
  category: string;
  image?: string;
  readingTime?: string;
  wordCount?: number;
  featured?: boolean;
  draft?: boolean;
}

export interface FriendLinkData {
  name: string;
  description: string;
  url: string;
  avatar?: string;
  category?: string;
  status?: 'active' | 'inactive';
}

// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 错误类型
export interface ErrorInfo {
  message: string;
  filename?: string;
  lineno?: number;
  colno?: number;
  stack?: string;
  timestamp: string;
  userAgent: string;
  url: string;
}

// 性能指标类型
export interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
}

// 主题类型
export type Theme = 'light' | 'dark' | 'system';

// 语言类型
export type Language = 'zh-CN' | 'en-US';

// 导出空对象以使此文件成为模块
export {};
