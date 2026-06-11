'use client';

import { Fragment, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/Button';

// 생활AI 공용 "AI에게 바로 물어보기" 버튼.
// 로그인 필수 + 하루 1회 무료. 401이면 카카오 로그인 유도, 429면 한도 안내.
export default function AskAIButton({
  buildPrompt,
}: {
  buildPrompt: () => string; // 클릭 시점에 최신 입력으로 프롬프트 생성
}) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function ask() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const r = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: buildPrompt() }),
      });

      if (r.status === 401) {
        if (confirm('AI에게 바로 물어보려면 로그인이 필요해요. 카카오로 로그인할까요?')) {
          const supabase = createClient();
          const next = encodeURIComponent(window.location.pathname);
          await supabase.auth.signInWithOAuth({
            provider: 'kakao',
            options: { redirectTo: `${window.location.origin}/auth/callback?next=${next}` },
          });
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

  return (
    <div className="space-y-3">
      <Button onClick={ask} disabled={loading} variant="dark" size="lg" className="w-full">
        {loading ? 'AI가 작성 중…' : 'AI에게 바로 물어보기'}
        <span className="ml-2 rounded bg-white/20 px-2 py-0.5 text-xs font-bold">
          하루 1회 무료
        </span>
      </Button>

      {error && (
        <p className="rounded-lg border-l-4 border-rose-500 bg-rose-50 p-3 text-sm text-rose-800 dark:bg-rose-950/30 dark:text-rose-200">
          {error}
        </p>
      )}

      {result && (
        <section className="rounded-lg border bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-3 text-sm font-bold text-slate-700 dark:text-slate-300">AI 답변</h2>
          {renderText(result)}
          <p className="mt-5 border-t pt-3 text-xs text-slate-400 dark:border-slate-800">
            AI가 생성한 참고용 콘텐츠입니다.
          </p>
        </section>
      )}
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
