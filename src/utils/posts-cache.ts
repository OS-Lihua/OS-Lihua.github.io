/**
 * 博客文章缓存工具
 * 用于优化开发服务器性能，避免重复加载文章
 */

import type { MarkdownPost } from '../env.d.ts';

type PostData = MarkdownPost;

interface CacheEntry {
  data: PostData[];
  timestamp: number;
  pattern: string;
}

class PostsCache {
  private cache = new Map<string, CacheEntry>();
  private readonly CACHE_TTL = 5000; // 5秒缓存时间（开发模式）

  /**
   * 获取缓存的文章数据
   */
  async getPosts(pattern: string): Promise<PostData[]> {
    const cacheKey = this.getCacheKey(pattern);
    const cached = this.cache.get(cacheKey);

    // 检查缓存是否有效
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }

    // 加载新数据
    const posts = await this.loadPosts(pattern);

    // 更新缓存
    this.cache.set(cacheKey, {
      data: posts,
      timestamp: Date.now(),
      pattern,
    });

    return posts;
  }

  /**
   * 加载文章数据
   */
  private async loadPosts(pattern: string): Promise<PostData[]> {
    try {
      const modules = import.meta.glob('/src/pages/blog/posts/*.md', {
        eager: true,
      });

      const posts = Object.entries(modules)
        .filter(([path]) => this.matchesPattern(path, pattern))
        .map(([path, module]: [string, any]) => ({
          ...module,
          url: this.getUrlFromPath(path),
          file: path,
        }))
        .filter(post => post.frontmatter) // 确保有 frontmatter
        .sort(
          (a, b) =>
            new Date(b.frontmatter.pubDate).getTime() -
            new Date(a.frontmatter.pubDate).getTime()
        );

      return posts;
    } catch (error) {
      console.error('Error loading posts:', error);
      return [];
    }
  }

  /**
   * 检查路径是否匹配模式
   */
  private matchesPattern(path: string, pattern: string): boolean {
    if (pattern === '**/*.md') return true;

    // 简单的模式匹配
    const regex = new RegExp(
      pattern
        .replace(/\*\*/g, '.*')
        .replace(/\*/g, '[^/]*')
        .replace(/\./g, '\\.')
    );

    return regex.test(path);
  }

  /**
   * 从文件路径生成 URL
   */
  private getUrlFromPath(path: string): string {
    return path
      .replace('/src/pages', '')
      .replace(/\.md$/, '')
      .replace(/\/index$/, '');
  }

  /**
   * 生成缓存键
   */
  private getCacheKey(pattern: string): string {
    return `posts:${pattern}`;
  }

  /**
   * 清除缓存
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * 清除过期缓存
   */
  clearExpiredCache(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp >= this.CACHE_TTL) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * 获取特定标签的文章
   */
  async getPostsByTag(tag: string): Promise<PostData[]> {
    const allPosts = await this.getPosts('**/*.md');
    return allPosts.filter(post => post.frontmatter.tags?.includes(tag));
  }

  /**
   * 获取特定语言/技术的文章
   */
  async getPostsByLanguage(language: string): Promise<PostData[]> {
    const allPosts = await this.getPosts('**/*.md');
    return allPosts.filter(post =>
      post.frontmatter.languages?.includes(language)
    );
  }

  /**
   * 获取所有标签
   */
  async getAllTags(): Promise<string[]> {
    const allPosts = await this.getPosts('**/*.md');
    const tags = allPosts
      .flatMap(post => post.frontmatter.tags || [])
      .filter((tag, index, array) => array.indexOf(tag) === index)
      .sort();

    return tags;
  }

  /**
   * 获取所有语言/技术
   */
  async getAllLanguages(): Promise<string[]> {
    const allPosts = await this.getPosts('**/*.md');
    const languages = allPosts
      .flatMap(post => post.frontmatter.languages || [])
      .filter((lang, index, array) => array.indexOf(lang) === index)
      .sort();

    return languages;
  }

  /**
   * 获取最新文章
   */
  async getLatestPosts(count: number = 5): Promise<PostData[]> {
    const allPosts = await this.getPosts('**/*.md');
    return allPosts.slice(0, count);
  }
}

// 创建单例实例
export const postsCache = new PostsCache();

// 在开发模式下定期清理过期缓存
if (import.meta.env.DEV) {
  setInterval(() => {
    postsCache.clearExpiredCache();
  }, 10000); // 每10秒清理一次
}

export default postsCache;
