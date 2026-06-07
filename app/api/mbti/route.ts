// MBTI 테스트 결과 저장(POST)·조회(GET). 로그인 필요.
// 비로그인은 401 (클라이언트가 조용히 무시 — 로그인 유도 없음).
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const TYPE_RE = /^[EI][NS][TF][JP]$/;

// POST { type, answers? } → { ok, id }
export async function POST(req: NextRequest) {
  let body: { type?: unknown; answers?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 });
  }
  const type = typeof body.type === 'string' ? body.type.toUpperCase() : '';
  if (!TYPE_RE.test(type)) {
    return NextResponse.json({ error: 'invalid type' }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }
    const { data, error } = await supabase
      .from('mbti_results')
      .insert({
        user_id: user.id,
        type,
        answers: body.answers ?? null,
      })
      .select('id')
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true, id: data.id });
  } catch {
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}

// GET → 본인 결과 최신순 (최대 50개). 비로그인 시 빈 배열.
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ results: [] });
    }
    const { data, error } = await supabase
      .from('mbti_results')
      .select('id, type, taken_at')
      .eq('user_id', user.id)
      .order('taken_at', { ascending: false })
      .limit(50);
    if (error) {
      return NextResponse.json({ results: [] });
    }
    return NextResponse.json({ results: data ?? [] });
  } catch {
    return NextResponse.json({ results: [] });
  }
}
