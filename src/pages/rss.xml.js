import rss from '@astrojs/rss';
import { postsCache } from '../utils/posts-cache.ts';
import { projectsCache } from '../utils/projects-cache.ts';

export async function GET(context) {
  // 使用缓存系统获取数据，避免动态导入冲突
  const [posts, projects] = await Promise.all([
    postsCache.getPosts('**/*.md'),
    projectsCache.getProjects('**/*.md')
  ]);

  // 转换为RSS项格式
  const items = [...posts, ...projects].map(item => ({
    title: item.frontmatter.title,
    pubDate: new Date(item.frontmatter.pubDate),
    description: item.frontmatter.description || '',
    link: `${context.site}${item.url}`,
    author: item.frontmatter.author || 'YaCo',
    categories: item.frontmatter.tags || [],
  })).sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'YaCo',
    description: 'Non-fully rational person, practitioner. | professional mistake maker. | Crypto & AI Dev with Community Explorer',
    site: context.site,
    items,
    customData: `<language>zh</language>`,
  });
}