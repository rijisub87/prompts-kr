// 생활AI "AI에게 바로 물어보기" 공용 엔드포인트.
// 정책: 로그인 필수 + 가입자당 하루 1회 무료 (전 기능 공유 버킷). 모델: Claude Haiku 4.5.
import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@/lib/supabase/server';

const MAX_PROMPT_CHARS = 8000;
const DAILY_LIMIT = 1;

export async function POST(req: NextRequest) {
  // 1. 입력
  let body: { prompt?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 });
  }
  const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
  if (!prompt) {
    return NextResponse.json({ error: '내용이 비어 있어요' }, { status: 400 });
  }
  if (prompt.length > MAX_PROMPT_CHARS) {
    return NextResponse.json({ error: '요청이 너무 길어요' }, { status: 400 });
  }

  const supabase = await createClient();

  // 2. 로그인 확인
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'login required' }, { status: 401 });
  }

  // 3. 가입자당 하루 1회 (전 기능 공유). check_quota는 호출마다 +1 후 <= max 판정.
  try {
    const { data: ok } = await supabase.rpc('check_quota', {
      p_key: `ask:${user.id}`,
      p_max: DAILY_LIMIT,
    });
    if (ok === false) {
      return NextResponse.json(
        { error: '오늘 무료 1회를 모두 사용했어요. 내일 다시 만나요!' },
        { status: 429 },
      );
    }
  } catch {
    // quota 인프라 없으면 통과 (로컬 등)
  }

  // 4. Anthropic 호출 (Haiku 4.5)
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: '서버 설정 오류 — API 키 누락' }, { status: 500 });
  }

  try {
    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    });
    const text = response.content
      .filter((c): c is Anthropic.TextBlock => c.type === 'text')
      .map(c => c.text)
      .join('\n')
      .trim();
    if (!text) {
      return NextResponse.json({ error: '응답을 받지 못했어요' }, { status: 500 });
    }
    return NextResponse.json({ text });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'unknown error';
    return NextResponse.json({ error: `AI 호출 실패: ${msg}` }, { status: 500 });
  }
}
