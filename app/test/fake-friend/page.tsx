'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  QUESTIONS, calcResult, type Perspective, type FakeFriendResult,
} from '@/lib/fake-friend';
import { Button } from '@/components/Button';
import KakaoShareButton from '@/components/KakaoShareButton';
import LinkCopyButton from '@/components/LinkCopyButton';
import AnalyzeModal from '@/components/AnalyzeModal';

export default function FakeFriendPage() {
  const [perspective, setPerspective] = useState<Perspective | null>(null);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [result, setResult] = useState<FakeFriendResult | null>(null);

  const questions = perspective ? QUESTIONS[perspective] : [];

  function start(p: Perspective) {
    setPerspective(p);
    setQIdx(0);
    setAnswers([]);
    setResult(null);
  }

  function answer(optIdx: number) {
    const next = [...answers, optIdx];
    if (next.length === questions.length) {
      setAnswers(next);
      setResult(calcResult(perspective!, next));
      setModalOpen(true);
      return;
    }
    setAnswers(next);
    setQIdx(qIdx + 1);
  }

  function back() {
    if (qIdx === 0) return;
    setAnswers(answers.slice(0, -1));
    setQIdx(qIdx - 1);
  }

  function reset() {
    setPerspective(null);
    setQIdx(0);
    setAnswers([]);
    setResult(null);
    setModalOpen(false);
  }

  // === 결과 화면 ===
  if (result && !modalOpen) {
    const shareText = `${perspective === 'female' ? '내 남사친' : '나'} 가짜 남사친 지수 ${result.pct}% — ${result.title}`;
    return (
      <div className="mx-auto max-w-2xl space-y-6 py-8">
        <header className="text-center">
          <div className="text-xs uppercase tracking-wider text-slate-500">
            가짜 남사친 지수
          </div>
          <div className="mt-2 text-6xl font-bold tracking-tight text-rose-600 dark:text-rose-400">
            {result.pct}%
          </div>
          <p className="mt-2 text-lg font-semibold">{result.title}</p>
        </header>

        <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-400 to-rose-500"
            style={{ width: `${result.pct}%` }}
          />
        </div>

        <section className="rounded-lg border bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {result.description}
          </p>
          <p className="mt-3 border-t pt-3 text-sm font-medium text-rose-700 dark:text-rose-300">
            조언 — {result.advice}
          </p>
        </section>

        <p className="text-center text-xs text-slate-400">
          재미로 보는 결과예요. 사람 마음은 설문으로 다 알 수 없으니 참고만 하세요.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <KakaoShareButton
            title="가짜 남사친 구분법"
            description={`${shareText} · 나도 해보기`}
            path="/test/fake-friend"
          />
          <button
            onClick={reset}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
          >
            다시 하기
          </button>
          <Link
            href="/test"
            className="rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-100"
          >
            다른 생활AI →
          </Link>
        </div>
      </div>
    );
  }

  // === 관점 선택 ===
  if (!perspective) {
    return (
      <div className="mx-auto max-w-2xl space-y-6 py-8">
        <header className="text-center">
          <div className="text-xs text-slate-500">
            <Link href="/test" className="hover:underline">← 생활AI 메인</Link>
          </div>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">가짜 남사친 구분법</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            상황 5문항으로 &lsquo;남자친구가 되고 싶은 남자&rsquo;인지 &lsquo;진짜 남사친&rsquo;인지 % 진단.
          </p>
          <div className="mt-4 flex justify-center">
            <LinkCopyButton path="/test/fake-friend" />
          </div>
        </header>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            onClick={() => start('female')}
            className="rounded-lg border-2 border-rose-200 bg-white p-6 text-center transition hover:-translate-y-0.5 hover:border-rose-400 hover:shadow-md dark:border-rose-800 dark:bg-slate-900"
          >
            <div className="text-lg font-bold">여자예요</div>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              내 남사친이 진짜 친구인지 판단할게요
            </p>
          </button>
          <button
            onClick={() => start('male')}
            className="rounded-lg border-2 border-sky-200 bg-white p-6 text-center transition hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-md dark:border-sky-800 dark:bg-slate-900"
          >
            <div className="text-lg font-bold">남자예요</div>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              내가 그녀에게 진짜 친구인지 자가진단할게요
            </p>
          </button>
        </div>
      </div>
    );
  }

  // === 문항 ===
  const q = questions[qIdx];
  const progress = ((qIdx + 1) / questions.length) * 100;
  return (
    <div className="mx-auto max-w-2xl space-y-6 py-8">
      <div>
        <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
          <span>{qIdx + 1} / {questions.length}</span>
          <button
            onClick={back}
            disabled={qIdx === 0}
            className="text-slate-400 hover:text-slate-700 disabled:invisible dark:hover:text-slate-200"
          >
            ← 이전
          </button>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div className="h-full bg-rose-500 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <h2 className="mt-6 text-xl font-semibold md:text-2xl">{q.text}</h2>

      <div className="space-y-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => answer(i)}
            disabled={modalOpen}
            className="block w-full rounded-lg border-2 border-slate-300 bg-white px-5 py-4 text-left text-base hover:border-rose-500 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-rose-500 dark:hover:bg-rose-950/30"
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

      {/* 결과 준비 모달 — 3·2·1 + 광고 → 결과 보기 */}
      <AnalyzeModal open={modalOpen} done onConfirm={() => setModalOpen(false)} />
    </div>
  );
}
