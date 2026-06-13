'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/Button';
import KakaoShareButton from '@/components/KakaoShareButton';
import LinkCopyButton from '@/components/LinkCopyButton';
import AskAIButton from '@/components/AskAIButton';

const HOURS = [
  { value: '자시', label: '자시 (23:00~01:00)' },
  { value: '축시', label: '축시 (01:00~03:00)' },
  { value: '인시', label: '인시 (03:00~05:00)' },
  { value: '묘시', label: '묘시 (05:00~07:00)' },
  { value: '진시', label: '진시 (07:00~09:00)' },
  { value: '사시', label: '사시 (09:00~11:00)' },
  { value: '오시', label: '오시 (11:00~13:00)' },
  { value: '미시', label: '미시 (13:00~15:00)' },
  { value: '신시', label: '신시 (15:00~17:00)' },
  { value: '유시', label: '유시 (17:00~19:00)' },
  { value: '술시', label: '술시 (19:00~21:00)' },
  { value: '해시', label: '해시 (21:00~23:00)' },
  { value: '모름', label: '모름' },
];

function buildPromptText(
  year: number, month: number, day: number,
  hour: string, calendar: '양력' | '음력',
): string {
  const today = new Date();
  const todayStr = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
  return `당신은 한국 전통 사주명리학에 정통한 운세 분석가입니다. 오늘은 ${todayStr}입니다.

생년월일: ${year}년 ${month}월 ${day}일 (${calendar})
생시: ${hour}

다음 형식 그대로 한국어로 작성해주세요:

## 총운
오늘 하루의 전반적인 흐름 (3~4문장).

## 재물운
금전·재테크 관련 (2~3문장).

## 인간관계운
사람·만남·소통 (2~3문장).

## 건강·컨디션
건강 주의점 (2~3문장).

## 오늘의 행운
- 행운의 색:
- 행운의 숫자:
- 행운의 방향:

## 오늘의 조언
한 문장으로 핵심 조언.

조건: 단정적 예측 금지, 권유형 어미("~할 수 있어요"). 부정 예측은 부드럽게.`;
}

function renderReading(text: string) {
  // 간단한 마크다운 렌더링 — ## 헤딩 + 단락 + bullet
  const lines = text.split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (line.startsWith('## ')) {
      blocks.push(
        <h3 key={i} className="mt-5 mb-2 text-base font-bold text-emerald-700">
          {line.slice(3)}
        </h3>,
      );
      i++;
    } else if (line.startsWith('- ')) {
      const bullets: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        bullets.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push(
        <ul key={i} className="ml-5 list-disc space-y-1 text-sm">
          {bullets.map((b, j) => <li key={j}>{b}</li>)}
        </ul>,
      );
    } else if (line) {
      blocks.push(
        <p key={i} className="text-sm leading-relaxed text-slate-700">
          {line}
        </p>,
      );
      i++;
    } else {
      i++;
    }
  }
  return <div>{blocks}</div>;
}

