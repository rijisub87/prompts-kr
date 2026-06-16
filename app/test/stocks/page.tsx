'use client';

import Link from 'next/link';
import LinkCopyButton from '@/components/LinkCopyButton';
import MarketReportButton from '@/components/MarketReportButton';

export default function StocksPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6 py-6">
      <header className="text-center">
        <div className="text-xs text-slate-500">
          <Link href="/test" className="hover:underline">← 생활AI 메인</Link>
        </div>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">데일리 국내 대장주</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          삼성전자·SK하이닉스의 목표주가 방향·호재·악재를 매일 카카오톡으로.
        </p>
        <div className="mt-4 flex justify-center">
          <LinkCopyButton path="/test/stocks" />
        </div>
      </header>

      <section className="space-y-3">
        <MarketReportButton
          apiPath="/api/stocks-report"
          returnPath="/test/stocks"
          storageKey="stocks_send_after_auth"
        />
      </section>

      <p className="text-center text-xs text-slate-400">
        ⚠️ AI가 생성한 참고용 정보입니다. 실시간 시세·뉴스가 아니며, 목표주가·소식은 증권사 리포트와
        뉴스로 직접 확인하세요. 투자 자문이 아닙니다.
      </p>
    </div>
  );
}
