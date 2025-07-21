/**
 * 全局类型定义
 * 集中管理所有TypeScript类型定义
 */

// 基础类型
export type Language = 'zh' | 'en';
export type Theme = 'light' | 'dark' | 'auto';

// 博客文章类型
export interface BlogPost {
  slug: string;
  title: string;
  description?: string;
  author: string;
  pubDate: Date;
  updatedDate?: Date;
  image?: {
    src: string;
    alt: string;
  };
  tags: string[];
  languages: Language[];
  draft?: boolean;
  featured?: boolean;
  readingTime?: number;
  wordCount?: number;
}

// 项目类型
export interface Project {
  id: string;
  title: string;
  description: string;
  image?: {
    src: string;
    alt: string;
  };
  technologies: string[];
  links: {
    demo?: string;
    github?: string;
    docs?: string;
  };
  status: 'active' | 'completed' | 'archived';
  featured?: boolean;
  startDate: Date;
  endDate?: Date;
}

// 友链类型
export interface FriendLink {
  name: string;
  url: string;
  description: string;
  avatar?: string;
  status: 'active' | 'inactive';
  addedDate: Date;
}

// 导航菜单类型
export interface NavItem {
  name: string;
  href: string;
  icon?: string;
  external?: boolean;
  children?: NavItem[];
}

// SEO元数据类型
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

// 分页类型
export interface Pagination<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
  hasPrev: boolean;
  nextPage?: number;
  prevPage?: number;
}

// API响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    version: string;
    [key: string]: any;
  };
}

// 表单类型
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// 搜索结果类型
export interface SearchResult {
  type: 'post' | 'project' | 'page';
  title: string;
  description: string;
  url: string;
  image?: string;
  date?: Date;
  tags?: string[];
  score: number;
}

// 统计数据类型
export interface SiteStats {
  posts: {
    total: number;
    published: number;
    draft: number;
  };
  projects: {
    total: number;
    active: number;
    completed: number;
  };
  tags: {
    total: number;
    popular: Array<{
      name: string;
      count: number;
    }>;
  };
  views?: {
    total: number;
    thisMonth: number;
  };
}

// 性能指标类型
export interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  cls?: number; // Cumulative Layout Shift
  fid?: number; // First Input Delay
  tti?: number; // Time to Interactive
  memory?: {
    used: number;
    total: number;
  };
}

// 构建信息类型
export interface BuildInfo {
  version: string;
  buildTime: string;
  gitCommit?: string;
  gitBranch?: string;
  nodeVersion: string;
  environment: 'development' | 'production' | 'test';
}

// 主题配置类型
export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// 工具函数类型
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// 事件类型
export interface CustomEvent<T = any> {
  type: string;
  data: T;
  timestamp: Date;
}

// 错误类型
export interface AppError {
  code: string;
  message: string;
  stack?: string;
  context?: Record<string, any>;
  timestamp: Date;
}

// 日志类型
export interface LogEntry {
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  data?: any;
  timestamp: Date;
  source?: string;
}

// 缓存类型
export interface CacheEntry<T = any> {
  key: string;
  value: T;
  expiresAt: Date;
  createdAt: Date;
}

// 配置类型（从config/index.ts导入）
export type { AppConfig, SiteConfig, FeatureConfig, PerformanceConfig } from '../config';

// 实用类型守卫
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isBlogPost(obj: any): obj is BlogPost {
  return (
    obj &&
    typeof obj.slug === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.author === 'string' &&
    obj.pubDate instanceof Date &&
    Array.isArray(obj.tags) &&
    Array.isArray(obj.languages)
  );
}
