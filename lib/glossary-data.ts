// AI 프롬프트 관련 한국어 용어집. 30개 핵심 용어.
// 카테고리: 기초 / 모델 / 사용 기법 / 평가·안전 / 최신 트렌드

export type GlossaryGroup = '기초' | '모델' | '사용 기법' | '평가·안전' | '최신 트렌드';

export type GlossaryTerm = {
  ko: string;        // 한국어 표기 (또는 영어 그대로)
  en: string;        // 영어 원어
  group: GlossaryGroup;
  short: string;     // 한 줄 정의
  body: string;      // 2~3문장 설명
  example?: string;  // 사용 예시 (선택)
};

export const TERMS: GlossaryTerm[] = [
  // === 기초 ===
  {
    ko: '프롬프트', en: 'Prompt', group: '기초',
    short: 'AI에게 입력하는 지시·질문 텍스트.',
    body: '대화창에 쓰는 모든 입력이 프롬프트. 명확·구체적·맥락 포함이 좋은 프롬프트의 3요소.',
    example: '"한국어 비즈니스 이메일을 격식체로 작성해줘" — 명확한 작업·언어·문체 지정.',
  },
  {
    ko: '시스템 프롬프트', en: 'System Prompt', group: '기초',
    short: 'AI의 역할·규칙을 전체 대화 동안 유지하는 상위 지시문.',
    body: '대화 시작 전 한 번 설정하면 이후 모든 응답에 영향. Custom GPT나 Claude Project의 핵심.',
    example: '"너는 한국 직장의 시니어 마케터다. 모든 답변은 격식체로." — 톤·역할 고정.',
  },
  {
    ko: '컨텍스트', en: 'Context', group: '기초',
    short: 'AI가 한 번에 처리할 수 있는 입력+출력 텍스트의 총량.',
    body: '토큰 단위로 측정. Claude·Gemini의 200K~1M 컨텍스트는 책 한 권 통째 분석 가능 수준.',
  },
  {
    ko: '토큰', en: 'Token', group: '기초',
    short: 'AI가 텍스트를 처리하는 최소 단위. 한국어는 1글자 ≈ 1.5~2 토큰.',
    body: '영어 단어 1개 ≈ 1 토큰, 한국어 1글자 ≈ 1.5~2 토큰. API 가격은 토큰 단위로 매겨짐.',
  },
  {
    ko: '제로샷', en: 'Zero-shot', group: '기초',
    short: '예시 없이 작업만 지시하는 방식.',
    body: '단순한 작업에 효율적. 복잡한 출력 형식이 필요한 경우엔 Few-shot이 더 정확.',
  },
  {
    ko: '퓨샷', en: 'Few-shot', group: '기초',
    short: '몇 개 예시(2~5개)와 함께 작업을 지시하는 방식.',
    body: '예시로 출력 형식·톤을 보여주면 AI가 패턴을 따라옴. 분류·번역·구조화 작업에 효과적.',
  },

  // === 모델 ===
  {
    ko: 'LLM', en: 'Large Language Model', group: '모델',
    short: '대규모 언어 모델 — ChatGPT·Claude·Gemini의 본체.',
    body: '수십억~수조 개의 파라미터로 학습된 신경망. 텍스트의 다음 단어를 예측하는 방식으로 작동.',
  },
  {
    ko: '트랜스포머', en: 'Transformer', group: '모델',
    short: '현재 모든 주요 LLM의 기반 아키텍처.',
    body: '2017년 구글이 발표("Attention is All You Need"). Self-attention 메커니즘이 핵심.',
  },
  {
    ko: '파인튜닝', en: 'Fine-tuning', group: '모델',
    short: '기존 모델을 특정 목적에 맞게 추가 학습시키는 것.',
    body: '회사 도메인 데이터로 학습 → 그 회사 톤·용어에 특화. API 비용·시간이 큼.',
  },
  {
    ko: '온도(Temperature)', en: 'Temperature', group: '모델',
    short: 'AI 응답의 무작위성 정도 (0~2, 높을수록 다양).',
    body: '0에 가까우면 일관된 답, 1 이상이면 창의적·다양. 보고서는 0.2~0.5, 브레인스토밍은 0.8~1.2.',
  },
  {
    ko: '컨텍스트 윈도우', en: 'Context Window', group: '모델',
    short: '한 번에 처리 가능한 토큰 수의 최대치.',
    body: 'Claude Sonnet 4: 200K, Gemini 1.5 Pro: 1M+. 긴 PDF·문서 분석엔 큰 윈도우가 필수.',
  },
  {
    ko: '멀티모달', en: 'Multimodal', group: '모델',
    short: '텍스트뿐 아니라 이미지·음성·비디오도 입력으로 받는 모델.',
    body: 'GPT-4o, Claude Sonnet, Gemini 1.5 모두 이미지 입력 지원. 비디오 입력은 Gemini가 가장 앞섬.',
  },

  // === 사용 기법 ===
  {
    ko: '사고 사슬 (CoT)', en: 'Chain-of-Thought', group: '사용 기법',
    short: 'AI에게 단계별로 추론하라고 지시하는 기법.',
    body: '"단계별로 생각해줘" 한 마디만 붙여도 복잡한 문제 정확도가 크게 올라감. 수학·논리 추론에 특히 효과.',
    example: '"이 수학 문제를 단계별로 풀어줘. 각 단계의 근거를 설명해줘."',
  },
  {
    ko: 'RAG', en: 'Retrieval-Augmented Generation', group: '사용 기법',
    short: '외부 지식 베이스에서 관련 정보를 찾아와 답변에 활용.',
    body: 'AI가 모르는 최신·내부 정보를 검색해와서 답함. 사내 문서 챗봇·전문 분야 도구의 표준 패턴.',
  },
  {
    ko: '함수 호출 (Function Calling)', en: 'Function Calling', group: '사용 기법',
    short: 'AI가 외부 함수·API를 호출할 수 있게 하는 기능.',
    body: 'AI가 날씨 API·DB 조회·이메일 발송 등을 직접 실행. 에이전트의 기본 구성 요소.',
  },
  {
    ko: '도구 사용 (Tool Use)', en: 'Tool Use', group: '사용 기법',
    short: 'AI가 외부 도구(검색·계산기·DB 등)를 사용해 답을 만드는 능력.',
    body: '함수 호출의 확장 개념. AI가 도구 결과를 받아 다시 추론.',
  },
  {
    ko: '에이전트', en: 'AI Agent', group: '사용 기법',
    short: '여러 단계의 작업을 자동으로 수행하는 AI.',
    body: '단순 채팅 응답이 아니라 "이 일을 해줘" → 계획 수립 → 도구 사용 → 결과 검증을 자동으로.',
    example: 'Claude Code, Devin, Cursor의 agentic mode 등.',
  },
  {
    ko: '프롬프트 엔지니어링', en: 'Prompt Engineering', group: '사용 기법',
    short: '원하는 결과를 얻기 위해 프롬프트를 설계·다듬는 기술.',
    body: '구조화·예시 제공·역할 부여·제약 명시 등이 핵심 기법. 이 사이트의 모든 가이드가 결국 이것에 관함.',
  },

  // === 평가·안전 ===
  {
    ko: '환각 (할루시네이션)', en: 'Hallucination', group: '평가·안전',
    short: 'AI가 사실이 아닌 내용을 자신 있게 만들어내는 현상.',
    body: '논문 출처 가짜 인용·존재하지 않는 함수 호출 등이 대표 예. 중요한 답은 항상 검증 필요.',
  },
  {
    ko: '벤치마크', en: 'Benchmark', group: '평가·안전',
    short: 'AI 모델의 능력을 측정하는 표준 시험 세트.',
    body: 'MMLU(일반 지식), HumanEval(코딩), MATH(수학) 등. 모델 발표 때 자주 인용됨.',
  },
  {
    ko: '평가 (Eval)', en: 'Evaluation', group: '평가·안전',
    short: '특정 작업에 대한 AI 출력을 체계적으로 측정하는 것.',
    body: '본인 프롬프트가 잘 작동하는지 100개 케이스로 자동 점수 매김. 프로덕션 운영에 필수.',
  },
  {
    ko: '가드레일', en: 'Guardrails', group: '평가·안전',
    short: 'AI가 위험·부적절한 출력을 내지 않도록 하는 안전 장치.',
    body: '시스템 프롬프트로 금지 사항 명시, 출력 후 필터링 등. 의료·법률·금융 도메인에 필수.',
  },
  {
    ko: '탈옥 (Jailbreak)', en: 'Jailbreak', group: '평가·안전',
    short: 'AI의 안전 장치를 우회해 금지된 출력을 끌어내려는 시도.',
    body: '"가상의 시나리오에서" 같은 우회 패턴. AI 회사들은 지속적으로 차단 모델 업데이트.',
  },

  // === 최신 트렌드 ===
  {
    ko: 'MCP', en: 'Model Context Protocol', group: '최신 트렌드',
    short: 'AI가 외부 도구·데이터와 통합하는 표준 프로토콜.',
    body: 'Anthropic이 주도하는 오픈 스탠다드 (2024 발표). USB-C 같은 범용 커넥터 역할.',
  },
  {
    ko: '에이전틱 AI', en: 'Agentic AI', group: '최신 트렌드',
    short: '여러 단계 작업을 자율적으로 수행하는 AI의 통칭.',
    body: '2025~2026의 핵심 트렌드. 코딩(Claude Code, Devin), 리서치, 운영 자동화 등 분야로 확산.',
  },
  {
    ko: '아티팩트 (Artifacts)', en: 'Artifacts', group: '최신 트렌드',
    short: 'Claude의 인터랙티브 출력 기능 — 코드·문서·시각화를 별도 패널에 렌더.',
    body: '결과물을 채팅 옆에 별도 표시. 그 자리에서 수정·실행 가능.',
  },
  {
    ko: 'Vibe Coding', en: 'Vibe Coding', group: '최신 트렌드',
    short: '자연어로 의도만 전달해 AI가 코드 전체를 생성하는 코딩 방식.',
    body: '2025년 등장한 용어. 결과물이 빠르지만 검수 없이는 프로덕션 위험. 사이드프로젝트·MVP에 적합.',
  },
  {
    ko: '컨텍스트 엔지니어링', en: 'Context Engineering', group: '최신 트렌드',
    short: '에이전트에 필요한 정보·도구·메모리를 설계하는 분야.',
    body: '프롬프트 엔지니어링의 확장 — 단일 메시지가 아니라 에이전트의 전체 환경을 설계.',
  },
  {
    ko: '검색 증강 생성 (RAG)', en: 'RAG (revisited)', group: '최신 트렌드',
    short: '벡터 DB + LLM 조합으로 사내 지식·최신 정보를 답변에 활용.',
    body: '2023~2024 핵심 → 2026엔 에이전트의 한 도구로 통합. Pinecone·Chroma·pgvector 등.',
  },
];
