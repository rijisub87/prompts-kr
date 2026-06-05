import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllGuides, getGuideBySlug } from '@/lib/guides';
import { getPromptsByCategory, CATEGORY_KO } from '@/lib/prompts';

export function generateStaticParams() {
  return getAllGuides().map(g => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuideBySlug(slug);
  if (!g) return {};
  return { title: g.title, description: g.summary };
}

export default async function GuidePage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const grouped = getPromptsByCategory();
  const relatedPrompts = grouped[guide.category] ?? [];

  return (
    <article className="space-y-8">
      <header>
        <Link href="/guides" className="text-xs text-slate-500 hover:underline">← 가이드 목록</Link>
        <div className="mt-2 text-xs text-emerald-700 dark:text-emerald-400">{CATEGORY_KO[guide.category]}</div>
        <h1 className="mt-1 text-3xl font-bold">{guide.title}</h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400">{guide.summary}</p>
      </header>

      <section
        className="prose prose-sm max-w-none prose-headings:font-bold prose-h2:mt-8 prose-h2:text-xl prose-h3:mt-4 prose-h3:text-lg prose-pre:bg-slate-900 prose-pre:text-slate-100 dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: guide.bodyHtml }}
      />

      {relatedPrompts.length > 0 && (
        <section className="rounded border-2 border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-800 dark:bg-emerald-950/30">
          <h2 className="mb-3 text-lg font-bold">
            📋 관련 프롬프트 — {CATEGORY_KO[guide.category]}
          </h2>
          <ul className="space-y-2">
            {relatedPrompts.map(p => (
              <li key={p.slug}>
                <Link
                  href={`/p/${p.slug}`}
                  className="block rounded bg-white px-3 py-2 text-sm hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800"
                >
                  <span className="font-medium">{p.title}</span>
                  <span className="ml-2 text-xs text-slate-500">— {p.source.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
