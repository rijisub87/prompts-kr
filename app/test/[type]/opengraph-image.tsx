// MBTI 결과 페이지 OG 이미지 — /test/[type]/opengraph-image
// 카카오톡·트위터·페이스북 공유 시 1200×630 카드로 표시.
import { ImageResponse } from 'next/og';
import { ALL_TYPES, RESULTS } from '@/lib/mbti-test';

export const alt = '프롬프트 한국 — AI 사용 성향 MBTI 결과';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateImageMetadata({ params: _params }: { params: { type: string } }) {
  // 16 유형 모두 이미지 미리 정의
  return ALL_TYPES.map(t => ({ id: t.toLowerCase() }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const result = RESULTS[type.toUpperCase()] ?? RESULTS.INTJ;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
          padding: '80px',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, opacity: 0.85, letterSpacing: 4 }}>
          AI 사용으로 보는 MBTI
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 60,
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <div style={{ fontSize: 220, fontWeight: 900, letterSpacing: -4, lineHeight: 1 }}>
            {result.type}
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, marginTop: 30 }}>
            {result.nickname}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: 32,
            opacity: 0.9,
          }}
        >
          <div style={{ display: 'flex' }}>프롬프트 한국</div>
          <div style={{ display: 'flex', fontSize: 26, opacity: 0.7 }}>
            prompts-kr.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
