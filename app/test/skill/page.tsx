'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AXES, JOBS, JOB_IDS, LENGTH_INFO, getQuestions,
  type JobId, type Length,
} from '@/lib/ai-skill-test';
import { Button } from '@/components/Button';
import KakaoShareButton from '@/components/KakaoShareButton';
import LinkCopyButton from '@/components/LinkCopyButton';

type Step = 'job' | 'preview' | 'length' | 'quiz';

// 마지막 답 후 결과 페이지로 가기 전에 보여줄 "분석중" 모달 시간.
const ANALYZE_DURATION_MS = 2500;

export default function AISkillTestPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('job');
  const [jobId, setJobId] = useState<JobId | null>(null);
  const [length, setLength] = useState<Length | null>(null);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  // 분석 모달 상태 — pendingUrl이 있으면 모달 표시.
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  const [analysisDone, setAnalysisDone] = useState(false);

  const job = jobId ? JOBS[jobId] : null;
  const questions = length ? getQuestions(length) : [];

  function pickJob(id: JobId) {
    setJobId(id);
    setStep('preview');
  }

  function startWithLength(l: Length) {
    setLength(l);
    setQIdx(0);
    setAnswers([]);
    setStep('quiz');
  }

  function answer(optIdx: number) {
    const next = [...answers, optIdx];
    if (next.length === questions.length) {
      // 결과 URL을 만들고 모달 띄움. 닫기 누르면 이동.
      const params = new URLSearchParams({
        j: jobId!,
        l: length!,
        a: next.join(','),
      });
      setAnswers(next);
      setPendingUrl(`/test/skill/result?${params.toString()}`);
      setAnalysisDone(false);
      return;
    }
    setAnswers(next);
    setQIdx(qIdx + 1);
  }

  // 모달이 뜨면 결과 페이지 prefetch + 일정 시간 후 닫기 활성화.
  useEffect(() => {
    if (!pendingUrl) return;
    router.prefetch(pendingUrl);
    const t = setTimeout(() => setAnalysisDone(true), ANALYZE_DURATION_MS);
    return () => clearTimeout(t);
  }, [pendingUrl, router]);

  function goToResult() {
    if (!pendingUrl || !analysisDone) return;
    router.push(pendingUrl);
  }

  function back() {
    if (qIdx === 0) return;
    setAnswers(answers.slice(0, -1));
    setQIdx(qIdx - 1);
  }

  function reset() {
    setStep('job');
    setJobId(null);
    setLength(null);
    setQIdx(0);
    setAnswers([]);
  }

  // === STEP 1: 직무 선택 ===
  if (step === 'job') {
    return (
      <div className="mx-auto max-w-3xl space-y-6 py-8">
        <header className="text-center">
          <Link href="/test" className="text-xs text-slate-500 hover:underline">← 테스트 전체</Link>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">AI 활용 능력 시험</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            AI 능력을 직무 기준으로 평가합니다. 먼저 직무를 골라주세요.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <KakaoShareButton
              title="AI 활용 능력 시험"
              description="직무 기준으로 6가지 AI 능력을 평가하고 강점·약점·적합도 리포트"
              path="/test/skill"
            />
            <LinkCopyButton path="/test/skill" />
          </div>
        </header>

        <div className="grid gap-3 sm:grid-cols-2">
          {JOB_IDS.map(id => {
            const j = JOBS[id];
            return (
              <button
                key={id}
                onClick={() => pickJob(id)}
                className="rounded-lg border-2 border-slate-200 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-emerald-500"
              >
                <div className="text-base font-bold">{j.name}</div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{j.description}</p>
              </button>
            );
          })}
        </div>

        <p className="text-center text-xs text-slate-500">
          본인의 직무가 없어도 가장 가까운 것을 골라주세요.
        </p>
      </div>
    );
  }

  // === STEP 2: 직무 요구사항·필요 AI 능력 미리보기 ===
  if (step === 'preview' && job) {
    // 직무별 우선순위 상위 3 axis
    const topAxes = [...AXES]
      .sort((a, b) => job.aiPriority[b.id] - job.aiPriority[a.id])
      .slice(0, 3);

    return (
      <div className="mx-auto max-w-3xl space-y-6 py-8">
        <header>
          <button
            onClick={() => setStep('job')}
            className="text-xs text-slate-500 hover:underline"
          >
            ← 직무 다시 선택
          </button>
          <h1 className="mt-2 text-2xl font-bold md:text-3xl">{job.name}</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{job.description}</p>
        </header>

        <section className="rounded-lg border bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            이 직무의 핵심 요구사항
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-800 dark:text-slate-200">
            {job.requirements.map((r, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            이 직무에서 특히 중요한 AI 능력
          </h2>
          <div className="mt-3 space-y-3">
            {topAxes.map(a => (
              <div key={a.id}>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-semibold">{a.name}</span>
                  <span className="text-xs text-slate-500">우선순위 {job.aiPriority[a.id]}/3</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">{a.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">
            시험은 위 3가지 외에 나머지 능력(컨텍스트 관리·윤리·자동화 등)도 함께 측정합니다.
          </p>
        </section>

        <div className="flex justify-center">
          <Button onClick={() => setStep('length')} variant="primary" size="lg">
            다음 — 시험 길이 고르기
          </Button>
        </div>
      </div>
    );
  }

  // === STEP 3: 시험 길이 선택 ===
  if (step === 'length' && job) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 py-8">
        <header>
          <button
            onClick={() => setStep('preview')}
            className="text-xs text-slate-500 hover:underline"
          >
            ← 이전
          </button>
          <h1 className="mt-2 text-2xl font-bold md:text-3xl">시험 길이</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {job.name} 기준 — 원하는 깊이의 시험을 선택하세요.
          </p>
        </header>

        <div className="space-y-3">
          {(['quick', 'normal', 'detailed'] as Length[]).map(l => {
            const info = LENGTH_INFO[l];
            return (
              <button
                key={l}
                onClick={() => startWithLength(l)}
                className="block w-full rounded-lg border-2 border-slate-200 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-emerald-500"
              >
                <div className="flex items-baseline justify-between">
                  <div className="text-base font-bold">{info.name}</div>
                  <div className="text-xs text-slate-500">
                    {info.questionCount}문항 · {info.minutes}
                  </div>
                </div>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{info.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // === STEP 4: 문항 풀기 ===
  if (step === 'quiz' && length && job) {
    const q = questions[qIdx];
    const progress = ((qIdx + 1) / questions.length) * 100;
    return (
      <div className="mx-auto max-w-2xl space-y-6 py-8">
        <div>
          <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
            <span>
              {job.name} · {LENGTH_INFO[length].name} — {qIdx + 1} / {questions.length}
            </span>
            <button
              onClick={back}
              disabled={qIdx === 0}
              className="text-slate-400 hover:text-slate-700 disabled:invisible dark:hover:text-slate-200"
            >
              ← 이전
            </button>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div className="h-full bg-emerald-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <h2 className="mt-6 text-xl font-semibold md:text-2xl">{q.text}</h2>

        <div className="space-y-3">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => answer(i)}
              disabled={pendingUrl !== null}
              className="block w-full rounded-lg border-2 border-slate-300 bg-white px-5 py-4 text-left text-base hover:border-emerald-500 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-emerald-500 dark:hover:bg-emerald-950/30"
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="text-center">
          <button onClick={reset} className="text-xs text-slate-400 hover:underline">
            처음부터 다시
          </button>
        </div>

        {/* 분석 중 모달 — 닫기 클릭 시 결과 페이지로 이동 */}
        {pendingUrl && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="skill-analyze-title"
          >
            <div className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-xl dark:bg-slate-900">
              <h3
                id="skill-analyze-title"
                className="text-xl font-bold text-slate-900 dark:text-slate-100"
              >
                {analysisDone ? '분석 완료' : '결과 분석중'}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {analysisDone
                  ? '결과가 준비됐어요. 닫으면 보여드릴게요.'
                  : `${questions.length}개 답안을 능력별로 채점하고 직무 적합도를 계산하고 있어요.`}
              </p>

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

  return null;
}
