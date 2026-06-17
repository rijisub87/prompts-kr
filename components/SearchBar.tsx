'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type Fuse from 'fuse.js'; // 타입만 — 런타임 번들엔 미포함(첫 focus 시 동적 로드)

type Item = {
  slug: string;
  title: string;
  category: string;
  platforms: string;
  source: string;
  text: string;
};

const CATEGORY_KO: Record<string, string> = {
  writing: '작문', summary: '요약', code: '코딩', analysis: '분석',
  translation: '번역', learning: '학습', planning: '기획', image: '이미지',
  email: '이메일', 'cover-letter': '자소서', report: '보고서', ppt: 'PPT',
  'edu-parent': '학부모', data: '데이터·연구', research: '조사', agents: '에이전트',
  etc: '기타',
};

const CATEGORY_PILL: Record<string, string> = {
  writing: 'bg-pink-50 text-pink-700 dark:bg-pink-950/40 dark:text-pink-300',
  summary: 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300',
  code: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
  analysis: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
  translation: 'bg-lime-50 text-lime-700 dark:bg-lime-950/40 dark:text-lime-300',
  learning: 'bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300',
  planning: 'bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300',
  image: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-300',
  email: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300',
  'cover-letter': 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300',
  report: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300',
  ppt: 'bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300',
  'edu-parent': 'bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-950/40 dark:text-fuchsia-300',
  data: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
  research: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300',
  agents: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300',
  etc: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
};

export default function SearchBar() {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [fuse, setFuse] = useState<Fuse<Item> | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);  // 키보드 하이라이트 인덱스
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const loadedRef = useRef(false);

  // 첫 focus(또는 / 단축키) 시점에만 Fuse.js + 검색 인덱스를 로드 — 첫 진입 속도 확보.
  async function ensureLoaded() {
    if (loadedRef.current) return;
    loadedRef.current = true;
    try {
      const [{ default: FuseCtor }, data] = await Promise.all([
        import('fuse.js'),
        fetch('/search-index.json').then(r => r.json()) as Promise<Item[]>,
      ]);
      setItems(data);
      setFuse(new FuseCtor(data, {
        keys: [
          { name: 'title', weight: 3 },
          { name: 'category', weight: 2 },
          { name: 'platforms', weight: 1 },
          { name: 'source', weight: 1 },
          { name: 'text', weight: 1 },
        ],
        threshold: 0.4,
        ignoreLocation: true,
      }));
    } catch {
      loadedRef.current = false; // 실패 시 재시도 허용
    }
  }

  // 바깥 클릭 시 결과 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, []);

  // 글로벌 "/" 단축키 — 입력 필드에 포커스 중이 아닐 때만 작동.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      const tag = t?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (t && t.isContentEditable)) return;
      e.preventDefault();
      void ensureLoaded();
      inputRef.current?.focus();
      setOpen(true);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const results = useMemo(
    () => (fuse && q.trim() ? fuse.search(q, { limit: 12 }).map(r => r.item) : []),
    [fuse, q],
  );

  // 결과 목록이 바뀌면 하이라이트를 첫 줄로 리셋.
  useEffect(() => {
    setActive(0);
  }, [results]);

  // 키보드 이동 시 하이라이트된 항목을 뷰에 스크롤.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-i="${active}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      setOpen(false);
      inputRef.current?.blur();
      return;
    }
    if (!open || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = results[active];
      if (target) {
        router.push(`/p/${target.slug}`);
        setOpen(false);
        setQ('');
      }
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActive(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActive(results.length - 1);
    }
  }

  return (
    <div ref={wrapRef} className="relative w-full max-w-md">
      <div className="relative">
        <input
          ref={inputRef}
          type="search"
          value={q}
          onChange={e => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => { void ensureLoaded(); setOpen(true); }}
          onKeyDown={onKeyDown}
          placeholder={items.length ? `프롬프트 검색 (${items.length})` : '프롬프트 검색'}
          role="combobox"
          aria-expanded={open && q.trim().length > 0}
          aria-controls="search-results"
          aria-activedescendant={results[active] ? `search-result-${active}` : undefined}
          aria-autocomplete="list"
          className="w-full rounded border bg-white px-3 py-1.5 pr-8 text-sm placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
        />
        {/* 키보드 힌트 — 빈 입력일 때만 노출 */}
        {!q && (
          <kbd
            className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border bg-slate-50 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 sm:block dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
            aria-hidden
          >
            /
          </kbd>
        )}
      </div>
      {open && q.trim() && (
        <div
          id="search-results"
          role="listbox"
          className="absolute left-0 right-0 top-full z-30 mt-1 max-h-96 overflow-y-auto rounded border bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900"
        >
          {results.length === 0 ? (
            <p className="p-4 text-center text-sm text-slate-500">결과 없음</p>
          ) : (
            <ul ref={listRef}>
              {results.map((item, i) => {
                const isActive = i === active;
                return (
                  <li key={item.slug}>
                    <Link
                      id={`search-result-${i}`}
                      data-i={i}
                      href={`/p/${item.slug}`}
                      role="option"
                      aria-selected={isActive}
                      onClick={() => { setOpen(false); setQ(''); }}
                      onMouseEnter={() => setActive(i)}
                      className={
                        isActive
                          ? 'block border-b bg-emerald-50 px-3 py-2 last:border-b-0 dark:border-slate-800 dark:bg-emerald-950/30'
                          : 'block border-b px-3 py-2 last:border-b-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800'
                      }
                    >
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{item.title}</div>
                      <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
                        <span className={`rounded px-1.5 py-0.5 font-medium ${CATEGORY_PILL[item.category] ?? CATEGORY_PILL.etc}`}>
                          {CATEGORY_KO[item.category] ?? item.category}
                        </span>
                        {item.platforms && <span>{item.platforms}</span>}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
          {/* 키보드 힌트 푸터 */}
          {results.length > 0 && (
            <div className="border-t bg-slate-50 px-3 py-1.5 text-[10px] text-slate-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400">
              <kbd className="rounded border bg-white px-1 dark:border-slate-700 dark:bg-slate-800">↑</kbd>
              <kbd className="ml-0.5 rounded border bg-white px-1 dark:border-slate-700 dark:bg-slate-800">↓</kbd>
              <span className="ml-1">이동</span>
              <kbd className="ml-2 rounded border bg-white px-1 dark:border-slate-700 dark:bg-slate-800">Enter</kbd>
              <span className="ml-1">열기</span>
              <kbd className="ml-2 rounded border bg-white px-1 dark:border-slate-700 dark:bg-slate-800">Esc</kbd>
              <span className="ml-1">닫기</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
