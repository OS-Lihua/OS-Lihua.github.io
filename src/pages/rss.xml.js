import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
  return rss({
    title: 'YaCo',
    description: 'Non-fully rational person, practitioner. | professional mistake maker. | Web3 & AI Dev with Community Explorer',
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
    customData: `<language>zh</language>`,
  });
}