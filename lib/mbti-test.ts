// AI 사용으로 보는 MBTI 테스트 데이터.
// 12문항 × 3지선다 (좌·중·우). 중간 선택지는 trait=null(0점), 동률은 좌측 우선.

export type Letter = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export type Option = { label: string; trait: Letter | null };

export type Question = {
  id: number;
  text: string;
  a: Option;  // 좌측 trait
  m: Option;  // 중립 (trait=null)
  b: Option;  // 우측 trait
};

export const QUESTIONS: Question[] = [
  // === E/I ===
  {
    id: 1,
    text: '새 AI 기능이 발표됐다. 가장 먼저 하는 행동은?',
    a: { label: '단톡방에 공유하고 같이 떠들어본다', trait: 'E' },
    m: { label: '혼자 가볍게 보고 좋으면 나중에 공유', trait: null },
    b: { label: '혼자 시간 두고 천천히 만져본다', trait: 'I' },
  },
  {
    id: 2,
    text: '회의 중 "이 도구 한번 보여주세요" 요청이 들어왔다.',
    a: { label: '즉석에서 데모해본다', trait: 'E' },
    m: { label: '"잠깐 보고 핵심만 알려드릴게요"', trait: null },
    b: { label: '"정리해서 다음에 보여드릴게요"', trait: 'I' },
  },
  {
    id: 3,
    text: '새 채팅을 시작할 때 본인 패턴은?',
    a: { label: '인사·맥락을 두루 깔고 시작', trait: 'E' },
    m: { label: '짧은 한 줄 맥락 + 본론', trait: null },
    b: { label: '본론만 바로 던진다', trait: 'I' },
  },
  // === S/N ===
  {
    id: 4,
    text: 'AI에게 글 톤을 알려줄 때 더 자주 하는 방식은?',
    a: { label: '예시 문장 직접 만들어 보여준다', trait: 'S' },
    m: { label: '키워드 몇 개 + 짧은 예시', trait: null },
    b: { label: '결과 방향·분위기를 추상적으로 묘사', trait: 'N' },
  },
  {
    id: 5,
    text: 'AI 결과물을 평가할 때 먼저 보는 것은?',
    a: { label: '사실·수치가 정확한가', trait: 'S' },
    m: { label: '둘 다 비슷한 비중으로 본다', trait: null },
    b: { label: '큰 그림·맥락이 통하는가', trait: 'N' },
  },
  {
    id: 6,
    text: '한 시간째 막혀 있을 때 다음 행동은?',
    a: { label: '비슷한 사례·튜토리얼을 찾는다', trait: 'S' },
    m: { label: '잠깐 쉬고 다시 같은 방식으로', trait: null },
    b: { label: '다른 각도로 문제를 다시 정의해본다', trait: 'N' },
  },
  // === T/F ===
  {
    id: 7,
    text: 'AI 결과가 마음에 안 들 때 보통 어떤 이유가 크다?',
    a: { label: '로직·구조에서 어디가 빗나갔는지', trait: 'T' },
    m: { label: '둘 다 신경 쓰임, 그때그때 다름', trait: null },
    b: { label: '톤·뉘앙스가 어색해서', trait: 'F' },
  },
  {
    id: 8,
    text: '이메일 초안을 시킬 때 우선순위는?',
    a: { label: '핵심 요구·기한이 명확한가', trait: 'T' },
    m: { label: '둘 다 비슷하게 본다', trait: null },
    b: { label: '받는 사람이 불편해하지 않을까', trait: 'F' },
  },
  {
    id: 9,
    text: 'AI에게 의견·평가를 구할 때 원하는 답은?',
    a: { label: '객관적 장단점·근거 비교', trait: 'T' },
    m: { label: '근거 + 사람들 반응 둘 다', trait: null },
    b: { label: '사람들이 어떻게 느낄지', trait: 'F' },
  },
  // === J/P ===
  {
    id: 10,
    text: 'AI 프로젝트(또는 새 채팅)를 시작하기 전에?',
    a: { label: '시스템 프롬프트·규칙부터 정한다', trait: 'J' },
    m: { label: '큰 틀만 잡고 시작', trait: null },
    b: { label: '일단 시작하고 가면서 조정한다', trait: 'P' },
  },
  {
    id: 11,
    text: '결과물이 80% 완성됐을 때 본인은?',
    a: { label: '정리 모드로 마무리한다', trait: 'J' },
    m: { label: '한 번 점검 후 결정', trait: null },
    b: { label: '마감 직전까지 계속 손본다', trait: 'P' },
  },
  {
    id: 12,
    text: 'AI 도구를 여러 개 쓸 때 본인 스타일은?',
    a: { label: '용도별로 정해두고 그것만', trait: 'J' },
    m: { label: '메인 2~3개 + 가끔 새 시도', trait: null },
    b: { label: '그때그때 끌리는 거 골라 씀', trait: 'P' },
  },
];

