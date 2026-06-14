// 데일리 세계 경제 리포트 — 생성(일일 공유 캐시) 후 카카오 '나에게 보내기'로 전송.
// 정책: 로그인 필수, talk_message scope 토큰 필요(provider_token). 모델: Haiku 4.5.
// 비용 통제: 같은 날 첫 요청만 Claude 호출, 이후 캐시 재사용 (전 사용자 공유).
import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@/lib/supabase/server';

const SITE = 'https://prompts-kr.vercel.app';

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function buildPrompt(date: string): string {
  return `오늘은 ${date}입니다. 한국 투자자를 위한 "초간결" 데일리 마켓 브리핑을 한국어로 작성하세요.

형식: 머리말 없이 4줄, 각 줄 앞에 이모지 없이 핵심만.
1줄) 미국 증시·금리 방향
2줄) 환율·유가·금·비트코인 중 눈에 띄는 것
3줄) 오늘의 핵심 이슈 하나
4줄) 한 줄 코멘트(주의/관전 포인트)

[제약]
- 전체 130자 이내, 매우 압축적으로
- 실시간 데이터 접근 불가 → 구체 수치는 단정 말고 방향성·"추정" 위주
- 투자 자문 아님, 판단 재료만
- 마크다운 기호(##, **) 쓰지 말 것`;
}

// 카카오 텍스트 메시지(200자 한도) — 리포트 전체를 담되 안전하게 자름.
function buildKakaoText(report: string, date: string): string {
  const plain = report
    .replace(/^#+\s*/gm, '')
    .replace(/\*\*/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  const header = `[데일리 세계경제 ${date.slice(5)}]\n`;
  const full = header + plain;
  return full.length > 200 ? full.slice(0, 199) + '…' : full;
}

// GET — 오늘 캐시된 리포트 조회 (링크 방문자가 빈 화면 대신 결과를 보게). 로그인 불필요.
export async function GET() {
  try {
    const supabase = await createClient();
    const cacheKey = `market-report:${todayStr()}`;
    const { data } = await supabase.rpc('get_saju_cache', { p_key: cacheKey });
    if (typeof data === 'string' && data.length > 0) {
      return NextResponse.json({ report: data });
    }
  } catch {
    // ignore
  }
  return NextResponse.json({ report: null });
}

export async function POST() {
  const supabase = await createClient();

  // 1. 로그인 확인 (authentic)
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'login required' }, { status: 401 });
  }

  // 2. 카카오 토큰 (talk_message scope)
  const { data: { session } } = await supabase.auth.getSession();
  const kakaoToken = session?.provider_token ?? null;

  // 3. 일일 공유 캐시
  const date = todayStr();
  const cacheKey = `market-report:${date}`;
  let report: string | null = null;
  try {
    const { data } = await supabase.rpc('get_saju_cache', { p_key: cacheKey });
    if (typeof data === 'string' && data.length > 0) report = data;
  } catch {
    // 캐시 인프라 없으면 매번 생성
  }

  if (!report) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: '서버 설정 오류 — API 키 누락' }, { status: 500 });
    }
    try {
      const anthropic = new Anthropic({ apiKey });
      const resp = await anthropic.messages.create({
        model: 'claude-haiku-4-5',
        max_tokens: 1500,
        messages: [{ role: 'user', content: buildPrompt(date) }],
      });
      report = resp.content
        .filter((c): c is Anthropic.TextBlock => c.type === 'text')
        .map(c => c.text)
        .join('\n')
        .trim();
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'unknown error';
      return NextResponse.json({ error: `리포트 생성 실패: ${msg}` }, { status: 500 });
    }
    if (report) {
      try {
        await supabase.rpc('set_saju_cache', { p_key: cacheKey, p_reading: report });
      } catch {
        // ignore
      }
    }
  }

  if (!report) {
    return NextResponse.json({ error: '리포트를 만들지 못했어요' }, { status: 500 });
  }

  // 4. 카카오 토큰 없으면 재인증 필요 신호 (리포트는 함께 반환해 화면엔 표시)
  if (!kakaoToken) {
    return NextResponse.json({ ok: false, needAuth: true, report });
  }

  // 5. 가입자당 하루 1회 — 실제 전송 직전에만 소진 (재인증 단계에선 소진 X)
  try {
    const { data: ok } = await supabase.rpc('check_quota', {
      p_key: `report:${user.id}`,
      p_max: 1,
    });
    if (ok === false) {
      return NextResponse.json({ ok: false, limit: true, report });
    }
  } catch {
    // quota 인프라 없으면 통과
  }

  // 6. 카카오 '나에게 보내기'
  try {
    const r = await fetch('https://kapi.kakao.com/v2/api/talk/memo/default/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${kakaoToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        template_object: JSON.stringify({
          object_type: 'text',
          text: buildKakaoText(report, date),
          link: { web_url: `${SITE}/test/market`, mobile_web_url: `${SITE}/test/market` },
        }),
      }),
    });
    if (!r.ok) {
      const t = await r.text();
      // 권한 부족(talk_message 미동의) 등 → 재인증 안내
      return NextResponse.json({ ok: false, needAuth: true, report, detail: t });
    }
    return NextResponse.json({ ok: true, report });
  } catch {
    return NextResponse.json({ ok: false, error: '카톡 전송 오류 — 잠시 후 다시 시도해주세요.', report });
  }
}
