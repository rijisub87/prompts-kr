// 자동 sitemap.xml 생성 — 모든 정적 페이지·프롬프트·가이드·MBTI 결과 포함.
// 검색엔진(구글·네이버·빙)이 색인할 URL 목록.

import { MetadataRoute } from 'next';
import { getAllPrompts, getPromptsByCategory, CATEGORIES } from '@/lib/prompts';
import { getAllGuides } from '@/lib/guides';
import { ALL_TYPES } from '@/lib/mbti-test';

const BASE_URL = 'https://prompts-kr.vercel.app';

function parseDate(v: unknown, fallback: Date): Date {
  if (v instanceof Date) return v;
  if (typeof v === 'string') {
    const d = new Date(v);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return fallback;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // 1. 정적 페이지
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/guides`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/test`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/test/skill`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/test/saju`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/test/market`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/test/stocks`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/test/lotto`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/test/love`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/test/food`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/test/fake-friend`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/test/history`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/platforms`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/glossary`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/sources`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/stats`, lastModified: now, changeFrequency: 'daily', priority: 0.4 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE_URL}/license`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // 2. 프롬프트 페이지 (~200개)
  const prompts: MetadataRoute.Sitemap = getAllPrompts().map(p => ({
    url: `${BASE_URL}/p/${p.slug}`,
    lastModified: parseDate(p.addedAt, now),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // 3. 가이드 페이지 (~7개)
  const guides: MetadataRoute.Sitemap = getAllGuides().map(g => ({
    url: `${BASE_URL}/guides/${g.slug}`,
    lastModified: parseDate(g.updatedAt, now),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // 4. MBTI 결과 16개 — 공유 가능 URL
  const tests: MetadataRoute.Sitemap = ALL_TYPES.map(t => ({
    url: `${BASE_URL}/test/${t.toLowerCase()}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  // 5. 카테고리 인덱스 페이지 — 콘텐츠 있는 카테고리만
  const grouped = getPromptsByCategory();
  const categories: MetadataRoute.Sitemap = CATEGORIES
    .filter(c => grouped[c].length > 0)
    .map(c => ({
      url: `${BASE_URL}/c/${c}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

  return [...staticRoutes, ...prompts, ...guides, ...tests, ...categories];
}
