export const metadata = { title: '라이선스 · 이용 안내' };

export default function License() {
  return (
    <article className="prose prose-sm max-w-none dark:prose-invert">
      <h1>라이선스 · 이용 안내</h1>

      <h2>핵심 요약</h2>
      <p>
        본 사이트의 콘텐츠는 <strong>이중 라이선스 구조</strong>입니다.
      </p>
      <ul>
        <li>
          <strong>원본 프롬프트 본문</strong> — 각 프롬프트의 <em>출처</em>에 명시된
          라이선스를 따릅니다. 페이지 하단 출처 링크에서 원본을 확인하세요.
        </li>
        <li>
          <strong>한국어 큐레이션 · 번역 · 사용 팁 · 도메인 가이드 · 사이트 자체의 구조 · 디자인</strong> —
          <strong> CC BY-NC-SA 4.0</strong> (출처 표기 + 비상업 + 동일조건 공유)
        </li>
      </ul>

      <h2>해도 되는 것</h2>
      <ul>
        <li>개인적 학습·참고를 위한 자유로운 이용</li>
        <li>본 사이트 URL을 출처로 표기 후 인용 (블로그·SNS·발표 자료 등)</li>
        <li>큐레이션 항목을 본인 노트·문서로 정리해서 보관</li>
        <li>비상업 목적의 2차 가공 (단, 동일 라이선스로 공유)</li>
      </ul>

      <h2>안 되는 것</h2>
      <ul>
        <li>본 사이트의 <strong>큐레이션된 모음 전체 또는 상당량</strong>을 그대로 복제해 다른 사이트·서비스로 옮기는 것</li>
        <li>큐레이션 결과(한국어 팁·해설·번역 포함)를 <strong>AI 학습 데이터로 무단 사용</strong></li>
        <li>출처 표기 없이 한국어 해설·도메인 가이드를 재게시</li>
        <li>본 사이트 콘텐츠를 활용한 상업 제품·서비스 (사전 협의 필요)</li>
      </ul>

      <h2>왜 이런 구조인가</h2>
      <p>
        우리는 Anthropic Prompt Library, awesome-chatgpt-prompts, GPTers 등 공개·신뢰도
        높은 출처에서 프롬프트를 모았고, 모든 항목에 원본 링크와 작성자를 표기합니다.
        이는 공개된 프롬프트 생태계의 선의의 관행을 따르는 것입니다.
      </p>
      <p>
        반대로, 우리가 들인 <strong>큐레이션 노력</strong> — 한국어 사용 팁 작성, 카테고리 체계,
        한국 맥락에 맞춘 변수·문체·글자 수 옵션 추가, 도메인 가이드 작성 — 역시 동일한 선의의
        관행으로 보호받기를 요청합니다. 가져가실 때 출처(이 사이트 URL)를 표기해주세요.
      </p>

      <h2>AI 학습 크롤러 차단</h2>
      <p>
        본 사이트의 <code>/robots.txt</code>는 GPTBot, ClaudeBot, Google-Extended,
        PerplexityBot 등 주요 AI 학습 크롤러를 명시적으로 거부합니다. 개별 프롬프트는 공개된
        자원이지만, 큐레이션된 모음 전체를 학습 데이터로 일괄 수집하는 것은 별개 사안입니다.
      </p>

      <h2>문의 · 침해 신고</h2>
      <p>
        라이선스 관련 문의, 상업 이용 협의, 또는 침해 사례 신고는{' '}
        <a href="mailto:rijisub@naver.com" className="text-emerald-700 hover:underline dark:text-emerald-400">
          rijisub@naver.com
        </a>{' '}
        으로 주세요.
      </p>
    </article>
  );
}
