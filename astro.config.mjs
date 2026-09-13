import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://techverseblogs.in',
  trailingSlash: 'always',
  integrations: [
    mdx(),
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/tag/'),
      serialize(item) {
        if (item.url === 'https://techverseblogs.in' || item.url === 'https://techverseblogs.in/') {
          item.changefreq = 'daily';
          item.priority = 1.0;
        } else if (item.url.includes('/blog/')) {
          item.changefreq = 'weekly';
          item.priority = 0.9;
        } else {
          item.changefreq = 'monthly';
          item.priority = 0.6;
        }
        return item;
      }
    }),
  ],
  image: {
    domains: ['images.unsplash.com'],
  },
  markdown: {
    shikiConfig: {
      theme: 'dracula',
      wrap: true,
    },
  },
});
