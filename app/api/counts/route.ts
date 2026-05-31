// 여러 slug에 대한 views·recommends 카운트를 한 번에 (홈 카드 등 batch용).
// GET /api/counts?slugs=slug1,slug2,...  →  { slug1: { views, recommends }, ... }
import { NextRequest, NextResponse } from 'next/server';
import { redis, k } from '@/lib/redis';

const MAX_SLUGS = 250;

export async function GET(req: NextRequest) {
  const slugsParam = req.nextUrl.searchParams.get('slugs');
  if (!slugsParam) return NextResponse.json({});

  const slugs = slugsParam
    .split(',')
    .map(s => s.trim())
    .filter(s => /^[a-z0-9-]+$/i.test(s))
    .slice(0, MAX_SLUGS);

  if (slugs.length === 0) return NextResponse.json({});

  // 단일 pipeline으로 모든 키를 한 번에 가져옴 (라운드트립 1회).
  const pipeline = redis.pipeline();
  for (const slug of slugs) {
    pipeline.get(k.views(slug));
    pipeline.get(k.recommendCount(slug));
  }
  const results = (await pipeline.exec()) as unknown[];

  const out: Record<string, { views: number; recommends: number }> = {};
  for (let i = 0; i < slugs.length; i++) {
    out[slugs[i]] = {
      views: Number(results[i * 2] ?? 0),
      recommends: Number(results[i * 2 + 1] ?? 0),
    };
  }
  return NextResponse.json(out);
}
