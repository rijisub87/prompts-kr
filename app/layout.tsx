import type { Metadata } from 'next';
import Link from 'next/link';
import SiteStats from '@/components/SiteStats';
import SearchBar from '@/components/SearchBar';
import './globals.css';

export const metadata: Metadata = {
  title: { default: '프롬프트 한국', template: '%s · 프롬프트 한국' },
  description: '한국 사용자를 위한 AI 프롬프트 큐레이션 — Claude · ChatGPT · Gemini',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased">
        <header className="border-b bg-white">
          <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 p-4">
            <Link href="/" className="text-lg font-bold shrink-0">프롬프트 한국</Link>
            <div className="order-3 w-full sm:order-2 sm:w-auto sm:flex-1 sm:px-4">
              <SearchBar />
            </div>
            <div className="order-2 flex gap-5 text-sm text-slate-700 shrink-0 sm:order-3">
              <Link href="/guides" className="hover:underline">가이드</Link>
              <Link href="/sources" className="hover:underline">출처</Link>
              <Link href="/about" className="hover:underline">소개</Link>
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
