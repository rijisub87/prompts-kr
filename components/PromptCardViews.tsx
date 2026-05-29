'use client';

import { useEffect, useState } from 'react';

// 카드 위에 표시되는 prompt별 조회수. 카운트만 가져오고 증가는
// 상세 페이지(PromptDetail) 진입 시에 처리 — "본 사람 수"가 더 정확.
export default function PromptCardViews({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://abacus.jasoncameron.dev/get/prompts-kr/view-${slug}`)
      .then(r => r.json())
      .then(d => setCount(d?.value ?? 0))
      .catch(() => setCount(0));
  }, [slug]);

  return (
    <span className="inline-flex items-center gap-1 text-xs text-slate-500">
      👁️ {count == null ? '...' : count.toLocaleString('ko-KR')}
    </span>
  );
}
