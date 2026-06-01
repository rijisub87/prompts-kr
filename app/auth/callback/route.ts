// OAuth 콜백 — Supabase가 카카오 인증 끝나면 ?code=... 로 여기에 리다이렉트.
// code를 세션으로 교환하고 쿠키 설정 후 next(또는 /)로 리다이렉트.
// 회원가입·로그인 모두 이 라우트 하나로 처리 (Supabase는 신규/기존 구분 없이 동일 흐름).

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (!code) {
    return NextResponse.redirect(`${origin}/?error=missing_code`);
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        // Route Handler는 쿠키 쓰기 OK — try/catch 불필요. 쓰기 실패면 노출되는 게 안전.
        setAll(cookiesToSet) {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        },
      },
    },
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(`${origin}/?error=${encodeURIComponent(error.message)}`);
  }

  // Vercel은 프록시 뒤에 있어 origin이 *.vercel.app 내부 호스트가 될 수 있음.
  // x-forwarded-host로 사용자 브라우저가 본 실제 호스트를 가져와 정확히 그쪽으로 리다이렉트.
  const forwardedHost = request.headers.get('x-forwarded-host');
  const isLocal = process.env.NODE_ENV === 'development';
  const target = isLocal
    ? `${origin}${next}`
    : forwardedHost
      ? `https://${forwardedHost}${next}`
      : `${origin}${next}`;
  return NextResponse.redirect(target);
}
