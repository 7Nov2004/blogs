import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  return rss({
    title: 'TechVerse — Tech ki Duniya, Hinglish Mein!',
    description: 'Latest tech news, tutorials, gadget reviews aur tips — sab kuch Hinglish mein!',
    site: context.site,
    items: posts
      .sort((a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate))
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/blog/${post.slug}/`,
        categories: post.data.tags,
      })),
    customData: `<language>hi</language>`,
  });
}
