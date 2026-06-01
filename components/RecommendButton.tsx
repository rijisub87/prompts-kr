'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

// 추천 버튼 — 카운트 표시 + 토글. 401 시 Supabase OAuth로 카카오 로그인 트리거.
export default function RecommendButton({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null);
  const [recommended, setRecommended] = useState(false);
  const [loading, setLoading] = useState(false);

  // 마운트 시 현재 상태 조회 (count + 본인 추천 여부)
  useEffect(() => {
    fetch(`/api/recommend?slug=${encodeURIComponent(slug)}`)
      .then(r => r.json())
      .then(d => {
        setCount(Number(d?.count ?? 0));
        setRecommended(Boolean(d?.recommended));
      })
      .catch(() => setCount(0));
  }, [slug]);

  async function toggle() {
    if (loading) return;
    setLoading(true);
    try {
      const r = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });
      if (r.status === 401) {
        if (confirm('추천하려면 카카오 로그인이 필요해요. 로그인할까요?')) {
          const supabase = createClient();
          const next = encodeURIComponent(window.location.pathname);
          await supabase.auth.signInWithOAuth({
            provider: 'kakao',
            options: {
              redirectTo: `${window.location.origin}/auth/callback?next=${next}`,
            },
          });
        }
        return;
      }
      if (!r.ok) {
        alert('잠시 후 다시 시도해 주세요.');
        return;
      }
      const d = await r.json();
      setCount(Number(d.count ?? 0));
      setRecommended(Boolean(d.recommended));
    } catch {
      alert('네트워크 오류 — 잠시 후 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  }

  const display = count == null ? '...' : count.toLocaleString('ko-KR');

  return (
    <button
      onClick={toggle}
      disabled={loading || count === null}
      className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${
        recommended
          ? 'border-rose-300 bg-rose-50 text-rose-700'
          : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
      } disabled:opacity-60`}
      aria-pressed={recommended}
    >
      <span aria-hidden>{recommended ? '❤️' : '🤍'}</span>
      <span>{display} 추천</span>
    </button>
  );
}
