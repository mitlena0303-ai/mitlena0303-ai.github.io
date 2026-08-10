import { CATEGORIES } from './site';

// Слаги и интро рубрик берутся из site.ts - править там, не здесь
export const CATEGORY_SLUGS: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORIES).map(([name, c]) => [name, c.slug]),
);

export const CATEGORY_INTRO: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORIES).map(([name, c]) => [name, c.intro]),
);

// Склонение по числу: plural(5, 'статья', 'статьи', 'статей') -> 'статей'
export function plural(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

// Время чтения: 160 слов в минуту, минимум 3 минуты
export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(3, Math.round(words / 160));
}

// Обложки-плашки для карточек, пока нет иллюстраций: цвет и слово по рубрике.
// Можно переопределить в frontmatter статьи (coverWord, coverColor).
const FALLBACK_COLORS = ['#e8f1ff', '#ffe9e2', '#e6f6e9', '#fff4c9', '#f0e8ff'];

export function coverFor(category: string, word?: string, color?: string) {
  const hash = [...category].reduce((s, ch) => s + ch.charCodeAt(0), 0);
  return {
    word: word ?? category.toLowerCase(),
    color: color ?? FALLBACK_COLORS[hash % FALLBACK_COLORS.length],
  };
}