// === 16 결과 유형 ===

export type MBTIResult = {
  type: string;        // 4글자 코드, 예: 'INTJ'
  nickname: string;    // 재미있는 별명
  description: string; // 한 단락 (~100자)
  aiStyle: string;     // AI 사용 스타일 한 줄
  workTrait: string;   // 업무 특징 한 줄
};

export const ALL_TYPES = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
] as const;

export const RESULTS: Record<string, MBTIResult> = {
  INTJ: {
    type: 'INTJ',
    nickname: '전략 설계자',
    description: '모든 작업 전에 시스템 프롬프트와 목표부터 명확히 한다. AI를 단발 도구가 아니라 장기 운영 자산으로 본다.',
    aiStyle: '한 번 잘 세팅하고 그 위에 쌓는 타입',
    workTrait: '끝에서 거꾸로 계획, 잡일 없이 본질만',
  },
  INTP: {
    type: 'INTP',
    nickname: '시스템 분해자',
    description: '모델이 왜 그렇게 답했는지가 결과만큼 궁금하다. 한 가지 문제를 끝까지 파고들 때 진가가 나옴.',
    aiStyle: '정답보다 원리, 한 모델을 깊이 이해',
    workTrait: '표면 해결 거부, 근본 구조부터 다시 짠다',
  },
  ENTJ: {
    type: 'ENTJ',
    nickname: '자동화 총괄',
    description: '워크플로 전체를 AI로 묶어 효율화하는 데 능숙. 결과보다 시스템·KPI 단위로 사고한다.',
    aiStyle: '여러 도구를 파이프라인으로 엮음',
    workTrait: '회의보다 결정, 책임 분배가 빠르다',
  },
  ENTP: {
    type: 'ENTP',
    nickname: '프롬프트 해커',
    description: '시키지 말아야 할 것 같은 걸 시켜본다. 한계와 우회를 즐기는 실험가.',
    aiStyle: '매번 새 패턴, 정답 패턴 거부',
    workTrait: '정해진 절차 안에 갇히면 답답함',
  },
  INFJ: {
    type: 'INFJ',
    nickname: '의미 큐레이터',
    description: 'AI 답변의 어조·뉘앙스에 민감하다. 한 단어가 메시지 전체를 망칠 수 있다고 느낀다.',
    aiStyle: '톤·맥락을 끈질기게 다듬는 편집자',
    workTrait: '표면이 아니라 진의를 본다',
  },
  INFP: {
    type: 'INFP',
    nickname: '영감 채집자',
    description: '글쓰기·창작 위주로 AI를 쓴다. 즉흥적이지만 마음에 들 때까지 다듬는 끈기가 있음.',
    aiStyle: '따뜻한 톤·창작 동반자로 활용',
    workTrait: '의미 없는 일에는 손이 잘 안 감',
  },
  ENFJ: {
    type: 'ENFJ',
    nickname: 'AI 팀 코치',
    description: '도구를 혼자 쓰는 게 아니라 동료에게 전파하는 사람. 모두가 잘 쓰게 만드는 데 보람을 느낀다.',
    aiStyle: '활용법 공유·온보딩에 강함',
    workTrait: '분위기·합 의식, 결과는 함께 만든다',
  },
  ENFP: {
    type: 'ENFP',
    nickname: '아이디어 폭파기',
    description: '한 번에 5개 질문, 발산이 곧 즐거움. AI 결과로 영감 받고 그 자리에서 다음 아이디어로 점프한다.',
    aiStyle: '빠른 발산, 정리는 나중에',
    workTrait: '새 프로젝트 시작이 가장 신난다',
  },
  ISTJ: {
    type: 'ISTJ',
    nickname: '매뉴얼 준수자',
    description: '검증된 프롬프트를 그대로 반복 사용한다. 사실 확인·출처 점검을 절대 빼먹지 않음.',
    aiStyle: '안 쓰던 프롬프트는 의심 먼저',
    workTrait: '약속한 건 무조건 마감',
  },
  ISFJ: {
    type: 'ISFJ',
    nickname: '조용한 보조자',
    description: '반복 업무·문서 정리에 AI를 활용한다. 동료가 부탁한 일을 묵묵히 처리하는 든든한 타입.',
    aiStyle: '눈에 띄지 않게 꾸준히 활용',
    workTrait: '티 안 내고 팀이 잘 굴러가게 함',
  },
  ESTJ: {
    type: 'ESTJ',
    nickname: '효율 마스터',
    description: '시간 절약이 가능한 작업만 골라 AI에 위임. 결과물을 표준화·체크리스트로 운영한다.',
    aiStyle: '매번 같은 양식·같은 품질',
    workTrait: '마감·예산·산출물 관리에 강하다',
  },
  ESFJ: {
    type: 'ESFJ',
    nickname: '협업 윤활제',
    description: '회의록·이메일·공지처럼 사람 사이를 잇는 소통 도구로 AI를 가장 잘 활용한다.',
    aiStyle: '받는 사람 기준으로 톤 조정',
    workTrait: '팀 전체 분위기를 챙긴다',
  },
  ISTP: {
    type: 'ISTP',
    nickname: '도구 분해공',
    description: '새 기능 나오면 즉시 분해해본다. 필요할 때만 쓰고 평소엔 거리를 둔다.',
    aiStyle: '실용 우선, 화려한 기능엔 무관심',
    workTrait: '위기·돌발 상황에 침착하게 해결',
  },
  ISFP: {
    type: 'ISFP',
    nickname: '직관 크리에이터',
    description: '이미지·디자인·UI 등 시각 AI 위주로 활용. 자기 감각이 1차 필터.',
    aiStyle: '출력의 미감·디테일에 예민',
    workTrait: '분위기·완성도를 본능적으로 안다',
  },
  ESTP: {
    type: 'ESTP',
    nickname: '즉시 실행자',
    description: '떠오르면 바로 채팅창에 던진다. 시작이 빠르고 결과가 별로면 바로 다음 시도.',
    aiStyle: '짧은 프롬프트, 빠른 결과',
    workTrait: '결정·실행 속도가 무기',
  },
  ESFP: {
    type: 'ESFP',
    nickname: '매력 폭발 진행자',
    description: 'AI 결과를 발표·SNS·고객 대응에 바로 활용한다. 즐거움과 재미가 동력.',
    aiStyle: '결과를 사람들과 바로 공유',
    workTrait: '분위기 띄우기, 현장 적응 빠름',
  },
};

// 답안 12개 → 4자리 MBTI 코드. null(중립)은 카운트 제외. 동률은 좌측(E/S/T/J) 우선.
export function calcType(answers: (Letter | null)[]): string {
  const c: Record<Letter, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  for (const a of answers) if (a) c[a]++;
  return (
    (c.E >= c.I ? 'E' : 'I') +
    (c.S >= c.N ? 'S' : 'N') +
    (c.T >= c.F ? 'T' : 'F') +
    (c.J >= c.P ? 'J' : 'P')
  );
}
