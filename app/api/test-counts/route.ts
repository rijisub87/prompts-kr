// 테스트 메인 카드의 시작 버튼 클릭 카운터 조회.
// prompt_stats 테이블을 그대로 재활용 (슬러그: test-mbti, test-skill, test-saju).
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

type Counts = { mbti: number; skill: number; saju: number; market: number; lotto: number };

const SLUG_TO_KEY: Record<string, keyof Counts> = {
  'test-mbti': 'mbti',
  'test-skill': 'skill',
  'test-saju': 'saju',
  'test-market': 'market',
  'test-lotto': 'lotto',
};

export async function GET() {
  const fallback: Counts = { mbti: 0, skill: 0, saju: 0, market: 0, lotto: 0 };
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('prompt_stats')
      .select('slug, view_count')
      .in('slug', Object.keys(SLUG_TO_KEY));
    const out: Counts = { ...fallback };
    for (const row of data ?? []) {
      const key = SLUG_TO_KEY[row.slug as string];
      if (key) out[key] = Number(row.view_count);
    }
    return NextResponse.json(out);
  } catch {
    return NextResponse.json(fallback);
  }
}
