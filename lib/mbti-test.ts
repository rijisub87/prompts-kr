// AI 사용으로 보는 MBTI 테스트 데이터.
// 12문항 × 4지선다 — 각 보기는 [좌측 강, 좌측 약, 우측 약, 우측 강] 순서로 trait+weight 부여.
// weight 2=강한 성향, 1=약한 성향. 동률은 좌측(E/S/T/J) 우선.

export type Letter = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export type Option = { label: string; trait: Letter; weight: 1 | 2 };

export type Question = {
  id: number;
  text: string;
  options: [Option, Option, Option, Option];
};

export const QUESTIONS: Question[] = [
  // === E/I ===
  {
    id: 1,
    text: '새 AI 기능이 발표됐다. 가장 먼저 하는 행동은?',
    options: [
      { label: '단톡방에 공유하고 같이 떠들어본다', trait: 'E', weight: 2 },
      { label: '친한 한두 명에게만 알려주고 같이 시도해본다', trait: 'E', weight: 1 },
      { label: '혼자 가볍게 보고 좋으면 나중에 공유', trait: 'I', weight: 1 },
      { label: '혼자 시간 두고 천천히 만져본다', trait: 'I', weight: 2 },
    ],
  },
  {
    id: 2,
    text: '회의 중 "이 도구 한번 보여주세요" 요청이 들어왔다.',
    options: [
      { label: '즉석에서 데모해본다', trait: 'E', weight: 2 },
      { label: '간단히 한 화면 보여주고 "정리해서 다시 드릴게요"', trait: 'E', weight: 1 },
      { label: '"잠깐 보고 핵심만 알려드릴게요"', trait: 'I', weight: 1 },
      { label: '"정리해서 다음에 보여드릴게요"', trait: 'I', weight: 2 },
    ],
  },
  {
    id: 3,
    text: '새 채팅을 시작할 때 본인 패턴은?',
    options: [
      { label: '인사·맥락을 두루 깔고 시작', trait: 'E', weight: 2 },
      { label: '"안녕" 정도만 가볍게 + 본론', trait: 'E', weight: 1 },
      { label: '짧은 한 줄 맥락 + 본론', trait: 'I', weight: 1 },
      { label: '본론만 바로 던진다', trait: 'I', weight: 2 },
    ],
  },
  // === S/N ===
  {
    id: 4,
    text: 'AI에게 글 톤을 알려줄 때 더 자주 하는 방식은?',
    options: [
      { label: '예시 문장 직접 만들어 보여준다', trait: 'S', weight: 2 },
      { label: '비슷한 글 링크·스크린샷 + 짧은 설명', trait: 'S', weight: 1 },
      { label: '키워드 몇 개 + 짧은 예시', trait: 'N', weight: 1 },
      { label: '결과 방향·분위기를 추상적으로 묘사', trait: 'N', weight: 2 },
    ],
  },
  {
    id: 5,
    text: 'AI 결과물을 평가할 때 먼저 보는 것은?',
    options: [
      { label: '사실·수치·디테일이 정확한가', trait: 'S', weight: 2 },
      { label: '사실 확인 먼저, 그 다음 흐름', trait: 'S', weight: 1 },
      { label: '큰 그림을 보고 디테일은 나중', trait: 'N', weight: 1 },
      { label: '큰 그림·맥락이 통하는가', trait: 'N', weight: 2 },
    ],
  },
  {
    id: 6,
    text: '한 시간째 막혀 있을 때 다음 행동은?',
    options: [
      { label: '비슷한 사례·튜토리얼을 찾는다', trait: 'S', weight: 2 },
      { label: '잠깐 쉬고 같은 방식으로 다시', trait: 'S', weight: 1 },
      { label: '잠시 다른 일 하다가 돌아온다', trait: 'N', weight: 1 },
      { label: '다른 각도로 문제를 다시 정의해본다', trait: 'N', weight: 2 },
    ],
  },
  // === T/F ===
  {
    id: 7,
    text: 'AI 결과가 마음에 안 들 때 보통 어떤 이유가 크다?',
    options: [
      { label: '로직·구조에서 어디가 빗나갔는지', trait: 'T', weight: 2 },
      { label: '근거가 약하다고 느껴서', trait: 'T', weight: 1 },
      { label: '결과가 어색해서 — 정확히는 모름', trait: 'F', weight: 1 },
      { label: '톤·뉘앙스가 어색해서', trait: 'F', weight: 2 },
    ],
  },
  {
    id: 8,
    text: '이메일 초안을 시킬 때 우선순위는?',
    options: [
      { label: '핵심 요구·기한이 명확한가', trait: 'T', weight: 2 },
      { label: '논리적 흐름이 매끄러운가', trait: 'T', weight: 1 },
      { label: '받는 사람이 이해하기 좋은가', trait: 'F', weight: 1 },
      { label: '받는 사람이 불편해하지 않을까', trait: 'F', weight: 2 },
    ],
  },
  {
    id: 9,
    text: 'AI에게 의견·평가를 구할 때 원하는 답은?',
    options: [
      { label: '객관적 장단점·근거 비교', trait: 'T', weight: 2 },
      { label: '근거 + 약간의 추천 의견', trait: 'T', weight: 1 },
      { label: '근거 + 사람들 반응 둘 다', trait: 'F', weight: 1 },
      { label: '사람들이 어떻게 느낄지', trait: 'F', weight: 2 },
    ],
  },
  // === J/P ===
  {
    id: 10,
    text: 'AI 프로젝트(또는 새 채팅)를 시작하기 전에?',
    options: [
      { label: '시스템 프롬프트·규칙부터 정한다', trait: 'J', weight: 2 },
      { label: '큰 틀·목표 한 줄 정도 적고 시작', trait: 'J', weight: 1 },
      { label: '큰 틀만 잡고 시작', trait: 'P', weight: 1 },
      { label: '일단 시작하고 가면서 조정한다', trait: 'P', weight: 2 },
    ],
  },
  {
    id: 11,
    text: '결과물이 80% 완성됐을 때 본인은?',
    options: [
      { label: '정리 모드로 마무리한다', trait: 'J', weight: 2 },
      { label: '한 번 점검 후 결정', trait: 'J', weight: 1 },
      { label: '아직 더 다듬을 여지 있나 살핀다', trait: 'P', weight: 1 },
      { label: '마감 직전까지 계속 손본다', trait: 'P', weight: 2 },
    ],
  },
  {
    id: 12,
    text: 'AI 도구를 여러 개 쓸 때 본인 스타일은?',
    options: [
      { label: '용도별로 정해두고 그것만', trait: 'J', weight: 2 },
      { label: '메인 도구 정하고 보조로 1~2개', trait: 'J', weight: 1 },
      { label: '메인 2~3개 + 가끔 새 시도', trait: 'P', weight: 1 },
      { label: '그때그때 끌리는 거 골라 씀', trait: 'P', weight: 2 },
    ],
  },
];

