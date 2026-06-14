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
  return `오늘은 ${date}입니다. 한국 투자자를 위한 간결한 데일리 마켓 브리핑을 한국어로 작성하세요.

다음 4개 섹션, 각 2~3줄로:

## 오늘의 시장 한눈에
미국 금리·증시·환율·유가·금·비트코인의 큰 흐름 (방향성 위주).

## 투자 거장 동향
버핏·달리오·막스 등 최근 공개된 움직임이 있으면 요약, 없으면 "신규 동향 없음".

## 경제 현황
미국·세계·한국 경제의 핵심 이슈 한두 가지씩.

## 오늘 주목할 포인트
섹터 방향성 또는 주의할 이벤트 2~3개.

[제약]
- 실시간 데이터에 접근할 수 없으므로 구체적 수치는 "추정"·"확인 필요"로 표기하고 단정하지 말 것
- 투자 자문이 아니라 판단 재료 제공
- 전체 700자 이내로 간결하게`;
}

// 카카오 텍스트 메시지(200자 제한)용 요약 — 마크다운 기호 제거 후 앞부분.
function makeSummary(report: string, date: string): string {
  const plain = report
    .replace(/^#+\s*/gm, '')
    .replace(/\*\*/g, '')
    .replace(/\n{2,}/g, '\n')
    .trim();
  const head = plain.slice(0, 150).trim();
  return `[데일리 세계 경제 · ${date}]\n${head}…\n\n전체 리포트는 링크에서 확인하세요.`;
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

  // 5. 카카오 '나에게 보내기'
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
          text: makeSummary(report, date),
          link: { web_url: `${SITE}/test/market`, mobile_web_url: `${SITE}/test/market` },
          button_title: '전체 리포트 보기',
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
