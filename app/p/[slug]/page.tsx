import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPrompts, getPromptBySlug, CATEGORY_KO } from '@/lib/prompts';
import PromptDetail from '@/components/PromptDetail';
import RecommendButton from '@/components/RecommendButton';

export function generateStaticParams() {
  return getAllPrompts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);
  if (!prompt) return {};
  return { title: prompt.title };
}

export default async function PromptPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);
  if (!prompt) notFound();

  return (
    <article className="space-y-6">
      <header>
        <Link href="/" className="text-xs text-slate-500 hover:underline">← 전체</Link>
        <h1 className="mt-2 text-2xl font-bold">{prompt.title}</h1>
        <div className="mt-3 flex flex-wrap gap-1 text-xs">
          <span className="rounded bg-slate-900 px-2 py-0.5 text-white dark:bg-slate-100 dark:text-slate-900">
            {CATEGORY_KO[prompt.category]}
          </span>
          {prompt.platform.map(pl => (
            <span key={pl} className="rounded bg-slate-100 px-2 py-0.5 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {pl}
            </span>
          ))}
          <span className="rounded bg-amber-50 px-2 py-0.5 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
            {prompt.language}
          </span>
          {prompt.formality && (
            <span className="rounded bg-blue-50 px-2 py-0.5 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
              {prompt.formality}
            </span>
          )}
          {prompt.charLimit && (
            <span className="rounded bg-emerald-50 px-2 py-0.5 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
              {prompt.charLimit}자
            </span>
          )}
        </div>
      </header>

      <PromptDetail prompt={prompt} />

      <div className="flex justify-center">
        <RecommendButton slug={prompt.slug} />
      </div>

      {prompt.tipHtml && (
        <section className="rounded border bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
          <h3 className="mb-2 text-sm font-semibold text-amber-900 dark:text-amber-200">💡 사용 팁</h3>
          <div
            className="prose prose-sm max-w-none text-sm text-amber-900 dark:text-amber-100"
            dangerouslySetInnerHTML={{ __html: prompt.tipHtml }}
          />
        </section>
      )}

      <section className="rounded border bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-sm font-semibold">출처</h3>
        <p className="mt-1 text-sm">
          <a
            href={prompt.source.url}
            target="_blank"
            rel="noreferrer"
            className="text-emerald-700 hover:underline dark:text-emerald-400"
          >
            {prompt.source.name}
          </a>
          {prompt.source.author && (
            <span className="text-slate-500"> — {prompt.source.author}</span>
          )}
        </p>
      </section>
    </article>
  );
}
