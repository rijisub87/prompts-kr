import Link from 'next/link';

export const metadata = {
  title: 'Claude · ChatGPT · Gemini 비교 — 한국어 사용자 관점',
  description:
    '한국 사용자가 가장 자주 묻는 "어떤 AI를 써야 하나" 질문에 대한 실전 비교. 가격·한국어·강점·약점·추천 작업.',
};

type Row = {
  feature: string;
  claude: string;
  chatgpt: string;
  gemini: string;
};

const ROWS: Row[] = [
  {
    feature: '한국어 자연스러움',
    claude: '★★★★★ — 격식체·평어체 톤 컨트롤 강함',
    chatgpt: '★★★★ — 일반 한국어 OK, 격식체는 약간 어색',
    gemini: '★★★★ — Workspace·검색 결합 시 강함',
  },
  {
    feature: '긴 컨텍스트',
    claude: '★★★★★ — 200K+ 토큰, 긴 문서 분석 최강',
    chatgpt: '★★★★ — 128K, 충분히 길다',
    gemini: '★★★★★ — 1M+ 토큰 (1.5 Pro), 비디오·음성도',
  },
  {
    feature: '코딩',
    claude: '★★★★★ — Claude Code, Cursor의 백본',
    chatgpt: '★★★★ — Code Interpreter, GPTs',
    gemini: '★★★★ — Workspace 통합, Colab',
  },
  {
    feature: '이미지 이해 (멀티모달)',
    claude: '★★★★ — Artifacts에서 즉시 시각화',
    chatgpt: '★★★★ — Vision + DALL-E 통합',
    gemini: '★★★★★ — Imagen + 비디오 입력도',
  },
  {
    feature: '이미지 생성',
    claude: '✕ — 미지원',
    chatgpt: '★★★★ — DALL-E 3 통합',
    gemini: '★★★★ — Imagen 3',
  },
  {
    feature: '에이전트·도구 사용',
    claude: '★★★★★ — MCP·tool use 표준',
    chatgpt: '★★★★ — Custom GPTs, function calling',
    gemini: '★★★ — Workspace 액션 기반',
  },
  {
    feature: '무료 사용량',
    claude: '제한적 (claude.ai 일 횟수 제한)',
    chatgpt: 'GPT-5 / GPT-4o 일부 무료',
    gemini: '★★★★★ — 무료 사용량 가장 큼',
  },
  {
    feature: '월 구독 가격 (개인)',
    claude: 'Pro $20 / Max $200',
    chatgpt: 'Plus $20 / Pro $200',
    gemini: 'Advanced $20 (Google One)',
  },
  {
    feature: 'API 가격 (1M 토큰, 출력)',
    claude: '$15 (Sonnet) / $75 (Opus)',
    chatgpt: '$15 (GPT-5) / 더 비싼 옵션',
    gemini: '$10 (Pro) — 가장 저렴',
  },
];

const TASKS: { task: string; pick: string; reason: string }[] = [
  {
    task: '한국어 보고서·자소서·이메일',
    pick: 'Claude',
    reason: '한국어 격식체·문체 톤 일관성이 가장 강함. K-STAR-K 같은 한국형 프레임워크 적용 시 결과 안정적.',
  },
  {
    task: '긴 문서·PDF 요약·분석',
    pick: 'Claude 또는 Gemini',
    reason: 'Claude는 200K+, Gemini 1.5 Pro는 1M+ 토큰. 50페이지 이상 PDF는 Gemini가 유리.',
  },
  {
    task: '코딩 (사이드프로젝트·리팩토링)',
    pick: 'Claude (Code / Cursor)',
    reason: 'Claude Code는 CLI에서 직접 파일 편집·테스트. Cursor·Windsurf의 기본 엔진도 Claude.',
  },
  {
    task: '이미지 생성',
    pick: 'ChatGPT(DALL-E) 또는 Gemini(Imagen)',
    reason: 'Claude는 이미지 생성 미지원. DALL-E는 채팅 중 자연어로 즉시, Imagen은 무료 사용량 큼.',
  },
  {
    task: '데이터 분석·차트',
    pick: 'ChatGPT (Code Interpreter)',
    reason: '엑셀·CSV 업로드 → Python으로 즉시 분석·시각화. Gemini는 Sheets 통합이 강점.',
  },
  {
    task: 'AI 에이전트·자동화 구축',
    pick: 'Claude (MCP)',
    reason: 'MCP(Model Context Protocol)는 Anthropic이 주도, 도구 통합 표준이 가장 명확.',
  },
  {
    task: '비용 최소 / 무료 위주',
    pick: 'Gemini',
    reason: '무료 사용량 가장 크고 API도 가장 저렴. 가벼운 작업은 Gemini로 시작.',
  },
  {
    task: 'Custom GPT·플러그인 생태계',
    pick: 'ChatGPT',
    reason: 'Custom GPTs, GPT Store가 가장 활발. 비개발자도 만들 수 있음.',
  },
];

