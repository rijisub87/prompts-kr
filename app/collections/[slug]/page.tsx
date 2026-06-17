import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { COLLECTIONS, getCollection } from '@/lib/collections';
import { getPromptBySlug, CATEGORY_KO, CATEGORY_BORDER } from '@/lib/prompts';

export function generateStaticParams() {
  return COLLECTIONS.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: `/collections/${c.slug}` },
    openGraph: { title: `${c.title} · 프롬프트 한국`, description: c.description, url: `/collections/${c.slug}`, type: 'website' },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) notFound();

  const prompts = c.promptSlugs.map(s => getPromptBySlug(s)).filter(Boolean);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: c.title,
    description: c.description,
    numberOfItems: prompts.length,
    itemListElement: prompts.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://prompts-kr.vercel.app/p/${p!.slug}`,
      name: p!.title,
    })),
  };

  return (
    <article className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header>
        <Link href="/collections" className="text-xs text-slate-500 hover:underline">← 전체 모음</Link>
        <h1 className="mt-2 text-2xl font-bold md:text-3xl">{c.title}</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{c.description}</p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {prompts.map(p => (
          <Link
            key={p!.slug}
            href={`/p/${p!.slug}`}
            className={`block rounded border border-l-4 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 ${CATEGORY_BORDER[p!.category]}`}
          >
            <div className="text-xs text-slate-500">{CATEGORY_KO[p!.category]}</div>
            <h2 className="mt-1 text-sm font-semibold">{p!.title}</h2>
            <p className="mt-1 line-clamp-1 text-xs text-slate-500">출처: {p!.source.name}</p>
          </Link>
        ))}
      </div>

      <section className="rounded-lg border bg-slate-50 p-4 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400">
        다른 주제도 보기 ·{' '}
        <Link href="/collections" className="underline">전체 프롬프트 모음 →</Link>
      </section>
    </article>
  );
}
