import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllPrompts, getPromptBySlug, getPromptsByCategory,
  CATEGORY_KO, CATEGORY_BORDER,
} from '@/lib/prompts';
import PromptDetail from '@/components/PromptDetail';
import RecommendButton from '@/components/RecommendButton';
import BookmarkButton from '@/components/BookmarkButton';
import AdSlot from '@/components/AdSlot';

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

  const desc = (prompt.tipHtml ? stripHtml(prompt.tipHtml) : prompt.body)
    .slice(0, 155)
    .trim();
  const url = `/p/${prompt.slug}`;
  const ko = CATEGORY_KO[prompt.category];

  return {
    title: prompt.title,
    description: desc || `${ko} AI 프롬프트 — ${prompt.title}`,
    keywords: [prompt.title, `${ko} 프롬프트`, ...prompt.platform, 'AI 프롬프트'],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: `${prompt.title} · 프롬프트 한국`,
      description: desc,
      url,
    },
    twitter: { card: 'summary_large_image', title: prompt.title, description: desc },
  };
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

export default async function PromptPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);
  if (!prompt) notFound();

  // 같은 카테고리 다른 프롬프트 — 최대 4개 (현재 제외)
  const grouped = getPromptsByCategory();
  const related = (grouped[prompt.category] ?? [])
    .filter(p => p.slug !== prompt.slug)
    .slice(0, 4);

  // JSON-LD 구조화 데이터 — 구글 rich snippet
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: prompt.title,
    description: prompt.tipHtml
      ? stripHtml(prompt.tipHtml).slice(0, 160)
      : prompt.body.slice(0, 160),
    inLanguage: 'ko-KR',
    author: prompt.source.author
      ? { '@type': 'Person', name: prompt.source.author }
      : { '@type': 'Organization', name: prompt.source.name, url: prompt.source.url },
    publisher: {
      '@type': 'Organization',
      name: 'Prompts-KR',
      url: 'https://prompts-kr.vercel.app',
    },
    datePublished: prompt.addedAt ? String(prompt.addedAt) : undefined,
    keywords: [
      CATEGORY_KO[prompt.category],
      ...prompt.platform,
      prompt.language,
      'AI 프롬프트',
    ].join(', '),
    isBasedOn: prompt.source.url || undefined,
    mainEntityOfPage: `https://prompts-kr.vercel.app/p/${prompt.slug}`,
  };

  return (
    <article className="space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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

      <div className="flex flex-wrap items-center justify-center gap-3">
        <RecommendButton slug={prompt.slug} />
        <BookmarkButton slug={prompt.slug} />
      </div>

      {/* 추천·즐겨찾기 아래 광고 */}
      <AdSlot />

      {prompt.tipHtml && (
        <section className="rounded border bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
          <h3 className="mb-2 text-sm font-semibold text-amber-900 dark:text-amber-200">사용 팁</h3>
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

      {related.length > 0 && (
        <section>
          <h3 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
            같은 카테고리 — {CATEGORY_KO[prompt.category]}
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {related.map(p => (
              <Link
                key={p.slug}
                href={`/p/${p.slug}`}
                className={`block rounded border border-l-4 bg-white p-3 text-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 ${CATEGORY_BORDER[p.category]}`}
              >
                <div className="line-clamp-1 font-medium">{p.title}</div>
                <div className="mt-1 line-clamp-1 text-xs text-slate-500">
                  출처: {p.source.name}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
