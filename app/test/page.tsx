'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { QUESTIONS, calcType, type Option } from '@/lib/mbti-test';
import LinkCopyButton from '@/components/LinkCopyButton';
import AnalyzeModal from '@/components/AnalyzeModal';

// 테스트별 시작 버튼 클릭 집계용 슬러그 (prompt_stats 테이블 재활용)
const SLUG_MBTI = 'test-mbti';
const SLUG_SKILL = 'test-skill';
const SLUG_SAJU = 'test-saju';
const SLUG_MARKET = 'test-market';
const SLUG_LOTTO = 'test-lotto';
const SLUG_LOVE = 'test-love';
const SLUG_FOOD = 'test-food';
const SLUG_FAKE = 'test-fake-friend';

type TestCounts = { mbti: number; skill: number; saju: number; market: number; lotto: number; love: number; food: number; fake: number };

// 생활AI 카드 정의 — money(재테크)/fun(재미) 그룹. 렌더 시 인기(시작 수)순 정렬.
type TestDef = {
  key: keyof TestCounts;
  slug: string;
  group: 'money' | 'fun';
  title: string;
  desc: ReactNode;
  cta: string;
  border: string;  // border-2 색 (라이트+다크)
  ctaBg: string;
  href?: string;   // 없으면 inline(MBTI 즉시 시작)
  inline?: boolean;
};

const TESTS: TestDef[] = [
  { key: 'market', slug: SLUG_MARKET, group: 'money', title: '데일리 세계 경제', cta: '리포트 받으러 가기 →', border: 'border-amber-200 dark:border-amber-800', ctaBg: 'bg-amber-600', href: '/test/market',
    desc: <>오늘 날짜로 시장 지표·투자 거장 동향·주요 이슈를 한 번에.<br/>카카오톡으로 받아보기 가능.</> },
  { key: 'lotto', slug: SLUG_LOTTO, group: 'money', title: 'AI 로또 번호 예측', cta: '번호 받으러 가기 →', border: 'border-rose-200 dark:border-rose-800', ctaBg: 'bg-rose-600', href: '/test/lotto',
    desc: <>최근 당첨번호 트렌드를 참고해 5개 게임 세트를 재미로 추정.<br/>홀짝·고저·합계 균형 컨셉 선택 · 순수 오락용.</> },
  { key: 'mbti', slug: SLUG_MBTI, group: 'fun', title: '일하는 나의 MBTI', cta: '시작하기', border: 'border-emerald-200 dark:border-emerald-800', ctaBg: 'bg-emerald-600', inline: true,
    desc: <>평소 일·AI 활용 상황으로 본인의 MBTI 4축을 측정.<br/>12문항 · 4지선다 · 3분 내외 · 결과는 16가지 유형.</> },
  { key: 'skill', slug: SLUG_SKILL, group: 'fun', title: 'AI 활용 직무 테스트', cta: '시험 시작 →', border: 'border-sky-200 dark:border-sky-800', ctaBg: 'bg-sky-600', href: '/test/skill',
    desc: <>AI 능력을 직무 기준으로 평가.<br/>6·12·18문항 중 선택 · 점수·강점·약점·직무 적합도 리포트.</> },
  { key: 'saju', slug: SLUG_SAJU, group: 'fun', title: 'AI로 보는 오늘의 사주', cta: '사주 보러 가기 →', border: 'border-purple-200 dark:border-purple-800', ctaBg: 'bg-purple-600', href: '/test/saju',
    desc: <>생년월일 입력 → Claude가 오늘의 운세를 풀어줍니다.<br/>총운·재물·인연·건강·행운·조언 6섹션.</> },
  { key: 'love', slug: SLUG_LOVE, group: 'fun', title: 'AI 연애 궁합', cta: '궁합 보러 가기 →', border: 'border-pink-200 dark:border-pink-800', ctaBg: 'bg-pink-600', href: '/test/love',
    desc: <>두 사람 MBTI·생년월일로 보는 궁합 점수와 케미.<br/>성격 케미·연애 스타일·데이트 추천까지 · 재미용.</> },
  { key: 'food', slug: SLUG_FOOD, group: 'fun', title: '오늘 뭐먹지?', cta: '메뉴 추천받기 →', border: 'border-orange-200 dark:border-orange-800', ctaBg: 'bg-orange-600', href: '/test/food',
    desc: <>상황·기분에 맞는 메뉴를 칼로리·식단 코멘트와 함께.<br/>레시피 검색어 또는 주변 맛집까지 추천.</> },
  { key: 'fake', slug: SLUG_FAKE, group: 'fun', title: '가짜 남사친 구분법', cta: '진단 시작 →', border: 'border-rose-200 dark:border-rose-800', ctaBg: 'bg-rose-600', href: '/test/fake-friend',
    desc: <>상황 5문항으로 &lsquo;남친 되고 싶은 남자&rsquo;인지 진짜 친구인지 % 진단.<br/>여자·남자 관점 각각 · 재미용.</> },
];

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

  // 결과 모달 상태 — 마지막 답 직후 광고와 함께 "결과 보기" 노출 (인위적 지연 없음).
  const [pendingType, setPendingType] = useState<string | null>(null);

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
      return;
    }
    setAnswers(next);
    setStep(step + 1);
  }

  // 모달이 뜨면 결과 페이지를 미리 가져와 클릭 시 즉시 이동.
  useEffect(() => {
    if (!pendingType) return;
    router.prefetch(`/test/${pendingType.toLowerCase()}`);
  }, [pendingType, router]);

  function goToResult() {
    if (!pendingType) return;
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
            <LinkCopyButton path="/test" />
          </div>
        </div>

        {(['money', 'fun'] as const).map(group => {
          const cards = TESTS
            .filter(t => t.group === group)
            .sort((a, b) => (counts?.[b.key] ?? 0) - (counts?.[a.key] ?? 0));
          return (
            <section key={group} className="space-y-3">
              <h2 className="text-lg font-bold">
                {group === 'money' ? '재테크 AI' : '재미 AI'}
              </h2>
              {cards.map(t => {
                const count = counts?.[t.key] ?? 0;
                const inner = (
                  <>
                    <h3 className="text-xl font-bold md:text-2xl">{t.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t.desc}</p>
                    <div className={`mt-4 inline-block rounded-lg px-6 py-3 text-base font-semibold text-white ${t.ctaBg}`}>
                      {t.cta}
                    </div>
                    {count > 0 && (
                      <div className="mt-3 text-xs text-slate-500">
                        {count.toLocaleString('ko-KR')}명 시작
                      </div>
                    )}
                  </>
                );
                const cls = `block w-full rounded-lg border-2 bg-white p-6 text-center transition hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900 ${t.border}`;
                return t.inline ? (
                  <button
                    key={t.key}
                    onClick={() => { trackTestClick(t.slug); setStarted(true); }}
                    className={cls}
                  >
                    {inner}
                  </button>
                ) : (
                  <Link key={t.key} href={t.href!} onClick={() => trackTestClick(t.slug)} className={cls}>
                    {inner}
                  </Link>
                );
              })}
            </section>
          );
        })}
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

      {/* 결과 준비 모달 — 3·2·1 카운트다운 + 광고 → 결과 보기 */}
      <AnalyzeModal open={pendingType !== null} done onConfirm={goToResult} />
    </div>
  );
}
