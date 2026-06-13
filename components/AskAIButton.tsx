'use client';

import { Fragment, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/Button';
import AnalyzeModal from '@/components/AnalyzeModal';

// 생활AI 공용 "AI에게 바로 물어보기" 버튼.
// 로그인 필수 + 하루 1회 무료. 401이면 카카오 로그인 유도, 429면 한도 안내.
//
// ⚠️ API 크레딧 충전 전까지 비활성("준비중"). 충전 후 ENABLED = true 한 줄만 바꾸면 부활.
const ENABLED = true;

export default function AskAIButton({
  buildPrompt,
}: {
  buildPrompt: () => string; // 클릭 시점에 최신 입력으로 프롬프트 생성
}) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // 비활성 모드 — 준비중 버튼만 노출 (페이지 배선은 유지).
  if (!ENABLED) {
    return (
      <Button
        disabled
        variant="secondary"
        size="lg"
        title="AI 호출 모드는 곧 오픈됩니다"
        className="w-full"
      >
        AI에게 바로 물어보기
        <span className="ml-2 rounded bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800 dark:bg-amber-900 dark:text-amber-200">
          준비중
        </span>
      </Button>
    );
  }

  async function goToLogin() {
    const supabase = createClient();
    const next = encodeURIComponent(window.location.pathname);
    await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${next}` },
    });
  }

  async function ask() {
    setError(null);
    setResult(null);

    // 1. 클릭 즉시 회원 여부 확인 — 비회원이면 API 호출 없이 안내 + 로그인으로.
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        if (confirm('AI에게 바로 물어보기는 회원 전용 기능이에요. 카카오로 로그인(회원가입)하러 갈까요?')) {
          await goToLogin();
        }
        return;
      }
    } catch {
      // 인증 상태 확인 실패 — 아래 API 호출의 401 처리로 폴백
    }

    // 2. 회원이면 분석 모달 열고 호출 (No1과 동일하게 광고 노출)
    setModalOpen(true);
    setLoading(true);
    try {
      const r = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: buildPrompt() }),
      });

      if (r.status === 401) {
        setModalOpen(false);
        if (confirm('로그인이 만료됐어요. 카카오로 다시 로그인할까요?')) {
          await goToLogin();
        }
        return;
      }

      const d = await r.json();
      if (!r.ok) {
        setError(d?.error ?? '요청에 실패했어요. 잠시 후 다시 시도해주세요.');
        return;
      }
      setResult(d.text);
    } catch {
      setError('네트워크 오류 — 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  }

  // 닫기 — 모달 닫고 결과/에러를 인라인으로 표시.
  function closeModal() {
    if (loading) return;
    setModalOpen(false);
  }

  const done = !loading;

  return (
    <div className="space-y-3">
      <Button onClick={ask} disabled={loading} variant="dark" size="lg" className="w-full">
        {loading ? 'AI가 작성 중…' : 'AI에게 바로 물어보기'}
        <span className="ml-2 rounded bg-white/20 px-2 py-0.5 text-xs font-bold">
          하루 1회 무료
        </span>
      </Button>

      {/* 인라인 결과 — 모달 닫은 뒤 노출 */}
      {!modalOpen && error && (
        <p className="rounded-lg border-l-4 border-rose-500 bg-rose-50 p-3 text-sm text-rose-800 dark:bg-rose-950/30 dark:text-rose-200">
          {error}
        </p>
      )}

      {!modalOpen && result && (
        <section className="rounded-lg border bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-3 text-sm font-bold text-slate-700 dark:text-slate-300">AI 답변</h2>
          {renderText(result)}
          <p className="mt-5 border-t pt-3 text-xs text-slate-400 dark:border-slate-800">
            AI가 생성한 참고용 콘텐츠입니다.
          </p>
        </section>
      )}

      {/* 분석 중 모달 — 3·2·1 카운트다운 + 광고, API 완료 시 닫기 */}
      <AnalyzeModal open={modalOpen} done={done} onConfirm={closeModal} confirmLabel="닫기" />
    </div>
  );
}

// ## 헤딩 + 단락 + bullet 의 가벼운 렌더링.
function renderText(text: string) {
  const lines = text.split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (line.startsWith('## ')) {
      blocks.push(
        <h3 key={i} className="mt-4 mb-1.5 text-base font-bold text-slate-900 dark:text-slate-100">
          {line.slice(3)}
        </h3>,
      );
      i++;
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      const bullets: string[] = [];
      while (i < lines.length && /^[-*] /.test(lines[i].trim())) {
        bullets.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push(
        <ul key={i} className="ml-5 list-disc space-y-1 text-sm text-slate-700 dark:text-slate-300">
          {bullets.map((b, j) => <li key={j}>{renderInline(b)}</li>)}
        </ul>,
      );
    } else if (line) {
      blocks.push(
        <p key={i} className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          {renderInline(line)}
        </p>,
      );
      i++;
    } else {
      i++;
    }
  }
  return <div className="space-y-1">{blocks}</div>;
}

// **굵게**만 간단 처리.
function renderInline(s: string) {
  const parts = s.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith('**') && p.endsWith('**')
      ? <strong key={i}>{p.slice(2, -2)}</strong>
      : <Fragment key={i}>{p}</Fragment>,
  );
}
