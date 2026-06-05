'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Prompt } from '@/lib/prompts';

export default function PromptDetail({ prompt }: { prompt: Prompt }) {
  const variables = prompt.variables ?? [];
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(variables.map(v => [v.name, ''])),
  );
  const [copied, setCopied] = useState(false);
  const [views, setViews] = useState<number | null>(null);

  // 상세 페이지 진입 = view +1. 자체 API(/api/view)가 Upstash incr 후 새 값 반환.
  useEffect(() => {
    fetch('/api/view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: prompt.slug }),
    })
      .then(r => r.json())
      .then(d => setViews(typeof d?.views === 'number' ? d.views : null))
      .catch(() => {});

    // 최근 본 프롬프트 — localStorage에 최대 8개. (홈의 RecentlyViewed가 읽음)
    try {
      const KEY = 'recent_views';
      const raw = localStorage.getItem(KEY);
      const list: string[] = raw ? JSON.parse(raw) : [];
      const filtered = list.filter(s => s !== prompt.slug);
      filtered.unshift(prompt.slug);
      localStorage.setItem(KEY, JSON.stringify(filtered.slice(0, 8)));
    } catch {
      // localStorage 거부 모드 — 무시
    }
  }, [prompt.slug]);

  // [변수] 패턴 치환 — 미입력은 그대로 두어 사용자가 어디를 채울지 보이게 함.
  const rendered = useMemo(() => {
    let out = prompt.body;
    for (const v of variables) {
      const filled = values[v.name];
      if (!filled) continue;
      out = out.split(`[${v.name}]`).join(filled);
    }
    return out;
  }, [prompt.body, variables, values]);

  const copy = async () => {
    await navigator.clipboard.writeText(rendered);
    setCopied(true);
    // 복사 카운터 증가 (실패해도 UX 무관)
    fetch('https://abacus.jasoncameron.dev/hit/prompts-kr/copies').catch(() => {});
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      {views != null && (
        <div className="text-xs text-slate-500">
          👁️ {views.toLocaleString('ko-KR')} views
        </div>
      )}

      {variables.length > 0 && (
        <section className="rounded border bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-3 text-sm font-semibold">변수 채우기</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {variables.map(v => (
              <label key={v.name} className="block">
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">[{v.name}]</code> {v.label}
                </span>
                <input
                  type="text"
                  value={values[v.name] ?? ''}
                  onChange={e => setValues(s => ({ ...s, [v.name]: e.target.value }))}
                  className="mt-1 w-full rounded border px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                  placeholder={v.label}
                />
              </label>
            ))}
          </div>
        </section>
      )}

      <section className="rounded border bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b px-4 py-2 dark:border-slate-800">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
            {variables.length > 0 ? '치환된 프롬프트' : '프롬프트'}
          </span>
          <button
            onClick={copy}
            className="rounded border bg-slate-50 px-3 py-1 text-xs font-medium hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            {copied ? '복사됨 ✓' : '복사'}
          </button>
        </div>
        <pre className="overflow-x-auto whitespace-pre-wrap p-4 text-sm leading-relaxed text-slate-800 dark:text-slate-200">
{rendered}
        </pre>
      </section>
    </div>
  );
}
