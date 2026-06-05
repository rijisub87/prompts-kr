import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPrompts, CATEGORY_KO, CATEGORY_BORDER } from '@/lib/prompts';
import { getAllGuides } from '@/lib/guides';
import { createClient } from '@/lib/supabase/server';

export const revalidate = 60;

export const metadata: Metadata = {
  title: '사이트 통계 — 인기 프롬프트·조회수·추천수',
  description: '프롬프트 한국 사이트 전체 통계. 가장 많이 본 프롬프트 TOP 10, 가장 많이 추천된 프롬프트 TOP 10, 카테고리 분포.',
};

type StatsRow = { slug: string; view_count: number; recommend_count: number };

async function fetchStats(): Promise<StatsRow[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('prompt_stats')
      .select('slug, view_count, recommend_count');
    return (data ?? []) as StatsRow[];
  } catch {
    return [];
  }
}

export default async function StatsPage() {
  const all = getAllPrompts();
  const guides = getAllGuides();
  const stats = await fetchStats();

  // slug → meta
  const meta = new Map(all.map(p => [p.slug, p]));

  // 합계
  const totalViews = stats.reduce((s, r) => s + Number(r.view_count ?? 0), 0);
  const totalRecs = stats.reduce((s, r) => s + Number(r.recommend_count ?? 0), 0);

  // 출처 unique
  const sources = new Set(all.map(p => p.source.name));

  // TOP 10 by views
  const topViews = [...stats]
    .filter(r => meta.has(r.slug))
    .sort((a, b) => Number(b.view_count) - Number(a.view_count))
    .slice(0, 10);

  // TOP 10 by recommends
  const topRecs = [...stats]
    .filter(r => meta.has(r.slug) && Number(r.recommend_count) > 0)
    .sort((a, b) => Number(b.recommend_count) - Number(a.recommend_count))
    .slice(0, 10);

  // 카테고리 분포
  const catCount = new Map<string, number>();
  for (const p of all) {
    catCount.set(p.category, (catCount.get(p.category) ?? 0) + 1);
  }
  const catEntries = Array.from(catCount.entries()).sort((a, b) => b[1] - a[1]);
  const maxCat = Math.max(...catEntries.map(([, n]) => n), 1);

  return (
    <article className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold">사이트 통계</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          프롬프트 한국 — 콘텐츠·인기·트래픽 현황 (1분마다 갱신)
        </p>
      </header>

      {/* 요약 카드 4개 */}
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs text-slate-500">프롬프트</div>
          <div className="mt-1 text-3xl font-bold">{all.length}</div>
        </div>
        <div className="rounded-lg border bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs text-slate-500">가이드</div>
          <div className="mt-1 text-3xl font-bold">{guides.length}</div>
        </div>
        <div className="rounded-lg border bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs text-slate-500">총 조회수</div>
          <div className="mt-1 text-3xl font-bold">{totalViews.toLocaleString('ko-KR')}</div>
        </div>
        <div className="rounded-lg border bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs text-slate-500">총 추천수 ❤️</div>
          <div className="mt-1 text-3xl font-bold text-rose-600 dark:text-rose-400">
            {totalRecs.toLocaleString('ko-KR')}
          </div>
        </div>
      </section>

      {/* TOP 10 by views */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">👁️ 가장 많이 본 프롬프트 TOP 10</h2>
        {topViews.length === 0 ? (
          <p className="text-sm text-slate-500">아직 데이터가 없어요.</p>
        ) : (
          <ol className="space-y-2">
            {topViews.map((row, i) => {
              const p = meta.get(row.slug)!;
              return (
                <li key={row.slug}>
                  <Link
                    href={`/p/${row.slug}`}
                    className={`flex items-center gap-3 rounded border border-l-4 bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 ${CATEGORY_BORDER[p.category]}`}
                  >
                    <span className="w-6 shrink-0 text-center text-lg font-bold text-slate-400">
                      {i + 1}
                    </span>
                    <span className="flex-1 line-clamp-1 text-sm font-medium">
                      {p.title}
                    </span>
                    <span className="text-xs text-slate-500">
                      {CATEGORY_KO[p.category]}
                    </span>
                    <span className="inline-flex items-center gap-0.5 rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      👁️ {Number(row.view_count).toLocaleString('ko-KR')}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        )}
      </section>

      {/* TOP 10 by recommends */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">❤️ 가장 많이 추천된 프롬프트 TOP 10</h2>
        {topRecs.length === 0 ? (
          <p className="text-sm text-slate-500">아직 추천이 없어요.</p>
        ) : (
          <ol className="space-y-2">
            {topRecs.map((row, i) => {
              const p = meta.get(row.slug)!;
              return (
                <li key={row.slug}>
                  <Link
                    href={`/p/${row.slug}`}
                    className={`flex items-center gap-3 rounded border border-l-4 bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 ${CATEGORY_BORDER[p.category]}`}
                  >
                    <span className="w-6 shrink-0 text-center text-lg font-bold text-rose-400">
                      {i + 1}
                    </span>
                    <span className="flex-1 line-clamp-1 text-sm font-medium">
                      {p.title}
                    </span>
                    <span className="text-xs text-slate-500">
                      {CATEGORY_KO[p.category]}
                    </span>
                    <span className="inline-flex items-center gap-0.5 rounded bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-700 dark:bg-rose-950/30 dark:text-rose-400">
                      ❤️ {Number(row.recommend_count).toLocaleString('ko-KR')}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        )}
      </section>

      {/* 카테고리 분포 — 간단 막대 */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">📊 카테고리 분포</h2>
        <div className="space-y-1">
          {catEntries.map(([cat, n]) => {
            const widthPct = (n / maxCat) * 100;
            return (
              <div key={cat} className="flex items-center gap-3 text-sm">
                <span className="w-28 shrink-0 text-slate-700 dark:text-slate-300">
                  {CATEGORY_KO[cat as keyof typeof CATEGORY_KO] ?? cat}
                </span>
                <div className="flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className={`h-2 rounded-full ${CATEGORY_BORDER[cat as keyof typeof CATEGORY_BORDER]?.replace('border-l-', 'bg-') ?? 'bg-slate-400'}`}
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
                <span className="w-10 shrink-0 text-right text-xs text-slate-500">
                  {n}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 메타 */}
      <section className="rounded-lg border bg-slate-50 p-4 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400">
        📂 출처 {sources.size}곳에서 큐레이션 ·{' '}
        <Link href="/sources" className="underline">출처 모음 보기 →</Link>
      </section>
    </article>
  );
}
