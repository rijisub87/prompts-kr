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
        Anthropic Prompt Library, awesome-chatgpt-prompts, GPTers, 자소설닷컴 등
        공개·신뢰도 높은 출처에서 한국 사용자에게 실용적인 AI 프롬프트만 골라 모았습니다.
      </p>
      <p>
        모든 항목에 <strong>원본 출처와 작성자</strong>를 명시합니다. 단순 복붙·번역이 아니라,
        한국 맥락에서 잘 동작하는 변수·문체·글자 수 옵션을 더해 정리했습니다.
      </p>
    </article>
  );
}
