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

import fs from 'node:fs';
import path from 'node:path';

const blogDir = path.resolve('src/content/blog');
const postDates = new Map();
const tagCounts = new Map();
const slugify = (s) => s.toLowerCase().trim().replace(/\s+/g, '-');

if (fs.existsSync(blogDir)) {
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  for (const file of files) {
    const slug = file.replace(/\.(md|mdx)$/, '');
    const content = fs.readFileSync(path.join(blogDir, file), 'utf8');

    const updatedMatch = content.match(/^updatedDate:\s*(.+)$/m);
    const pubMatch = content.match(/^pubDate:\s*(.+)$/m);
    const dateStr = (updatedMatch && updatedMatch[1].trim()) || (pubMatch && pubMatch[1].trim());
    if (dateStr) {
      const parsed = new Date(dateStr);
      if (!isNaN(parsed.getTime())) {
        postDates.set(slug, parsed.toISOString());
      }
    }

    const tagsMatch = content.match(/^tags:\s*\[(.*?)\]/ms);
    if (tagsMatch) {
      const tags = tagsMatch[1].split(',').map((t) => t.replace(/['"\[\]]/g, '').trim()).filter(Boolean);
      tags.forEach((tag) => {
        const tagSlug = slugify(tag);
        tagCounts.set(tagSlug, (tagCounts.get(tagSlug) || 0) + 1);
      });
    }
  }
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
      filter: (page) => {
        if (page.includes('/404')) return false;
        const tagMatch = page.match(/\/tag\/([^\/]+)\/?$/);
        if (tagMatch) {
          const tagSlug = tagMatch[1];
          return (tagCounts.get(tagSlug) || 0) >= 3;
        }
        return true;
      },
      serialize(item) {
        if (item.url === 'https://techverseblogs.in' || item.url === 'https://techverseblogs.in/') {
          item.changefreq = 'daily';
          item.priority = 1.0;
          item.lastmod = new Date().toISOString();
        } else if (item.url.includes('/blog/')) {
          item.changefreq = 'weekly';
          item.priority = 0.9;
          const match = item.url.match(/\/blog\/([^\/]+)\/?$/);
          if (match && postDates.has(match[1])) {
            item.lastmod = postDates.get(match[1]);
          } else {
            item.lastmod = new Date().toISOString();
          }
        } else {
          item.changefreq = 'monthly';
          item.priority = 0.6;
          item.lastmod = new Date().toISOString();
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
