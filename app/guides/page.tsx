import Link from 'next/link';
import { getAllGuides } from '@/lib/guides';
import { CATEGORY_KO } from '@/lib/prompts';

export const metadata = { title: '가이드' };

export default function GuidesIndex() {
  const guides = getAllGuides();
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-bold">도메인 가이드</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          AI를 어떤 분야에 어떻게 쓸 것인가 — 한국 사용자 관점의 실전 가이드.
          각 가이드는 우리 갤러리의 해당 카테고리 프롬프트와 연결됩니다.
        </p>
      </header>
      {guides.length === 0 ? (
        <p className="text-sm text-slate-500">아직 게시된 가이드가 없습니다.</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {guides.map(g => (
            <li key={g.slug}>
              <Link
                href={`/guides/${g.slug}`}
                className="block rounded border bg-white p-4 transition hover:shadow dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="text-xs text-emerald-700 dark:text-emerald-400">{CATEGORY_KO[g.category]}</div>
                <h2 className="mt-1 text-base font-semibold">{g.title}</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{g.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