export default function Platforms() {
  return (
    <article className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold">Claude · ChatGPT · Gemini — 어떤 거 써야 하나</h1>
        <p className="mt-3 text-base text-slate-600">
          한국 사용자가 가장 자주 묻는 질문. 정답은 &ldquo;작업별로 다르다&rdquo;이고,
          이 페이지는 그 &ldquo;다르다&rdquo;를 구체적으로 풀어놓은 비교입니다.
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-xl font-bold">한 줄 요약</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded border-2 border-orange-200 bg-orange-50 p-4">
            <h3 className="font-semibold">Claude</h3>
            <p className="mt-2 text-sm">한국어·긴 글·코딩의 종합 1위. 안정적인 톤 일관성.</p>
          </div>
          <div className="rounded border-2 border-emerald-200 bg-emerald-50 p-4">
            <h3 className="font-semibold">ChatGPT</h3>
            <p className="mt-2 text-sm">생태계와 도구가 가장 풍부. 이미지·데이터 분석에 강함.</p>
          </div>
          <div className="rounded border-2 border-blue-200 bg-blue-50 p-4">
            <h3 className="font-semibold">Gemini</h3>
            <p className="mt-2 text-sm">긴 컨텍스트와 가격 효율. 무료로 가장 많이 쓸 수 있음.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">기능별 비교</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-slate-300 bg-slate-100">
                <th className="p-2 text-left">항목</th>
                <th className="p-2 text-left">Claude</th>
                <th className="p-2 text-left">ChatGPT</th>
                <th className="p-2 text-left">Gemini</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(r => (
                <tr key={r.feature} className="border-b border-slate-200">
                  <td className="p-2 font-medium">{r.feature}</td>
                  <td className="p-2 text-slate-700">{r.claude}</td>
                  <td className="p-2 text-slate-700">{r.chatgpt}</td>
                  <td className="p-2 text-slate-700">{r.gemini}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          ※ 2026년 5월 기준. AI 모델은 빠르게 진화하므로 최신 공식 사양은 각 제공사 페이지 확인.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">작업별 추천</h2>
        <div className="space-y-3">
          {TASKS.map(t => (
            <div key={t.task} className="rounded border bg-white p-4">
              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="text-sm font-semibold">{t.task}</h3>
                <span className="rounded bg-slate-900 px-2 py-0.5 text-xs font-bold text-white">
                  → {t.pick}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{t.reason}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded border-2 border-purple-200 bg-purple-50 p-5">
        <h2 className="text-lg font-bold">결정이 어려우면 — 단순 규칙</h2>
        <ol className="mt-3 list-decimal space-y-1 pl-6 text-sm">
          <li><strong>한국어 글쓰기 위주</strong>면 Claude</li>
          <li><strong>이미지·플러그인·데이터 분석</strong>이 핵심이면 ChatGPT</li>
          <li><strong>무료로 많이 쓰고 싶고 비용 부담 줄이고 싶다</strong>면 Gemini</li>
          <li><strong>모르겠으면 Claude</strong> — 한국 사용자 평균에서 실패 확률이 가장 낮음</li>
        </ol>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold">관련 자료</h2>
        <ul className="space-y-1 text-sm">
          <li>
            → <Link href="/" className="text-emerald-700 hover:underline">전체 프롬프트 갤러리</Link>
            {' '}— 113개 (플랫폼별 태그로 필터 가능)
          </li>
          <li>
            → <Link href="/guides" className="text-emerald-700 hover:underline">도메인 가이드</Link>
            {' '}— 분야별 AI 활용법
          </li>
        </ul>
      </section>
    </article>
  );
}
