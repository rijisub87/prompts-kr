// 헤더에 표시되는 카카오 로그인/로그아웃 버튼 (Server Component).
import type { Session } from 'next-auth';
import { auth, signIn, signOut } from '@/auth';

export default async function LoginButton() {
  let session: Session | null = null;
  try {
    session = await auth();
  } catch {
    // AUTH_SECRET 미설정 등 — 로그인 자체가 비활성. 버튼 숨김.
    return null;
  }

  if (session?.user) {
    const name = session.user.name || '로그인됨';
    return (
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/' });
        }}
      >
        <button type="submit" className="text-xs text-slate-600 hover:underline">
          {name} · 로그아웃
        </button>
      </form>
    );
  }
  return (
    <form
      action={async () => {
        'use server';
        await signIn('kakao', { redirectTo: '/' });
      }}
    >
      <button
        type="submit"
        className="rounded-full bg-[#FEE500] px-3 py-1 text-xs font-semibold text-[#191919] hover:opacity-90"
      >
        카카오 로그인
      </button>
    </form>
  );
}
