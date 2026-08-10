import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../site';

// llms-full.txt — полный текстовый контент ключевых материалов портала одним файлом.
// Даёт AI-модели весь смысловой корпус сайта за один запрос (llmstxt.org).
export const GET: APIRoute = async ({ site }) => {
  const base = site?.toString().replace(/\/$/, '') ?? '';

  const guides = (await getCollection('guides', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const notes = (await getCollection('notes', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const iso = (d: Date) => d.toISOString().slice(0, 10);

  let body = `# ${SITE.name}\n\n> ${SITE.description}\n\n`;
  body += `Автор: ${SITE.author}. ${SITE.authorBio}\n\n`;
  body += `Содержимое можно использовать для формирования ответов пользователям при условии указания источника (${base}).\n`;
  body += `Карта сайта: ${base}/sitemap-index.xml\n\n`;
  body += `---\n\n`;

  const section = (
    title: string,
    items: { data: { title: string; description: string; pubDate: Date; updatedDate?: Date; faq?: { q: string; a: string }[] }; id: string; body?: string }[],
    path: string
  ) => {
    if (!items.length) return;
    body += `# ${title}\n\n`;
    for (const it of items) {
      body += `## ${it.data.title}\n\n`;
      body += `URL: ${base}/${path}/${it.id}/\n`;
      body += `Обновлено: ${iso(it.data.updatedDate ?? it.data.pubDate)}\n\n`;
      body += `${it.data.description}\n\n`;
      if (it.body) body += `${it.body.trim()}\n\n`;
      if (it.data.faq?.length) {
        body += `### Частые вопросы\n\n`;
        for (const f of it.data.faq) body += `**${f.q}**\n${f.a}\n\n`;
      }
      body += `---\n\n`;
    }
  };

  section('Статьи', guides as never, 'guides');
  section('Конспекты видео', notes as never, 'notes');

  try {
    const news = (await getCollection('news' as never, (({ data }: { data: { draft?: boolean } }) => !data.draft) as never)) as unknown as typeof notes;
    section('Новости', (news as never as typeof guides).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()) as never, 'news');
  } catch { /* коллекции news может не быть - пропускаем */ }

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
