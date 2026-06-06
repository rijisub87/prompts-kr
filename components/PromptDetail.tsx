'use client';

import { Fragment, useEffect, useMemo, useState } from 'react';
import type { Prompt, Variable } from '@/lib/prompts';

// 변수 이름에 다음 키워드가 포함되면 멀티라인 입력으로 — 긴 텍스트가 들어오는 슬롯.
const LONG_VAR_HINTS = ['TEXT', 'SUBTITLE', 'BODY', 'CONTENT', 'ARTICLE', 'PARAGRAPH', '본문', '내용'];
function isLongVar(name: string): boolean {
  const upper = name.toUpperCase();
  return LONG_VAR_HINTS.some(h => upper.includes(h));
}

// 본문 [VAR] 자동 감지 — lib/prompts.ts와 동일 로직. 클라이언트 번들 가볍게 인라인.
function detectVariables(body: string): string[] {
  const re = /\[([가-힣A-Za-z0-9_]+)\]/g;
  const found = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = re.exec(body))) found.add(m[1]);
  return Array.from(found);
}

export default function PromptDetail({ prompt }: { prompt: Prompt }) {
  // frontmatter에 variables가 비어 있으면 본문 [VAR] 패턴에서 자동 감지.
  // name·label이 숫자로 파싱될 수도 있어 항상 String 강제.
  const variables: Variable[] = useMemo(() => {
    if (prompt.variables && prompt.variables.length > 0) {
      return prompt.variables.map(v => ({
        name: String(v.name),
        label: String(v.label ?? v.name),
      }));
    }
    return detectVariables(prompt.body).map(name => ({ name, label: name }));
  }, [prompt.variables, prompt.body]);

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

  // 치환된 본문 (미입력은 [VAR] 그대로). 클립보드 복사용.
  const rendered = useMemo(() => {
    let out = prompt.body;
    for (const v of variables) {
      const filled = values[v.name];
      if (!filled) continue;
      out = out.split(`[${v.name}]`).join(filled);
    }
    return out;
  }, [prompt.body, variables, values]);

  // 미입력 [VAR]만 하이라이트한 React 노드 — 화면 표시용.
  const previewNodes = useMemo(() => {
    if (variables.length === 0) return [prompt.body];
    const pattern = new RegExp(
      `\\[(${variables.map(v => v.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\]`,
      'g',
    );
    const parts: (string | { name: string })[] = [];
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = pattern.exec(prompt.body)) !== null) {
      if (m.index > last) parts.push(prompt.body.slice(last, m.index));
      parts.push({ name: m[1] });
      last = m.index + m[0].length;
    }
    if (last < prompt.body.length) parts.push(prompt.body.slice(last));
    return parts.map((part, i) => {
      if (typeof part === 'string') return <Fragment key={i}>{part}</Fragment>;
      const filled = values[part.name];
      if (filled) return <Fragment key={i}>{filled}</Fragment>;
      return (
        <mark
          key={i}
          className="rounded bg-amber-200 px-1 text-amber-900 dark:bg-amber-900/60 dark:text-amber-100"
        >
          [{part.name}]
        </mark>
      );
    });
  }, [prompt.body, variables, values]);

  const filledCount = variables.filter(v => values[v.name]?.trim()).length;
  const allFilled = variables.length > 0 && filledCount === variables.length;

  const copy = async () => {
    await navigator.clipboard.writeText(rendered);
    setCopied(true);
    fetch('https://abacus.jasoncameron.dev/hit/prompts-kr/copies').catch(() => {});
    setTimeout(() => setCopied(false), 1500);
  };

  const reset = () => {
    setValues(Object.fromEntries(variables.map(v => [v.name, ''])));
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
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold">
              변수 채우기
              <span
                className={
                  allFilled
                    ? 'ml-2 rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                    : 'ml-2 rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }
              >
                {filledCount}/{variables.length} 채움
              </span>
            </h3>
            {filledCount > 0 && (
              <button
                onClick={reset}
                className="text-xs text-slate-500 hover:text-slate-700 hover:underline dark:hover:text-slate-300"
              >
                초기화
              </button>
            )}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {variables.map(v => {
              const long = isLongVar(v.name);
              return (
                <label key={v.name} className={long ? 'block sm:col-span-2' : 'block'}>
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">[{v.name}]</code> {v.label}
                  </span>
                  {long ? (
                    <textarea
                      value={values[v.name] ?? ''}
                      onChange={e => setValues(s => ({ ...s, [v.name]: e.target.value }))}
                      rows={4}
                      className="mt-1 w-full rounded border px-2 py-1 font-mono text-xs leading-relaxed dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                      placeholder={v.label}
                    />
                  ) : (
                    <input
                      type="text"
                      value={values[v.name] ?? ''}
                      onChange={e => setValues(s => ({ ...s, [v.name]: e.target.value }))}
                      className="mt-1 w-full rounded border px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                      placeholder={v.label}
                    />
                  )}
                </label>
              );
            })}
          </div>
        </section>
      )}

      <section className="rounded border bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b px-4 py-2 dark:border-slate-800">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
            {variables.length > 0
              ? allFilled ? '✅ 치환 완료된 프롬프트' : '미입력 변수는 노란 표시'
              : '프롬프트'}
          </span>
          <button
            onClick={copy}
            className="rounded border bg-slate-50 px-3 py-1 text-xs font-medium hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            {copied ? '복사됨 ✓' : '복사'}
          </button>
        </div>
        <pre className="overflow-x-auto whitespace-pre-wrap p-4 text-sm leading-relaxed text-slate-800 dark:text-slate-200">
          {previewNodes}
        </pre>
      </section>
    </div>
  );
}
