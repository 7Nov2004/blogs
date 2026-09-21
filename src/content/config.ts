import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    seoDescription: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.string().optional(),
    coverImage: z.string().optional(),
    category: z.enum(['ai', 'webdev', 'gadgets', 'tips']),
    tags: z.array(z.string()).default([]),
    author: z.string().default('Aayush Kumar'),
    sponsored: z.boolean().default(false),
    featured: z.boolean().default(false),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
  }),
});

export const collections = { blog };
