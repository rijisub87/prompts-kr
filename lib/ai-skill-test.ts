// AI 활용 능력 시험 — 6개 능력 axis × 6개 직무 × 18문항 (각 axis 3문항).
// 빠른 6문항 / 보통 12문항 / 정밀 18문항.

export type AxisId =
  | 'promptDesign'
  | 'verify'
  | 'toolMix'
  | 'context'
  | 'ethics'
  | 'automation';

export type Axis = {
  id: AxisId;
  name: string;
  description: string;
  // 시각화용 색 — Tailwind bg-* 유틸. 결과 페이지 막대 색.
  bar: string;
};

export const AXES: Axis[] = [
  {
    id: 'promptDesign',
    name: '프롬프트 설계',
    description: '명확한 지시·예시·제약 조건으로 원하는 결과를 끌어내는 능력',
    bar: 'bg-emerald-500',
  },
  {
    id: 'verify',
    name: '결과 검증',
    description: 'AI 답변의 사실·근거를 교차확인하고 환각을 잡아내는 능력',
    bar: 'bg-amber-500',
  },
  {
    id: 'toolMix',
    name: '도구 조합',
    description: '용도에 맞는 모델·도구를 선택·조합하는 능력',
    bar: 'bg-violet-500',
  },
  {
    id: 'context',
    name: '컨텍스트 관리',
    description: '시스템 프롬프트·메모리·세션을 효율적으로 운영',
    bar: 'bg-sky-500',
  },
  {
    id: 'ethics',
    name: '윤리·리스크',
    description: '개인정보·저작권·편향·민감정보를 책임감 있게 다루는 능력',
    bar: 'bg-rose-500',
  },
  {
    id: 'automation',
    name: '자동화·반복',
    description: '템플릿·스크립트·배치로 반복 작업을 효율화하는 능력',
    bar: 'bg-indigo-500',
  },
];

export type JobId =
  | 'marketer'
  | 'planner'
  | 'developer'
  | 'designer'
  | 'sales'
  | 'student';

export type Job = {
  id: JobId;
  name: string;
  description: string;
  requirements: string[];
  // 0~3 가중치 — 직무 적합도 계산용. 합 18이 만점 가정.
  aiPriority: Record<AxisId, number>;
};

export const JOBS: Record<JobId, Job> = {
  marketer: {
    id: 'marketer',
    name: '마케터',
    description: '브랜드·캠페인·콘텐츠로 시장과 고객을 움직이는 일',
    requirements: [
      '시장·고객·트렌드를 빠르게 파악',
      '브랜드 톤에 맞는 카피·콘텐츠 작성',
      '캠페인 기획부터 결과 분석까지',
      '데이터로 다음 액션 결정',
    ],
    aiPriority: { promptDesign: 3, verify: 2, toolMix: 3, context: 2, ethics: 2, automation: 2 },
  },
  planner: {
    id: 'planner',
    name: '기획자 (PM·서비스기획)',
    description: '문제 정의부터 실행까지 — 사용자·비즈니스·기술을 잇는 일',
    requirements: [
      '문제·요구사항 명확히 정의',
      '여러 이해관계자의 입장 조율',
      '데이터·리서치로 가설 검증',
      '문서·발표로 합의 도출',
    ],
    aiPriority: { promptDesign: 3, verify: 3, toolMix: 2, context: 3, ethics: 2, automation: 1 },
  },
  developer: {
    id: 'developer',
    name: '개발자',
    description: '코드로 제품·시스템을 만들고 운영하는 일',
    requirements: [
      '요구사항을 코드로 정확히 옮기기',
      '버그·장애를 체계적으로 진단',
      '성능·보안·유지보수성 고려',
      '코드 리뷰·문서화로 협업',
    ],
    aiPriority: { promptDesign: 3, verify: 3, toolMix: 3, context: 2, ethics: 1, automation: 2 },
  },
  designer: {
    id: 'designer',
    name: '디자이너',
    description: '시각·UX로 사용자 경험을 설계하는 일',
    requirements: [
      '브랜드·콘셉트를 시각으로 번역',
      '사용자 흐름·인터랙션 설계',
      '실무자와 시각 자료로 소통',
      '트렌드와 본질 사이의 균형',
    ],
    aiPriority: { promptDesign: 3, verify: 1, toolMix: 3, context: 2, ethics: 3, automation: 2 },
  },
  sales: {
    id: 'sales',
    name: '영업',
    description: '고객과의 관계로 매출과 신뢰를 만드는 일',
    requirements: [
      '고객 상황·니즈를 빠르게 파악',
      '맞춤 제안·문서·메일 작성',
      'CRM·일정·후속 조치 관리',
      '경쟁사·시장 정보 수집',
    ],
    aiPriority: { promptDesign: 2, verify: 3, toolMix: 2, context: 2, ethics: 3, automation: 3 },
  },
  student: {
    id: 'student',
    name: '학생·취준생',
    description: '학습·연구·진로 준비 — AI를 동료처럼 쓰는 일',
    requirements: [
      '복잡한 개념을 자신의 언어로 이해',
      '리포트·자소서·발표 자료 작성',
      '근거 있는 정보·논문 탐색',
      '학업 윤리(표절·인용) 준수',
    ],
    aiPriority: { promptDesign: 2, verify: 3, toolMix: 2, context: 2, ethics: 3, automation: 1 },
  },
};

