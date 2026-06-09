import type { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { RESULTS } from '@/lib/mbti-test';

export const metadata: Metadata = {
  title: '내 MBTI 결과 기록',
  description: '과거 일할 때의 MBTI 결과 모음',
};

// 서버 컴포넌트 — 로그인 사용자의 과거 결과 일자·유형 목록.
export default async function MBTIHistoryPage() {
  let userId: string | null = null;
  type Row = { id: string; type: string; taken_at: string };
  let rows: Row[] = [];

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    userId = user?.id ?? null;
    if (userId) {
      const { data } = await supabase
        .from('mbti_results')
        .select('id, type, taken_at')
        .eq('user_id', userId)
        .order('taken_at', { ascending: false })
        .limit(50);
      rows = (data ?? []) as Row[];
    }
  } catch {
    // Supabase env 미설정 — 비로그인 화면과 동일하게 처리
  }

  // 비로그인
  if (!userId) {
    return (
      <article className="mx-auto max-w-xl space-y-4 py-10 text-center">
        <h1 className="text-2xl font-bold">내 MBTI 결과 기록</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          로그인하면 과거에 해본 결과를 일자별로 모아 다시 볼 수 있어요.
        </p>
        <Link
          href="/test"
          className="inline-block rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          생활AI 하러 가기
        </Link>
      </article>
    );
  }

  // 로그인 + 결과 없음
  if (rows.length === 0) {
    return (
      <article className="mx-auto max-w-xl space-y-4 py-10 text-center">
        <h1 className="text-2xl font-bold">내 MBTI 결과 기록</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          아직 저장된 결과가 없어요. 한 번 해보세요.
        </p>
        <Link
          href="/test"
          className="inline-block rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          생활AI 하러 가기
        </Link>
      </article>
    );
  }

  // 결과 있음 — 일자 + 유형 + 별명 + 결과 페이지 링크
  return (
    <article className="mx-auto max-w-2xl space-y-4 py-8">
      <header>
        <h1 className="text-2xl font-bold md:text-3xl">내 MBTI 결과 기록</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          최근 {rows.length}개 · 일할 때의 MBTI 결과 모음
        </p>
      </header>

      <ul className="space-y-2">
        {rows.map(r => {
          const meta = RESULTS[r.type];
          const date = new Date(r.taken_at).toISOString().slice(0, 10);
          return (
            <li key={r.id}>
              <Link
                href={`/test/${r.type.toLowerCase()}`}
                className="block rounded-lg border bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div className="flex items-baseline gap-3">
                    <span className="text-xl font-bold text-emerald-700 dark:text-emerald-400">
                      {r.type}
                    </span>
                    {meta?.nickname && (
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {meta.nickname}
                      </span>
                    )}
                  </div>
                  <time className="shrink-0 text-xs text-slate-500">{date}</time>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="pt-2 text-center">
        <Link href="/test" className="text-sm text-slate-500 hover:underline">
          다시 해보기 →
        </Link>
      </div>
    </article>
  );
}