// === 16 결과 유형 ===

export type MBTIResult = {
  type: string;          // 4글자 코드, 예: 'INTJ'
  nickname: string;      // 재미있는 별명
  description: string;   // 한 단락 (~100자)
  aiStyle: string[];     // AI 사용 스타일 3~4개
  workTrait: string[];   // 업무 특징 3~4개
  loveTrait: string[];   // 연애 특징 3~4개
  parentingStyle: string[]; // 자녀 양육 스타일 3~4개
  foodPreference: string[]; // 음식 선호 3~4개
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
    aiStyle: [
      '한 번 잘 세팅하고 그 위에 쌓는 타입',
      '시스템 프롬프트·규칙부터 명확히',
      '단발 챗이 아닌 장기 운영 자산으로',
    ],
    workTrait: [
      '끝에서 거꾸로 계획, 잡일 없이 본질만',
      '회의보다 결정, 결정 후엔 실행 빠름',
      '비효율은 즉시 자동화 본능',
    ],
    loveTrait: [
      '표현은 적지만 행동·계획에 다 들어있음',
      '데이트도 동선·시간 미리 짜둔다',
      '한 번 마음먹으면 끝까지, 변덕 없음',
    ],
    parentingStyle: [
      '큰 틀·규칙은 명확히, 일상 디테일은 자율에 맡김',
      '결과보다 사고 과정·의도를 칭찬',
      '감정 표현은 적지만 약속·계획은 무조건 지킴',
    ],
    foodPreference: [
      '효율·영양 우선 — 메뉴 회전 고정',
      '새 메뉴 도전 약함, 실패 가능성을 싫어함',
      '외식보다 본인이 짠 식단이 안정감',
    ],
  },
  INTP: {
    type: 'INTP',
    nickname: '시스템 분해자',
    description: '모델이 왜 그렇게 답했는지가 결과만큼 궁금하다. 한 가지 문제를 끝까지 파고들 때 진가가 나옴.',
    aiStyle: [
      '정답보다 원리, 한 모델을 깊이 이해',
      '"왜 이렇게 답했지?" 끝까지 파고듦',
      '새 기능 나오면 내부 동작부터 분석',
    ],
    workTrait: [
      '표면 해결 거부, 근본 구조부터 다시',
      '마감 압박엔 약함, 흥미가 동력',
      '혼자 깊이 파는 시간 절대 필요',
    ],
    loveTrait: [
      '머릿속에 연애 시뮬레이션 풀가동',
      '연락 자주 잊음 (악의 X, 그냥 몰입)',
      '깊은 대화·지적 호기심에 사로잡힘',
    ],
    parentingStyle: [
      '자녀의 끝없는 "왜?" 질문을 진심으로 받아준다',
      '일상 루틴·일관성은 헐거움 — 의도와 결과의 갭',
      '감정 갈등은 머리로 풀려다 어색해짐',
    ],
    foodPreference: [
      '좋아하는 1~2가지 메뉴를 반복',
      '새 메뉴보다 익숙한 안전판',
      '식사 시간·식습관 들쭉날쭉, 끼니 거를 때 많음',
    ],
  },
  ENTJ: {
    type: 'ENTJ',
    nickname: '자동화 총괄',
    description: '워크플로 전체를 AI로 묶어 효율화하는 데 능숙. 결과보다 시스템·KPI 단위로 사고한다.',
    aiStyle: [
      '여러 도구를 파이프라인으로 엮음',
      'ROI·시간 단축이 첫 평가 기준',
      '팀 전체 워크플로 표준화 주도',
    ],
    workTrait: [
      '회의보다 결정, 책임 분배가 빠르다',
      'KPI·산출물 중심으로 운영',
      '우유부단함을 못 견딤',
    ],
    loveTrait: [
      '관계도 방향·목표가 있어야 안심',
      '사랑 표현은 큰 결정·약속으로',
      '함께 성장하는 파트너 찾음',
    ],
    parentingStyle: [
      '명확한 기준·시간 관리·KPI식 목표 부여',
      '결과·성취 칭찬에 강함, 감정 케어는 약함',
      '자녀 자율성을 어디까지 줄지가 평생 숙제',
    ],
    foodPreference: [
      '효율·영양·생산성 우선 — 식사도 짧고 굵게',
      '외식보다 정해진 메뉴 반복',
      '주말에는 손맛 살린 가족 식사로 보상',
    ],
  },
  ENTP: {
    type: 'ENTP',
    nickname: '프롬프트 해커',
    description: '시키지 말아야 할 것 같은 걸 시켜본다. 한계와 우회를 즐기는 실험가.',
    aiStyle: [
      '매번 새 패턴, 정답 패턴 거부',
      '한 기능을 5가지 방식으로 시도',
      '한계 테스트가 곧 즐거움',
    ],
    workTrait: [
      '정해진 절차 안에 갇히면 답답함',
      '토론·반박을 즐김 (적대 X)',
      '새 프로젝트 시작이 가장 신난다',
    ],
    loveTrait: [
      '토론·논쟁 즐기지만 진심은 깊음',
      '익숙해지면 금방 시들 위험',
      '함께 새 경험 쌓을 사람 찾음',
    ],
    parentingStyle: [
      '새 경험·실험 환경 풍부 — 자녀 사고력·토론력↑',
      '규칙이 자주 바뀜, 일관성 부족 주의',
      '재미가 곧 양육 동력, 지루한 반복은 외주',
    ],
    foodPreference: [
      '새 메뉴 도전이 즐거움, 같은 거 두 번 잘 안 함',
      '매번 다른 맛집 탐방 — 단골은 적음',
      '평가·비교·발견의 과정 자체를 즐김',
    ],
  },
  INFJ: {
    type: 'INFJ',
    nickname: '의미 큐레이터',
    description: 'AI 답변의 어조·뉘앙스에 민감하다. 한 단어가 메시지 전체를 망칠 수 있다고 느낀다.',
    aiStyle: [
      '톤·맥락을 끈질기게 다듬는 편집자',
      '한 단어가 메시지를 망친다고 느낌',
      '메모리·컨텍스트 신중히 관리',
    ],
    workTrait: [
      '표면이 아니라 진의를 본다',
      '분위기·갈등에 민감, 조용히 해결',
      '의미 없는 일에는 손이 잘 안 감',
    ],
    loveTrait: [
      '한 사람에 깊이 헌신, 다수엔 흥미 X',
      '작은 신호까지 다 읽는 감지력',
      '진심·의미 안 통하면 빠르게 정리',
    ],
    parentingStyle: [
      '자녀의 미세한 감정·신호를 깊이 읽어준다',
      '의미 있는 1:1 대화·가치 전달에 강함',
      '자녀에 지나치게 몰입해 본인이 소진되기 쉬움',
    ],
    foodPreference: [
      '식재료 출처·의미·과정을 중시',
      '좋은 사람과 함께 먹는 경험을 더 기억함',
      '한 끼라도 정성 들여서 — 대충 X',
    ],
  },
  INFP: {
    type: 'INFP',
    nickname: '영감 채집자',
    description: '글쓰기·창작 위주로 AI를 쓴다. 즉흥적이지만 마음에 들 때까지 다듬는 끈기가 있음.',
    aiStyle: [
      '따뜻한 톤·창작 동반자로 활용',
      '마음에 들 때까지 끝없이 다듬음',
      '일정한 결과보다 가끔의 영감을 기다림',
    ],
    workTrait: [
      '의미 있는 일엔 끝까지 파고듦',
      '의미 없는 일은 손이 잘 안 감',
      '마감보다 완성도, 직전에 폭발',
    ],
    loveTrait: [
      '이상적 사랑 시나리오를 머릿속에',
      '표현은 어렵지만 한 번 빠지면 깊이',
      '갈등엔 약함, 회피하다 폭발',
    ],
    parentingStyle: [
      '자녀 감정·표현·창의성을 따뜻하게 지지',
      '잔소리·규제는 약함 — 분위기로 키움',
      '일상 루틴은 느슨함, 본인 에너지에 따라 출렁',
    ],
    foodPreference: [
      '플레이팅·분위기·공간이 맛 못지않게 중요',
      '좋아하는 한 메뉴는 끝까지 충성',
      '혼밥도 정성스럽게 한 상 차리는 타입',
    ],
  },
  ENFJ: {
    type: 'ENFJ',
    nickname: 'AI 팀 코치',
    description: '도구를 혼자 쓰는 게 아니라 동료에게 전파하는 사람. 모두가 잘 쓰게 만드는 데 보람을 느낀다.',
    aiStyle: [
      '활용법 공유·온보딩에 강함',
      '결과를 다른 사람 기준으로 검토',
      '혼자 쓰지 않고 항상 같이',
    ],
    workTrait: [
      '분위기·합 의식, 결과는 함께 만든다',
      '갈등 중재·팀 사기 챙김',
      '자기 일보다 팀 일 먼저',
    ],
    loveTrait: [
      '상대 입장에서 미리 챙기는 헌신형',
      '인정·감사 표현이 없으면 상처',
      '갈등 회피, 가끔 자기 감정 묻어둠',
    ],
    parentingStyle: [
      '자녀 또래·교사·학원 관계를 잘 챙김',
      '칭찬·격려가 풍부 — 자녀 자존감↑',
      '본인 욕구·휴식이 늘 후순위, 번아웃 주의',
    ],
    foodPreference: [
      '함께 먹는 즐거움 최우선 — 혼밥은 외로움',
      '손님·가족 초대 자주, 음식으로 마음 표현',
      '자녀·가족 입맛 우선 — 본인 취향은 양보',
    ],
  },
  ENFP: {
    type: 'ENFP',
    nickname: '아이디어 폭파기',
    description: '한 번에 5개 질문, 발산이 곧 즐거움. AI 결과로 영감 받고 그 자리에서 다음 아이디어로 점프한다.',
    aiStyle: [
      '빠른 발산, 정리는 나중에',
      '한 번에 5개 질문, 즉시 점프',
      '결과로 영감 받고 다음 아이디어로',
    ],
    workTrait: [
      '새 프로젝트 시작이 가장 신난다',
      '반복 업무는 미루다 폭주',
      '사람 만나며 에너지 충전',
    ],
    loveTrait: [
      '시작은 폭발적, 표현 풍부',
      '자유를 묶이면 답답해함',
      '신선함 사라지면 흥미 잃을 위험',
    ],
    parentingStyle: [
      '즉흥 놀이·여행·이벤트 풍부 — 자녀 입장에선 즐거움',
      '일관된 규칙·반복 루틴은 약함',
      '재미·흥미로 동기 부여, 강압보단 설득',
    ],
    foodPreference: [
      '새 맛집·신메뉴 탐방이 즐거움',
      '한 메뉴 깊게보단 폭넓게 — 단골 적음',
      '분위기 좋은 핫플·인스타 맛집 좋아함',
    ],
  },
  ISTJ: {
    type: 'ISTJ',
    nickname: '매뉴얼 준수자',
    description: '검증된 프롬프트를 그대로 반복 사용한다. 사실 확인·출처 점검을 절대 빼먹지 않음.',
    aiStyle: [
      '안 쓰던 프롬프트는 의심 먼저',
      '검증된 것만 반복 사용',
      '출처·사실 점검 절대 빼먹지 않음',
    ],
    workTrait: [
      '약속한 건 무조건 마감',
      '절차·표준·문서화에 강함',
      '갑작스러운 변경엔 스트레스',
    ],
    loveTrait: [
      '천천히 진심, 한 번 정하면 끝까지',
      '표현 적지만 약속·꾸준함으로 증명',
      '안정·예측 가능한 관계 선호',
    ],
    parentingStyle: [
      '일관된 루틴 — 식사·취침·공부 시간 정확',
      '약속은 무조건 지키는 모범',
      '갑작스러운 변화·융통성 부족이 마찰점',
    ],
    foodPreference: [
      '검증된 단골 맛집·메뉴를 반복',
      '새 메뉴는 의심부터, 리뷰 꼼꼼히 본 후 결정',
      '식사 시간을 정확히 — 끼니 거르기 거의 없음',
    ],
  },
  ISFJ: {
    type: 'ISFJ',
    nickname: '조용한 보조자',
    description: '반복 업무·문서 정리에 AI를 활용한다. 동료가 부탁한 일을 묵묵히 처리하는 든든한 타입.',
    aiStyle: [
      '눈에 띄지 않게 꾸준히 활용',
      '반복 업무·문서 정리 위주',
      '화려한 기능보다 익숙한 도구',
    ],
    workTrait: [
      '티 안 내고 팀이 잘 굴러가게 함',
      '동료 부탁 거절을 잘 못함',
      '갈등 회피, 속으로 삭임',
    ],
    loveTrait: [
      '상대를 묵묵히 챙기는 보살핌형',
      '표현은 작은 배려·정성',
      '상처는 오래 가지만 잘 안 드러냄',
    ],
    parentingStyle: [
      '묵묵한 보살핌·세심한 챙김의 표본',
      '자녀 요구 늘 우선, 본인은 후순위',
      '자녀가 다 크고 나서야 본인이 비어있음을 느낌',
    ],
    foodPreference: [
      '가족 입맛에 맞춘 정성스러운 가정식',
      '본인이 좋아하는 메뉴는 양보 자주',
      '매일의 식사가 사랑 표현 — 외식에 미안함',
    ],
  },
  ESTJ: {
    type: 'ESTJ',
    nickname: '효율 마스터',
    description: '시간 절약이 가능한 작업만 골라 AI에 위임. 결과물을 표준화·체크리스트로 운영한다.',
    aiStyle: [
      '매번 같은 양식·같은 품질',
      '시간 절약 가능한 작업만 위임',
      '결과물 표준화·체크리스트',
    ],
    workTrait: [
      '마감·예산·산출물 관리에 강함',
      '명확한 역할 분담 선호',
      '모호함을 못 견딤',
    ],
    loveTrait: [
      '명확한 관계 단계·약속 좋아함',
      '책임감 강함, 약속하면 지킴',
      '직설적, 돌려 말하기 안 함',
    ],
    parentingStyle: [
      '명확한 규칙·일정 — 시간관념·책임감 강조',
      '결과·성취 중심, 감정 표현은 어색',
      '"하면 된다" 신념을 자녀에게 그대로 전달',
    ],
    foodPreference: [
      '식사 시간·영양 균형을 엄격하게',
      '분위기보단 효율 — 외식은 검증된 곳만',
      '주말 식단·장보기까지 미리 계획',
    ],
  },
  ESFJ: {
    type: 'ESFJ',
    nickname: '협업 윤활제',
    description: '회의록·이메일·공지처럼 사람 사이를 잇는 소통 도구로 AI를 가장 잘 활용한다.',
    aiStyle: [
      '받는 사람 기준으로 톤 조정',
      '회의록·이메일·공지 등 소통 도구',
      '모두가 편한 결과물에 집중',
    ],
    workTrait: [
      '팀 전체 분위기를 챙긴다',
      '조화·합의를 우선',
      '인정·감사 표현 없으면 지침',
    ],
    loveTrait: [
      '기념일·이벤트 챙기는 따뜻함형',
      '작은 관심·표현이 풍부',
      '인정 못 받으면 서운함이 쌓임',
    ],
    parentingStyle: [
      '따뜻한 가족 분위기·기념일을 정성껏 챙김',
      '자녀 친구·또래 관계를 함께 살핀다',
      '인정·감사 표현이 없으면 서운함이 쌓임',
    ],
    foodPreference: [
      '함께 먹는 의미 최우선 — 가족 식탁 꾸미기',
      '자녀·손님 위해 손맛 노력',
      '음식으로 사랑·관심을 표현',
    ],
  },
  ISTP: {
    type: 'ISTP',
    nickname: '도구 분해공',
    description: '새 기능 나오면 즉시 분해해본다. 필요할 때만 쓰고 평소엔 거리를 둔다.',
    aiStyle: [
      '실용 우선, 화려한 기능엔 무관심',
      '새 기능 나오면 즉시 분해 테스트',
      '필요할 때만 쓰고 평소엔 거리둠',
    ],
    workTrait: [
      '위기·돌발 상황에 침착하게 해결',
      '회의보다 직접 만들기 선호',
      '자유로운 작업 방식 필요',
    ],
    loveTrait: [
      '표현 무뚝뚝, 행동으로 보여줌',
      '혼자만의 시간·공간 필수',
      '감정 표현 어려움, 오해 사기 쉬움',
    ],
    parentingStyle: [
      '손기술·기계·자연·DIY 활동 풍부',
      '감정 대화는 어색 — 함께 만들기로 대신',
      '자유로운 방식 허용 — 잔소리 적음',
    ],
    foodPreference: [
      '실용 우선 — 맛있고 빠르면 됐다',
      '새 메뉴는 본인 흥미 동할 때만 시도',
      '외식·배달 자주, 요리는 그때그때',
    ],
  },
  ISFP: {
    type: 'ISFP',
    nickname: '직관 크리에이터',
    description: '이미지·디자인·UI 등 시각 AI 위주로 활용. 자기 감각이 1차 필터.',
    aiStyle: [
      '출력의 미감·디테일에 예민',
      '이미지·디자인 등 시각 AI 위주',
      '자기 감각이 1차 필터',
    ],
    workTrait: [
      '분위기·완성도를 본능적으로 안다',
      '평가·비교 환경에 스트레스',
      '조용히 자기 페이스로 만들기',
    ],
    loveTrait: [
      '감성적이지만 표현은 수줍음',
      '즉흥적 로맨스에 약함',
      '갈등 회피, 조용히 거리두기',
    ],
    parentingStyle: [
      '자녀 감정·취향·미적 감각을 존중',
      '미적·예술적 환경 풍부 — 색·공간·음악',
      '갈등은 회피, 직접 부딪히기보단 분위기로',
    ],
    foodPreference: [
      '플레이팅·색감·분위기가 맛만큼 중요',
      '본인 감각으로 메뉴 선택 — 리뷰 의존 적음',
      '시즌 식재료·로컬·소박한 멋을 즐김',
    ],
  },
  ESTP: {
    type: 'ESTP',
    nickname: '즉시 실행자',
    description: '떠오르면 바로 채팅창에 던진다. 시작이 빠르고 결과가 별로면 바로 다음 시도.',
    aiStyle: [
      '짧은 프롬프트, 빠른 결과',
      '결과 별로면 바로 다음 시도',
      '실용·즉답·즉결',
    ],
    workTrait: [
      '결정·실행 속도가 무기',
      '위기 상황에 강함',
      '장기 계획·세부 절차엔 약함',
    ],
    loveTrait: [
      '즉흥적·매력적, 분위기 잘 잡음',
      '모험적 데이트 선호',
      '깊은 감정 표현은 부담스러워함',
    ],
    parentingStyle: [
      '활동적 놀이·즉흥 여행·외부 활동 풍부',
      '규칙·인내 가르치기는 약함',
      '위기·돌발 상황에서 자녀에게 든든함',
    ],
    foodPreference: [
      '분위기 좋은 새 핫플·SNS 맛집을 빠르게',
      '빠른 결정·즉각 만족 — 줄 서기 X',
      '외식·배달이 잦음, 요리는 가끔 이벤트로',
    ],
  },
  ESFP: {
    type: 'ESFP',
    nickname: '매력 폭발 진행자',
    description: 'AI 결과를 발표·SNS·고객 대응에 바로 활용한다. 즐거움과 재미가 동력.',
    aiStyle: [
      '결과를 사람들과 바로 공유',
      'SNS·발표·고객 대응에 활용',
      '재미·즐거움이 사용 동력',
    ],
    workTrait: [
      '분위기 띄우기, 현장 적응 빠름',
      '갈등·심각한 분위기 못 견딤',
      '장기 계획보단 즉각 반응',
    ],
    loveTrait: [
      '표현 풍부, 사랑한다 자주 말함',
      '즐거운 데이트·새 경험 좋아함',
      '무거운 대화·갈등 회피',
    ],
    parentingStyle: [
      '흥겨운 분위기·이벤트 풍부 — 자녀가 활기',
      '일관된 규칙·꾸지람은 약함',
      '자녀 인기·또래 관계를 함께 챙김',
    ],
    foodPreference: [
      '모임·축제·시즌 메뉴를 즐김',
      'SNS 핫플·인기 맛집을 즐겨 찾음',
      '새로움보단 분위기·사람·재미가 핵심',
    ],
  },
};