export const JOB_IDS = Object.keys(JOBS) as JobId[];

export type Question = {
  id: number;
  axis: AxisId;
  text: string;
  // 정답·중간·오답 — score는 항상 3·1·0.
  options: { label: string; score: 0 | 1 | 3 }[];
};

// 각 axis당 3문항 (난이도순). 빠른=첫 1개, 보통=첫 2개, 정밀=전부.
export const QUESTIONS: Question[] = [
  // === 프롬프트 설계 ===
  {
    id: 1,
    axis: 'promptDesign',
    text: 'AI에게 캠페인 결과 보고서 초안을 부탁한다. 가장 좋은 요청 방식은?',
    options: [
      { label: '"3개 캠페인 성과를 비교하는 1페이지 임원 보고서 — 핵심 결론, 데이터 표, 다음 행동 3개"', score: 3 },
      { label: '"캠페인 성과 보고서 정리해줘, 1페이지 정도로"', score: 1 },
      { label: '"보고서 써줘. 주제는 마케팅 캠페인 결과"', score: 0 },
    ],
  },
  {
    id: 2,
    axis: 'promptDesign',
    text: '같은 형식의 요청을 자주 반복해야 한다. 가장 효율적인 방식은?',
    options: [
      { label: '한 번 잘 만든 후 변수만 바꿔 재사용하는 템플릿', score: 3 },
      { label: '비슷한 옛 채팅을 복사해 그때그때 수정', score: 1 },
      { label: '매번 처음부터 새로 작성', score: 0 },
    ],
  },
  {
    id: 3,
    axis: 'promptDesign',
    text: '원하는 톤이 안 나올 때 가장 효과적인 조치는?',
    options: [
      { label: '원하는 톤의 예시 문장 2~3개를 함께 제시', score: 3 },
      { label: '"친근하게", "전문적으로" 같은 형용사 한 단어 추가', score: 1 },
      { label: '"더 자연스럽게 해줘"를 결과 볼 때마다 반복', score: 0 },
    ],
  },

  // === 결과 검증 ===
  {
    id: 4,
    axis: 'verify',
    text: 'AI가 특정 통계 수치를 답했다. 그대로 본인 자료에 쓰기 전 첫 번째 행동은?',
    options: [
      { label: '신뢰 가능한 외부 출처(원 기관·논문 등)에서 같은 수치 확인', score: 3 },
      { label: 'AI에게 "확실해?"를 한 번 더 물어 확인', score: 1 },
      { label: '시간이 없으니 그대로 사용', score: 0 },
    ],
  },
  {
    id: 5,
    axis: 'verify',
    text: 'AI가 인용한 책·논문 제목을 본인 글에 옮기려 한다.',
    options: [
      { label: '검색해서 해당 책·논문이 실제 존재하는지 직접 확인', score: 3 },
      { label: 'AI에 ISBN이나 DOI를 한 번 더 물어본다', score: 1 },
      { label: '그대로 인용 (AI가 만든 거니 정확할 것)', score: 0 },
    ],
  },
  {
    id: 6,
    axis: 'verify',
    text: 'AI 답변에서 미묘하게 의심스러운 부분을 발견했다.',
    options: [
      { label: '추가 근거 요청 또는 다른 모델에 같은 질문으로 교차 검증', score: 3 },
      { label: '같은 모델에 같은 질문을 다시 한 번 한다', score: 1 },
      { label: '시간이 없어 일단 사용', score: 0 },
    ],
  },

  // === 도구 조합 ===
  {
    id: 7,
    axis: 'toolMix',
    text: '긴 PDF에서 핵심만 빠르게 뽑고 싶다.',
    options: [
      { label: '파일 업로드를 지원하는 모델(Claude·GPT 등)에 직접 업로드', score: 3 },
      { label: '일반 채팅 창에 텍스트를 복사·붙여넣기', score: 1 },
      { label: 'AI는 PDF 처리를 못 한다고 생각해 직접 읽는다', score: 0 },
    ],
  },
  {
    id: 8,
    axis: 'toolMix',
    text: '여러 AI 모델(Claude, ChatGPT, Gemini)을 본인은 어떻게 사용하나?',
    options: [
      { label: '용도(긴 글·코드·검색·이미지)에 따라 골라 쓴다', score: 3 },
      { label: '사람들이 좋다는 것을 따라 그때그때 바꾼다', score: 1 },
      { label: '한 모델만 쭉 쓴다', score: 0 },
    ],
  },
  {
    id: 9,
    axis: 'toolMix',
    text: '한 모델의 결과가 만족스럽지 않을 때 더 나은 다음 단계는?',
    options: [
      { label: '다른 모델 또는 다른 접근(분해·예시 추가·역할 부여)으로 재시도', score: 3 },
      { label: '같은 모델에 같은 프롬프트를 한 번 더 보낸다', score: 1 },
      { label: '거기서 멈추고 직접 한다', score: 0 },
    ],
  },

  // === 컨텍스트 관리 ===
  {
    id: 10,
    axis: 'context',
    text: '새 프로젝트나 반복 업무를 시작할 때 가장 좋은 습관은?',
    options: [
      { label: '시스템 프롬프트·프로젝트 컨텍스트를 한 번 잘 세팅하고 시작', score: 3 },
      { label: '대화 시작할 때마다 처음부터 맥락을 매번 설명', score: 1 },
      { label: '맥락 없이 바로 본론으로 질문', score: 0 },
    ],
  },
  {
    id: 11,
    axis: 'context',
    text: '한 채팅에서 주제가 크게 바뀌어야 한다 (예: 코드 → 글쓰기).',
    options: [
      { label: '새 채팅을 시작해 컨텍스트를 분리한다', score: 3 },
      { label: '같은 채팅에서 "이제 다른 주제야"를 명시하고 이어간다', score: 1 },
      { label: '같은 채팅에서 그대로 이어간다', score: 0 },
    ],
  },
  {
    id: 12,
    axis: 'context',
    text: '회사 자료(가이드·정책 등)를 AI에 참고시키고 싶다.',
    options: [
      { label: '프로젝트/지식베이스 기능에 한 번 업로드해 두고 계속 참조', score: 3 },
      { label: '필요할 때마다 본문에 복사·붙여넣기', score: 1 },
      { label: '아예 활용 안 한다', score: 0 },
    ],
  },

  // === 윤리·리스크 ===
  {
    id: 13,
    axis: 'ethics',
    text: '고객 개인정보가 포함된 자료를 AI로 분석하려 한다.',
    options: [
      { label: '이름·연락처 등 식별 정보를 가명화·익명화한 후 입력', score: 3 },
      { label: '일부 정보만 가리고 나머지 그대로 입력', score: 1 },
      { label: '그대로 입력 — 분석 정확도가 우선', score: 0 },
    ],
  },
  {
    id: 14,
    axis: 'ethics',
    text: 'AI 생성 이미지를 회사 발표 자료에 쓰려 한다.',
    options: [
      { label: '해당 모델의 라이선스·상업적 사용 약관을 확인 후 사용', score: 3 },
      { label: '"AI 생성" 표기만 하고 사용', score: 1 },
      { label: '내가 만든 것처럼 그대로 사용', score: 0 },
    ],
  },
  {
    id: 15,
    axis: 'ethics',
    text: 'AI 답변에서 특정 성별·국적·연령에 대한 편향이 의심된다.',
    options: [
      { label: '편향 가능성을 인지하고 다른 관점·반례를 직접 요청해 검토', score: 3 },
      { label: 'AI에게 "공정하게 다시 답해줘"라고 한 번 더 요청', score: 1 },
      { label: '결과만 보면 되니 그대로 사용', score: 0 },
    ],
  },

  // === 자동화·반복 ===
  {
    id: 16,
    axis: 'automation',
    text: '매주 같은 형식의 주간 보고서를 작성한다.',
    options: [
      { label: '변수만 바꾸는 템플릿/프로젝트를 한 번 만들어두고 재사용', score: 3 },
      { label: '비슷한 옛 보고서를 복사해 매번 수정', score: 1 },
      { label: '매번 처음부터 새로 작성', score: 0 },
    ],
  },
  {
    id: 17,
    axis: 'automation',
    text: '100개 항목을 같은 방식으로 정리·분류해야 한다.',
    options: [
      { label: '한 번 검증한 방식으로 묶어 배치/스크립트로 처리', score: 3 },
      { label: 'AI에 한 번에 100개를 다 던지고 결과를 본다', score: 1 },
      { label: '하나씩 수작업으로 처리', score: 0 },
    ],
  },
  {
    id: 18,
    axis: 'automation',
    text: '반복 작업의 일부를 자동화하고 싶다는 생각이 든다.',
    options: [
      { label: '하루 정도 투자해 템플릿·자동화를 직접 세팅', score: 3 },
      { label: '일단 미루고 천천히 알아본다', score: 1 },
      { label: '시간이 없어 못 한다 — 그냥 계속 수작업', score: 0 },
    ],
  },
];

