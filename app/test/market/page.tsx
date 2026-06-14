'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/Button';
import LinkCopyButton from '@/components/LinkCopyButton';
import MarketReportButton from '@/components/MarketReportButton';

// 오늘 날짜를 YYYY-MM-DD로. 'use client'라 빌드 타임 고정 없이 매 방문 시점 기준.
function todayStr(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

// 사용자 기여 프롬프트(research-daily-market-report)와 동일 본문. [DATE]만 치환.
function buildPromptText(date: string): string {
  return `[데일리 마켓 리포트 요청 — ${date}]

너는 거시·시장 분석 어시스턴트다. 아래 항목을 웹 검색으로 최신 데이터를 확인해 작성하라.
추측 금지, 수치는 출처 기반으로, 전부 한국어로.

■ 1. 핵심 지표 요약표 (반드시 표로)
| 지표 | 현재값 | 전일/전주 대비 | 한 줄 코멘트 |
- 미국 기준금리(Fed) / 美 10년물 국채금리
- WTI / 브렌트유
- 금(현물, $/oz)
- 비트코인($)
- (참고) 달러/원 환율, S&P500·나스닥 종가

■ 2. 3대 투자자 동향 (간단히, 각 1~2줄)
- 워런 버핏(버크셔): 최근 매매·발언·13F 등 공개된 움직임
- 레이 달리오: 매크로·부채사이클 관련 최신 코멘트
- 하워드 막스: 사이클·신용시장 관련 최신 메모/발언
- ※ 새 동향이 없으면 "신규 공개 동향 없음"으로 표기

■ 3. 경제 현황 (각 3줄 이내)
- 미국: 성장·인플레·고용·Fed
- 세계: 지정학(에너지·무역), 주요국 경기
- 국내(한국): 환율·금리·수출·부동산 등 핵심만

■ 4. 산업군별 증시 변동 예상 (표 또는 불릿)
- 위 1~3을 근거로 섹터별 +/-/중립 방향성과 한 줄 논리
- 대상: AI·반도체 / 빅테크 / 에너지·전력인프라·천연가스 / 방산·산업재 / 헬스케어 / 소형가치주
- 직접적 매수·매도 지시 금지, "유리/불리 + 근거" 프레임으로

■ 5. 주요 이슈 리포트 (오늘의 톱 3~5개)
- 각 이슈: [헤드라인] → 핵심 내용 2~3줄 → 시장 함의 1줄
- 출처 링크 포함

[제약]
- 전체 분량은 스크롤 2~3회 내로 간결하게
- 불확실하면 단정하지 말고 시나리오로 제시
- 나는 투자자문이 아니라 판단 재료를 원함`;
}

export default function MarketPage() {
  const [date, setDate] = useState(todayStr);
  const [copyMsg, setCopyMsg] = useState<string | null>(null);

  async function copyPrompt() {
    const text = buildPromptText(date);
    try {
      await navigator.clipboard.writeText(text);
      setCopyMsg('복사 완료! 웹 검색이 되는 Claude·ChatGPT·Perplexity에 붙여넣으세요.');
      setTimeout(() => setCopyMsg(null), 3000);
    } catch {
      setCopyMsg('복사 실패 — 아래 미리보기에서 직접 선택해 복사해주세요.');
    }
  }

  const preview = buildPromptText(date);

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-6">
      <header className="text-center">
        <div className="text-xs text-slate-500">
          <Link href="/test" className="hover:underline">← 생활AI 메인</Link>
        </div>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">데일리 세계 경제</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          오늘 날짜로 시장 지표·투자 거장 동향·주요 이슈를 한 번에 받아보는 리포트 프롬프트.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <LinkCopyButton path="/test/market" />
        </div>
      </header>

      <section className="rounded-lg border bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">리포트 기준일</h2>
        <label className="block">
          <span className="text-xs text-slate-600 dark:text-slate-400">날짜 (기본값: 오늘)</span>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          />
        </label>
        <p className="mt-2 text-xs text-slate-500">
          웹 검색이 가능한 모델에서 가장 정확합니다. 검색 비활성 모델은 추정치를 줄 수 있어요.
        </p>
      </section>

      <section className="space-y-3">
        {/* 카카오톡으로 오늘의 리포트 받기 (로그인 + 카카오 메시지 권한) */}
        <MarketReportButton />
        <Button
          onClick={copyPrompt}
          variant="secondary"
          size="lg"
          className="w-full"
        >
          프롬프트 복사 → Claude/ChatGPT/Perplexity에 붙여넣기
        </Button>
        {copyMsg && (
          <p className="text-center text-xs text-emerald-700 dark:text-emerald-400">{copyMsg}</p>
        )}
      </section>

      <section className="rounded-lg border bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="flex items-center justify-between border-b px-4 py-2 dark:border-slate-800">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">프롬프트 미리보기</span>
        </div>
        <pre className="overflow-x-auto whitespace-pre-wrap p-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          {preview}
        </pre>
      </section>

      <p className="text-center text-xs text-slate-400">
        ⚠️ AI가 생성한 시장 정보는 참고용입니다. 투자 자문이 아니며, 실제 투자 판단·수치는 직접 확인하세요.
      </p>
    </div>
  );
}
