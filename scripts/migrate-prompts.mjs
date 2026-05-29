// 3개 research .md 파일을 파싱해 content/prompts/<slug>.md 시드 생성.
// 실행: node scripts/migrate-prompts.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(REPO_ROOT, 'content', 'prompts');

const SOURCE_FILES = [
  'C:/Users/User/Documents/Claude/게임재테크/docs/prompts-research/initial-collection.md',
  'C:/Users/User/Documents/Claude/게임재테크/docs/prompts-research/korean-sources.md',
  'C:/Users/User/Documents/Claude/게임재테크/docs/prompts-research/korean-deepdive.md',
  'C:/Users/User/Documents/Claude/게임재테크/docs/prompts-research/image-prompts.md',
];

const CAT_MAP = {
  '작문': 'writing',
  '요약': 'summary',
  '코딩': 'code',
  '분석': 'analysis',
  '번역': 'translation',
  '학습': 'learning',
  '기획': 'planning',
  '이미지 생성': 'image',
  '이미지': 'image',
  '이메일': 'email',
  '자소서·면접': 'cover-letter',
  '보고서·회의록': 'report',
  '학부모·교사 소통': 'edu-parent',
  '학부모·교사': 'edu-parent',
  '기타': 'etc',
};

function parseEntry(block) {
  // 첫 ## 제목 라인
  const titleMatch = block.match(/^##\s+(.+?)\s*$/m);
  if (!titleMatch) return null;
  const title = titleMatch[1].trim();

  const catMatch = block.match(/\*\*카테고리\*\*\s*:\s*(.+?)\s*$/m);
  const platMatch = block.match(/\*\*추천\s*플랫폼\*\*\s*:\s*(.+?)\s*$/m);
  const srcMatch = block.match(/\*\*출처\*\*\s*:\s*(.+?)\s*$/m);

  if (!catMatch) return null;
  const catKo = catMatch[1].trim();
  const catSlug = CAT_MAP[catKo] ?? 'etc';

  // platforms: split by , or / and trim
  const platRaw = platMatch ? platMatch[1].trim() : '공통';
  const platforms = platRaw
    .split(/[,\/]/)
    .map(s => s.trim())
    .filter(Boolean);

  // 출처: "NAME — URL" or "NAME (author) — URL"
  let sourceName = '미상';
  let sourceUrl = '';
  if (srcMatch) {
    const src = srcMatch[1].trim();
    const m = src.match(/^(.+?)\s*[—–-]\s*(https?:\/\/\S+)/);
    if (m) {
      sourceName = m[1].trim();
      sourceUrl = m[2].trim();
    } else {
      sourceName = src;
    }
  }

  // 본문 코드블록 — "**원본 프롬프트**:" 다음 ``` 안.
  const bodyMatch = block.match(/\*\*원본\s*프롬프트\*\*\s*:\s*\n+```[a-zA-Z]*\n([\s\S]*?)```/);
  if (!bodyMatch) return null;
  const body = bodyMatch[1].trim();

  // 사용 팁 — "**사용 팁**:" 다음 단락 (다음 --- 또는 ## 전까지).
  const tipMatch = block.match(/\*\*사용\s*팁\*\*\s*:\s*\n+([\s\S]+?)(?=\n---|\n##|$)/);
  const tip = tipMatch ? tipMatch[1].trim() : '';

  // 언어 추정 — 본문에 한글 있으면 한국어
  const language = /[가-힯]/.test(body) ? '한국어' : '영문';

  // [변수] 자동 감지
  const varRe = /\[([가-힣A-Za-z0-9_]+)\]/g;
  const found = new Set();
  let mm;
  while ((mm = varRe.exec(body))) found.add(mm[1]);
  const variables = Array.from(found).map(name => ({ name, label: name }));

  return {
    title, catSlug, catKo, platforms, sourceName, sourceUrl,
    body, tip, language, variables,
  };
}

function slugify(title, catSlug, idx) {
  // 영문/숫자만 추출해서 카테고리 + 짧은 ident + 시퀀스
  // Korean titles로 안전한 ASCII slug 만들기 위해 카테고리 + idx 사용.
  const asciiPart = title
    .replace(/[^A-Za-z0-9 ]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .slice(0, 30);
  if (asciiPart) return `${catSlug}-${asciiPart}`.slice(0, 60);
  return `${catSlug}-${String(idx).padStart(3, '0')}`;
}

function yamlEscape(s) {
  // 콜론, 따옴표 등 특수문자 들어가면 따옴표로 감쌈
  if (!s) return '""';
  if (/[:#'"\[\]{}&*!|>%@`,]/.test(s) || s.includes('\n')) {
    return JSON.stringify(s);  // 안전한 JSON 문자열로 (유효 YAML)
  }
  return s;
}

// 모든 시드 프롬프트는 사이트 런칭일로 통일 — 이후 cron이 추가하는 항목만
// 더 최신 날짜로 "New" 배지 받음.
const SEED_ADDED_AT = '2026-05-29';

function toMarkdown(p) {
  const lines = [
    '---',
    `title: ${yamlEscape(p.title)}`,
    `slug: ${p.slug}`,
    `category: ${p.catSlug}`,
    `platform: [${p.platforms.map(x => yamlEscape(x)).join(', ')}]`,
    `language: ${p.language}`,
    `addedAt: ${SEED_ADDED_AT}`,
    `source:`,
    `  name: ${yamlEscape(p.sourceName)}`,
    `  url: ${p.sourceUrl || '""'}`,
  ];
  if (p.variables.length > 0) {
    lines.push('variables:');
    for (const v of p.variables) {
      lines.push(`  - { name: ${yamlEscape(v.name)}, label: ${yamlEscape(v.label)} }`);
    }
  } else {
    lines.push('variables: []');
  }
  lines.push('---', '');
  lines.push('```');
  lines.push(p.body);
  lines.push('```', '');
  if (p.tip) lines.push(p.tip, '');
  return lines.join('\n');
}

// --- main ---

// 기존 content/prompts 비우기 (시드 5개 포함 전부 새로 생성)
if (fs.existsSync(OUT_DIR)) {
  for (const f of fs.readdirSync(OUT_DIR)) {
    if (f.endsWith('.md')) fs.unlinkSync(path.join(OUT_DIR, f));
  }
} else {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

let total = 0;
const catCounters = {};
const usedSlugs = new Set();

for (const file of SOURCE_FILES) {
  const raw = fs.readFileSync(file, 'utf8');
  // --- 로 entry 분리. 첫 헤더 영역은 ## 가 없으니 자연스럽게 스킵됨.
  const chunks = raw.split(/\n---\n/);
  for (const chunk of chunks) {
    if (!/^##\s/m.test(chunk)) continue;
    const parsed = parseEntry(chunk);
    if (!parsed) continue;

    catCounters[parsed.catSlug] = (catCounters[parsed.catSlug] ?? 0) + 1;
    let slug = slugify(parsed.title, parsed.catSlug, catCounters[parsed.catSlug]);
    if (usedSlugs.has(slug)) {
      slug = `${slug}-${catCounters[parsed.catSlug]}`;
    }
    usedSlugs.add(slug);
    parsed.slug = slug;

    const md = toMarkdown(parsed);
    fs.writeFileSync(path.join(OUT_DIR, `${slug}.md`), md, 'utf8');
    total += 1;
  }
}

console.log(`Wrote ${total} prompt files to ${OUT_DIR}`);
console.log('Per category:');
for (const [k, v] of Object.entries(catCounters).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k}: ${v}`);
}
