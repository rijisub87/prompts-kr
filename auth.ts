// NextAuth v5 (Auth.js) — Kakao OAuth.
// 필요한 env vars: AUTH_SECRET, AUTH_KAKAO_ID, AUTH_KAKAO_SECRET.
// (Vercel은 AUTH_TRUST_HOST·AUTH_URL 자동 설정)

import NextAuth from 'next-auth';
import Kakao from 'next-auth/providers/kakao';

declare module 'next-auth' {
  interface Session {
    userId?: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Kakao],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, account, profile }) {
      // 최초 로그인 시 사용자 ID를 토큰에 저장 (이후 호출엔 account=undefined)
      if (account && profile) {
        const id = (profile as Record<string, unknown>).id;
        if (id != null) {
          (token as Record<string, unknown>).userId = `${account.provider}:${id}`;
        }
      }
      return token;
    },
    async session({ session, token }) {
      const userId = (token as Record<string, unknown>).userId;
      if (typeof userId === 'string') session.userId = userId;
      return session;
    },
  },
});
