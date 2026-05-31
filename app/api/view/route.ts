// 프롬프트 상세 페이지 진입 시 호출되는 뷰 카운터 (익명 OK).
import { NextRequest, NextResponse } from 'next/server';
import { redis, k } from '@/lib/redis';

export async function POST(req: NextRequest) {
  let slug: unknown;
  try {
    const body = await req.json();
    slug = body?.slug;
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 });
  }
  if (typeof slug !== 'string' || !slug.match(/^[a-z0-9-]+$/i)) {
    return NextResponse.json({ error: 'invalid slug' }, { status: 400 });
  }
  const views = await redis.incr(k.views(slug));
  return NextResponse.json({ views });
}
