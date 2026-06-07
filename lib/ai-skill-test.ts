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
  | 'student'
  | 'hr'
  | 'analyst'
  | 'finance'
  | 'cs';

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
  hr: {
    id: 'hr',
    name: 'HR · 인사',
    description: '사람·문화·제도로 조직을 굴리는 일',
    requirements: [
      '채용 공고·면접 질문·온보딩 자료 작성',
      '조직 문화·핵심 가치 전파',
      '노무·법규를 한 글자도 빗나가지 않게 검토',
      '이력서·연봉·평가 등 민감 정보 책임감 있게 처리',
    ],
    aiPriority: { promptDesign: 3, verify: 3, toolMix: 1, context: 3, ethics: 3, automation: 2 },
  },
  analyst: {
    id: 'analyst',
    name: '데이터 분석가',
    description: 'SQL·통계로 비즈니스 질문에 답하는 일',
    requirements: [
      '비즈니스 질문을 데이터 질문으로 번역',
      'SQL·노트북으로 가설을 직접 검증',
      '시각화·내러티브로 임원·실무자에게 설득',
      '데이터 신뢰성·통계 함정·환각을 알아채는 눈',
    ],
    aiPriority: { promptDesign: 2, verify: 3, toolMix: 3, context: 2, ethics: 2, automation: 2 },
  },
  finance: {
    id: 'finance',
    name: '회계·재무',
    description: '숫자·규정으로 회사 흐름을 책임지는 일',
    requirements: [
      '재무제표·세무·결산 정확도 100%',
      '회계기준·세법 변동을 빠짐없이 반영',
      '예산·예측·시나리오 분석',
      '내부정보·감사 트레일 책임감 있게 운영',
    ],
    aiPriority: { promptDesign: 2, verify: 3, toolMix: 1, context: 2, ethics: 3, automation: 3 },
  },
  cs: {
    id: 'cs',
    name: '고객지원 · 운영 (CS)',
    description: '대량의 고객 요청을 빠르고 일관되게 처리하는 일',
    requirements: [
      '문의 유형 분류·우선순위 매기기',
      '톤·정확도가 일정한 답변 작성',
      'FAQ·매뉴얼·매크로 최신 상태 유지',
      '이슈 트렌드를 제품팀에 정확히 전달',
    ],
    aiPriority: { promptDesign: 3, verify: 2, toolMix: 2, context: 2, ethics: 3, automation: 3 },
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
// 정답 위치를 0/1/2에 6:6:6 균등 분배. 오답도 실무에서 흔히 빠지는 그럴듯한 함정으로 구성.
export const QUESTIONS: Question[] = [
  // === 프롬프트 설계 ===
  {
    id: 1,
    axis: 'promptDesign',
    text: 'AI에게 캠페인 결과 보고서 초안을 부탁한다. 어떤 요청이 결과가 가장 좋을까?',
    options: [
      { label: '지난 3개 캠페인을 노출·전환·CAC로 비교한 1페이지 임원 보고서. 핵심 결론 한 줄, 비교 표, 다음 행동 3개로 마무리', score: 3 },
      { label: '지난 3개 캠페인 성과를 비교해서 1페이지로 정리해줘', score: 1 },
      { label: '캠페인 데이터를 다 줄 테니 알아서 잘 보고서로 만들어줘', score: 0 },
    ],
  },
  {
    id: 2,
    axis: 'promptDesign',
    text: '같은 형식의 요청을 자주 반복해야 한다 (매주 보고서·매월 분석 등). 본인은?',
    options: [
      { label: '비슷한 옛 채팅을 복사해서 새 데이터로 갈아끼운다', score: 1 },
      { label: '변수만 바꾸는 프롬프트 템플릿을 만들어 매번 같은 명령으로 시작', score: 3 },
      { label: 'AI가 잘 써준 결과물을 즐겨찾기에 저장해두고 다음에 그 결과물을 베이스로 손본다', score: 0 },
    ],
  },
  {
    id: 3,
    axis: 'promptDesign',
    text: 'AI에게 톤이 안 맞는다고 여러 번 말해도 비슷한 결과가 나온다.',
    options: [
      { label: '원하는 톤의 예시 문장 2~3개를 보여주고 "이 톤으로 써줘"라고 지시', score: 3 },
      { label: '원하는 분위기를 형용사로 더 자세히 묘사 ("친근하면서 전문적인 30대 직장인 톤")', score: 1 },
      { label: '"더 자연스럽게", "사람처럼 써줘"를 강하게 반복해서 추가', score: 0 },
    ],
  },

  // === 결과 검증 ===
  {
    id: 4,
    axis: 'verify',
    text: 'AI가 "한국 인구의 X%가 ~한다"고 통계 수치를 인용했다. 본인 자료에 옮기기 전 가장 안전한 방법은?',
    options: [
      { label: 'ChatGPT/Claude가 한 답이니 출처 표기를 ("OOO 보고서에 따르면" 식으로) 적어 책임을 분산', score: 0 },
      { label: 'AI에게 "이 수치 출처를 알려줘"를 한 번 더 물어 출처까지 받아두고 인용', score: 1 },
      { label: '수치를 검색해 통계청·연구소 등 원 출처에서 같은 숫자를 직접 확인', score: 3 },
    ],
  },
  {
    id: 5,
    axis: 'verify',
    text: 'AI가 본문에서 "OOO 저자의 《XX》(2019)"라는 책을 인용했다. 본인 글에서 이걸 인용하려면?',
    options: [
      { label: '본문에 "~에 따르면"이라고 적되 정확한 인용 표기는 빼고 자연스럽게 녹임', score: 1 },
      { label: '교보·알라딘·구글 등에서 책 제목+저자로 직접 검색해 실재 여부 확인', score: 3 },
      { label: 'AI에게 "이 책 ISBN도 알려줘"를 추가로 물어 ISBN까지 받아둔다', score: 0 },
    ],
  },
  {
    id: 6,
    axis: 'verify',
    text: 'AI 답변에서 "이 부분만 좀 미묘하게 이상한데" 하는 문장이 있다.',
    options: [
      { label: '같은 모델에 "이 부분 확실해? 다시 한 번 확인해줘"라고 물어본다', score: 1 },
      { label: '그 부분만 본인 표현으로 살짝 바꿔서 위험을 피한다', score: 0 },
      { label: '다른 모델(또는 외부 검색)에 같은 질문을 던져 결과가 일치하는지 확인', score: 3 },
    ],
  },

  // === 도구 조합 ===
  {
    id: 7,
    axis: 'toolMix',
    text: '150페이지 PDF에서 핵심 결론·근거 표만 뽑아야 한다.',
    options: [
      { label: 'Claude·GPT 등 파일 업로드 지원 모델에 PDF를 직접 올리고 "3가지 결론과 근거 표만 뽑아"라고 요청', score: 3 },
      { label: 'PDF에서 중요해 보이는 챕터만 직접 골라 텍스트 복사해서 ChatGPT에 붙여넣고 요약', score: 1 },
      { label: 'ChatGPT에 "이런 분야의 보고서 핵심은 보통 뭐야?"를 물어 일반론으로 채운다', score: 0 },
    ],
  },
  {
    id: 8,
    axis: 'toolMix',
    text: '본인은 Claude·ChatGPT·Gemini 중 어떻게 쓰나?',
    options: [
      { label: '유튜브·SNS에서 "요즘 ~가 최강"이라고 하면 그쪽으로 바꿔본다', score: 1 },
      { label: '긴 문서·코드 분석은 A, 빠른 단답·검색은 B, 이미지는 C — 용도에 따라 분리', score: 3 },
      { label: '한 모델을 결제했으니 그 모델로 전부 처리한다', score: 0 },
    ],
  },
  {
    id: 9,
    axis: 'toolMix',
    text: 'AI 결과가 마음에 안 든다. 다음 시도는?',
    options: [
      { label: '프롬프트 끝에 "더 잘해줘", "좀 더 디테일하게"를 한 줄 더 추가해 다시 보낸다', score: 0 },
      { label: '같은 모델에 같은 프롬프트를 한 번 더 보낸다 — 가끔 다른 결과가 나오기도 함', score: 1 },
      { label: '접근을 바꾼다 — 작업을 잘게 분해, 역할 부여, 예시 추가 중 하나를 시도', score: 3 },
    ],
  },

  // === 컨텍스트 관리 ===
  {
    id: 10,
    axis: 'context',
    text: '새로 시작하는 반복 업무(매주 보고서·매월 분석)가 있다. 본인은?',
    options: [
      { label: 'AI는 매번 처음 만나는 거라 생각하고 바로 작업 지시만 한다 — 맥락은 입력에 직접 포함', score: 0 },
      { label: '매번 채팅 시작할 때 "내 직무는 ~, 회사 톤은 ~"을 한 번 적어주고 시작', score: 1 },
      { label: '프로젝트/시스템 프롬프트에 직무·톤·맥락을 한 번 잘 적어두고 그 안에서 매번 시작', score: 3 },
    ],
  },
  {
    id: 11,
    axis: 'context',
    text: '한 채팅에서 코드 작업하다가 글쓰기로 주제가 크게 바뀌어야 한다.',
    options: [
      { label: '새 채팅 시작 — 이전 코드 컨텍스트가 글쓰기 결과에 노이즈로 끼는 것을 피한다', score: 3 },
      { label: '같은 채팅에서 "이제 다른 주제야"를 명시하고 이어간다 — 메모리가 도움이 될 수도', score: 1 },
      { label: '어차피 AI가 알아서 맥락을 가린다 — 그냥 이어 쓴다', score: 0 },
    ],
  },
  {
    id: 12,
    axis: 'context',
    text: '회사 가이드라인 PDF를 AI에 매번 참고시켜야 한다.',
    options: [
      { label: 'PDF 본문을 한 번 정리해 텍스트 시스템 프롬프트로 만들어 매번 머리에 붙인다', score: 1 },
      { label: 'Claude Projects·ChatGPT Custom GPT·NotebookLM 같은 지식베이스에 한 번 업로드해 자동 참조', score: 3 },
      { label: '필요할 때마다 PDF에서 관련 부분을 복사·붙여넣기 — 그때그때 맞는 부분만', score: 0 },
    ],
  },

  // === 윤리·리스크 ===
  {
    id: 13,
    axis: 'ethics',
    text: '고객 명단(이름·연락처·구매이력)으로 이탈 가능성 분석을 AI에 맡기려 한다.',
    options: [
      { label: '이름·연락처는 빼고 구매이력만 그대로 넣어 분석한다', score: 1 },
      { label: '엔터프라이즈 플랜이라 학습에 안 쓰이니 그대로 입력해도 된다', score: 0 },
      { label: '이름→고객001 식으로 가명화, 연락처 제거, 식별 정보 전부 익명 처리 후 입력', score: 3 },
    ],
  },
  {
    id: 14,
    axis: 'ethics',
    text: 'AI 생성 이미지를 회사 발표 자료에 쓰려 한다.',
    options: [
      { label: '사용한 모델의 상업적 이용 약관·출력 권리·금지 사용처를 확인 후 사용 (표기 요건 포함)', score: 3 },
      { label: '본문 구석에 "AI 생성 이미지"라고 표기해서 사용한다', score: 1 },
      { label: '사내 발표 자료라 라이선스 문제가 안 생긴다 — 그대로 사용', score: 0 },
    ],
  },
  {
    id: 15,
    axis: 'ethics',
    text: 'AI 답변에 특정 성별·연령에 대한 일반화가 들어 있다는 걸 알아챘다.',
    options: [
      { label: 'AI가 만든 거지 본인 의견은 아니니 본문에 인용해도 책임은 작다', score: 0 },
      { label: '반례·다른 관점을 직접 요청해 검토 후 본문에 넣을지 본인이 판단', score: 3 },
      { label: 'AI에게 "성별 편향 없이 다시 써줘" 요청해 새 결과로 대체', score: 1 },
    ],
  },

  // === 자동화·반복 ===
  {
    id: 16,
    axis: 'automation',
    text: '매주 같은 형식의 주간 보고서를 쓴다 (5개 KPI 변동만 다름).',
    options: [
      { label: '지난 주 보고서를 복사해 숫자만 갈아끼우고 문구를 매번 살짝 손본다', score: 1 },
      { label: '매번 새로 쓰는 게 신선하고 정성이 들어간 느낌도 난다', score: 0 },
      { label: '변수 [WEEK] [KPI_1] [KPI_2] 만 바꾸는 프롬프트 템플릿으로 매번 같은 명령으로 생성', score: 3 },
    ],
  },
  {
    id: 17,
    axis: 'automation',
    text: '100개 고객 문의를 같은 기준으로 분류·우선순위 매기기.',
    options: [
      { label: '10개로 분류 기준·예시를 검증한 후 10개 묶음 단위 배치로 처리 + 마지막에 spot-check', score: 3 },
      { label: 'AI 정확도가 걱정돼 처음 20개는 직접, 나머지 80개는 한 번에 던진다', score: 0 },
      { label: '100개를 한 번에 던지고, AI 결과를 위에서 아래로 훑으며 이상한 것만 다시 본다', score: 1 },
    ],
  },
  {
    id: 18,
    axis: 'automation',
    text: '매번 같은 30분짜리 일을 일주일에 5번 한다. 자동화하면 절약될 게 보인다.',
    options: [
      { label: '챗에 더 익숙해지면서 점점 빨라질 거니 별도 자동화 셋업 안 한다', score: 1 },
      { label: '하루 2~3시간 투자해 템플릿·스크립트·키보드 단축 등으로 셋업 — 한 주 안에 본전', score: 3 },
      { label: '지금도 30분이면 끝나니 굳이 자동화 셋업할 시간을 뺄 가치는 없다', score: 0 },
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
