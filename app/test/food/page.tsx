'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/Button';
import KakaoShareButton from '@/components/KakaoShareButton';
import LinkCopyButton from '@/components/LinkCopyButton';
import AskAIButton from '@/components/AskAIButton';

const WHO = ['혼밥', '가족과', '친구와', '연인과 데이트', '회식·모임'];
const MEAL = ['아침', '점심', '저녁', '야식', '브런치'];
const MOOD = ['아무거나 빨리', '얼큰·해장', '든든하게', '가볍게', '특별한 날', '다이어트 중'];
const HOW = ['직접 요리 (레시피)', '주변 맛집 (외식)', '배달', '상관없음'];

function buildPromptText(opts: {
  who: string; meal: string; mood: string; how: string;
  budget: string; location: string; avoid: string;
}): string {
  const { who, meal, mood, how, budget, location, avoid } = opts;
  const locLine = location.trim()
    ? `- 내 위치: ${location.trim()} (주변 맛집 추천 시 이 지역 기준)`
    : '- 내 위치: (미입력 — 맛집은 "이런 키워드로 검색하세요"로 안내)';
  return `역할: 너는 센스 있는 음식 큐레이터다. 상황에 딱 맞는 메뉴를 골라주고, 칼로리와 다음 행동(레시피 또는 맛집)까지 한 번에 안내한다.

상황:
- 누구와: ${who}
- 식사: ${meal}
- 기분·컨디션: ${mood}
- 방식: ${how}
- 예산: ${budget || '상관없음'}
${locLine}
- 못 먹는 것·제외: ${avoid || '없음'}

다음 형식으로 한국어로:

## 오늘의 추천 메뉴 TOP 3
각 메뉴마다:
1. 메뉴 이름 + 한 줄 이유 (왜 이 상황에 어울리는지)
2. 예상 칼로리 (1인분 기준, 대략)
3. 영양 포인트 한 줄 (단백질·탄수·나트륨 등 특징)

## 식단 밸런스 코멘트
- 위 추천이 [기분·컨디션]에 어떻게 맞는지
- 다이어트 중이면 더 가벼운 대안 1가지

## 바로 다음 행동
방식이 '직접 요리'면:
- 각 메뉴의 핵심 조리 단계 3~4줄 요약 + "유튜브/블로그에서 '○○ 레시피'로 검색" 키워드 제시
방식이 '맛집·배달'이면:
- 위치 기준 "어떤 키워드로 검색하면 좋은지" + 메뉴별 추천 검색어
  (예: "${location || '○○동'} ○○ 맛집", 배달앱에서 "○○")

[제약]
- 칼로리는 "대략" "약"을 붙여 추정치임을 명시 (정확한 수치 단정 X)
- 제외 항목은 절대 추천하지 말 것
- 과식·과음 권하지 말 것, 균형 잡힌 톤
- 위치 미입력이면 특정 가게명 지어내지 말고 검색 키워드만 제시`;
}

export default function FoodPage() {
  const [who, setWho] = useState(WHO[0]);
  const [meal, setMeal] = useState(MEAL[1]);
  const [mood, setMood] = useState(MOOD[0]);
  const [how, setHow] = useState(HOW[3]);
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [avoid, setAvoid] = useState('');
  const [copyMsg, setCopyMsg] = useState<string | null>(null);

  const preview = buildPromptText({ who, meal, mood, how, budget, location, avoid });

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(preview);
      setCopyMsg('복사 완료! Claude나 ChatGPT에 붙여넣으세요. (맛집은 웹 검색 모델이 정확해요)');
      setTimeout(() => setCopyMsg(null), 3000);
    } catch {
      setCopyMsg('복사 실패 — 아래 미리보기에서 직접 선택해 복사해주세요.');
    }
  }

  function selectField(
    label: string, value: string, set: (v: string) => void, options: string[],
  ) {
    return (
      <label className="block">
        <span className="text-xs text-slate-600 dark:text-slate-400">{label}</span>
        <select
          value={value}
          onChange={e => set(e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        >
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </label>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-6">
      <header className="text-center">
        <div className="text-xs text-slate-500">
          <Link href="/test" className="hover:underline">← 생활AI 메인</Link>
        </div>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">오늘 뭐먹지?</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          상황에 맞는 메뉴를 칼로리·식단 코멘트와 함께, 레시피 또는 주변 맛집까지 추천.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <KakaoShareButton
            title="오늘 뭐먹지? — AI 메뉴 추천"
            description="상황·기분에 맞는 메뉴를 칼로리·식단 코멘트와 함께 추천하고 레시피·맛집까지 안내"
            path="/test/food"
          />
          <LinkCopyButton path="/test/food" />
        </div>
      </header>

      <section className="rounded-lg border bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">상황 입력</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {selectField('누구와', who, setWho, WHO)}
          {selectField('식사', meal, setMeal, MEAL)}
          {selectField('기분·컨디션', mood, setMood, MOOD)}
          {selectField('방식', how, setHow, HOW)}
          <label className="block">
            <span className="text-xs text-slate-600 dark:text-slate-400">예산 (선택)</span>
            <input
              type="text"
              value={budget}
              onChange={e => setBudget(e.target.value)}
              placeholder="예: 1만 원 이내"
              className="mt-1 w-full rounded border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </label>
          <label className="block">
            <span className="text-xs text-slate-600 dark:text-slate-400">위치 (맛집 추천용, 선택)</span>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="예: 강남역, 부산 서면"
              className="mt-1 w-full rounded border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-xs text-slate-600 dark:text-slate-400">못 먹는 것·제외 (선택)</span>
            <input
              type="text"
              value={avoid}
              onChange={e => setAvoid(e.target.value)}
              placeholder="예: 해산물 알레르기, 매운 거 X"
              className="mt-1 w-full rounded border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </label>
        </div>
      </section>

      <section className="space-y-3">
        <AskAIButton buildPrompt={() => preview} />
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
        ⚠️ 칼로리·영양 정보는 AI 추정치입니다. 알레르기·질환이 있다면 전문가·제품 표기를 우선 확인하세요.
      </p>
    </div>
  );
}
