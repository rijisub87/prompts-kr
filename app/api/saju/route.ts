// 오늘의 사주 풀이 — Anthropic Claude Opus 4.7 호출.
// 비용 통제: (1) 생년월일+시+양음력+오늘 캐시 (2) IP당 일일 10회 제한.
import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@/lib/supabase/server';

const SAJU_SYSTEM = `당신은 한국 전통 사주명리학에 정통한 운세 분석가입니다.
사용자의 생년월일과 오늘 날짜를 받아 오늘의 운세를 풀어줍니다.

규칙:
- 단정적 예측 금지. "~할 수 있어요", "~경향이 있어요" 등 권유형 어미.
- 부정적 예측은 부드럽게, 대처법을 함께 제시.
- 실용적·구체적 조언 위주.
- 한국어 존댓말.
- 정해진 출력 형식 그대로, 추가 설명 없이.`;

const HOUR_LABELS: Record<string, string> = {
  '자시': '자시 (23:00~01:00)',
  '축시': '축시 (01:00~03:00)',
  '인시': '인시 (03:00~05:00)',
  '묘시': '묘시 (05:00~07:00)',
  '진시': '진시 (07:00~09:00)',
  '사시': '사시 (09:00~11:00)',
  '오시': '오시 (11:00~13:00)',
  '미시': '미시 (13:00~15:00)',
  '신시': '신시 (15:00~17:00)',
  '유시': '유시 (17:00~19:00)',
  '술시': '술시 (19:00~21:00)',
  '해시': '해시 (21:00~23:00)',
  '모름': '모름',
};

type SajuInput = {
  year: number;
  month: number;
  day: number;
  hour: string;       // 자시/축시/.../모름
  calendar: '양력' | '음력';
};

function validate(input: unknown): SajuInput | null {
  if (!input || typeof input !== 'object') return null;
  const o = input as Record<string, unknown>;
  const y = Number(o.year), m = Number(o.month), d = Number(o.day);
  if (!Number.isInteger(y) || y < 1900 || y > 2030) return null;
  if (!Number.isInteger(m) || m < 1 || m > 12) return null;
  if (!Number.isInteger(d) || d < 1 || d > 31) return null;
  const hour = typeof o.hour === 'string' && HOUR_LABELS[o.hour] ? o.hour : '모름';
  const calendar = o.calendar === '음력' ? '음력' : '양력';
  return { year: y, month: m, day: d, hour, calendar };
}

function buildUserPrompt(input: SajuInput, todayStr: string): string {
  return `오늘은 ${todayStr}입니다.

생년월일: ${input.year}년 ${input.month}월 ${input.day}일 (${input.calendar})
생시: ${HOUR_LABELS[input.hour]}

다음 형식 그대로 한국어로 작성해주세요. 각 섹션 누락 금지:

## 총운
오늘 하루의 전반적인 흐름 (3~4문장).

## 재물운
금전·재테크 관련 (2~3문장).

## 인간관계운
사람·만남·소통 (2~3문장).

## 건강·컨디션
건강 주의점 (2~3문장).

## 오늘의 행운
- 행운의 색:
- 행운의 숫자:
- 행운의 방향:

## 오늘의 조언
한 문장으로 핵심 조언.`;
}

export async function POST(req: NextRequest) {
  // 1. 입력 검증
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 });
  }
  const input = validate(body);
  if (!input) {
    return NextResponse.json({ error: '생년월일이 올바르지 않아요' }, { status: 400 });
  }

  // 2. 캐시 키 — 같은 생년월일·시·양음력·오늘 → 같은 결과
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const cacheKey = `${input.year}-${input.month}-${input.day}:${input.hour}:${input.calendar}:${todayStr}`;

  const supabase = await createClient();

  // 3. 캐시 조회
  try {
    const { data: cached } = await supabase.rpc('get_saju_cache', { p_key: cacheKey });
    if (typeof cached === 'string' && cached.length > 0) {
      return NextResponse.json({ reading: cached, cached: true });
    }
  } catch {
    // Supabase env 미설정 등 — 그냥 진행
  }

  // 4. IP 일일 quota (10회/일)
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  try {
    const { data: ok } = await supabase.rpc('check_quota', {
      p_key: `saju:${ip}`,
      p_max: 10,
    });
    if (ok === false) {
      return NextResponse.json(
        { error: '오늘은 10회 사용 가능 횟수를 초과했어요. 내일 다시 시도해주세요.' },
        { status: 429 },
      );
    }
  } catch {
    // quota 체크 실패해도 진행 (Supabase 없으면 무제한)
  }

  // 5. Anthropic API 호출
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: '서버 설정 오류 — ANTHROPIC_API_KEY 누락' },
      { status: 500 },
    );
  }

  try {
    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 1500,
      system: SAJU_SYSTEM,
      messages: [{ role: 'user', content: buildUserPrompt(input, todayStr) }],
    });

    const reading = response.content
      .filter((c): c is Anthropic.TextBlock => c.type === 'text')
      .map(c => c.text)
      .join('\n')
      .trim();

    if (!reading) {
      return NextResponse.json({ error: '응답을 받지 못했어요' }, { status: 500 });
    }

    // 6. 캐시 저장 (실패해도 응답은 반환)
    try {
      await supabase.rpc('set_saju_cache', { p_key: cacheKey, p_reading: reading });
    } catch {
      // ignore
    }

    return NextResponse.json({ reading, cached: false });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'unknown error';
    return NextResponse.json(
      { error: `AI 호출 실패: ${msg}` },
      { status: 500 },
    );
  }
}
