import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI 테스트 — MBTI · 사주 풀이',
  description: 'AI로 즐기는 한국형 테스트. MBTI(AI 사용 성향 16유형) · 오늘의 사주 풀이 · Claude 기반 무료.',
  openGraph: {
    title: 'AI 테스트 — MBTI · 사주 풀이',
    description: 'AI 사용 성향 MBTI 16유형 + 오늘의 사주. 무료 · 3분 · 결과 공유 가능.',
  },
};

export default function TestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
