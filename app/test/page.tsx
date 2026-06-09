'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { QUESTIONS, calcType, type Option } from '@/lib/mbti-test';
import { Button } from '@/components/Button';
import KakaoShareButton from '@/components/KakaoShareButton';
import LinkCopyButton from '@/components/LinkCopyButton';

// 마지막 답을 누른 뒤 결과 페이지로 가기 전에 보여줄 "분석중" 모달 시간.
const ANALYZE_DURATION_MS = 2500;

// 테스트별 시작 버튼 클릭 집계용 슬러그 (prompt_stats 테이블 재활용)
const SLUG_MBTI = 'test-mbti';
const SLUG_SKILL = 'test-skill';
const SLUG_SAJU = 'test-saju';

type TestCounts = { mbti: number; skill: number; saju: number };

// 클릭 시 카운터 증가 — 페이지 이동 중에도 발사되도록 keepalive.
function trackTestClick(slug: string) {
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

export default function TestPage() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Option[]>([]);

  // 결과 분석 모달 상태
  const [pendingType, setPendingType] = useState<string | null>(null);
  const [analysisDone, setAnalysisDone] = useState(false);

  // 시작 버튼 클릭 누적수 — 마운트 시 1회 조회.
  const [counts, setCounts] = useState<TestCounts | null>(null);
  useEffect(() => {
    fetch('/api/test-counts')
      .then(r => r.json())
      .then((d: TestCounts) => setCounts(d))
      .catch(() => {});
  }, []);

  function answer(opt: Option) {
    const next = [...answers, opt];
    if (next.length === QUESTIONS.length) {
      const type = calcType(next);
      setAnswers(next);
      setPendingType(type);
      setAnalysisDone(false);
      return;
    }
    setAnswers(next);
    setStep(step + 1);
  }

  // 모달이 뜨면 결과 페이지를 미리 가져오고, 일정 시간 후 "닫기" 활성화.
  useEffect(() => {
    if (!pendingType) return;
    router.prefetch(`/test/${pendingType.toLowerCase()}`);
    const t = setTimeout(() => setAnalysisDone(true), ANALYZE_DURATION_MS);
    return () => clearTimeout(t);
  }, [pendingType, router]);

  function goToResult() {
    if (!pendingType || !analysisDone) return;
    router.push(`/test/${pendingType.toLowerCase()}`);
  }

  function back() {
    if (step === 0) return;
    setStep(step - 1);
    setAnswers(answers.slice(0, -1));
  }

  if (!started) {
    return (
      <div className="mx-auto max-w-2xl space-y-8 py-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold md:text-4xl">생활AI</h1>
          <p className="mt-2 text-sm text-slate-500">일상에서 가볍게 써볼 수 있는 AI</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <KakaoShareButton
              title="생활AI 모음 — 일할 때의 MBTI · AI 활용 능력 · 사주"
              description="일하는 나의 MBTI · AI 활용 직무 테스트 · 오늘의 사주"
              path="/test"
            />
            <LinkCopyButton path="/test" />
          </div>
        </div>

        <div className="rounded-lg border-2 border-emerald-200 bg-white p-6 text-center dark:border-emerald-800 dark:bg-slate-900">
          <h2 className="text-xl font-bold md:text-2xl">No1. 일하는 나의 MBTI</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            평소 일·AI 활용 상황으로 본인의 MBTI 4축을 측정.<br/>
            12문항 · 4지선다 · 3분 내외 · 결과는 16가지 유형.
          </p>
          <Button
            onClick={() => { trackTestClick(SLUG_MBTI); setStarted(true); }}
            variant="primary"
            size="lg"
            className="mt-4"
          >
            시작하기
          </Button>
          {counts && counts.mbti > 0 && (
            <div className="mt-3 text-xs text-slate-500">
              {counts.mbti.toLocaleString('ko-KR')}명 시작
            </div>
          )}
        </div>

        <Link
          href="/test/skill"
          onClick={() => trackTestClick(SLUG_SKILL)}
          className="block rounded-lg border-2 border-sky-200 bg-white p-6 text-center transition hover:-translate-y-0.5 hover:shadow-md dark:border-sky-800 dark:bg-slate-900"
        >
          <h2 className="text-xl font-bold md:text-2xl">No2. AI 활용 직무 테스트</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            AI 능력을 직무 기준으로 평가.<br/>
            6·12·18문항 중 선택 · 점수·강점·약점·직무 적합도 리포트.
          </p>
          <div className="mt-4 inline-block rounded-lg bg-sky-600 px-6 py-3 text-base font-semibold text-white">
            시험 시작 →
          </div>
          {counts && counts.skill > 0 && (
            <div className="mt-3 text-xs text-slate-500">
              {counts.skill.toLocaleString('ko-KR')}명 시작
            </div>
          )}
        </Link>

        <Link
          href="/test/saju"
          onClick={() => trackTestClick(SLUG_SAJU)}
          className="block rounded-lg border-2 border-purple-200 bg-white p-6 text-center transition hover:-translate-y-0.5 hover:shadow-md dark:border-purple-800 dark:bg-slate-900"
        >
          <h2 className="text-xl font-bold md:text-2xl">No3. AI로 보는 오늘의 사주</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            생년월일 입력 → Claude가 오늘의 운세를 풀어줍니다.<br/>
            총운·재물·인연·건강·행운·조언 6섹션.
          </p>
          <div className="mt-4 inline-block rounded-lg bg-purple-600 px-6 py-3 text-base font-semibold text-white">
            사주 보러 가기 →
          </div>
          {counts && counts.saju > 0 && (
            <div className="mt-3 text-xs text-slate-500">
              {counts.saju.toLocaleString('ko-KR')}명 시작
            </div>
          )}
        </Link>
      </div>
    );
  }

  const q = QUESTIONS[step];
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-8">
      <div>
        <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
          <span>{step + 1} / {QUESTIONS.length}</span>
          <button
            onClick={back}
            disabled={step === 0}
            className="text-slate-400 hover:text-slate-700 disabled:invisible dark:hover:text-slate-200"
          >
            ← 이전
          </button>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full bg-emerald-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="mt-6 text-xl font-semibold md:text-2xl">{q.text}</h2>

      <div className="space-y-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => answer(opt)}
            disabled={pendingType !== null}
            className="block w-full rounded-lg border-2 border-slate-300 bg-white px-5 py-4 text-left text-base hover:border-emerald-500 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-emerald-500 dark:hover:bg-emerald-950/30"
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* 분석 중 모달 — 닫기 클릭 시 결과 페이지로 이동 */}
      {pendingType && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mbti-analyze-title"
        >
          <div className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-xl dark:bg-slate-900">
            <h3
              id="mbti-analyze-title"
              className="text-xl font-bold text-slate-900 dark:text-slate-100"
            >
              {analysisDone ? '분석 완료' : '결과 분석중'}
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {analysisDone
                ? '결과가 준비됐어요. 닫으면 보여드릴게요.'
                : '12개 답안을 종합해 유형을 계산하고 있어요.'}
            </p>

            {/* 진행 인디케이터 */}
            <div className="mt-5 flex items-center justify-center">
              {analysisDone ? (
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ) : (
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500 dark:border-slate-700 dark:border-t-emerald-400" />
              )}
            </div>

            <button
              onClick={goToResult}
              disabled={!analysisDone}
              className={
                analysisDone
                  ? 'mt-6 w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700'
                  : 'mt-6 w-full cursor-not-allowed rounded-lg bg-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-500'
              }
            >
              {analysisDone ? '닫기' : '분석중...'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
