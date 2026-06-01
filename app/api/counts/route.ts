// 여러 slug에 대한 views·recommends 일괄 조회 (홈 카드 batch용).
// GET /api/counts?slugs=slug1,slug2,...  →  { slug1: { views, recommends }, ... }
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

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

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('prompt_stats')
      .select('slug, view_count, recommend_count')
      .in('slug', slugs);
    if (error) throw error;

    const out: Record<string, { views: number; recommends: number }> = {};
    for (const row of data ?? []) {
      out[row.slug as string] = {
        views: Number(row.view_count),
        recommends: Number(row.recommend_count),
      };
    }
    return NextResponse.json(out);
  } catch {
    return NextResponse.json({});
  }
}
