'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/Button';
import KakaoShareButton from '@/components/KakaoShareButton';
import LinkCopyButton from '@/components/LinkCopyButton';

const MBTI_TYPES = [
  '모름',
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
];

const RELATIONS = ['연인', '썸 타는 사이', '짝사랑', '소개팅 상대', '부부'];

type Person = { name: string; birth: string; mbti: string };

function buildPromptText(a: Person, b: Person, relation: string): string {
  const line = (p: Person, label: string) =>
    `- ${label}: 이름 ${p.name || '(미입력)'} / 생년월일 ${p.birth || '(미입력)'} / MBTI ${p.mbti}`;
  return `역할: 너는 따뜻하고 센스 있는 연애 궁합 상담사다. 재미를 위한 풀이이며, 관계를 단정하거나 불안을 조장하지 않는다.

관계: ${relation}

두 사람 정보:
${line(a, '첫 번째 사람')}
${line(b, '두 번째 사람')}

다음 형식으로 한국어로 작성:

## 궁합 점수
0~100점 + 한 줄 총평 (예: "티격태격해도 결국 끌리는 사이")

## 성격 케미
- 두 사람 성향(MBTI·분위기)이 어떻게 맞물리는지 3~4줄
- 잘 맞는 점 2가지 / 부딪힐 수 있는 점 1~2가지

## 연애 스타일 비교
- 첫 번째 사람의 연애 방식 한 줄
- 두 번째 사람의 연애 방식 한 줄
- 둘이 만났을 때 생기는 시너지 한 줄

## 이렇게 하면 더 좋아요
- 관계를 위한 현실적인 팁 3가지 (구체적으로)

## 오늘의 데이트 추천
- 두 사람에게 어울리는 데이트 한 가지 + 이유

[제약]
- 따뜻하고 긍정적인 톤, 단정·불안 조장 금지 ("헤어진다" 같은 표현 X)
- MBTI가 '모름'이면 이름·생년월일 분위기로만 가볍게 풀이
- 재미용임을 마지막에 한 줄로 명시 ("재미로 보는 궁합이에요")`;
}

export default function LovePage() {
  const [a, setA] = useState<Person>({ name: '', birth: '', mbti: '모름' });
  const [b, setB] = useState<Person>({ name: '', birth: '', mbti: '모름' });
  const [relation, setRelation] = useState(RELATIONS[0]);
  const [copyMsg, setCopyMsg] = useState<string | null>(null);

  const preview = buildPromptText(a, b, relation);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(preview);
      setCopyMsg('복사 완료! Claude나 ChatGPT에 붙여넣으세요.');
      setTimeout(() => setCopyMsg(null), 3000);
    } catch {
      setCopyMsg('복사 실패 — 아래 미리보기에서 직접 선택해 복사해주세요.');
    }
  }

  function personFields(p: Person, set: (p: Person) => void, label: string) {
    return (
      <div className="rounded-lg border bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="mb-2 text-sm font-semibold text-rose-700 dark:text-rose-400">{label}</h3>
        <div className="space-y-2">
          <label className="block">
            <span className="text-xs text-slate-600 dark:text-slate-400">이름·별명</span>
            <input
              type="text"
              value={p.name}
              onChange={e => set({ ...p, name: e.target.value })}
              placeholder="예: 지민"
              className="mt-1 w-full rounded border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </label>
          <label className="block">
            <span className="text-xs text-slate-600 dark:text-slate-400">생년월일 (선택)</span>
            <input
              type="date"
              value={p.birth}
              onChange={e => set({ ...p, birth: e.target.value })}
              className="mt-1 w-full rounded border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </label>
          <label className="block">
            <span className="text-xs text-slate-600 dark:text-slate-400">MBTI</span>
            <select
              value={p.mbti}
              onChange={e => set({ ...p, mbti: e.target.value })}
              className="mt-1 w-full rounded border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              {MBTI_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-6">
      <header className="text-center">
        <div className="text-xs text-slate-500">
          <Link href="/test" className="hover:underline">← 생활AI 메인</Link>
        </div>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">AI 연애 궁합</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          두 사람 정보를 넣으면 궁합 점수·케미·데이트 추천을 재미로 풀어주는 프롬프트.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <KakaoShareButton
            title="AI 연애 궁합"
            description="두 사람 MBTI·생년월일로 보는 궁합 점수·성격 케미·데이트 추천 (재미용)"
            path="/test/love"
          />
          <LinkCopyButton path="/test/love" />
        </div>
      </header>

      <section className="rounded-lg border bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <label className="block">
          <span className="text-xs text-slate-600 dark:text-slate-400">두 사람의 관계</span>
          <select
            value={relation}
            onChange={e => setRelation(e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            {RELATIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </label>
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        {personFields(a, setA, '첫 번째 사람 (나)')}
        {personFields(b, setB, '두 번째 사람 (상대)')}
      </div>

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
          프롬프트 복사 → Claude/ChatGPT에 붙여넣기
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
        재미로 보는 궁합이에요. MBTI·생년월일 풀이는 과학적 근거가 없는 오락용이며, 관계는 두 사람이 만들어가는 거예요.
      </p>
    </div>
  );
}
