import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { Category } from './prompts';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'guides');

export type GuideMeta = {
  title: string;
  slug: string;
  category: Category;        // 관련 프롬프트 카테고리 (1:1 또는 첫 매칭)
  summary: string;            // 검색 결과·카드용 요약 (1~2줄)
  updatedAt?: string;         // YYYY-MM-DD
};

export type Guide = GuideMeta & {
  bodyHtml: string;
};

function parseGuide(filePath: string): Guide {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const meta = data as GuideMeta;
  const bodyHtml = marked.parse(content, { async: false }) as string;
  return { ...meta, bodyHtml };
}

export function getAllGuides(): Guide[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs.readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => parseGuide(path.join(CONTENT_DIR, f)));
}

export function getGuideBySlug(slug: string): Guide | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return parseGuide(filePath);
}
