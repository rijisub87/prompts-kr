import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import Link from 'next/link';
import SiteStats from '@/components/SiteStats';
import SearchBar from '@/components/SearchBar';
import LoginButton from '@/components/LoginButton';
import ThemeToggle from '@/components/ThemeToggle';
import './globals.css';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-kr',
});

// FOUC 방지 — React 하이드레이션 전에 .dark 클래스를 미리 붙임.
// localStorage 우선, 없으면 OS 설정 따라감.
const themeInitScript = `
(function() {
  try {
    var t = localStorage.getItem('theme');
    var isDark = t === 'dark' || ((t == null || t === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

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
    <html lang="ko" className={notoSansKR.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${notoSansKR.className} flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100`}>
        <header className="border-b bg-white dark:border-slate-800 dark:bg-slate-900">
          <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 p-4">
            <Link href="/" className="text-lg font-bold shrink-0">프롬프트 한국</Link>
            <div className="order-3 w-full sm:order-2 sm:w-auto sm:flex-1 sm:px-4">
              <SearchBar />
            </div>
            <div className="order-2 flex items-center gap-3 text-sm text-slate-700 shrink-0 sm:order-3 sm:gap-5 dark:text-slate-300">
              <Link href="/guides" className="hover:underline">가이드</Link>
              <Link href="/test" className="hover:underline">테스트</Link>
              {/* 부수 메뉴 — 모바일 숨김, 데스크탑 노출 */}
              <Link href="/platforms" className="hidden hover:underline md:inline">비교</Link>
              <Link href="/glossary" className="hidden hover:underline md:inline">용어집</Link>
              <Link href="/sources" className="hidden hover:underline md:inline">출처</Link>
              <ThemeToggle />
              <LoginButton />
            </div>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 p-6">{children}</main>
        <footer className="border-t bg-white py-4 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          <p>
            © Prompts-KR ·{' '}
            <Link href="/license" className="hover:underline">CC BY-NC-SA 4.0</Link>
            {' · '}
            <a href="mailto:rijisub@naver.com" className="text-emerald-700 hover:underline dark:text-emerald-400">rijisub@naver.com</a>
            {' · '}
            <SiteStats />
          </p>
        </footer>
      </body>
    </html>
  );
}
