// 컬렉션 OG 이미지 — /collections/[slug]/opengraph-image
// 공유 시 카드뉴스처럼 보이도록 제목·개수·프롬프트 미리보기 렌더.
import { ImageResponse } from 'next/og';
import { getCollection } from '@/lib/collections';
import { getPromptBySlug } from '@/lib/prompts';

export const alt = '프롬프트 한국 — 프롬프트 모음';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCollection(slug);

  if (!c) {
    return new ImageResponse(
      (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#10B981', color: 'white', fontSize: 80, fontWeight: 700 }}>
          프롬프트 한국
        </div>
      ),
      { ...size },
    );
  }

  const titles = c.promptSlugs
    .map(s => getPromptBySlug(s))
    .filter(Boolean)
    .slice(0, 4)
    .map(p => p!.title);
  const count = c.promptSlugs.filter(s => getPromptBySlug(s)).length;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          background: '#FFFFFF', padding: '70px 80px', color: '#0F172A',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', padding: '8px 20px', background: '#10B981', color: 'white', borderRadius: 8, fontSize: 26, fontWeight: 600 }}>
            프롬프트 모음
          </div>
          <div style={{ display: 'flex', fontSize: 26, color: '#64748B' }}>{count}개</div>
        </div>

        <div style={{ display: 'flex', marginTop: 28, fontSize: 64, fontWeight: 800, lineHeight: 1.2, letterSpacing: -1 }}>
          {c.title.length > 26 ? c.title.slice(0, 25) + '…' : c.title}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 30, flex: 1 }}>
          {titles.map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 30, color: '#334155' }}>
              <div style={{ display: 'flex', width: 12, height: 12, borderRadius: 6, background: '#10B981' }} />
              <div style={{ display: 'flex' }}>{t.length > 38 ? t.slice(0, 37) + '…' : t}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '4px solid #10B981', paddingTop: 24 }}>
          <div style={{ display: 'flex', fontSize: 26, color: '#94A3B8' }}>
            {c.description.length > 40 ? c.description.slice(0, 39) + '…' : c.description}
          </div>
          <div style={{ display: 'flex', fontSize: 28, fontWeight: 700, color: '#10B981' }}>
            프롬프트 한국
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
