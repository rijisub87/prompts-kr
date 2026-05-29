import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const CATEGORIES = [
  'writing', 'summary', 'code', 'analysis', 'translation', 'learning',
  'planning', 'image', 'email', 'cover-letter', 'report', 'edu-parent', 'etc',
] as const;
export type Category = typeof CATEGORIES[number];

export const CATEGORY_KO: Record<Category, string> = {
  writing:      '작문',
  summary:      '요약',
  code:         '코딩',
  analysis:     '분석',
  translation:  '번역',
  learning:     '학습',
  planning:     '기획',
  image:        '이미지 생성',
  email:        '이메일',
  'cover-letter': '자소서·면접',
  report:       '보고서·회의록',
  'edu-parent': '학부모·교사',
  etc:          '기타',
};

export const PLATFORMS = [
  '공통', 'Claude', 'ChatGPT', 'Gemini', 'Midjourney', 'Stable Diffusion',
] as const;
export type Platform = typeof PLATFORMS[number];

export type Variable = { name: string; label: string };

export type PromptSource = {
  name: string;
  url: string;
  author?: string;
};

export type PromptMeta = {
  title: string;
  slug: string;
  category: Category;
  platform: Platform[];
  language: '영문' | '한국어';
  formality?: '격식체' | '평어체' | null;
  charLimit?: number | null;
  source: PromptSource;
  variables?: Variable[];
  addedAt?: string;  // YYYY-MM-DD — 정렬·"New" 배지 기준
};

export type Prompt = PromptMeta & {
  body: string;        // 원본 프롬프트 본문 (코드블록 안)
  tipHtml: string;     // 사용 팁 (HTML)
};

const CONTENT_DIR = path.join(process.cwd(), 'content', 'prompts');

import { marked } from 'marked';

function parsePrompt(filePath: string): Prompt {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const meta = data as PromptMeta;

  // content 안에서 첫 번째 fenced code block을 원본 프롬프트로,
  // 나머지를 사용 팁으로 분리.
  const fenceMatch = content.match(/```[a-zA-Z]*\n([\s\S]*?)```/);
  const body = fenceMatch ? fenceMatch[1].trim() : '';
  const tipMd = content.replace(/```[a-zA-Z]*\n[\s\S]*?```/, '').trim();
  const tipHtml = marked.parse(tipMd, { async: false }) as string;

  return { ...meta, body, tipHtml };
}

export function getAllPrompts(): Prompt[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
  return files.map(f => parsePrompt(path.join(CONTENT_DIR, f)));
}

export function getPromptBySlug(slug: string): Prompt | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return parsePrompt(filePath);
}

export function getPromptsByCategory(): Record<Category, Prompt[]> {
  const all = getAllPrompts();
  const grouped: Record<string, Prompt[]> = {};
  for (const c of CATEGORIES) grouped[c] = [];
  for (const p of all) {
    if (grouped[p.category]) grouped[p.category].push(p);
  }
  return grouped as Record<Category, Prompt[]>;
}

// 본문에 [변수] 패턴 자동 감지 — frontmatter variables가 없을 때 보조.
export function detectVariables(body: string): string[] {
  const re = /\[([가-힣A-Za-z0-9_]+)\]/g;
  const found = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = re.exec(body))) found.add(m[1]);
  return Array.from(found);
}

// YAML이 `2026-05-29`를 Date 객체로 파싱하는 경우가 있어 항상 문자열 강제.
function asDateStr(v: unknown): string {
  if (!v) return '';
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v);
}

// addedAt 내림차순 정렬. addedAt 없으면 슬러그로 안정 정렬.
export function sortByNewest(prompts: Prompt[]): Prompt[] {
  return [...prompts].sort((a, b) => {
    const da = asDateStr(a.addedAt);
    const db = asDateStr(b.addedAt);
    if (db !== da) return db.localeCompare(da);
    return a.slug.localeCompare(b.slug);
  });
}

// "New" 배지 — addedAt이 오늘 ± NEW_WINDOW_DAYS 이내면 true.
export const NEW_WINDOW_DAYS = 7;
export function isNew(addedAt: string | undefined | Date, today = new Date()): boolean {
  const s = asDateStr(addedAt);
  if (!s) return false;
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return false;
  const diff = (today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff < NEW_WINDOW_DAYS;
}
