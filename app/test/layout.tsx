import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '생활AI — 일하는 나의 MBTI · AI 활용 직무 테스트 · 사주',
  description: '일상에서 즐기는 AI 모음. 일하는 나의 MBTI · AI 활용 직무 테스트 · 오늘의 사주. 모두 무료.',
  openGraph: {
    title: '생활AI — 일하는 나의 MBTI · AI 활용 직무 테스트 · 사주',
    description: 'AI 사용 성향 MBTI 16유형 + 오늘의 사주. 무료 · 3분 · 결과 공유 가능.',
  },
};

export default function TestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
