'use client';

import { useState } from 'react';
import Link from 'next/link';
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
      <div className="mx-auto max-w-2xl space-y-8 py-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold md:text-4xl">테스트</h1>
          <p className="mt-2 text-sm text-slate-500">재미있게 해볼 수 있는 AI 기반 테스트</p>
        </div>

        <div className="rounded-lg border-2 border-emerald-200 bg-white p-6 text-center">
          <div className="text-xs text-emerald-700">테스트 1</div>
          <h2 className="mt-1 text-xl font-bold md:text-2xl">AI 사용으로 보는 MBTI</h2>
          <p className="mt-2 text-sm text-slate-600">
            MBTI 4축을 AI 사용·업무 상황으로 본다.<br/>
            12문항 · 3지선다 · 3분 내외 · 결과는 16가지 유형.
          </p>
          <button
            onClick={() => setStarted(true)}
            className="mt-4 rounded-lg bg-emerald-600 px-6 py-3 text-base font-semibold text-white hover:bg-emerald-700"
          >
            시작하기
          </button>
        </div>

        <Link
          href="/test/saju"
          className="block rounded-lg border-2 border-purple-200 bg-white p-6 text-center transition hover:shadow"
        >
          <div className="text-xs text-purple-700">테스트 2</div>
          <h2 className="mt-1 text-xl font-bold md:text-2xl">🔮 AI로 보는 오늘의 사주</h2>
          <p className="mt-2 text-sm text-slate-600">
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
