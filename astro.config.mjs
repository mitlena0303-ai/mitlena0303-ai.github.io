import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';

// Хосты партнёрских (реферальных) ссылок: помечаем rel=sponsored - требование Google.
// Добавь сюда свои партнёрки, иначе поиск может счесть ссылки покупными.
const SPONSORED_HOSTS = ['telegram.me', 't.me'];

export default defineConfig({
  // Домен портала. Должен совпадать с SITE_URL в src/site.ts
  site: 'https://mitlena0303-ai.github.io',
  integrations: [sitemap()],
  markdown: {
    // Тёмные код-блоки в гамме промпт-боксов; светлая тема сливалась с белой страницей
    shikiConfig: { theme: 'github-dark' },
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: (el) => {
            const href = String(el.properties?.href ?? '');
            const sponsored = SPONSORED_HOSTS.some((h) => href.includes(`//${h}/`));
            return sponsored ? ['sponsored', 'nofollow', 'noopener'] : ['noopener'];
          },
        },
      ],
    ],
  },
});
