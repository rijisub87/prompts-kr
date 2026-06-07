'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { QUESTIONS, calcType, type Letter } from '@/lib/mbti-test';
import { Button } from '@/components/Button';

export default function TestPage() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(Letter | null)[]>([]);

  function answer(trait: Letter | null) {
    const next = [...answers, trait];
    if (next.length === QUESTIONS.length) {
      const type = calcType(next);
      router.push(`/test/${type.toLowerCase()}`);
      return;
    }
    setAnswers(next);
    setStep(step + 1);
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
          <h1 className="text-3xl font-bold md:text-4xl">테스트</h1>
          <p className="mt-2 text-sm text-slate-500">재미있게 해볼 수 있는 AI 기반 테스트</p>
        </div>

        <div className="rounded-lg border-2 border-emerald-200 bg-white p-6 text-center dark:border-emerald-800 dark:bg-slate-900">
          <div className="text-xs text-emerald-700 dark:text-emerald-400">테스트 1</div>
          <h2 className="mt-1 text-xl font-bold md:text-2xl">AI 사용으로 보는 MBTI</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            MBTI 4축을 AI 사용·업무 상황으로 본다.<br/>
            12문항 · 3지선다 · 3분 내외 · 결과는 16가지 유형.
          </p>
          <Button
            onClick={() => setStarted(true)}
            variant="primary"
            size="lg"
            className="mt-4"
          >
            시작하기
          </Button>
        </div>

        <Link
          href="/test/skill"
          className="block rounded-lg border-2 border-sky-200 bg-white p-6 text-center transition hover:-translate-y-0.5 hover:shadow-md dark:border-sky-800 dark:bg-slate-900"
        >
          <div className="text-xs text-sky-700 dark:text-sky-400">테스트 2</div>
          <h2 className="mt-1 text-xl font-bold md:text-2xl">AI 활용 능력 시험</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            6가지 AI 능력을 직무 기준으로 평가.<br/>
            6·12·18문항 중 선택 · 점수·강점·약점·직무 적합도 리포트.
          </p>
          <div className="mt-4 inline-block rounded-lg bg-sky-600 px-6 py-3 text-base font-semibold text-white">
            시험 시작 →
          </div>
        </Link>

        <Link
          href="/test/saju"
          className="block rounded-lg border-2 border-purple-200 bg-white p-6 text-center transition hover:-translate-y-0.5 hover:shadow-md dark:border-purple-800 dark:bg-slate-900"
        >
          <div className="text-xs text-purple-700 dark:text-purple-400">테스트 3</div>
          <h2 className="mt-1 text-xl font-bold md:text-2xl">AI로 보는 오늘의 사주</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            생년월일 입력 → Claude가 오늘의 운세를 풀어줍니다.<br/>
            총운·재물·인연·건강·행운·조언 6섹션.
          </p>
          <div className="mt-4 inline-block rounded-lg bg-purple-600 px-6 py-3 text-base font-semibold text-white">
            사주 보러 가기 →
          </div>
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
        <button
          onClick={() => answer(q.a.trait)}
          className="block w-full rounded-lg border-2 border-slate-300 bg-white px-5 py-4 text-left text-base hover:border-emerald-500 hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-emerald-500 dark:hover:bg-emerald-950/30"
        >
          {q.a.label}
        </button>
        <button
          onClick={() => answer(q.m.trait)}
          className="block w-full rounded-lg border-2 border-slate-300 bg-white px-5 py-4 text-left text-base hover:border-emerald-500 hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-emerald-500 dark:hover:bg-emerald-950/30"
        >
          {q.m.label}
        </button>
        <button
          onClick={() => answer(q.b.trait)}
          className="block w-full rounded-lg border-2 border-slate-300 bg-white px-5 py-4 text-left text-base hover:border-emerald-500 hover:bg-emerald-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-emerald-500 dark:hover:bg-emerald-950/30"
        >
          {q.b.label}
        </button>
      </div>
    </div>
  );
}
