// 빌드 시 content/prompts/*.md에서 검색 인덱스 추출 → public/search-index.json.
// 클라이언트는 이 파일을 fetch해서 Fuse.js로 즉시 매칭.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(REPO_ROOT, 'content', 'prompts');
const OUT = path.join(REPO_ROOT, 'public', 'search-index.json');

const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
const items = files.map(f => {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, f), 'utf8');
  const { data, content } = matter(raw);
  // 본문 + 사용 팁 통합 텍스트 (검색 매칭용)
  const text = content.replace(/```[\s\S]*?```/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 500);
  const platforms = Array.isArray(data.platform) ? data.platform.join(' ') : '';
  return {
    slug: data.slug,
    title: data.title,
    category: data.category,
    platforms,
    source: data.source?.name ?? '',
    text,
  };
});

fs.writeFileSync(OUT, JSON.stringify(items), 'utf8');
console.log(`Wrote search index: ${items.length} items → ${OUT}`);
