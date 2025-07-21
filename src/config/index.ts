/**
 * 应用配置管理
 * 集中管理所有配置项，提供类型安全的配置访问
 */

// 环境变量类型定义
interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  SITE_URL: string;
  BUILD_TIME: string;
}

// 站点配置类型定义
interface SiteConfig {
  name: string;
  title: string;
  description: string;
  author: {
    name: string;
    email: string;
    url: string;
  };
  social: {
    github: string;
    twitter?: string;
    linkedin?: string;
  };
  seo: {
    keywords: string[];
    ogImage: string;
  };
}

// 功能特性配置
interface FeatureConfig {
  development: {
    showPerformanceMetrics: boolean;
    enableDebugMode: boolean;
    showBuildInfo: boolean;
  };
  analytics: {
    enabled: boolean;
    provider: 'vercel' | 'google' | 'none';
  };
  comments: {
    enabled: boolean;
    provider: 'giscus' | 'disqus' | 'none';
  };
  search: {
    enabled: boolean;
    provider: 'algolia' | 'local' | 'none';
  };
}

// 性能配置
interface PerformanceConfig {
  images: {
    optimization: boolean;
    formats: string[];
    quality: number;
  };
  fonts: {
    preload: string[];
    display: 'swap' | 'block' | 'fallback' | 'optional';
  };
  caching: {
    staticAssets: number; // 缓存时间（秒）
    pages: number;
  };
}

// 完整配置类型
interface AppConfig {
  env: EnvironmentConfig;
  site: SiteConfig;
  features: FeatureConfig;
  performance: PerformanceConfig;
}

// 获取环境变量
function getEnvConfig(): EnvironmentConfig {
  return {
    NODE_ENV: (process.env.NODE_ENV as any) || 'development',
    SITE_URL: process.env.SITE_URL || 'https://os-lihua.github.io',
    BUILD_TIME: new Date().toISOString(),
  };
}

// 站点配置
const siteConfig: SiteConfig = {
  name: 'YaCo Blog',
  title: 'YaCo - 个人博客',
  description: '分享技术、思考和生活的个人博客',
  author: {
    name: 'YaCo',
    email: '2634610614@qq.com',
    url: 'https://os-lihua.github.io',
  },
  social: {
    github: 'https://github.com/OS-Lihua',
  },
  seo: {
    keywords: [
      'YaCo',
      '博客',
      '技术',
      'Web3',
      '智能合约',
      'Solidity',
      'JavaScript',
      'TypeScript',
      'React',
      'Astro'
    ],
    ogImage: '/images/og-image.png',
  },
};

// 功能特性配置
const featureConfig: FeatureConfig = {
  development: {
    showPerformanceMetrics: getEnvConfig().NODE_ENV === 'development',
    enableDebugMode: getEnvConfig().NODE_ENV === 'development',
    showBuildInfo: true,
  },
  analytics: {
    enabled: getEnvConfig().NODE_ENV === 'production',
    provider: 'vercel',
  },
  comments: {
    enabled: false,
    provider: 'none',
  },
  search: {
    enabled: false,
    provider: 'none',
  },
};

// 性能配置
const performanceConfig: PerformanceConfig = {
  images: {
    optimization: true,
    formats: ['webp', 'avif', 'png', 'jpg'],
    quality: 80,
  },
  fonts: {
    preload: [
      '/fonts/montserrat-400.woff2',
      '/fonts/montserrat-600.woff2',
      '/fonts/opensans-400.woff2',
    ],
    display: 'swap',
  },
  caching: {
    staticAssets: 31536000, // 1年
    pages: 3600, // 1小时
  },
};

// 导出完整配置
const config: AppConfig = {
  env: getEnvConfig(),
  site: siteConfig,
  features: featureConfig,
  performance: performanceConfig,
};

export default config;

// 导出类型定义
export type {
  AppConfig,
  SiteConfig,
  FeatureConfig,
  PerformanceConfig,
  EnvironmentConfig,
};

// 导出配置验证函数
export function validateConfig(config: AppConfig): boolean {
  try {
    // 基本验证
    if (!config.site.name || !config.site.title) {
      throw new Error('Site name and title are required');
    }
    
    if (!config.site.author.name || !config.site.author.email) {
      throw new Error('Author name and email are required');
    }
    
    if (!config.env.SITE_URL) {
      throw new Error('SITE_URL is required');
    }
    
    return true;
  } catch (error) {
    console.error('Configuration validation failed:', error);
    return false;
  }
}

// 导出配置获取函数
export function getConfig(): AppConfig {
  if (!validateConfig(config)) {
    throw new Error('Invalid configuration');
  }
  return config;
}