export type Length = 'quick' | 'normal' | 'detailed';

export const LENGTH_INFO: Record<Length, { name: string; questionCount: number; minutes: string; description: string }> = {
  quick:    { name: '빠른 테스트', questionCount: 6,  minutes: '1~2분', description: '각 능력 1문항씩 — 빠르게 큰 그림만' },
  normal:   { name: '보통 테스트', questionCount: 12, minutes: '3~4분', description: '각 능력 2문항씩 — 균형 잡힌 평가' },
  detailed: { name: '정밀 테스트', questionCount: 18, minutes: '5~7분', description: '전체 문항 — 가장 정확한 결과' },
};

export function getQuestions(length: Length): Question[] {
  if (length === 'quick') {
    return AXES.map(a => QUESTIONS.find(q => q.axis === a.id)!).filter(Boolean);
  }
  if (length === 'normal') {
    return AXES.flatMap(a => QUESTIONS.filter(q => q.axis === a.id).slice(0, 2));
  }
  return QUESTIONS;
}

export type AxisScore = Record<AxisId, number>;

export function scoreByAxis(answers: number[], qs: Question[]): AxisScore {
  const out: AxisScore = { promptDesign: 0, verify: 0, toolMix: 0, context: 0, ethics: 0, automation: 0 };
  qs.forEach((q, i) => {
    const a = answers[i];
    const opt = q.options[a];
    if (opt) out[q.axis] += opt.score;
  });
  return out;
}

