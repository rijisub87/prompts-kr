// 프롬프트 디테일 페이지 OG 이미지 — /p/[slug]/opengraph-image
import { ImageResponse } from 'next/og';
import { getPromptBySlug, CATEGORY_KO } from '@/lib/prompts';

export const alt = '프롬프트 한국 — AI 프롬프트';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);

  if (!prompt) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#10B981',
            color: 'white',
            fontSize: 80,
            fontWeight: 700,
          }}
        >
          프롬프트 한국
        </div>
      ),
      { ...size },
    );
  }

  // 카테고리별 색상
  const categoryColor: Record<string, string> = {
    data: '#3B82F6', research: '#8B5CF6', code: '#10B981',
    analysis: '#F59E0B', writing: '#EC4899', email: '#6366F1',
    'cover-letter': '#EF4444', report: '#06B6D4', ppt: '#14B8A6',
    learning: '#F97316', planning: '#A855F7', image: '#EAB308',
    translation: '#84CC16', summary: '#0EA5E9', 'edu-parent': '#D946EF',
    etc: '#64748B',
  };
  const accent = categoryColor[prompt.category] ?? '#10B981';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#FFFFFF',
          padding: '70px 80px',
          color: '#0F172A',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 12,
            alignItems: 'center',
            fontSize: 28,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              display: 'flex',
              padding: '8px 20px',
              background: accent,
              color: 'white',
              borderRadius: 8,
            }}
          >
            {CATEGORY_KO[prompt.category]}
          </div>
          {prompt.platform.slice(0, 2).map(pl => (
            <div
              key={pl}
              style={{
                display: 'flex',
                padding: '8px 20px',
                background: '#F1F5F9',
                color: '#475569',
                borderRadius: 8,
                fontSize: 24,
              }}
            >
              {pl}
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: -1,
          }}
        >
          {prompt.title.length > 60 ? prompt.title.slice(0, 58) + '…' : prompt.title}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: `4px solid ${accent}`,
            paddingTop: 24,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 22, color: '#94A3B8' }}>
              출처
            </div>
            <div style={{ display: 'flex', fontSize: 28, fontWeight: 600, color: '#334155' }}>
              {prompt.source.name.length > 35
                ? prompt.source.name.slice(0, 33) + '…'
                : prompt.source.name}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <div style={{ display: 'flex', fontSize: 28, fontWeight: 700, color: accent }}>
              프롬프트 한국
            </div>
            <div style={{ display: 'flex', fontSize: 22, color: '#94A3B8' }}>
              prompts-kr.vercel.app
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
