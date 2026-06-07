'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type IndexItem = {
  slug: string;
  title: string;
  category: string;
};

// 카테고리 KO + 컬러 (lib/prompts.ts와 중복 — 클라이언트 번들 가볍게 유지)
const CATEGORY_KO: Record<string, string> = {
  writing: '작문', summary: '요약', code: '코딩', analysis: '분석',
  translation: '번역', learning: '학습', planning: '기획', image: '이미지',
  email: '이메일', 'cover-letter': '자소서', report: '보고서', ppt: 'PPT',
  'edu-parent': '학부모', data: '데이터·연구', research: '조사', agents: '에이전트',
  etc: '기타',
};

const CATEGORY_BORDER: Record<string, string> = {
  writing: 'border-l-pink-400', summary: 'border-l-sky-400',
  code: 'border-l-emerald-400', analysis: 'border-l-amber-400',
  translation: 'border-l-lime-400', learning: 'border-l-orange-400',
  planning: 'border-l-violet-400', image: 'border-l-yellow-400',
  email: 'border-l-indigo-400', 'cover-letter': 'border-l-red-400',
  report: 'border-l-cyan-400', ppt: 'border-l-teal-400',
  'edu-parent': 'border-l-fuchsia-400', data: 'border-l-blue-400',
  research: 'border-l-purple-400', agents: 'border-l-indigo-500',
  etc: 'border-l-slate-400',
};

// localStorage 'bookmarks' 슬러그 목록 → search-index 조회. 비어있으면 숨김.
// BookmarkButton의 'bookmarks-changed' 커스텀 이벤트와 다른 탭의 'storage' 이벤트 모두 구독.
export default function Bookmarks() {
  const [items, setItems] = useState<IndexItem[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    let cached: IndexItem[] | null = null;

    async function load() {
      let slugs: string[] = [];
      try {
        const raw = localStorage.getItem('bookmarks');
        slugs = raw ? JSON.parse(raw) : [];
      } catch {
        slugs = [];
      }
      if (slugs.length === 0) {
        if (!cancelled) setItems([]);
        return;
      }
      if (cached == null) {
        try {
          cached = (await fetch('/search-index.json').then(r => r.json())) as IndexItem[];
        } catch {
          if (!cancelled) setItems([]);
          return;
        }
      }
      const byId = new Map(cached.map(d => [d.slug, d]));
      const ordered = slugs.map(s => byId.get(s)).filter((x): x is IndexItem => x != null);
      if (!cancelled) setItems(ordered);
    }

    load();
    const handler = () => load();
    window.addEventListener('bookmarks-changed', handler);
    window.addEventListener('storage', handler);
    return () => {
      cancelled = true;
      window.removeEventListener('bookmarks-changed', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  if (items == null || items.length === 0) return null;

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">내 즐겨찾기</h2>
        <span className="text-xs text-slate-500">{items.length}개</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(p => (
          <Link
            key={p.slug}
            href={`/p/${p.slug}`}
            className={`block rounded border border-l-4 bg-white p-3 text-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 ${CATEGORY_BORDER[p.category] ?? ''}`}
          >
            <div className="line-clamp-2 font-medium">{p.title}</div>
            <div className="mt-1 text-xs text-slate-500">
              {CATEGORY_KO[p.category] ?? p.category}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
