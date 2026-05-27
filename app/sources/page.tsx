import { getAllPrompts } from '@/lib/prompts';

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
      <p className="mt-2 text-sm text-slate-600">
        모든 프롬프트는 아래 공개 출처에서 큐레이션되었으며, 각 항목 페이지에 원본 링크가 표기됩니다.
      </p>
      <ul className="mt-6 space-y-3">
        {entries.map(([name, info]) => (
          <li key={name} className="rounded border bg-white p-4">
            <div className="flex items-center justify-between">
              <a
                href={info.url}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-emerald-700 hover:underline"
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
