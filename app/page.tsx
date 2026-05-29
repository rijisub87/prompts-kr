import Link from 'next/link';
import {
  getAllPrompts, getPromptsByCategory, CATEGORIES, CATEGORY_KO,
  sortByNewest, isNew,
} from '@/lib/prompts';

const NEW_TOP_N = 3;

// addedAt이 YAML에서 Date로 파싱될 수 있어 안전한 문자열 표시 헬퍼.
function formatDate(v: unknown): string {
  if (!v) return '';
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v);
}

export default function Home() {
  const all = getAllPrompts();
  const grouped = getPromptsByCategory();
  const totalCount = CATEGORIES.reduce((sum, c) => sum + grouped[c].length, 0);
  const presentCategories = CATEGORIES.filter(c => grouped[c].length > 0);
  // 최신 3개 — addedAt 내림차순. 모두 같은 날이면 슬러그 알파벳 안정 정렬.
  const newest = sortByNewest(all).slice(0, NEW_TOP_N);

  return (
    <div className="space-y-10">
      <section className="text-center">
        <h1 className="text-3xl font-bold md:text-4xl">한국 사용자를 위한 AI 프롬프트</h1>
        <p className="mt-3 text-base text-slate-600 md:text-lg">
          Claude · ChatGPT · Gemini — 검증된 출처에서 큐레이션
        </p>
        <p className="mt-2 text-sm text-slate-500">현재 {totalCount}개 프롬프트</p>
      </section>

      {/* 카테고리 칩 네비 — 클릭 시 해당 섹션으로 스무스 스크롤 */}
      <nav className="sticky top-0 z-10 -mx-6 border-b bg-slate-50/95 px-6 py-3 backdrop-blur">
        <div className="flex flex-wrap gap-2">
          <a
            href="#newest"
            className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 hover:bg-emerald-100"
          >
            🆕 새로 추가
          </a>
          {presentCategories.map(c => (
            <a
              key={c}
              href={`#${c}`}
              className="rounded-full border bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
            >
              {CATEGORY_KO[c]}
              <span className="ml-1 text-slate-400">{grouped[c].length}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* 최신 3개 — addedAt 기준 */}
      <section id="newest" className="scroll-mt-20">
        <h2 className="mb-3 text-lg font-semibold">🆕 새로 추가된 프롬프트</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {newest.map(p => (
            <Link
              key={p.slug}
              href={`/p/${p.slug}`}
              className="block rounded border-2 border-emerald-200 bg-white p-4 transition hover:shadow"
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
                <span className="rounded bg-slate-900 px-2 py-0.5 text-white">
                  {CATEGORY_KO[p.category]}
                </span>
                {p.platform.map(pl => (
                  <span key={pl} className="rounded bg-slate-100 px-2 py-0.5 text-slate-700">
                    {pl}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {p.addedAt && <span className="mr-2">{formatDate(p.addedAt)}</span>}
                출처: {p.source.name}
              </p>
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
                  className="block rounded border bg-white p-4 transition hover:shadow"
                >
                  <h3 className="text-sm font-semibold">{p.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-1 text-xs">
                    {p.platform.map(pl => (
                      <span key={pl} className="rounded bg-slate-100 px-2 py-0.5 text-slate-700">
                        {pl}
                      </span>
                    ))}
                    <span className="rounded bg-amber-50 px-2 py-0.5 text-amber-800">
                      {p.language}
                    </span>
                    {p.formality && (
                      <span className="rounded bg-blue-50 px-2 py-0.5 text-blue-800">
                        {p.formality}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-slate-500">출처: {p.source.name}</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
