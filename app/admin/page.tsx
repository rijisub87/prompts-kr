import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPrompts, CATEGORY_KO } from '@/lib/prompts';
import { getAllGuides } from '@/lib/guides';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: '관리자',
  robots: { index: false, follow: false },
};

export const revalidate = 0;

// 관리자 이메일 — Vercel 환경변수 ADMIN_EMAILS (쉼표 구분)에서 읽음.
function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(Boolean);
}

const TEST_LABELS: Record<string, string> = {
  'test-mbti': '일하는 나의 MBTI',
  'test-skill': 'AI 활용 직무 테스트',
  'test-saju': '오늘의 사주',
  'test-market': '데일리 세계 경제',
  'test-lotto': 'AI 로또',
  'test-love': '연애 궁합',
  'test-food': '오늘 뭐먹지',
  'test-fake-friend': '가짜 남사친',
};

type Stat = { slug: string; view_count: number; recommend_count: number };
type Rec = { user_id: string };

export default async function AdminPage() {
  let email: string | null = null;
  let stats: Stat[] = [];
  let recs: Rec[] = [];

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    email = user?.email ?? null;

    const allowed = adminEmails();
    const isAdmin = !!email && allowed.includes(email.toLowerCase());
    if (!isAdmin) {
      return (
        <div className="mx-auto max-w-md py-16 text-center">
          <h1 className="text-2xl font-bold">관리자 전용</h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            {email
              ? '이 계정은 관리자 권한이 없습니다.'
              : '로그인 후 관리자 계정으로 접근해주세요.'}
          </p>
          <Link href="/" className="mt-6 inline-block rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
            홈으로
          </Link>
        </div>
      );
    }

    const [statsRes, recsRes] = await Promise.all([
      supabase.from('prompt_stats').select('slug, view_count, recommend_count'),
      supabase.from('recommendations').select('user_id'),
    ]);
    stats = (statsRes.data ?? []) as Stat[];
    recs = (recsRes.data ?? []) as Rec[];
  } catch {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <h1 className="text-2xl font-bold">관리자</h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          데이터를 불러오지 못했어요. (Supabase 설정 확인)
        </p>
      </div>
    );
  }

  const prompts = getAllPrompts();
  const guides = getAllGuides();

  // 프롬프트(콘텐츠) 통계 — test-* 제외
  const promptStats = stats.filter(s => !s.slug.startsWith('test-'));
  const totalViews = promptStats.reduce((s, r) => s + Number(r.view_count ?? 0), 0);
  const totalRecs = promptStats.reduce((s, r) => s + Number(r.recommend_count ?? 0), 0);

  // 생활AI 시작 수 (test-* 슬러그의 view_count)
  const testStats = stats
    .filter(s => s.slug.startsWith('test-'))
    .map(s => ({ slug: s.slug, count: Number(s.view_count ?? 0) }))
    .sort((a, b) => b.count - a.count);
  const totalTestStarts = testStats.reduce((s, r) => s + r.count, 0);

  // 추천 참여 회원수(고유 user_id) — 가입·활동 회원 프록시
  const distinctRecUsers = new Set(recs.map(r => r.user_id)).size;
  const totalRecActions = recs.length;

  // TOP 프롬프트
  const topViews = [...promptStats].sort((a, b) => Number(b.view_count) - Number(a.view_count)).slice(0, 10);

  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">관리자 대시보드</h1>
        <p className="mt-1 text-sm text-slate-500">{email} · 실시간</p>
      </header>

      {/* 요약 카드 */}
      <section className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {[
          ['프롬프트', prompts.length],
          ['가이드', guides.length],
          ['총 조회', totalViews],
          ['총 추천', totalRecs],
          ['추천 참여 회원', distinctRecUsers],
          ['생활AI 시작', totalTestStarts],
        ].map(([label, val]) => (
          <div key={label} className="rounded-lg border bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="text-xs text-slate-500">{label}</div>
            <div className="mt-1 text-2xl font-bold">{Number(val).toLocaleString('ko-KR')}</div>
          </div>
        ))}
      </section>

      {/* 생활AI 시작 수 */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">생활AI 시작 수</h2>
        <div className="space-y-1">
          {testStats.length === 0 ? (
            <p className="text-sm text-slate-500">데이터 없음</p>
          ) : testStats.map(t => (
            <div key={t.slug} className="flex items-center justify-between rounded border bg-white px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-900">
              <span>{TEST_LABELS[t.slug] ?? t.slug}</span>
              <span className="font-semibold">{t.count.toLocaleString('ko-KR')}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 회원 활동 */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">회원 활동</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="text-xs text-slate-500">추천한 고유 회원 수</div>
            <div className="mt-1 text-2xl font-bold">{distinctRecUsers.toLocaleString('ko-KR')}</div>
            <p className="mt-1 text-xs text-slate-400">로그인 후 추천을 누른 회원 (활동 회원 프록시)</p>
          </div>
          <div className="rounded-lg border bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="text-xs text-slate-500">총 추천 횟수</div>
            <div className="mt-1 text-2xl font-bold">{totalRecActions.toLocaleString('ko-KR')}</div>
          </div>
        </div>
        <p className="mt-2 text-xs text-slate-400">
          전체 가입자 수·이메일 등 회원 명부는 Supabase 서비스 롤 키가 필요해 현재 미표시입니다.
        </p>
      </section>

      {/* TOP 프롬프트 */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">가장 많이 본 프롬프트 TOP 10</h2>
        <ol className="space-y-1">
          {topViews.map((s, i) => {
            const p = prompts.find(x => x.slug === s.slug);
            return (
              <li key={s.slug} className="flex items-center gap-3 rounded border bg-white px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-900">
                <span className="w-5 shrink-0 text-center text-slate-400">{i + 1}</span>
                <span className="flex-1 line-clamp-1">{p?.title ?? s.slug}</span>
                {p && <span className="text-xs text-slate-500">{CATEGORY_KO[p.category]}</span>}
                <span className="font-semibold">{Number(s.view_count).toLocaleString('ko-KR')}</span>
              </li>
            );
          })}
        </ol>
      </section>
    </article>
  );
}
