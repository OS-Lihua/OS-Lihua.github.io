/**
 * 项目缓存工具
 * 用于优化开发服务器性能，避免重复加载项目
 */

interface ProjectData {
  frontmatter: {
    title: string;
    description: string;
    pubDate: string;
    tags?: string[];
    image?: string;
    github?: string;
    demo?: string;
    [key: string]: any;
  };
  url?: string;
  file?: string;
  Content?: any;
}

interface CacheEntry {
  data: ProjectData[];
  timestamp: number;
  pattern: string;
}

class ProjectsCache {
  private cache = new Map<string, CacheEntry>();
  private readonly CACHE_TTL = 5000; // 5秒缓存时间（开发模式）

  /**
   * 获取缓存的项目数据
   */
  async getProjects(pattern: string = '**/*.md'): Promise<ProjectData[]> {
    const cacheKey = this.getCacheKey(pattern);
    const cached = this.cache.get(cacheKey);

    // 检查缓存是否有效
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }

    // 加载新数据
    const projects = await this.loadProjects(pattern);
    
    // 更新缓存
    this.cache.set(cacheKey, {
      data: projects,
      timestamp: Date.now(),
      pattern,
    });

    return projects;
  }

  /**
   * 加载项目数据
   */
  private async loadProjects(pattern: string): Promise<ProjectData[]> {
    try {
      const modules = import.meta.glob('/src/pages/projects/*.md', {
        eager: true,
      });

      const projects = Object.entries(modules)
        .filter(([path]) => this.matchesPattern(path, pattern))
        .map(([path, module]: [string, any]) => ({
          ...module,
          url: this.getUrlFromPath(path),
          file: path,
        }))
        .filter(project => project.frontmatter) // 确保有 frontmatter
        .sort((a, b) => 
          new Date(b.frontmatter.pubDate).getTime() - 
          new Date(a.frontmatter.pubDate).getTime()
        );

      return projects;
    } catch (error) {
      console.error('Error loading projects:', error);
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
    return `projects:${pattern}`;
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
   * 获取特定标签的项目
   */
  async getProjectsByTag(tag: string): Promise<ProjectData[]> {
    const allProjects = await this.getProjects('**/*.md');
    return allProjects.filter(project => 
      project.frontmatter.tags?.includes(tag)
    );
  }

  /**
   * 获取最新项目
   */
  async getLatestProjects(count: number = 5): Promise<ProjectData[]> {
    const allProjects = await this.getProjects('**/*.md');
    return allProjects.slice(0, count);
  }

  /**
   * 获取特色项目
   */
  async getFeaturedProjects(): Promise<ProjectData[]> {
    const allProjects = await this.getProjects('**/*.md');
    return allProjects.filter(project => 
      project.frontmatter.featured === true
    );
  }
}

// 创建单例实例
export const projectsCache = new ProjectsCache();

// 在开发模式下定期清理过期缓存
if (import.meta.env.DEV) {
  setInterval(() => {
    projectsCache.clearExpiredCache();
  }, 10000); // 每10秒清理一次
}

export default projectsCache;
