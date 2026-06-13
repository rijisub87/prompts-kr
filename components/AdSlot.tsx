'use client';

import { useEffect, useRef } from 'react';

// Google AdSense 디스플레이 광고 단위. 인증 스크립트(adsbygoogle.js)는 layout.tsx에서 로드.
const CLIENT = 'ca-pub-3766416176278367';
const DEFAULT_SLOT = '2123373093';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdSlot({
  slot = DEFAULT_SLOT,
  className = '',
}: {
  slot?: string;
  className?: string;
}) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      // 스크립트가 lazyOnload라 아직 안 떴어도 큐에 쌓였다가 로드 시 처리됨.
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // ad blocker 등 — 무시
    }
  }, []);

  return (
    <div className={`overflow-hidden rounded-lg border bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50 ${className}`}>
      <div className="px-2 pt-1 text-[10px] text-slate-400">광고</div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
