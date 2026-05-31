'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QUESTIONS, calcType, type Letter } from '@/lib/mbti-test';

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
      <div className="mx-auto max-w-2xl space-y-6 py-10 text-center">
        <h1 className="text-3xl font-bold md:text-4xl">AI 사용으로 보는 MBTI 테스트</h1>
        <p className="text-base text-slate-600 md:text-lg">
          MBTI 4축을 AI 사용·업무 상황으로 본다.<br/>
          12문항 · 3지선다 · 3분 내외 · 결과는 16가지 유형 중 하나.
        </p>
        <button
          onClick={() => setStarted(true)}
          className="rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold text-white hover:bg-emerald-700"
        >
          시작하기
        </button>
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
            className="text-slate-400 hover:text-slate-700 disabled:invisible"
          >
            ← 이전
          </button>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
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
          className="block w-full rounded-lg border-2 border-slate-300 bg-white px-5 py-4 text-left text-base hover:border-emerald-500 hover:bg-emerald-50"
        >
          {q.a.label}
        </button>
        <button
          onClick={() => answer(q.m.trait)}
          className="block w-full rounded-lg border-2 border-slate-300 bg-white px-5 py-4 text-left text-base hover:border-emerald-500 hover:bg-emerald-50"
        >
          {q.m.label}
        </button>
        <button
          onClick={() => answer(q.b.trait)}
          className="block w-full rounded-lg border-2 border-slate-300 bg-white px-5 py-4 text-left text-base hover:border-emerald-500 hover:bg-emerald-50"
        >
          {q.b.label}
        </button>
      </div>
    </div>
  );
}
