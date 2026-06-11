'use client';

import { useEffect, useState } from 'react';

// 무료 카운터 서비스. 가입·DB 불필요.
const NAMESPACE = 'prompts-kr';
const BASE = 'https://abacus.jasoncameron.dev';

export default function SiteStats() {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    // 세션당 1회만 visits 증가
    const key = 'prompts-kr-visited';
    const visited = sessionStorage.getItem(key);
    const url = visited
      ? `${BASE}/get/${NAMESPACE}/visits`
      : `${BASE}/hit/${NAMESPACE}/visits`;
    if (!visited) sessionStorage.setItem(key, '1');

    fetch(url)
      .then(r => r.json())
      .then(d => setVisits(d?.value ?? 0))
      .catch(() => setVisits(0));
  }, []);

  return (
    <span>
      총 방문수: <strong className="text-slate-900 dark:text-slate-100">
        {visits == null ? '...' : visits.toLocaleString('ko-KR')}
      </strong>
    </span>
  );
}
