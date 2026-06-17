import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '소개 — Anthropic·OpenAI·한국 출처 큐레이션',
  description: 'Anthropic Prompt Library, awesome-chatgpt-prompts, GPTers, 자소설닷컴 등 공개·신뢰도 높은 출처에서 한국 사용자에게 실용적인 AI 프롬프트만 골라 모았습니다.',
};

export default function About() {
  return (
    <article className="prose prose-sm max-w-none dark:prose-invert">
      <h1>프롬프트 한국 소개</h1>
      <p>
        프롬프트 한국은 한국 사용자가 Claude·ChatGPT·Gemini 같은 AI를 실무에 바로 쓸 수 있도록,
        검증된 출처에서 프롬프트를 골라 한국어로 정리하는 큐레이션 사이트입니다.
        자소서·이메일·보고서·코딩·데이터 분석·교육 등 200여 개 프롬프트를 17개 카테고리로 분류해
        제공합니다.
      </p>

      <h2>어디서 모으나요</h2>
      <p>
        Anthropic Prompt Library, OpenAI Cookbook, awesome-chatgpt-prompts, DAIR.AI 같은 영어권
        공개 출처와, GPTers·브런치·뉴스레터 등 한국 실무 콘텐츠를 함께 살핍니다. AI 분야
        연구자·엔지니어가 공개한 최신 프롬프트도 진위를 확인해 추가합니다. 모든 항목에는
        <strong> 원본 출처와 작성자</strong>를 표기합니다.
      </p>

      <h2>어떻게 큐레이션하나요</h2>
      <p>
        단순 복사·번역이 아닙니다. 각 프롬프트마다 (1) 한국 맥락에서 잘 동작하도록 변수·문체·
        글자 수 옵션을 다듬고, (2) 어떤 상황에 쓰면 좋은지, 어떤 값을 넣어야 하는지, 주의할 점은
        무엇인지 실사용 관점의 설명을 덧붙입니다. 흔하거나 품질이 낮은 항목은 제외하고, 실제로
        결과가 좋은 것만 남깁니다.
      </p>

      <h2>이렇게 활용하세요</h2>
      <ul>
        <li>카테고리·검색으로 필요한 프롬프트를 찾고, 변수에 값을 채워 복사해 사용</li>
        <li>상황별 <strong>묶음 모음(컬렉션)</strong>으로 한 번에 여러 프롬프트를 확보</li>
        <li>가이드에서 도메인별 프롬프트 작성법·배경 지식 학습</li>
        <li>생활AI·재테크AI에서 MBTI·사주·시장 리포트 등 AI 기능을 직접 체험</li>
      </ul>

      <p>
        문의·제휴: <a href="mailto:rijisub@naver.com">rijisub@naver.com</a> ·
        콘텐츠 라이선스는 <a href="/license">라이선스 안내</a>를, 개인정보 처리는{' '}
        <a href="/privacy">개인정보처리방침</a>을 참고하세요.
      </p>
    </article>
  );
}
