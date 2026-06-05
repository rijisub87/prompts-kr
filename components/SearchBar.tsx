'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';

type Item = {
  slug: string;
  title: string;
  category: string;
  platforms: string;
  source: string;
  text: string;
};

const CATEGORY_KO: Record<string, string> = {
  writing: '작문', summary: '요약', code: '코딩', analysis: '분석',
  translation: '번역', learning: '학습', planning: '기획', image: '이미지',
  email: '이메일', 'cover-letter': '자소서', report: '보고서', ppt: 'PPT',
  'edu-parent': '학부모', data: '데이터·연구', research: '조사', agents: '에이전트',
  etc: '기타',
};

// 검색 결과 pill용 — lib/prompts.ts CATEGORY_BORDER와 동색 계열. 클라이언트 번들 가볍게 인라인.
const CATEGORY_PILL: Record<string, string> = {
  writing: 'bg-pink-50 text-pink-700 dark:bg-pink-950/40 dark:text-pink-300',
  summary: 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300',
  code: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
  analysis: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
  translation: 'bg-lime-50 text-lime-700 dark:bg-lime-950/40 dark:text-lime-300',
  learning: 'bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300',
  planning: 'bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300',
  image: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-300',
  email: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300',
  'cover-letter': 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300',
  report: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300',
  ppt: 'bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300',
  'edu-parent': 'bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-950/40 dark:text-fuchsia-300',
  data: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
  research: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300',
  agents: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300',
  etc: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
};

export default function SearchBar() {
  const [q, setQ] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [fuse, setFuse] = useState<Fuse<Item> | null>(null);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/search-index.json')
      .then(r => r.json())
      .then((data: Item[]) => {
        setItems(data);
        setFuse(new Fuse(data, {
          keys: [
            { name: 'title', weight: 3 },
            { name: 'category', weight: 2 },
            { name: 'platforms', weight: 1 },
            { name: 'source', weight: 1 },
            { name: 'text', weight: 1 },
          ],
          threshold: 0.4,
          ignoreLocation: true,
        }));
      })
      .catch(() => {});
  }, []);

  // 바깥 클릭 시 결과 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, []);

  const results = fuse && q.trim()
    ? fuse.search(q, { limit: 12 }).map(r => r.item)
    : [];

  return (
    <div ref={wrapRef} className="relative w-full max-w-md">
      <input
        type="search"
        value={q}
        onChange={e => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder={`프롬프트 검색 (${items.length})`}
        className="w-full rounded border bg-white px-3 py-1.5 text-sm placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
      />
      {open && q.trim() && (
        <div className="absolute left-0 right-0 top-full z-30 mt-1 max-h-96 overflow-y-auto rounded border bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
          {results.length === 0 ? (
            <p className="p-4 text-center text-sm text-slate-500">결과 없음</p>
          ) : (
            <ul>
              {results.map(item => (
                <li key={item.slug}>
                  <Link
                    href={`/p/${item.slug}`}
                    onClick={() => { setOpen(false); setQ(''); }}
                    className="block border-b px-3 py-2 last:border-b-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                  >
                    <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{item.title}</div>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
                      <span className={`rounded px-1.5 py-0.5 font-medium ${CATEGORY_PILL[item.category] ?? CATEGORY_PILL.etc}`}>
                        {CATEGORY_KO[item.category] ?? item.category}
                      </span>
                      {item.platforms && <span>{item.platforms}</span>}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
