'use client';

import Script from 'next/script';
import { useRef } from 'react';

// Kakao JavaScript SDK 키 (Vercel 환경변수). 미설정 시 Web Share API → 클립보드로 fallback.
const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_KEY;
const SDK_URL = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';

declare global {
  interface Window {
    // Kakao SDK는 타입 정의가 별도라 any로.
    Kakao?: {
      init: (k: string) => void;
      isInitialized: () => boolean;
      Share?: { sendDefault: (opts: unknown) => void };
    };
  }
}

export default function KakaoShareButton({
  title,
  description,
  path,
}: {
  title: string;       // 공유 카드 제목
  description: string; // 공유 카드 설명
  path: string;        // 상대 경로 (예: '/test/intj')
}) {
  const initedRef = useRef(false);

  function ensureInit() {
    if (!KAKAO_KEY) return;
    if (!window.Kakao || initedRef.current) return;
    if (!window.Kakao.isInitialized()) window.Kakao.init(KAKAO_KEY);
    initedRef.current = true;
  }

  async function share() {
    const url =
      typeof window !== 'undefined'
        ? new URL(path, window.location.origin).href
        : path;

    // 1. Kakao SDK (정식 카카오톡 공유)
    ensureInit();
    if (KAKAO_KEY && window.Kakao?.Share) {
      window.Kakao.Share.sendDefault({
        objectType: 'text',
        text: `${title}\n\n${description}`,
        link: { mobileWebUrl: url, webUrl: url },
        buttonTitle: '나도 해보기',
      });
      return;
    }

    // 2. Web Share API (모바일에서 시스템 공유시트 — 카톡 보통 포함)
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, text: description, url });
        return;
      } catch {
        // 사용자 취소 — 다음 fallback
      }
    }

    // 3. 클립보드 복사
    try {
      await navigator.clipboard.writeText(url);
      alert('링크가 복사됐어요. 카카오톡에 붙여넣어 공유하세요.');
    } catch {
      alert(`아래 링크를 복사해서 공유하세요:\n${url}`);
    }
  }

  return (
    <>
      {KAKAO_KEY && (
        <Script
          src={SDK_URL}
          strategy="afterInteractive"
          onLoad={ensureInit}
        />
      )}
      <button
        onClick={share}
        className="inline-flex items-center gap-2 rounded-lg bg-[#FEE500] px-4 py-2 text-sm font-semibold text-[#191919] hover:opacity-90"
        aria-label="카카오톡 공유"
      >
        <span aria-hidden>💬</span>
        <span>카카오톡 공유</span>
      </button>
    </>
  );
}
