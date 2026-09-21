import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}]/gu;

function remarkStripHeadingEmojis() {
  return (tree) => {
    function visit(node) {
      if (node.type === 'heading') {
        (node.children || []).forEach((child) => {
          if (child.type === 'text') {
            child.value = child.value
              .replace(emojiRegex, '')
              .replace(/^\s*[-–—]\s*/, '')
              .trimStart();
          }
        });
      }
      if (node.children) {
        node.children.forEach(visit);
      }
    }
    visit(tree);
  };
}

export default defineConfig({
  site: 'https://techverseblogs.in',
  trailingSlash: 'always',
  redirects: {
    '/sitemap.xml': '/sitemap-index.xml',
  },
  integrations: [
    mdx({
      remarkPlugins: [remarkStripHeadingEmojis],
    }),
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
    remarkPlugins: [remarkStripHeadingEmojis],
    shikiConfig: {
      theme: 'dracula',
      wrap: true,
    },
  },
});
