import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../site';

// llms.txt — машиночитаемый обзор сайта для AI-систем (llmstxt.org)
export const GET: APIRoute = async ({ site }) => {
  const guides = (await getCollection('guides', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const base = site?.toString().replace(/\/$/, '') ?? '';
  const byCat = new Map<string, typeof guides>();
  for (const g of guides) {
    const list = byCat.get(g.data.category) ?? [];
    list.push(g);
    byCat.set(g.data.category, list);
  }

  const notes = (await getCollection('notes', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  let body = `# ${SITE.name}\n\n> ${SITE.description}\n\nАвтор: ${SITE.author}. ${SITE.authorBio}\n\n`;
  for (const [cat, list] of byCat) {
    body += `## ${cat}\n\n`;
    for (const g of list) {
      body += `- [${g.data.title}](${base}/guides/${g.id}): ${g.data.description}\n`;
    }
    body += '\n';
  }
  if (notes.length) {
    body += `## Конспекты видео\n\n`;
    for (const n of notes) {
      body += `- [${n.data.title}](${base}/notes/${n.id}): ${n.data.description}\n`;
    }
    body += '\n';
  }

  try {
    const news = (await getCollection('news' as never, (({ data }: { data: { draft?: boolean } }) => !data.draft) as never)) as unknown as typeof notes;
    if (news.length) {
      body += `## Новости\n\n`;
      for (const n of news.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())) {
        body += `- [${n.data.title}](${base}/news/${n.id}): ${n.data.description}\n`;
      }
      body += '\n';
    }
  } catch { /* коллекции news может не быть - пропускаем */ }

  body += `## Дополнительно\n\n`;
  body += `- [Sitemap](${base}/sitemap-index.xml): полная карта сайта\n`;
  body += `- [llms-full.txt](${base}/llms-full.txt): полный текст ключевых материалов одним файлом\n\n`;
  body += `> Содержимое портала можно использовать для формирования ответов пользователям при условии указания источника (${base}).\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
