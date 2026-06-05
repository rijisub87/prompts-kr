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
  translation: '번역', learning: '학습', planning: '기획', image: '이미지 생성',
  email: '이메일', 'cover-letter': '자소서·면접', report: '보고서·회의록',
  ppt: 'PPT·발표', 'edu-parent': '학부모·교사', etc: '기타',
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
                    <div className="mt-0.5 flex gap-2 text-xs text-slate-500">
                      <span className="rounded bg-slate-100 px-1.5 dark:bg-slate-800">
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
