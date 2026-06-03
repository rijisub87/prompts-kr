import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import Link from 'next/link';
import SiteStats from '@/components/SiteStats';
import SearchBar from '@/components/SearchBar';
import LoginButton from '@/components/LoginButton';
import './globals.css';

// 한국 웹에 친숙하고 가독성 검증된 구글 공식 한국어 폰트.
// next/font/google이 자동으로 self-host + 최적화 (FOIT/FOUT 방지).
const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-kr',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://prompts-kr.vercel.app'),
  title: { default: '프롬프트 한국 — Claude · ChatGPT · Gemini AI 프롬프트', template: '%s · 프롬프트 한국' },
  description: '한국 사용자를 위한 AI 프롬프트 큐레이션. Claude · ChatGPT · Gemini 200+ 검증된 프롬프트 무료. 자소서·이메일·보고서·코딩·사주·MBTI 테스트까지.',
  keywords: ['AI 프롬프트', 'ChatGPT 프롬프트', 'Claude 프롬프트', 'Gemini 프롬프트', '프롬프트 엔지니어링', '한국어 AI', '자소서 AI', 'AI 사주', 'MBTI 테스트', '프롬프트 모음'],
  authors: [{ name: 'Prompts-KR' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://prompts-kr.vercel.app',
    siteName: '프롬프트 한국',
    title: '프롬프트 한국 — 한국 사용자를 위한 AI 프롬프트 큐레이션',
    description: 'Claude · ChatGPT · Gemini 검증된 출처에서 큐레이션. 200+ 프롬프트 무료. 자소서·이메일·코딩·사주·MBTI까지.',
    images: [
      { url: '/kakao-app-icon.png', width: 144, height: 144, alt: '프롬프트 한국' },
    ],
  },
  twitter: {
    card: 'summary',
    title: '프롬프트 한국',
    description: 'Claude · ChatGPT · Gemini AI 프롬프트 큐레이션. 200+ 프롬프트 무료.',
    images: ['/kakao-app-icon.png'],
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: {
    other: {
      'naver-site-verification': 'd06da1190987cdebe22469ec9c5285b7beda8b84',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className={`${notoSansKR.className} flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased`}>
        <header className="border-b bg-white">
          <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 p-4">
            <Link href="/" className="text-lg font-bold shrink-0">프롬프트 한국</Link>
            <div className="order-3 w-full sm:order-2 sm:w-auto sm:flex-1 sm:px-4">
              <SearchBar />
            </div>
            <div className="order-2 flex items-center gap-5 text-sm text-slate-700 shrink-0 sm:order-3">
              <Link href="/guides" className="hover:underline">가이드</Link>
              <Link href="/test" className="hover:underline">테스트</Link>
              <Link href="/platforms" className="hover:underline">비교</Link>
              <Link href="/glossary" className="hover:underline">용어집</Link>
              <Link href="/sources" className="hover:underline">출처</Link>
              <LoginButton />
            </div>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 p-6">{children}</main>
        <footer className="border-t bg-white py-6 text-center text-xs text-slate-500">
          <p>공개·신뢰도 높은 출처에서 큐레이션. 모든 프롬프트에 출처 표기.</p>
          <p className="mt-2">
            큐레이션·해설 © Prompts-KR ·{' '}
            <Link href="/license" className="hover:underline">CC BY-NC-SA 4.0</Link>
            {' · '}원본 프롬프트는 각 출처 라이선스 적용
          </p>
          <p className="mt-2">
            문의: <a href="mailto:rijisub@naver.com" className="text-emerald-700 hover:underline">rijisub@naver.com</a>
          </p>
          <p className="mt-2"><SiteStats /></p>
        </footer>
      </body>
    </html>
  );
}
