'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/Button';
import LinkCopyButton from '@/components/LinkCopyButton';

function todayStr(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

const CONCEPTS = [
  '최근 트렌드 반영 (홀짝·고저·합계 균형)',
  '골고루 분산형',
  '홀짝 3:3 균형',
  '고저(1~22 / 23~45) 균형',
  '완전 랜덤',
];

// 최근 트렌드 기반 5세트 추정 프롬프트. [DATE]·[CONCEPT]·[RECENT_RESULTS] 치환.
function buildPromptText(date: string, concept: string, recent: string): string {
  const recentBlock = recent.trim()
    ? recent.trim()
    : '(직접 입력 안 함 — 웹 검색으로 최근 회차 당첨번호를 확인해 반영)';
  return `역할: 너는 로또 번호를 "재미로" 추정해주는 도우미다. 당첨을 보장하지 않으며, 모든 6개 조합의 당첨 확률이 수학적으로 동일(1/8,145,060)하다는 사실을 알고 있다.

규격: 한국 로또 6/45 (1~45 중 서로 다른 6개)
오늘 날짜: ${date}
컨셉: ${concept}

최근 당첨번호 데이터:
${recentBlock}

진행:
1. 최근 회차 당첨번호의 트렌드를 정리 (홀짝 비율 / 고저 비율 / 합계 구간 / 자주·드물게 나온 번호 / 연속수·끝수 경향)
2. 그 트렌드를 "랜덤 시드"처럼 참고해, 선택한 컨셉에 맞는 5개 게임 세트를 도출
3. 각 게임마다 다음을 표기:
   - 번호 6개 (오름차순)
   - 홀짝 비율 / 고저 비율 / 합계
   - 이 세트가 트렌드·컨셉을 어떻게 반영했는지 한 줄
4. 5세트의 번호가 서로 과하게 겹치지 않도록 분산

[제약]
- 서로 다른 6개, 1~45 범위 엄수
- 로또는 매회 독립 시행이라 과거 빈도가 미래 확률을 바꾸지 않음(도박사의 오류)을 1줄로 명시
- "이 번호가 더 잘 나온다"는 단정 절대 금지 — 어디까지나 트렌드 반영한 재미용 추정
- "이번엔 꼭", "지르세요" 같은 과소비 유도 표현 금지
- 마지막에 반드시 명시: "재미로 추정한 번호이며 당첨을 보장하지 않습니다. 모든 조합의 확률은 동일합니다. 구매는 여유 자금 안에서 즐겨주세요."`;
}

export default function LottoPage() {
  const [date, setDate] = useState(todayStr);
  const [concept, setConcept] = useState(CONCEPTS[0]);
  const [recent, setRecent] = useState('');
  const [copyMsg, setCopyMsg] = useState<string | null>(null);

  const preview = buildPromptText(date, concept, recent);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(preview);
      setCopyMsg('복사 완료! 웹 검색이 되는 Claude·ChatGPT·Perplexity에 붙여넣으세요.');
      setTimeout(() => setCopyMsg(null), 3000);
    } catch {
      setCopyMsg('복사 실패 — 아래 미리보기에서 직접 선택해 복사해주세요.');
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-6">
      <header className="text-center">
        <div className="text-xs text-slate-500">
          <Link href="/test" className="hover:underline">← 생활AI 메인</Link>
        </div>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">AI 로또 번호 예측</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          최근 당첨번호 트렌드를 참고해 5개 게임 세트를 재미로 추정하는 프롬프트.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <LinkCopyButton path="/test/lotto" />
        </div>
      </header>

      <section className="rounded-lg border bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">옵션</h2>

        <div className="space-y-3">
          <label className="block">
            <span className="text-xs text-slate-600 dark:text-slate-400">기준 날짜 (기본값: 오늘)</span>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </label>

          <label className="block">
            <span className="text-xs text-slate-600 dark:text-slate-400">번호 컨셉</span>
            <select
              value={concept}
              onChange={e => setConcept(e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              {CONCEPTS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>

          <label className="block">
            <span className="text-xs text-slate-600 dark:text-slate-400">
              최근 당첨번호 (선택 — 비우면 AI가 웹 검색으로 확인)
            </span>
            <textarea
              value={recent}
              onChange={e => setRecent(e.target.value)}
              rows={3}
              placeholder={'예) 1180회: 3 12 19 27 33 42 + 보너스 7\n1179회: ...'}
              className="mt-1 w-full rounded border px-3 py-2 font-mono text-xs leading-relaxed dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </label>
        </div>
      </section>

      <section className="space-y-3">
        <Button
          disabled
          variant="secondary"
          size="lg"
          title="AI 호출 모드는 곧 오픈됩니다"
          className="w-full"
        >
          AI에게 바로 물어보기
          <span className="ml-2 rounded bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800 dark:bg-amber-900 dark:text-amber-200">
            준비중
          </span>
        </Button>
        <Button
          onClick={copyPrompt}
          variant="primary"
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
        ⚠️ 로또는 매회 독립 시행이라 과거 데이터가 당첨 확률을 바꾸지 않습니다. 모든 조합의 확률은 동일하며,
        이 페이지는 순수 오락용입니다. 구매는 여유 자금 안에서 즐겨주세요.
      </p>
    </div>
  );
}
