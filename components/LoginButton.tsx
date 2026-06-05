// 헤더 로그인/로그아웃 영역 (Server Component → 세션 SSR로 즉시 반영).
// try/catch는 user 추출까지만, JSX는 바깥에서 렌더 (React가 렌더 에러를 잡을 수 있게).
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';
import { LoginForm, LogoutForm } from './LoginForms';

export default async function LoginButton() {
  let user: User | null = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data?.user ?? null;
  } catch {
    // Supabase env 미설정 등 — 로그인 자체 비활성. 버튼 숨김.
    return null;
  }

  if (!user) return <LoginForm />;

  // user_metadata는 OAuth 제공자가 채움 (Kakao: nickname, name, etc.)
  const meta = user.user_metadata as Record<string, unknown> | undefined;
  const name =
    (typeof meta?.name === 'string' && meta.name) ||
    (typeof meta?.preferred_username === 'string' && meta.preferred_username) ||
    (typeof meta?.full_name === 'string' && meta.full_name) ||
    '로그인됨';
  return <LogoutForm name={name} />;
}
