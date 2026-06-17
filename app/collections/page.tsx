import type { Metadata } from 'next';
import Link from 'next/link';
import { COLLECTIONS } from '@/lib/collections';
import { getPromptBySlug } from '@/lib/prompts';

export const metadata: Metadata = {
  title: '프롬프트 모음 — 상황별 큐레이션',
  description: '자소서 시즌, 직장인 문서, 주식 투자, 코딩 에이전트, 학습 등 목적별로 묶은 AI 프롬프트 모음.',
  alternates: { canonical: '/collections' },
};

export default function CollectionsPage() {
  return (
    <article className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">프롬프트 모음</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          상황·목적별로 골라 담은 큐레이션. 한 번에 필요한 프롬프트를 묶어서.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {COLLECTIONS.map(c => {
          const count = c.promptSlugs.filter(s => getPromptBySlug(s)).length;
          return (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="block rounded-lg border-2 border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-emerald-500"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="text-base font-bold">{c.title}</h2>
                <span className="shrink-0 text-xs text-slate-400">{count}개</span>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{c.description}</p>
            </Link>
          );
        })}
      </div>
    </article>
  );
}
