// 프롬프트 상세 페이지 진입 시 뷰 카운트 +1 (익명 OK).
// Supabase RPC: incr_view(p_slug text) returns bigint
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  let slug: unknown;
  try {
    const body = await req.json();
    slug = body?.slug;
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 });
  }
  if (typeof slug !== 'string' || !/^[a-z0-9-]+$/i.test(slug)) {
    return NextResponse.json({ error: 'invalid slug' }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc('incr_view', { p_slug: slug });
    if (error) throw error;
    return NextResponse.json({ views: Number(data) });
  } catch {
    return NextResponse.json({ views: 0 });
  }
}
