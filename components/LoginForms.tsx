'use client';

import { createClient } from '@/lib/supabase/client';

export function LoginForm() {
  async function onClick() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-[#FEE500] px-3 py-1 text-xs font-semibold text-[#191919] hover:opacity-90"
    >
      카카오 로그인
    </button>
  );
}

export function LogoutForm({ name }: { name: string }) {
  async function onClick() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/';
  }
  return (
    <button
      onClick={onClick}
      className="text-xs text-slate-600 hover:underline"
    >
      {name} · 로그아웃
    </button>
  );
}
