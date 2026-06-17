// 묶음 큐레이션 — 상황·목적별로 프롬프트 슬러그를 모은 컬렉션.
// 슬러그가 실제 존재하는지는 페이지에서 getPromptBySlug로 검증(없으면 자동 제외).

export type Collection = {
  slug: string;          // URL: /collections/<slug>
  title: string;
  description: string;
  emoji?: string;        // 카드 affordance용 (장식 최소)
  promptSlugs: string[]; // 포함 프롬프트
};

export const COLLECTIONS: Collection[] = [
  {
    slug: 'job-season',
    title: '자소서·면접 시즌 프롬프트',
    description: '자기소개서 작성부터 모의 면접까지 — 취업 시즌에 바로 쓰는 프롬프트 모음.',
    promptSlugs: [
      'cover-letter-k-star-k',
      'cover-letter-kstark-star-3',
      'cover-letter-1min-psr',
      'cover-letter-ai-style-fix',
      'cover-letter-mock-interview',
      'planning-interview-question-crafter',
      'planning-job-interviewer',
    ],
  },
  {
    slug: 'work-docs',
    title: '직장인 문서 작성 세트',
    description: '보고서·회의록·이메일·PPT까지 — 업무 문서를 빠르게 끝내는 프롬프트.',
    promptSlugs: [
      'summary-meeting-costar-pro',
      'report-2pager',
      'report-korean-weekly',
      'email-goal-tone-rules',
      'email-polite-refusal',
      'ppt-30-10-ppt',
      'writing-final-summary-readable',
    ],
  },
  {
    slug: 'stock-investor',
    title: '주식 투자자 프롬프트',
    description: '시장 분석·종목 펀더멘털·어닝콜·공시·투자 일지 — 판단 재료를 만드는 프롬프트.',
    promptSlugs: [
      'research-daily-market-report',
      'analysis-stock-fundamentals',
      'summary-earnings-call',
      'summary-dart-disclosure',
      'planning-investment-journal',
    ],
  },
  {
    slug: 'ai-coding-agent',
    title: 'AI 코딩 에이전트 운영',
    description: 'Claude Code·Cursor 등 코딩 에이전트를 잘 부리는 시스템 프롬프트·규칙 모음.',
    promptSlugs: [
      'code-karpathy-think-before-coding',
      'code-no-overengineering-rule',
      'agents-act-when-ready',
      'agents-autonomous-no-stop',
      'agents-evidence-based-progress',
      'agents-subagent-verify-loop',
      'agents-diagnose-only-boundary',
      'writing-final-summary-readable',
    ],
  },
  {
    slug: 'study-booster',
    title: '학습·시험 공부 부스터',
    description: '개념 이해부터 암기·요약까지 — 공부 효율을 끌어올리는 프롬프트.',
    promptSlugs: [
      'learning-feynman-tutor',
      'summary-chain-of-density',
      'learning-spaced-vocabulary',
      'summary-2-secondgrade-simplifier',
    ],
  },
];

export function getCollection(slug: string): Collection | null {
  return COLLECTIONS.find(c => c.slug === slug) ?? null;
}
