import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  CATEGORIES, CATEGORY_KO, CATEGORY_BORDER, CATEGORY_TAGLINE,
  getPromptsByCategory, sortByNewest, isNew, type Category,
} from '@/lib/prompts';
import { createClient } from '@/lib/supabase/server';
import PromptStats from '@/components/PromptStats';

export const revalidate = 60;

type SortKey = 'newest' | 'popular' | 'recommended';

export function generateStaticParams() {
  return CATEGORIES.map(c => ({ category: c }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!CATEGORIES.includes(category as Category)) return {};
  const cat = category as Category;
  const ko = CATEGORY_KO[cat];
  const tagline = CATEGORY_TAGLINE[cat];
  return {
    title: `${ko} 프롬프트 모음`,
    description: tagline,
    alternates: { canonical: `/c/${cat}` },
    openGraph: {
      title: `${ko} 프롬프트 — 프롬프트 한국`,
      description: tagline,
      url: `/c/${cat}`,
      type: 'website',
    },
  };
}

type Counts = Record<string, { views: number; recommends: number }>;

async function fetchCounts(slugs: string[]): Promise<Counts> {
  if (slugs.length === 0) return {};
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('prompt_stats')
      .select('slug, view_count, recommend_count')
      .in('slug', slugs);
    const out: Counts = {};
    for (const row of data ?? []) {
      out[row.slug as string] = {
        views: Number(row.view_count),
        recommends: Number(row.recommend_count),
      };
    }
    return out;
  } catch {
    return {};
  }
}

function formatDate(v: unknown): string {
  if (!v) return '';
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v);
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const { category } = await params;
  const { sort } = await searchParams;
  if (!CATEGORIES.includes(category as Category)) notFound();
  const cat = category as Category;

  const grouped = getPromptsByCategory();
  const list = grouped[cat];

  const counts = await fetchCounts(list.map(p => p.slug));

  const sortKey: SortKey =
    sort === 'popular' ? 'popular' :
    sort === 'recommended' ? 'recommended' : 'newest';

  const sorted = (() => {
    if (sortKey === 'popular') {
      return [...list].sort(
        (a, b) => (counts[b.slug]?.views ?? 0) - (counts[a.slug]?.views ?? 0)
      );
    }
    if (sortKey === 'recommended') {
      return [...list].sort(
        (a, b) => (counts[b.slug]?.recommends ?? 0) - (counts[a.slug]?.recommends ?? 0)
      );
    }
    return sortByNewest(list);
  })();

  // 다른 카테고리 — 현재 제외, 콘텐츠 있는 것만
  const otherCats = CATEGORIES.filter(c => c !== cat && grouped[c].length > 0);

  return (
    <article className="space-y-6">
      <header className={`rounded-lg border border-l-4 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 ${CATEGORY_BORDER[cat]}`}>
        <Link href="/" className="text-xs text-slate-500 hover:underline">← 전체</Link>
        <h1 className="mt-2 text-2xl font-bold md:text-3xl">
          {CATEGORY_KO[cat]} <span className="text-slate-400">{list.length}</span>
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          {CATEGORY_TAGLINE[cat]}
        </p>
      </header>

      {list.length === 0 ? (
        <div className="rounded-lg border bg-white p-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900">
          아직 이 카테고리에 등록된 프롬프트가 없어요.
        </div>
      ) : (
        <>
          {/* 정렬 탭 */}
          <div className="flex flex-wrap gap-2 text-xs">
            {([
              ['newest', '최신순'],
              ['popular', '조회순'],
              ['recommended', '추천순'],
            ] as const).map(([k, label]) => {
              const active = sortKey === k;
              const href = k === 'newest' ? `/c/${cat}` : `/c/${cat}?sort=${k}`;
              return (
                <Link
                  key={k}
                  href={href}
                  className={
                    active
                      ? 'rounded-full bg-slate-900 px-3 py-1 font-semibold text-white dark:bg-slate-100 dark:text-slate-900'
                      : 'rounded-full border bg-white px-3 py-1 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                  }
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* 카드 그리드 */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map(p => (
              <Link
                key={p.slug}
                href={`/p/${p.slug}`}
                className={`block rounded border border-l-4 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 ${CATEGORY_BORDER[p.category]}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold">{p.title}</h3>
                  {isNew(p.addedAt) && (
                    <span className="shrink-0 rounded bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">
                      NEW
                    </span>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap gap-1 text-xs">
                  {p.platform.map(pl => (
                    <span key={pl} className="rounded bg-slate-100 px-2 py-0.5 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {pl}
                    </span>
                  ))}
                  <span className="rounded bg-amber-50 px-2 py-0.5 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
                    {p.language}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2 text-xs text-slate-500">
                  <span className="line-clamp-1">
                    {p.addedAt && <span className="mr-2">{formatDate(p.addedAt)}</span>}
                    {p.source.name}
                  </span>
                  <PromptStats
                    views={counts[p.slug]?.views ?? 0}
                    recommends={counts[p.slug]?.recommends ?? 0}
                  />
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* 다른 카테고리 */}
      {otherCats.length > 0 && (
        <section className="mt-10 rounded-lg border bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/50">
          <h2 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
            다른 카테고리
          </h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {otherCats.map(c => (
              <Link
                key={c}
                href={`/c/${c}`}
                className="rounded-full border bg-white px-3 py-1 font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                {CATEGORY_KO[c]}
                <span className="ml-1 text-slate-400">{grouped[c].length}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
