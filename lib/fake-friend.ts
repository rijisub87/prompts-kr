// 가짜 남사친 구분법 — 상황 5문항으로 "남자친구가 되고 싶은 남자(가짜 남사친)" 확률 %.
// 관점 2종: female(내 남사친을 판단) / male(내가 그녀에게 어떤지 자가진단).
// 각 보기 점수 0(친구)·1(애매)·2(호감). 합/만점 → %.

export type Perspective = 'female' | 'male';

export type Option = { label: string; score: 0 | 1 | 2 };
export type Question = { text: string; options: [Option, Option, Option] };

export const QUESTIONS: Record<Perspective, Question[]> = {
  female: [
    {
      text: '단둘이 있을 때 그의 태도는?',
      options: [
        { label: '여럿이 있을 때랑 똑같이 편하게 장난친다', score: 0 },
        { label: '살짝 더 신경 쓰고 챙겨주는 느낌', score: 1 },
        { label: '눈에 띄게 다정해지고 은근히 분위기를 잡는다', score: 2 },
      ],
    },
    {
      text: '내가 "요즘 만나는(좋아하는) 사람 있어"라고 하면?',
      options: [
        { label: '잘됐다며 진심으로 축하해준다', score: 0 },
        { label: '어떤 사람이냐고 유독 꼬치꼬치 묻는다', score: 1 },
        { label: '표정이 굳거나 갑자기 시큰둥해진다', score: 2 },
      ],
    },
    {
      text: '평소 그의 연락 패턴은?',
      options: [
        { label: '용건 있을 때만 온다', score: 0 },
        { label: '가끔 안부·일상을 공유한다', score: 1 },
        { label: '밤마다 "자?" 하며 사소한 것까지 시시콜콜', score: 2 },
      ],
    },
    {
      text: '내 생일·기념일에 그는?',
      options: [
        { label: '톡으로 축하 한마디', score: 0 },
        { label: '소소한 선물을 챙긴다', score: 1 },
        { label: '깜짝 이벤트나 정성 가득한 선물을 준비한다', score: 2 },
      ],
    },
    {
      text: '내가 힘들고 지칠 때 그는?',
      options: [
        { label: '적당히 위로해주고 끝', score: 0 },
        { label: '이야기 들어주고 은근히 챙겨준다', score: 1 },
        { label: '만사 제치고 달려와 다 해결해주려 한다', score: 2 },
      ],
    },
  ],
  male: [
    {
      text: '그녀가 다른 남자랑 친하게 지내는 걸 보면?',
      options: [
        { label: '아무렇지 않다, 친구니까', score: 0 },
        { label: '살짝 신경이 쓰인다', score: 1 },
        { label: '기분이 묘하게 나쁘고 질투가 난다', score: 2 },
      ],
    },
    {
      text: '그녀의 연락에 나는?',
      options: [
        { label: '생각나면 답한다', score: 0 },
        { label: '비교적 빨리 답하는 편', score: 1 },
        { label: '알림 뜨면 바로 확인, 그녀 답이 늦으면 신경 쓰인다', score: 2 },
      ],
    },
    {
      text: '그녀와 단둘이 만나는 건?',
      options: [
        { label: '친구라 그냥 편하다', score: 0 },
        { label: '은근히 기대된다', score: 1 },
        { label: '설레서 옷차림까지 미리 신경 쓴다', score: 2 },
      ],
    },
    {
      text: '그녀가 연애 상담을 해올 때 내 속마음은?',
      options: [
        { label: '친구로서 진심으로 조언해준다', score: 0 },
        { label: '듣다 보면 기분이 좀 복잡해진다', score: 1 },
        { label: '"나는 어떤데" 싶고 상대가 질투난다', score: 2 },
      ],
    },
    {
      text: '그녀가 갑자기 예뻐/멋져 보인 적 있나?',
      options: [
        { label: '없다, 그냥 친구다', score: 0 },
        { label: '가끔 그런 순간이 있다', score: 1 },
        { label: '자주 설렌다', score: 2 },
      ],
    },
  ],
};

export type FakeFriendResult = {
  pct: number;       // 가짜 남사친(호감) 확률 %
  title: string;
  description: string;
  advice: string;
};

export function calcResult(perspective: Perspective, answers: number[]): FakeFriendResult {
  const qs = QUESTIONS[perspective];
  let sum = 0;
  qs.forEach((q, i) => {
    const opt = q.options[answers[i]];
    if (opt) sum += opt.score;
  });
  const max = qs.length * 2; // 10
  const pct = Math.round((sum / max) * 100);

  const tiersFemale: [number, string, string, string][] = [
    [80, '거의 남자친구 — 고백 직전인 가짜 남사친', '친구라기엔 너무 다정해요. 이미 마음이 기운 상태일 가능성이 큽니다.', '관계를 어떻게 할지 마음의 준비를 해두는 게 좋아요.'],
    [60, '수상한 친구 — 마음 있을 확률 높음', '친구의 선을 자주 넘나드는 신호가 보여요.', '애매한 행동엔 분명한 선을 그어두면 서로 편해요.'],
    [40, '썸과 우정 사이 — 애매한 줄타기', '친구인지 그 이상인지 본인도 헷갈릴 만한 거리예요.', '확실히 알고 싶다면 다른 이성 얘기로 반응을 살펴보세요.'],
    [20, '대체로 진짜 남사친 — 가끔 헷갈릴 뿐', '기본적으로 친구 모드. 가끔의 다정함에 흔들릴 수 있어요.', '편한 친구로 두기 좋은 사이예요.'],
    [0, '100% 찐친 — 안심하세요', '딱 친구. 사심 신호가 거의 없어요.', '오래갈 좋은 친구로 지내세요.'],
  ];
  const tiersMale: [number, string, string, string][] = [
    [80, '당신은 친구가 아니라 그녀를 좋아하고 있어요', '행동·감정 모두 호감 쪽으로 강하게 기울어 있어요.', '관계를 솔직하게 인정하고 다음을 고민할 때예요.'],
    [60, '마음이 기울고 있어요 — 인정할 때', '아직 친구라 부르지만 신호가 분명해요.', '감정을 외면하기보다 한 번 정리해보세요.'],
    [40, '우정인지 호감인지 본인도 헷갈리는 중', '친구와 호감의 경계에 서 있어요.', '단둘이 만났을 때의 설렘 정도로 가늠해보세요.'],
    [20, '대체로 친구 — 가끔 흔들릴 뿐', '기본은 친구. 순간적인 설렘은 자연스러운 정도예요.', '편한 친구 관계를 즐기세요.'],
    [0, '진짜 편한 친구 사이', '호감 신호가 거의 없는 순수 우정이에요.', '좋은 친구로 오래 지내세요.'],
  ];

  const tiers = perspective === 'female' ? tiersFemale : tiersMale;
  const t = tiers.find(([threshold]) => pct >= threshold) ?? tiers[tiers.length - 1];
  return { pct, title: t[1], description: t[2], advice: t[3] };
}