export function maxAxisScore(qs: Question[]): AxisScore {
  const out: AxisScore = { promptDesign: 0, verify: 0, toolMix: 0, context: 0, ethics: 0, automation: 0 };
  qs.forEach(q => { out[q.axis] += 3; });
  return out;
}

// 직무 적합도 — 가중 평균 0~100.
export function jobFit(jobId: JobId, byAxis: AxisScore, max: AxisScore): number {
  const job = JOBS[jobId];
  let weighted = 0;
  let weightSum = 0;
  for (const axis of AXES) {
    const weight = job.aiPriority[axis.id];
    const maxA = max[axis.id];
    const pct = maxA === 0 ? 0 : byAxis[axis.id] / maxA;
    weighted += weight * pct;
    weightSum += weight;
  }
  if (weightSum === 0) return 0;
  return Math.round((weighted / weightSum) * 100);
}

// 상위 2 axis (강점) — 동률은 AXES 정의 순.
export function strengths(byAxis: AxisScore, max: AxisScore): AxisId[] {
  return [...AXES]
    .map(a => ({ id: a.id, pct: max[a.id] === 0 ? 0 : byAxis[a.id] / max[a.id] }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 2)
    .map(x => x.id);
}

export function weaknesses(byAxis: AxisScore, max: AxisScore): AxisId[] {
  return [...AXES]
    .map(a => ({ id: a.id, pct: max[a.id] === 0 ? 0 : byAxis[a.id] / max[a.id] }))
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 2)
    .map(x => x.id);
}

// 점수 등급 — A+/A/B+/B/C/D
export function grade(totalPct: number): string {
  if (totalPct >= 90) return 'A+';
  if (totalPct >= 80) return 'A';
  if (totalPct >= 70) return 'B+';
  if (totalPct >= 60) return 'B';
  if (totalPct >= 50) return 'C';
  return 'D';
}

// 약점 axis → 추천 카테고리. 사이트 17개 카테고리와 연동.
export const AXIS_TO_CATEGORIES: Record<AxisId, string[]> = {
  promptDesign: ['writing', 'planning', 'cover-letter'],
  verify:       ['research', 'analysis', 'data'],
  toolMix:      ['agents', 'code', 'image'],
  context:      ['planning', 'agents', 'report'],
  ethics:       ['learning', 'edu-parent', 'cover-letter'],
  automation:   ['agents', 'code', 'email'],
};
