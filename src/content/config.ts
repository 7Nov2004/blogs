import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.string().optional(),
    category: z.enum(['ai', 'webdev', 'gadgets', 'tips']),
    tags: z.array(z.string()).default([]),
    author: z.string().default('TechVerse Team'),
    sponsored: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog };
