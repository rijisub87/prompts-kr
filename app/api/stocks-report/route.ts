// 데일리 국내 대장주 리포트 — 삼성전자·SK하이닉스 목표주가 방향·호재·악재.
// 생성(일일 공유 캐시) 후 카카오 '나에게 보내기'. 로그인 필수 + 가입자당 하루 1회.
import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@/lib/supabase/server';

const SITE = 'https://prompts-kr.vercel.app';

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function buildPrompt(date: string): string {
  return `오늘은 ${date}입니다. 한국 투자자를 위한 "국내 대장주" 데일리 브리핑을 한국어로 작성하세요.
대상: 삼성전자, SK하이닉스.

각 종목마다 다음을 2~3줄로:
- 목표주가 방향 (증권가 컨센서스가 상향/유지/하향 분위기인지 — 구체 금액은 단정 말고 방향 위주)
- 호재 (긍정 소식·모멘텀 1가지)
- 악재 (부정 소식·리스크 1가지)

[제약]
- 실시간 시세·뉴스에 접근할 수 없으므로 구체 수치·특정 뉴스는 단정하지 말고
  "최근 흐름상", "추정", "확인 필요"로 표기
- 투자 자문이 아니라 판단 재료 제공, 매수·매도 단정 금지
- 전체 200자 이내로 압축, 마크다운 기호(##, **) 쓰지 말 것
- 형식 예) "삼성전자 — 목표가 …, 호재 …, 악재 …" 한 덩어리로`;
}

function buildKakaoText(report: string, date: string): string {
  const plain = report.replace(/^#+\s*/gm, '').replace(/\*\*/g, '').replace(/\n{3,}/g, '\n\n').trim();
  const full = `[국내 대장주 ${date.slice(5)}]\n${plain}`;
  return full.length > 200 ? full.slice(0, 199) + '…' : full;
}

export async function GET() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.rpc('get_saju_cache', { p_key: `stocks-report:${todayStr()}` });
    if (typeof data === 'string' && data.length > 0) return NextResponse.json({ report: data });
  } catch {
    // ignore
  }
  return NextResponse.json({ report: null });
}

export async function POST() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'login required' }, { status: 401 });

  const { data: { session } } = await supabase.auth.getSession();
  const kakaoToken = session?.provider_token ?? null;

  const date = todayStr();
  const cacheKey = `stocks-report:${date}`;
  let report: string | null = null;
  try {
    const { data } = await supabase.rpc('get_saju_cache', { p_key: cacheKey });
    if (typeof data === 'string' && data.length > 0) report = data;
  } catch {
    // ignore
  }

  if (!report) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return NextResponse.json({ error: '서버 설정 오류 — API 키 누락' }, { status: 500 });
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
      try { await supabase.rpc('set_saju_cache', { p_key: cacheKey, p_reading: report }); } catch {}
    }
  }

  if (!report) return NextResponse.json({ error: '리포트를 만들지 못했어요' }, { status: 500 });

  if (!kakaoToken) return NextResponse.json({ ok: false, needAuth: true, report });

  // 가입자당 하루 1회 (전송 직전 소진)
  try {
    const { data: ok } = await supabase.rpc('check_quota', { p_key: `stocks-report:${user.id}`, p_max: 1 });
    if (ok === false) return NextResponse.json({ ok: false, limit: true, report });
  } catch {
    // ignore
  }

  try {
    const r = await fetch('https://kapi.kakao.com/v2/api/talk/memo/default/send', {
      method: 'POST',
      headers: { Authorization: `Bearer ${kakaoToken}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        template_object: JSON.stringify({
          object_type: 'text',
          text: buildKakaoText(report, date),
          link: { web_url: `${SITE}/test/stocks`, mobile_web_url: `${SITE}/test/stocks` },
          buttons: [],
        }),
      }),
    });
    if (!r.ok) {
      const t = await r.text();
      return NextResponse.json({ ok: false, needAuth: true, report, detail: t });
    }
    return NextResponse.json({ ok: true, report });
  } catch {
    return NextResponse.json({ ok: false, error: '카톡 전송 오류 — 잠시 후 다시 시도해주세요.', report });
  }
}
