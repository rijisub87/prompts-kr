'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import LinkCopyButton from '@/components/LinkCopyButton';

type Counts = Record<string, number>;

// 재테크 AI 카드 — 시작 수(인기) 내림차순 정렬.
const CARDS = [
  {
    key: 'market', slug: 'test-market', href: '/test/market',
    title: '데일리 세계 경제', cta: '리포트 받으러 가기 →',
    border: 'border-amber-200 dark:border-amber-800', ctaBg: 'bg-amber-600',
    desc: '오늘 날짜로 시장 지표·투자 거장 동향·주요 이슈를 한 번에. 카카오톡으로 받아보기.',
  },
  {
    key: 'stocks', slug: 'test-stocks', href: '/test/stocks',
    title: '데일리 국내 대장주', cta: '리포트 받으러 가기 →',
    border: 'border-blue-200 dark:border-blue-800', ctaBg: 'bg-blue-600',
    desc: '삼성전자·SK하이닉스 목표주가 방향·호재·악재. 매일 카카오톡으로 받아보기.',
  },
  {
    key: 'lotto', slug: 'test-lotto', href: '/test/lotto',
    title: 'AI 로또 번호 예측', cta: '번호 받으러 가기 →',
    border: 'border-rose-200 dark:border-rose-800', ctaBg: 'bg-rose-600',
    desc: '최근 당첨번호 트렌드를 참고해 5개 게임 세트를 재미로 추정. 순수 오락용.',
  },
];

function trackClick(slug: string) {
  try {
    fetch('/api/view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // ignore
  }
}

export default function MoneyPage() {
  const [counts, setCounts] = useState<Counts | null>(null);
  useEffect(() => {
    fetch('/api/test-counts')
      .then(r => r.json())
      .then((d: Counts) => setCounts(d))
      .catch(() => {});
  }, []);

  const cards = [...CARDS].sort((a, b) => (counts?.[b.key] ?? 0) - (counts?.[a.key] ?? 0));

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold md:text-4xl">재테크 AI</h1>
        <p className="mt-2 text-sm text-slate-500">시장·종목·로또를 카카오톡으로 받아보는 AI</p>
        <div className="mt-4 flex justify-center">
          <LinkCopyButton path="/money" />
        </div>
      </div>

      <div className="space-y-3">
        {cards.map(c => {
          const count = counts?.[c.key] ?? 0;
          return (
            <Link
              key={c.key}
              href={c.href}
              onClick={() => trackClick(c.slug)}
              className={`block rounded-lg border-2 bg-white p-6 text-center transition hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900 ${c.border}`}
            >
              <h2 className="text-xl font-bold md:text-2xl">{c.title}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{c.desc}</p>
              <div className={`mt-4 inline-block rounded-lg px-6 py-3 text-base font-semibold text-white ${c.ctaBg}`}>
                {c.cta}
              </div>
              {count > 0 && (
                <div className="mt-3 text-xs text-slate-500">{count.toLocaleString('ko-KR')}명 시작</div>
              )}
            </Link>
          );
        })}
      </div>

      <p className="text-center text-xs text-slate-400">
        ⚠️ AI가 생성한 참고용 정보입니다. 투자 자문이 아니며 수치·뉴스는 직접 확인하세요.
      </p>
    </div>
  );
}
