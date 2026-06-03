// 사주 페이지 OG 이미지 — /test/saju/opengraph-image
import { ImageResponse } from 'next/og';

export const alt = '프롬프트 한국 — AI로 보는 오늘의 사주';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)',
          padding: '80px',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', fontSize: 32, opacity: 0.85, letterSpacing: 3 }}>
          AI로 보는
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 40,
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <div style={{ fontSize: 96, marginBottom: 20 }}>🔮</div>
          <div style={{ fontSize: 140, fontWeight: 900, letterSpacing: -3, lineHeight: 1 }}>
            오늘의 사주
          </div>
          <div style={{ fontSize: 44, opacity: 0.9, marginTop: 30, fontWeight: 500 }}>
            Claude가 풀어주는 무료 운세
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
