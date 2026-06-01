// 추천 토글(POST: 로그인 필요) · 상태 조회(GET).
// Supabase RPC: toggle_recommend(p_slug text) returns json { recommended, count }
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

function validSlug(s: unknown): s is string {
  return typeof s === 'string' && /^[a-z0-9-]+$/i.test(s);
}

// GET /api/recommend?slug=xxx → { count, recommended }
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug');
  if (!validSlug(slug)) {
    return NextResponse.json({ error: 'invalid slug' }, { status: 400 });
  }
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const [statsRes, myRecRes] = await Promise.all([
      supabase
        .from('prompt_stats')
        .select('recommend_count')
        .eq('slug', slug)
        .maybeSingle(),
      user
        ? supabase
            .from('recommendations')
            .select('slug')
            .eq('user_id', user.id)
            .eq('slug', slug)
            .maybeSingle()
        : Promise.resolve({ data: null }),
    ]);

    return NextResponse.json({
      count: Number(statsRes.data?.recommend_count ?? 0),
      recommended: Boolean(myRecRes.data),
    });
  } catch {
    return NextResponse.json({ count: 0, recommended: false });
  }
}

// POST { slug } → 토글, { recommended, count } 반환
export async function POST(req: NextRequest) {
  let slug: unknown;
  try {
    slug = (await req.json())?.slug;
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 });
  }
  if (!validSlug(slug)) {
    return NextResponse.json({ error: 'invalid slug' }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    // RPC 안에서 auth.uid() 체크 후 미인증이면 raise. 여기선 error로 받음.
    const { data, error } = await supabase.rpc('toggle_recommend', { p_slug: slug });
    if (error) {
      // 인증 실패 등 — 401로 통일
      return NextResponse.json(
        { error: error.message || '로그인이 필요해요' },
        { status: 401 },
      );
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
