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

  // 상세 페이지 진입 = view +1. /hit/ 응답이 새 값을 돌려주므로 별도 GET 불필요.
  useEffect(() => {
    fetch(`https://abacus.jasoncameron.dev/hit/prompts-kr/view-${prompt.slug}`)
      .then(r => r.json())
      .then(d => setViews(typeof d?.value === 'number' ? d.value : null))
      .catch(() => {});
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
        <section className="rounded border bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold">변수 채우기</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {variables.map(v => (
              <label key={v.name} className="block">
                <span className="text-xs text-slate-600">
                  <code className="rounded bg-slate-100 px-1">[{v.name}]</code> {v.label}
                </span>
                <input
                  type="text"
                  value={values[v.name] ?? ''}
                  onChange={e => setValues(s => ({ ...s, [v.name]: e.target.value }))}
                  className="mt-1 w-full rounded border px-2 py-1 text-sm"
                  placeholder={v.label}
                />
              </label>
            ))}
          </div>
        </section>
      )}

      <section className="rounded border bg-white">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <span className="text-xs font-medium text-slate-600">
            {variables.length > 0 ? '치환된 프롬프트' : '프롬프트'}
          </span>
          <button
            onClick={copy}
            className="rounded border bg-slate-50 px-3 py-1 text-xs font-medium hover:bg-slate-100"
          >
            {copied ? '복사됨 ✓' : '복사'}
          </button>
        </div>
        <pre className="overflow-x-auto whitespace-pre-wrap p-4 text-sm leading-relaxed text-slate-800">
{rendered}
        </pre>
      </section>
    </div>
  );
}
