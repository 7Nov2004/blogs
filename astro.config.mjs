import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://techverse.in',
  integrations: [
    tailwind(),
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'dracula',
      wrap: true,
    },
  },
});
