import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    coverWord: z.string().optional(),
    coverColor: z.string().optional(),
    cover: z.string().optional(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
    draft: z.boolean().default(false),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    videoUrl: z.string(),
    channel: z.string(),
    duration: z.string().optional(),
    level: z.enum(['Новичкам', 'Средний', 'Продвинутый']).default('Новичкам'),
    topics: z.array(z.string()),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    cover: z.string().optional(),
    // Вводные блоки «смарт-конспекта» (о чём / кому полезно / что получите)
    about: z.string().optional(),
    forWhom: z.string().optional(),
    result: z.string().optional(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
    draft: z.boolean().default(false),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    cover: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    topics: z.array(z.string()),
    // Источник (видео-разбор), рендерится ссылкой, не кнопкой
    videoUrl: z.string().optional(),
    channel: z.string().optional(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { guides, notes, news };
