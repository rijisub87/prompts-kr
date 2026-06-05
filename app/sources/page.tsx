import type { Metadata } from 'next';
import { getAllPrompts } from '@/lib/prompts';

export const metadata: Metadata = {
  title: '출처 모음 — 큐레이션한 200+ 프롬프트의 원본 출처',
  description: 'Anthropic, OpenAI, GitHub, 한국 블로그 등 모든 큐레이션 프롬프트의 원본 출처를 한 페이지에 모았습니다.',
};

export default function Sources() {
  const prompts = getAllPrompts();
  const map = new Map<string, { url: string; count: number; author?: string }>();
  for (const p of prompts) {
    const key = p.source.name;
    const cur = map.get(key) ?? { url: p.source.url, count: 0, author: p.source.author };
    cur.count += 1;
    map.set(key, cur);
  }
  const entries = Array.from(map.entries()).sort((a, b) => b[1].count - a[1].count);

  return (
    <div>
      <h1 className="text-2xl font-bold">출처 ({entries.length})</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        모든 프롬프트는 아래 공개 출처에서 큐레이션되었으며, 각 항목 페이지에 원본 링크가 표기됩니다.
      </p>
      <ul className="mt-6 space-y-3">
        {entries.map(([name, info]) => (
          <li key={name} className="rounded border bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <a
                href={info.url}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-emerald-700 hover:underline dark:text-emerald-400"
              >
                {name}
              </a>
              <span className="text-xs text-slate-500">{info.count}개</span>
            </div>
            {info.author && <p className="mt-1 text-xs text-slate-500">{info.author}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
