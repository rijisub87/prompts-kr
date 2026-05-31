// 추천 토글 (POST: 로그인 필요) / 현재 상태 조회 (GET: 익명 OK).
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { redis, k } from '@/lib/redis';

function validSlug(s: unknown): s is string {
  return typeof s === 'string' && /^[a-z0-9-]+$/i.test(s);
}

// GET /api/recommend?slug=xxx → { count, recommended }
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug');
  if (!validSlug(slug)) {
    return NextResponse.json({ error: 'invalid slug' }, { status: 400 });
  }
  const session = await auth();
  const userId = session?.userId;

  const [count, isMember] = await Promise.all([
    redis.get<number>(k.recommendCount(slug)),
    userId ? redis.sismember(k.recommendUsers(slug), userId) : Promise.resolve(0),
  ]);

  return NextResponse.json({
    count: Number(count ?? 0),
    recommended: Boolean(isMember),
  });
}

// POST { slug } → 토글, { count, recommended } 반환
export async function POST(req: NextRequest) {
  const session = await auth();
  const userId = session?.userId;
  if (!userId) {
    return NextResponse.json({ error: '로그인이 필요해요' }, { status: 401 });
  }

  let slug: unknown;
  try {
    const body = await req.json();
    slug = body?.slug;
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 });
  }
  if (!validSlug(slug)) {
    return NextResponse.json({ error: 'invalid slug' }, { status: 400 });
  }

  const isMember = await redis.sismember(k.recommendUsers(slug), userId);

  if (isMember) {
    // 추천 취소
    await redis.srem(k.recommendUsers(slug), userId);
    const count = await redis.decr(k.recommendCount(slug));
    return NextResponse.json({ recommended: false, count: Math.max(0, count) });
  } else {
    await redis.sadd(k.recommendUsers(slug), userId);
    const count = await redis.incr(k.recommendCount(slug));
    return NextResponse.json({ recommended: true, count });
  }
}
