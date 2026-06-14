// 가짜 남사친 구분법 — 상황 5문항으로 "남자친구가 되고 싶은 남자(가짜 남사친)" 확률 %.
// 관점 2종: female(내 남사친을 판단) / male(내가 그녀에게 어떤지 자가진단).
// 각 보기 점수 0(친구)·1(애매)·2(호감). 합/만점 → %.

export type Perspective = 'female' | 'male';

export type Option = { label: string; score: 0 | 1 | 2 };
export type Question = { text: string; options: [Option, Option, Option] };

// 보기 점수 순서는 일부러 뒤섞음(위치로 못 맞추게). 각 문항은 0·1·2를 한 번씩 포함.
export const QUESTIONS: Record<Perspective, Question[]> = {
  female: [
    {
      text: '단둘이 카페에 앉아 있을 때 그는?',
      options: [
        { label: '메뉴며 자리며 챙기고 평소보다 말이 많아진다', score: 1 },
        { label: '분위기 좋은 자리로 데려가 눈을 오래 맞춘다', score: 2 },
        { label: '친구들이랑 있을 때처럼 툭툭 장난만 친다', score: 0 },
      ],
    },
    {
      text: '내가 "나 소개팅 했어"라고 말하면?',
      options: [
        { label: '"어떤 놈인데?" 하며 표정이 굳는다', score: 2 },
        { label: '"오 잘됐다!" 하고 진심으로 응원한다', score: 0 },
        { label: '누구냐고 유독 자세히 캐묻는다', score: 1 },
      ],
    },
    {
      text: '밤 11시, 그에게서 오는 연락은?',
      options: [
        { label: '거의 없다 — 용건 있을 때만', score: 0 },
        { label: '"자?" 하고 별 내용 없이 톡이 온다', score: 2 },
        { label: '가끔 "오늘 뭐 했어?" 안부 정도', score: 1 },
      ],
    },
    {
      text: '내 생일날 그는?',
      options: [
        { label: '깜짝 케이크에 정성 선물까지 준비한다', score: 2 },
        { label: '작은 선물 하나 챙겨준다', score: 1 },
        { label: '"생축~" 톡 한 줄 보낸다', score: 0 },
      ],
    },
    {
      text: '내가 "요즘 너무 우울해"라고 하면?',
      options: [
        { label: '이야기 들어주고 먹을 걸 사다 준다', score: 1 },
        { label: '"힘내" 하고 평소처럼 넘어간다', score: 0 },
        { label: '하던 일 멈추고 곧장 나에게 달려온다', score: 2 },
      ],
    },
  ],
  male: [
    {
      text: '그녀가 다른 남자랑 웃고 떠드는 걸 볼 때 나는?',
      options: [
        { label: '괜히 기분 상하고 자꾸 신경 쓰인다', score: 2 },
        { label: '살짝 거슬리는 정도', score: 1 },
        { label: '아무렇지 않다 — 친구니까', score: 0 },
      ],
    },
    {
      text: '그녀에게 톡이 오면 나는?',
      options: [
        { label: '비교적 빨리 답하는 편', score: 1 },
        { label: '생각나면 답한다', score: 0 },
        { label: '알림 뜨자마자 확인, 답 늦으면 신경 쓴다', score: 2 },
      ],
    },
    {
      text: '이번 주말 단둘이 만나기로 했다. 나는?',
      options: [
        { label: '친구라 그냥 편하다', score: 0 },
        { label: '며칠 전부터 설레서 옷까지 고른다', score: 2 },
        { label: '은근히 기대된다', score: 1 },
      ],
    },
    {
      text: '그녀가 연애 상담을 해올 때 내 속마음은?',
      options: [
        { label: '"그 사람보다 내가…" 싶고 질투난다', score: 2 },
        { label: '듣다 보면 기분이 복잡해진다', score: 1 },
        { label: '친구로서 진심으로 조언해준다', score: 0 },
      ],
    },
    {
      text: '문득 그녀가 예뻐 보인 적이 있나?',
      options: [
        { label: '가끔 그런 순간이 있다', score: 1 },
        { label: '솔직히 자주 설렌다', score: 2 },
        { label: '없다, 그냥 친구다', score: 0 },
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
