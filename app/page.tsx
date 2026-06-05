import Link from 'next/link';
import {
  getAllPrompts, getPromptsByCategory, CATEGORIES, CATEGORY_KO, CATEGORY_BORDER,
  sortByNewest, isNew,
} from '@/lib/prompts';
import { getAllGuides } from '@/lib/guides';
import { createClient } from '@/lib/supabase/server';
import RecentlyViewed from '@/components/RecentlyViewed';
import { ButtonLink } from '@/components/Button';

// ISR — 60초마다 재생성. views/추천수가 1분 단위로 갱신됨.
export const revalidate = 60;

const NEW_TOP_N = 3;

// addedAt이 YAML에서 Date로 파싱될 수 있어 안전한 문자열 표시 헬퍼.
function formatDate(v: unknown): string {
  if (!v) return '';
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v);
}

type Counts = Record<string, { views: number; recommends: number }>;

async function fetchAllCounts(slugs: string[]): Promise<Counts> {
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

export default async function Home() {
  const all = getAllPrompts();
  const grouped = getPromptsByCategory();
  const totalCount = CATEGORIES.reduce((sum, c) => sum + grouped[c].length, 0);
  const presentCategories = CATEGORIES.filter(c => grouped[c].length > 0);
  // 최신 3개 — addedAt 내림차순. 모두 같은 날이면 슬러그 알파벳 안정 정렬.
  const newest = sortByNewest(all).slice(0, NEW_TOP_N);
  const guides = getAllGuides();
  const counts = await fetchAllCounts(all.map(p => p.slug));

  return (
    <div className="space-y-10">
      <section className="relative -mx-6 overflow-hidden border-b bg-gradient-to-br from-emerald-50 via-white to-purple-50 px-6 py-12 text-center dark:border-slate-800 dark:from-emerald-950/30 dark:via-slate-950 dark:to-purple-950/30">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          한국 사용자를 위한{' '}
          <span className="bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-purple-400">
            AI 프롬프트
          </span>
        </h1>
        <p className="mt-4 text-base text-slate-600 md:text-lg dark:text-slate-400">
          Claude · ChatGPT · Gemini — 검증된 출처에서 큐레이션
        </p>

        {/* 트러스트 시그널 */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="rounded-full bg-white px-3 py-1 font-semibold text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-200">
            🗂 프롬프트 {totalCount}+
          </span>
          <span className="rounded-full bg-white px-3 py-1 font-semibold text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-200">
            📖 가이드 {guides.length}
          </span>
          <span className="rounded-full bg-white px-3 py-1 font-semibold text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-200">
            🏷 카테고리 {presentCategories.length}
          </span>
        </div>

        {/* CTA */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="#newest" variant="dark" size="md">
            프롬프트 둘러보기
          </ButtonLink>
          <ButtonLink href="/test" variant="secondary" size="md">
            🔮 테스트 해보기
          </ButtonLink>
        </div>
      </section>

      {/* 카테고리 칩 네비 — 클릭 시 해당 섹션으로 스무스 스크롤 */}
      <nav className="sticky top-0 z-10 -mx-6 border-b bg-slate-50/95 px-6 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
        <div className="flex flex-wrap gap-2">
          <a
            href="#newest"
            className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-900/40"
          >
            🆕 새로 추가
          </a>
          {guides.length > 0 && (
            <Link
              href="/guides"
              className="rounded-full border border-purple-300 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-800 hover:bg-purple-100 dark:border-purple-700 dark:bg-purple-950/40 dark:text-purple-300 dark:hover:bg-purple-900/40"
            >
              📖 가이드 {guides.length}
            </Link>
          )}
          {presentCategories.map(c => (
            <a
              key={c}
              href={`#${c}`}
              className="rounded-full border bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {CATEGORY_KO[c]}
              <span className="ml-1 text-slate-400">{grouped[c].length}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* 가이드 진입 — 도메인 가이드 카드 */}
      {guides.length > 0 && (
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">📖 도메인 가이드</h2>
            <Link href="/guides" className="text-xs text-purple-700 hover:underline">
              전체 보기 →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {guides.slice(0, 3).map(g => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="block rounded border-2 border-purple-200 bg-white p-4 transition hover:shadow dark:border-purple-800 dark:bg-slate-900"
              >
                <div className="text-xs text-purple-700 dark:text-purple-400">{CATEGORY_KO[g.category]}</div>
                <h3 className="mt-1 text-sm font-semibold">{g.title}</h3>
                <p className="mt-2 text-xs text-slate-600 line-clamp-2 dark:text-slate-400">{g.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 최근 본 — 클라이언트 localStorage 기반. 첫 방문자엔 안 보임 */}
      <RecentlyViewed />

      {/* 최신 3개 — addedAt 기준 */}
      <section id="newest" className="scroll-mt-20">
        <h2 className="mb-3 text-lg font-semibold">🆕 새로 추가된 프롬프트</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {newest.map(p => (
            <Link
              key={p.slug}
              href={`/p/${p.slug}`}
              className={`block rounded border border-l-4 bg-white p-4 transition hover:shadow dark:border-slate-800 dark:bg-slate-900 ${CATEGORY_BORDER[p.category]}`}
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
                <span className="rounded bg-slate-900 px-2 py-0.5 text-white dark:bg-slate-100 dark:text-slate-900">
                  {CATEGORY_KO[p.category]}
                </span>
                {p.platform.map(pl => (
                  <span key={pl} className="rounded bg-slate-100 px-2 py-0.5 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {pl}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                <span>
                  {p.addedAt && <span className="mr-2">{formatDate(p.addedAt)}</span>}
                  {p.source.name}
                </span>
                <span className="shrink-0 text-slate-400">
                  👁️ {counts[p.slug]?.views ?? 0} · ❤️ {counts[p.slug]?.recommends ?? 0}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {presentCategories.map(c => {
        const list = grouped[c];
        return (
          <section key={c} id={c} className="scroll-mt-20">
            <h2 className="mb-3 text-lg font-semibold">{CATEGORY_KO[c]}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {list.map(p => (
                <Link
                  key={p.slug}
                  href={`/p/${p.slug}`}
                  className={`block rounded border border-l-4 bg-white p-4 transition hover:shadow dark:border-slate-800 dark:bg-slate-900 ${CATEGORY_BORDER[p.category]}`}
                >
                  <h3 className="text-sm font-semibold">{p.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-1 text-xs">
                    {p.platform.map(pl => (
                      <span key={pl} className="rounded bg-slate-100 px-2 py-0.5 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {pl}
                      </span>
                    ))}
                    <span className="rounded bg-amber-50 px-2 py-0.5 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
                      {p.language}
                    </span>
                    {p.formality && (
                      <span className="rounded bg-blue-50 px-2 py-0.5 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
                        {p.formality}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                    <span>출처: {p.source.name}</span>
                    <span className="shrink-0 text-slate-400">
                      👁️ {counts[p.slug]?.views ?? 0} · ❤️ {counts[p.slug]?.recommends ?? 0}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
