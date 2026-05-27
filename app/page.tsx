import Link from 'next/link';
import { getPromptsByCategory, CATEGORIES, CATEGORY_KO } from '@/lib/prompts';

export default function Home() {
  const grouped = getPromptsByCategory();
  const totalCount = CATEGORIES.reduce((sum, c) => sum + grouped[c].length, 0);

  return (
    <div className="space-y-10">
      <section className="text-center">
        <h1 className="text-3xl font-bold md:text-4xl">한국 사용자를 위한 AI 프롬프트</h1>
        <p className="mt-3 text-base text-slate-600 md:text-lg">
          Claude · ChatGPT · Gemini — 검증된 출처에서 큐레이션
        </p>
        <p className="mt-2 text-sm text-slate-500">현재 {totalCount}개 프롬프트</p>
      </section>

      {CATEGORIES.map(c => {
        const list = grouped[c];
        if (list.length === 0) return null;
        return (
          <section key={c}>
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
