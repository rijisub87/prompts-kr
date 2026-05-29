'use client';

import { useEffect, useState } from 'react';

// 무료 카운터 서비스 — 가입 불필요, 정적 사이트에서 바로 사용.
// 백엔드·DB 없이 방문/복사 카운트 유지.
const NAMESPACE = 'prompts-kr';
const BASE = 'https://abacus.jasoncameron.dev';

type Counts = { visits: number | null; copies: number | null };

export default function SiteStats() {
  const [counts, setCounts] = useState<Counts>({ visits: null, copies: null });

  useEffect(() => {
    // 세션당 1회만 방문 카운트 증가 (새로고침 spam 방지)
    const key = `prompts-kr-visited`;
    const visited = sessionStorage.getItem(key);
    const visitUrl = visited
      ? `${BASE}/get/${NAMESPACE}/visits`
      : `${BASE}/hit/${NAMESPACE}/visits`;
    if (!visited) sessionStorage.setItem(key, '1');

    Promise.all([
      fetch(visitUrl).then(r => r.json()).catch(() => null),
      fetch(`${BASE}/get/${NAMESPACE}/copies`).then(r => r.json()).catch(() => null),
    ]).then(([v, c]) => {
      setCounts({
        visits: v?.value ?? null,
        copies: c?.value ?? null,
      });
    });
  }, []);

  const fmt = (n: number | null) => (n == null ? '...' : n.toLocaleString('ko-KR'));

  return (
    <div className="border-b bg-slate-100 px-6 py-2 text-center text-xs text-slate-600">
      <span>👀 방문 <strong className="text-slate-900">{fmt(counts.visits)}</strong></span>
      <span className="mx-3 text-slate-400">·</span>
      <span>📋 복사 <strong className="text-slate-900">{fmt(counts.copies)}</strong></span>
    </div>
  );
}
