import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ALL_TYPES, RESULTS, MBTI_CATEGORIES } from '@/lib/mbti-test';
import { getPromptsByCategory, CATEGORY_KO, CATEGORY_BORDER, sortByNewest, type Category } from '@/lib/prompts';
import { createClient } from '@/lib/supabase/server';
import KakaoShareButton from '@/components/KakaoShareButton';
import MBTIAutoSave from '@/components/MBTIAutoSave';

export function generateStaticParams() {
  return ALL_TYPES.map(t => ({ type: t.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const result = RESULTS[type.toUpperCase()];
  if (!result) return {};
  return {
    title: `${result.type} ${result.nickname} · 일할 때의 MBTI`,
    description: result.description,
  };
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const upper = type.toUpperCase();
  const result = RESULTS[upper];
  if (!result) notFound();

  // 추천 프롬프트 — 매핑된 카테고리에서 카테고리당 1개씩, 최신순. 최대 3개.
  const grouped = getPromptsByCategory();
  const cats = (MBTI_CATEGORIES[upper] ?? []) as readonly Category[];
  const recommended = cats
    .map(cat => sortByNewest(grouped[cat] ?? [])[0])
    .filter(Boolean)
    .slice(0, 3);

  // 로그인 여부 — 결과 페이지 하단 "기록 보기" 노출용
  let loggedIn = false;
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    loggedIn = !!user;
  } catch {
    // env 미설정 등 — 비로그인 취급
  }

  return (
    <article className="mx-auto max-w-2xl space-y-6 py-8">
      {/* 로그인 시 자동 저장 (sessionStorage로 중복 방지) */}
      <MBTIAutoSave type={upper} />

      <header className="text-center">
        <div className="text-xs uppercase tracking-wider text-slate-500">
          일할 때의 MBTI — 당신의 유형
        </div>
        <h1 className="mt-2 text-5xl font-bold tracking-tight md:text-6xl">
          {result.type}
        </h1>
        <p className="mt-3 text-xl font-semibold text-emerald-700 md:text-2xl dark:text-emerald-400">
          {result.nickname}
        </p>
      </header>

      <section className="rounded-lg border bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
          {result.description}
        </p>
      </section>

      <div className="grid gap-3 md:grid-cols-3">
        <section className="rounded-lg border-l-4 border-emerald-500 bg-emerald-50 p-4 dark:bg-emerald-950/30">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
            AI 스타일
          </div>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-800 dark:text-slate-200">
            {result.aiStyle.map((line, i) => (
              <li key={i} className="flex gap-1.5">
                <span className="text-emerald-500" aria-hidden>•</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-950/30">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-800 dark:text-blue-300">
            업무 특징
          </div>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-800 dark:text-slate-200">
            {result.workTrait.map((line, i) => (
              <li key={i} className="flex gap-1.5">
                <span className="text-blue-500" aria-hidden>•</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-lg border-l-4 border-rose-500 bg-rose-50 p-4 dark:bg-rose-950/30">
          <div className="text-xs font-semibold uppercase tracking-wider text-rose-800 dark:text-rose-300">
            연애 특징
          </div>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-800 dark:text-slate-200">
            {result.loveTrait.map((line, i) => (
              <li key={i} className="flex gap-1.5">
                <span className="text-rose-500" aria-hidden>•</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <section className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 dark:bg-amber-950/30">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-300">
            자녀 양육
          </div>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-800 dark:text-slate-200">
            {result.parentingStyle.map((line, i) => (
              <li key={i} className="flex gap-1.5">
                <span className="text-amber-500" aria-hidden>•</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-lg border-l-4 border-teal-500 bg-teal-50 p-4 dark:bg-teal-950/30">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-800 dark:text-teal-300">
            음식 선호
          </div>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-800 dark:text-slate-200">
            {result.foodPreference.map((line, i) => (
              <li key={i} className="flex gap-1.5">
                <span className="text-teal-500" aria-hidden>•</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <section className="rounded-lg border-l-4 border-indigo-500 bg-indigo-50 p-4 dark:bg-indigo-950/30">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-800 dark:text-indigo-300">
            자주 하는 말
          </div>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-800 dark:text-slate-200">
            {result.catchphrase.map((line, i) => (
              <li key={i} className="flex gap-1.5">
                <span className="text-indigo-500" aria-hidden>•</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-lg border-l-4 border-fuchsia-500 bg-fuchsia-50 p-4 dark:bg-fuchsia-950/30">
          <div className="text-xs font-semibold uppercase tracking-wider text-fuchsia-800 dark:text-fuchsia-300">
            패션 스타일
          </div>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-800 dark:text-slate-200">
            {result.fashionStyle.map((line, i) => (
              <li key={i} className="flex gap-1.5">
                <span className="text-fuchsia-500" aria-hidden>•</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {recommended.length > 0 && (
        <section className="rounded-lg border bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
            {result.type}에게 어울리는 프롬프트
          </h2>
          <p className="mb-3 text-xs text-slate-500">{result.nickname} 스타일에 맞춰 골랐어요.</p>
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

      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <KakaoShareButton
          title={`${result.type} — ${result.nickname} (일할 때의 MBTI)`}
          description={result.description}
          path={`/test/${type.toLowerCase()}`}
        />
        <Link
          href="/test"
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
        >
          다시 하기
        </Link>
        {loggedIn && (
          <Link
            href="/test/history"
            className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800 hover:bg-amber-100 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
          >
            내 기록 보기 →
          </Link>
        )}
        <Link
          href="/"
          className="rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-100"
        >
          프롬프트 둘러보기 →
        </Link>
      </div>

      {!loggedIn && (
        <p className="text-center text-xs text-slate-500">
          로그인하면 해본 일자와 결과가 저장돼 다시 볼 수 있어요.
        </p>
      )}
    </article>
  );
}