export default function SajuPage() {
  const currentYear = new Date().getFullYear();
  const years = useMemo(
    () => Array.from({ length: currentYear - 1929 }, (_, i) => currentYear - i),
    [currentYear],
  );

  const [year, setYear] = useState(1990);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState('모름');
  const [calendar, setCalendar] = useState<'양력' | '음력'>('양력');
  const [loaded, setLoaded] = useState(false);

  // 생년월일·생시 캐시 — localStorage. 다시 방문 시 입력 생략.
  useEffect(() => {
    try {
      const raw = localStorage.getItem('saju_birth');
      if (raw) {
        const v = JSON.parse(raw);
        if (Number.isInteger(v.year)) setYear(v.year);
        if (Number.isInteger(v.month)) setMonth(v.month);
        if (Number.isInteger(v.day)) setDay(v.day);
        if (typeof v.hour === 'string') setHour(v.hour);
        if (v.calendar === '양력' || v.calendar === '음력') setCalendar(v.calendar);
      }
    } catch {
      // localStorage 거부 등 — 기본값 사용
    }
    setLoaded(true);
  }, []);

  // 값이 바뀔 때마다 저장 (최초 로드 완료 후에만 — 초기값 덮어쓰기 방지).
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem('saju_birth', JSON.stringify({ year, month, day, hour, calendar }));
    } catch {
      // ignore
    }
  }, [loaded, year, month, day, hour, calendar]);

  const [reading, setReading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copyMsg, setCopyMsg] = useState<string | null>(null);

  // AI 직접 호출 모드 — 현재 비활성화 (정책·비용 검토 중).
  // ANTHROPIC_API_KEY 셋업 후 버튼 disabled만 풀고 onClick={askAI} 연결하면 부활.
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [loading, setLoading] = useState(false);
  async function askAI() {
    setLoading(true);
    setError(null);
    setReading(null);
    try {
      const r = await fetch('/api/saju', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year, month, day, hour, calendar }),
      });
      const d = await r.json();
      if (!r.ok) {
        setError(d?.error ?? '요청 실패');
        return;
      }
      setReading(d.reading);
    } catch {
      setError('네트워크 오류 — 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */

  async function copyPrompt() {
    const text = buildPromptText(year, month, day, hour, calendar);
    try {
      await navigator.clipboard.writeText(text);
      setCopyMsg('복사 완료! Claude나 ChatGPT에 붙여넣으세요.');
      setTimeout(() => setCopyMsg(null), 3000);
    } catch {
      setCopyMsg('복사 실패 — 직접 선택해서 복사해주세요.');
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-6">
      <header className="text-center">
        <div className="text-xs text-slate-500">
          <Link href="/test" className="hover:underline">← 생활AI 메인</Link>
        </div>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">AI로 보는 오늘의 사주</h1>
        <p className="mt-2 text-sm text-slate-600">
          생년월일을 입력하면 Claude가 오늘의 운세를 풀어줍니다.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <KakaoShareButton
            title="AI로 보는 오늘의 사주"
            description="생년월일을 입력하면 Claude가 오늘의 운세를 풀어줍니다 (총운·재물·인연·건강·행운)"
            path="/test/saju"
          />
          <LinkCopyButton path="/test/saju" />
        </div>
      </header>

      <section className="rounded-lg border bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">생년월일 입력</h2>

        <div className="grid grid-cols-3 gap-2">
          <label className="block">
            <span className="text-xs text-slate-600">년</span>
            <select
              value={year}
              onChange={e => setYear(Number(e.target.value))}
              className="mt-1 w-full rounded border px-2 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="text-xs text-slate-600">월</span>
            <select
              value={month}
              onChange={e => setMonth(Number(e.target.value))}
              className="mt-1 w-full rounded border px-2 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map(m =>
                <option key={m} value={m}>{m}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="text-xs text-slate-600">일</span>
            <select
              value={day}
              onChange={e => setDay(Number(e.target.value))}
              className="mt-1 w-full rounded border px-2 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              {Array.from({ length: 31 }, (_, i) => i + 1).map(d =>
                <option key={d} value={d}>{d}</option>)}
            </select>
          </label>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs text-slate-600">생시 (모르면 &lsquo;모름&rsquo;)</span>
            <select
              value={hour}
              onChange={e => setHour(e.target.value)}
              className="mt-1 w-full rounded border px-2 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              {HOURS.map(h => <option key={h.value} value={h.value}>{h.label}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="text-xs text-slate-600">양/음력</span>
            <div className="mt-1 flex gap-2">
              {(['양력', '음력'] as const).map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCalendar(c)}
                  className={`flex-1 rounded border-2 px-3 py-2 text-sm ${
                    calendar === c
                      ? 'border-emerald-500 bg-emerald-50 font-semibold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                      : 'border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </label>
        </div>
      </section>

      <section className="space-y-3">
        <AskAIButton buildPrompt={() => buildPromptText(year, month, day, hour, calendar)} />
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

      {error && (
        <section className="rounded-lg border-l-4 border-rose-500 bg-rose-50 p-4 text-sm text-rose-800 dark:bg-rose-950/30 dark:text-rose-200">
          {error}
        </section>
      )}

      {reading && (
        <section className="rounded-lg border bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-3 text-lg font-bold">오늘의 사주 풀이</h2>
          {renderReading(reading)}
          <p className="mt-5 border-t pt-3 text-xs text-slate-400 dark:border-slate-800">
            ⚠️ 이 풀이는 AI가 생성한 참고용 콘텐츠입니다. 사주명리학 전문가의 정식 상담을 대체하지 않습니다.
          </p>
        </section>
      )}
    </div>
  );
}
