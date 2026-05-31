import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ALL_TYPES, RESULTS } from '@/lib/mbti-test';
import KakaoShareButton from '@/components/KakaoShareButton';

export function generateStaticParams() {
  return ALL_TYPES.map(t => ({ type: t.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const result = RESULTS[type.toUpperCase()];
  if (!result) return {};
  return {
    title: `${result.type} ${result.nickname} · AI 사용 성향`,
    description: result.description,
  };
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const upper = type.toUpperCase();
  const result = RESULTS[upper];
  if (!result) notFound();

  return (
    <article className="mx-auto max-w-2xl space-y-6 py-8">
      <header className="text-center">
        <div className="text-xs uppercase tracking-wider text-slate-500">당신의 유형</div>
        <h1 className="mt-2 text-5xl font-bold tracking-tight md:text-6xl">
          {result.type}
        </h1>
        <p className="mt-3 text-xl font-semibold text-emerald-700 md:text-2xl">
          {result.nickname}
        </p>
      </header>

      <section className="rounded-lg border bg-white p-6">
        <p className="text-base leading-relaxed text-slate-700">
          {result.description}
        </p>
      </section>

      <div className="grid gap-3 md:grid-cols-3">
        <section className="rounded-lg border-l-4 border-emerald-500 bg-emerald-50 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
            🤖 AI 스타일
          </div>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-800">
            {result.aiStyle.map((line, i) => (
              <li key={i} className="flex gap-1.5">
                <span className="text-emerald-500" aria-hidden>•</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-800">
            💼 업무 특징
          </div>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-800">
            {result.workTrait.map((line, i) => (
              <li key={i} className="flex gap-1.5">
                <span className="text-blue-500" aria-hidden>•</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-lg border-l-4 border-rose-500 bg-rose-50 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-rose-800">
            💗 연애 특징
          </div>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-800">
            {result.loveTrait.map((line, i) => (
              <li key={i} className="flex gap-1.5">
                <span className="text-rose-500" aria-hidden>•</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <KakaoShareButton
          title={`${result.type} — ${result.nickname}`}
          description={result.description}
          path={`/test/${type.toLowerCase()}`}
        />
        <Link
          href="/test"
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-100"
        >
          다시 하기
        </Link>
        <Link
          href="/"
          className="rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-100"
        >
          프롬프트 둘러보기 →
        </Link>
      </div>
    </article>
  );
}
