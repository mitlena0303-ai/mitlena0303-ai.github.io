// robots.txt генерируется из домена в astro.config.mjs - править вручную не нужно.
// Список AI-ботов разрешён явно: без них нет цитирования в ChatGPT, Perplexity,
// Claude, Gemini, Алисе и в ИИ-ответах поисковиков. Боты появляются примерно раз
// в месяц, список стоит освежать пару раз в год.
import type { APIRoute } from 'astro';

const RULES = `# Обычные поисковики и все прочие боты — разрешено всё
User-agent: *
Allow: /

# ── AI-краулеры и поисковые боты разрешены явно ──
# Без них нет цитирования в ChatGPT, Perplexity, Claude, Gemini, Алисе и AI Overviews.
# Список пополняется, новые боты появляются примерно раз в месяц.

# OpenAI
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

# Anthropic
User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: anthropic-ai
Allow: /

# Perplexity
User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

# Google
User-agent: Google-Extended
Allow: /

User-agent: Google-CloudVertexBot
Allow: /

User-agent: Gemini-Deep-Research
Allow: /

# Microsoft
User-agent: Bingbot
Allow: /

User-agent: CopilotBot
Allow: /

# Apple
User-agent: Applebot-Extended
Allow: /

# Meta (запрещена в РФ)
User-agent: Meta-ExternalAgent
Allow: /

User-agent: Meta-WebIndexer
Allow: /

User-agent: FacebookBot
Allow: /

# Прочие AI-лаборатории и поисковики
User-agent: Bytespider
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: DuckAssistBot
Allow: /

User-agent: MistralAI-User
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: YouBot
Allow: /

User-agent: PhindBot
Allow: /

User-agent: KagiBot
Allow: /

User-agent: GrokBot
Allow: /

User-agent: CCBot
Allow: /

User-agent: Diffbot
Allow: /

User-agent: ai2bot
Allow: /

User-agent: ICC-Crawler
Allow: /

User-agent: Webz.io
Allow: /

# Яндекс (Алиса / YandexGPT)
User-agent: Yandex-Neuro
Allow: /`;

export const GET: APIRoute = ({ site }) =>
  new Response(`${RULES}\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
