'use client';

import { useEffect, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/Button';

// "내 카톡으로 리포트 받기" — 카카오 talk_message scope로 (재)인증 후
// /test/market?send=1 로 복귀하면 자동으로 리포트 생성 + 카카오 '나에게 보내기'.
export default function MarketReportButton() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [msg, setMsg] = useState<string | null>(null);
  const [report, setReport] = useState<string | null>(null);
  const ran = useRef(false);

  // 카카오 인증 후 복귀(?send=1) → 자동 전송 1회.
  useEffect(() => {
    if (ran.current) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('send') !== '1') return;
    ran.current = true;
    // URL에서 send 파라미터 제거 (새로고침 시 재전송 방지)
    params.delete('send');
    const clean = window.location.pathname + (params.toString() ? `?${params}` : '');
    window.history.replaceState(null, '', clean);
    void send();
  }, []);

  async function startAuth() {
    const supabase = createClient();
    const next = encodeURIComponent('/test/market?send=1');
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        scopes: 'talk_message',
        redirectTo: `${window.location.origin}/auth/callback?next=${next}`,
      },
    });
  }

  async function send() {
    setStatus('sending');
    setMsg(null);
    try {
      const r = await fetch('/api/market-report', { method: 'POST' });
      if (r.status === 401) {
        // 미로그인 → 카카오 인증으로
        await startAuth();
        return;
      }
      const d = await r.json();
      if (d.report) setReport(d.report);

      if (d.ok) {
        setStatus('sent');
        setMsg('카카오톡으로 리포트를 보냈어요! 카톡을 확인해보세요.');
      } else if (d.needAuth) {
        // 카카오 메시지 권한 필요 → 재인증
        await startAuth();
      } else {
        setStatus('error');
        setMsg(d.error ?? '전송에 실패했어요. 잠시 후 다시 시도해주세요.');
      }
    } catch {
      setStatus('error');
      setMsg('네트워크 오류 — 잠시 후 다시 시도해주세요.');
    }
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={startAuth}
        disabled={status === 'sending'}
        variant="primary"
        size="lg"
        className="w-full bg-[#FEE500] text-[#191919] hover:opacity-90"
      >
        {status === 'sending' ? '리포트 보내는 중…' : '내 카톡으로 리포트 받기'}
      </Button>

      {msg && (
        <p
          className={
            status === 'sent'
              ? 'text-center text-xs text-emerald-700 dark:text-emerald-400'
              : 'rounded-lg border-l-4 border-rose-500 bg-rose-50 p-3 text-sm text-rose-800 dark:bg-rose-950/30 dark:text-rose-200'
          }
        >
          {msg}
        </p>
      )}

      {report && (
        <section className="rounded-lg border bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-3 text-sm font-bold text-slate-700 dark:text-slate-300">오늘의 리포트</h2>
          <pre className="overflow-x-auto whitespace-pre-wrap text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {report}
          </pre>
          <p className="mt-4 border-t pt-3 text-xs text-slate-400 dark:border-slate-800">
            AI가 생성한 참고용 정보입니다. 투자 자문이 아니며 수치는 직접 확인하세요.
          </p>
        </section>
      )}
    </div>
  );
}
