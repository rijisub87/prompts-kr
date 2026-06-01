// 헤더 로그인/로그아웃 영역 (Server Component → 세션 SSR로 즉시 반영).
import { createClient } from '@/lib/supabase/server';
import { LoginForm, LogoutForm } from './LoginForms';

export default async function LoginButton() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const user = data?.user;
    if (user) {
      // user_metadata는 OAuth 제공자가 채움 (Kakao: nickname, name, etc.)
      const meta = user.user_metadata as Record<string, unknown> | undefined;
      const name =
        (typeof meta?.name === 'string' && meta.name) ||
        (typeof meta?.preferred_username === 'string' && meta.preferred_username) ||
        (typeof meta?.full_name === 'string' && meta.full_name) ||
        '로그인됨';
      return <LogoutForm name={name} />;
    }
    return <LoginForm />;
  } catch {
    return null;
  }
}
