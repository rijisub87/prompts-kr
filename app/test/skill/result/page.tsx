import { Suspense } from 'react';
import Link from 'next/link';
import {
  AXES, JOBS, LENGTH_INFO, getQuestions, scoreByAxis, maxAxisScore,
  jobFit, strengths, weaknesses, grade, AXIS_TO_CATEGORIES,
  type JobId, type Length, type AxisId,
} from '@/lib/ai-skill-test';
import { getPromptsByCategory, CATEGORY_KO, CATEGORY_BORDER, sortByNewest, type Category } from '@/lib/prompts';
import KakaoShareButton from '@/components/KakaoShareButton';

export const metadata = {
  title: 'AI 활용 능력 시험 결과',
  description: '6가지 AI 능력별 점수, 강점·약점, 직무 적합도 리포트',
};

function isValidJob(j: string | undefined): j is JobId {
  return !!j && j in JOBS;
}
function isValidLength(l: string | undefined): l is Length {
  return l === 'quick' || l === 'normal' || l === 'detailed';
}

function ResultContent({
  jobId, length, answers,
}: { jobId: JobId; length: Length; answers: number[] }) {
  const job = JOBS[jobId];
  const lengthInfo = LENGTH_INFO[length];
  const questions = getQuestions(length);

  const byAxis = scoreByAxis(answers, questions);
  const max = maxAxisScore(questions);
  const total = AXES.reduce((s, a) => s + byAxis[a.id], 0);
  const maxTotal = AXES.reduce((s, a) => s + max[a.id], 0);
  const totalPct = maxTotal === 0 ? 0 : Math.round((total / maxTotal) * 100);
  const g = grade(totalPct);
  const fit = jobFit(jobId, byAxis, max);
  const strongs = strengths(byAxis, max);
  const weaks = weaknesses(byAxis, max);

  // 추천 프롬프트 — 약점 axis의 카테고리에서 최신 1개씩, 최대 3개 (중복 제거).
  const grouped = getPromptsByCategory();
  const seenSlugs = new Set<string>();
  const recCats: Category[] = [];
  for (const axisId of weaks) {
    for (const c of AXIS_TO_CATEGORIES[axisId]) {
      if (!recCats.includes(c as Category)) recCats.push(c as Category);
    }
  }
  const recommended = recCats
    .map(c => sortByNewest(grouped[c] ?? []).find(p => !seenSlugs.has(p.slug)))
    .filter(Boolean)
    .slice(0, 3)
    .map(p => { seenSlugs.add(p!.slug); return p!; });

  function axisName(id: AxisId): string {
    return AXES.find(a => a.id === id)!.name;
  }
  function axisBar(id: AxisId): string {
    return AXES.find(a => a.id === id)!.bar;
  }

  return (
    <article className="mx-auto max-w-3xl space-y-6 py-8">
      <header className="text-center">
        <Link href="/test/skill" className="text-xs text-slate-500 hover:underline">← 다시 시험</Link>
        <h1 className="mt-2 text-2xl font-bold md:text-3xl">{job.name}의 AI 활용 능력</h1>
        <p className="mt-1 text-xs text-slate-500">
          {lengthInfo.name} · {questions.length}문항 결과
        </p>
      </header>

      {/* 총점 + 등급 */}
      <section className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border bg-white p-5 text-center dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs text-slate-500">총점</div>
          <div className="mt-1 text-4xl font-bold">
            {total}<span className="text-lg text-slate-400">/{maxTotal}</span>
          </div>
          <div className="mt-1 text-xs text-slate-500">{totalPct}%</div>
        </div>
        <div className="rounded-lg border bg-white p-5 text-center dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs text-slate-500">등급</div>
          <div className="mt-1 text-4xl font-bold text-emerald-600 dark:text-emerald-400">{g}</div>
          <div className="mt-1 text-xs text-slate-500">
            {g === 'A+' && '최상위 — 실무에서 가르치는 수준'}
            {g === 'A' && '우수 — AI를 자기 도구로 잘 다룸'}
            {g === 'B+' && '양호 — 핵심은 갖췄고 보완 여지'}
            {g === 'B' && '보통 — 기본은 알고 있음'}
            {g === 'C' && '입문 — 몇 가지만 익히면 크게 향상'}
            {g === 'D' && '시작 — 짧은 학습으로 빠르게 올림'}
          </div>
        </div>
      </section>

      {/* 직무 적합도 */}
      <section className="rounded-lg border bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {job.name} 직무 적합도
          </h2>
          <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{fit}%</span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-purple-500"
            style={{ width: `${fit}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-slate-500">
          {job.name} 직무에서 중요한 능력 가중치를 반영한 점수입니다.
        </p>
      </section>

      {/* 능력별 막대 */}
      <section className="rounded-lg border bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">능력별 점수</h2>
        <div className="mt-4 space-y-3">
          {AXES.map(a => {
            const s = byAxis[a.id];
            const m = max[a.id];
            const pct = m === 0 ? 0 : Math.round((s / m) * 100);
            return (
              <div key={a.id}>
                <div className="flex items-baseline justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{a.name}</span>
                  <span className="text-slate-500">
                    {s}/{m} · {pct}%
                  </span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className={`h-full rounded-full ${a.bar}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 강점 / 약점 */}
      <section className="grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border-l-4 border-emerald-500 bg-emerald-50 p-4 dark:bg-emerald-950/30">
          <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">강점</div>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-800 dark:text-slate-200">
            {strongs.map(id => (
              <li key={id} className="flex gap-1.5">
                <span className="text-emerald-500" aria-hidden>•</span>
                <span>
                  <strong>{axisName(id)}</strong> — {AXES.find(a => a.id === id)!.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border-l-4 border-rose-500 bg-rose-50 p-4 dark:bg-rose-950/30">
          <div className="text-xs font-semibold text-rose-800 dark:text-rose-300">보완 포인트</div>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-800 dark:text-slate-200">
            {weaks.map(id => (
              <li key={id} className="flex gap-1.5">
                <span className="text-rose-500" aria-hidden>•</span>
                <span>
                  <strong>{axisName(id)}</strong> — {AXES.find(a => a.id === id)!.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 추천 프롬프트 */}
      {recommended.length > 0 && (
        <section className="rounded-lg border bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
            보완하기 좋은 프롬프트
          </h2>
          <p className="mb-3 text-xs text-slate-500">
            약점 영역({weaks.map(axisName).join(', ')})에서 골랐습니다.
          </p>
          <div className="grid gap-2 sm:grid-cols-3">
            {recommended.map(p => (
              <Link
                key={p.slug}
                href={`/p/${p.slug}`}
                className={`block rounded border border-l-4 bg-slate-50 p-3 text-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md dark:bg-slate-950 dark:hover:bg-slate-900 ${CATEGORY_BORDER[p.category]}`}
              >
                <div className="text-xs text-slate-500">{CATEGORY_KO[p.category]}</div>
                <div className="mt-1 line-clamp-2 font-medium text-slate-900 dark:text-slate-100">
                  {p.title}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 액션 */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <KakaoShareButton
          title={`${job.name} AI 활용 능력 ${g} (${totalPct}점)`}
          description={`강점: ${strongs.map(axisName).join(', ')} · 직무 적합도 ${fit}%`}
          path={`/test/skill/result?j=${jobId}&l=${length}&a=${answers.join(',')}`}
        />
        <Link
          href="/test/skill"
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
        >
          다시 시험
        </Link>
        <Link
          href="/"
          className="rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-100"
        >
          프롬프트 둘러보기 →
        </Link>
      </div>
    </article>
  );
}

export default async function SkillResultPage({
  searchParams,
}: {
  searchParams: Promise<{ j?: string; l?: string; a?: string }>;
}) {
  const { j, l, a } = await searchParams;

  if (!isValidJob(j) || !isValidLength(l) || !a) {
    return (
      <div className="mx-auto max-w-xl py-10 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          결과 데이터가 없습니다.
        </p>
        <Link
          href="/test/skill"
          className="mt-4 inline-block rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          시험 시작하기
        </Link>
      </div>
    );
  }

  const answers = a.split(',').map(n => Number(n)).filter(n => Number.isInteger(n) && n >= 0);
  const questions = getQuestions(l);
  if (answers.length !== questions.length) {
    return (
      <div className="mx-auto max-w-xl py-10 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          결과 데이터가 손상되었습니다.
        </p>
        <Link
          href="/test/skill"
          className="mt-4 inline-block rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          다시 시험 시작
        </Link>
      </div>
    );
  }

  return (
    <Suspense>
      <ResultContent jobId={j} length={l} answers={answers} />
    </Suspense>
  );
}
