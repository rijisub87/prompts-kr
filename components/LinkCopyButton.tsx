'use client';

import { useState } from 'react';

// 현재 페이지 URL(또는 지정된 path)을 클립보드로 복사. 카카오 외부 채널 공유용.
export default function LinkCopyButton({
  path,
  label = '링크 복사',
}: {
  path?: string;     // 상대 경로. 미지정 시 현재 페이지 URL.
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const url =
      typeof window === 'undefined'
        ? path ?? ''
        : path
          ? new URL(path, window.location.origin).href
          : window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // 클립보드 권한 거부 등 — prompt로 fallback
      window.prompt('아래 링크를 복사하세요', url);
    }
  }

  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      aria-live="polite"
    >
      {copied ? '복사됨 ✓' : label}
    </button>
  );
}
