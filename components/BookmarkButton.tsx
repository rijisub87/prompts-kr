'use client';

import { useEffect, useState } from 'react';

const KEY = 'bookmarks';
const MAX = 50;

// localStorage 기반 즐겨찾기 토글. 추천(Supabase)과 다르게 로그인 불필요.
export default function BookmarkButton({ slug }: { slug: string }) {
  const [saved, setSaved] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      const list: string[] = raw ? JSON.parse(raw) : [];
      setSaved(list.includes(slug));
    } catch {
      setSaved(false);
    }
  }, [slug]);

  function toggle() {
    try {
      const raw = localStorage.getItem(KEY);
      const list: string[] = raw ? JSON.parse(raw) : [];
      const exists = list.includes(slug);
      const next = exists
        ? list.filter(s => s !== slug)
        : [slug, ...list].slice(0, MAX);
      localStorage.setItem(KEY, JSON.stringify(next));
      setSaved(!exists);
      // 같은 탭에서 storage 이벤트가 안 터지므로 커스텀 이벤트로 홈의 Bookmarks 갱신.
      window.dispatchEvent(new Event('bookmarks-changed'));
    } catch {
      // localStorage 거부 모드 — 무시
    }
  }

  // hydration 전엔 깜빡임 방지로 outline 상태로 노출.
  const isSaved = saved === true;

  return (
    <button
      onClick={toggle}
      aria-pressed={isSaved}
      className={
        isSaved
          ? 'inline-flex items-center gap-1.5 rounded-lg border-2 border-amber-400 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 transition hover:bg-amber-100 dark:border-amber-500 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-900/40'
          : 'inline-flex items-center gap-1.5 rounded-lg border-2 border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-amber-400 hover:text-amber-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-amber-500 dark:hover:text-amber-300'
      }
    >
      <span aria-hidden>{isSaved ? '⭐' : '☆'}</span>
      <span>{isSaved ? '즐겨찾기' : '즐겨찾기'}</span>
    </button>
  );
}