// 유형별 추천 카테고리 — 결과 페이지 "내 카테고리 추천" 섹션에서 사용.
// 각 유형의 aiStyle·workTrait에서 자연스럽게 어울리는 3개 카테고리 매핑.
export const MBTI_CATEGORIES: Record<string, readonly string[]> = {
  INTJ: ['planning', 'agents', 'analysis'],
  INTP: ['code', 'analysis', 'learning'],
  ENTJ: ['planning', 'agents', 'report'],
  ENTP: ['code', 'image', 'agents'],
  INFJ: ['writing', 'translation', 'email'],
  INFP: ['writing', 'image', 'learning'],
  ENFJ: ['email', 'ppt', 'learning'],
  ENFP: ['writing', 'image', 'planning'],
  ISTJ: ['report', 'summary', 'email'],
  ISFJ: ['summary', 'email', 'report'],
  ESTJ: ['report', 'ppt', 'planning'],
  ESFJ: ['email', 'ppt', 'report'],
  ISTP: ['code', 'data', 'analysis'],
  ISFP: ['image', 'writing', 'ppt'],
  ESTP: ['summary', 'ppt', 'email'],
  ESFP: ['image', 'writing', 'ppt'],
};

// 답안 12개 → 4자리 MBTI 코드. 각 옵션은 trait+weight를 직접 가짐.
// 동률은 좌측(E/S/T/J) 우선.
export function calcType(answers: Option[]): string {
  const c: Record<Letter, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  for (const a of answers) c[a.trait] += a.weight;
  return (
    (c.E >= c.I ? 'E' : 'I') +
    (c.S >= c.N ? 'S' : 'N') +
    (c.T >= c.F ? 'T' : 'F') +
    (c.J >= c.P ? 'J' : 'P')
  );
}
