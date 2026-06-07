---
title: 긴 문서 QA — XML 태그 + 인용 강제로 환각 차단
slug: summary-gpt52-long-context-xml
category: summary
platform: [Claude, ChatGPT]
language: 한국어
addedAt: 2026-06-08
source:
  name: "OpenAI Cookbook — GPT-5.2 Prompting Guide"
  url: "https://cookbook.openai.com/examples/gpt-5/gpt-5-2_prompting_guide"
variables:
  - { name: QUESTION, label: "원문에 대한 질문" }
  - { name: LONG_CONTEXT, label: "긴 원문 (계약서·논문·회의록·PDF 텍스트)" }
---

```
<long_context_handling>
- 10k 토큰을 넘는 입력의 경우:
  - 먼저 요청과 관련된 주요 섹션의 짧은 내부 개요를 작성한다.
  - 답변 전에 사용자의 제약 조건을 다시 한 번 명시한다.
  - 답변에서는 두루뭉술하게 말하지 말고 출처 섹션에 근거하여 답한다.
- 답변이 세부에 의존한다면 해당 부분을 직접 인용하거나 표현을 살려 옮긴다.
- 확실하지 않은 정확한 수치·줄 번호·외부 참조는 절대 지어내지 말 것.
  원문에 없는 숫자는 "원문에 명시되지 않음"으로 답할 것.
</long_context_handling>

<task>
[QUESTION]
</task>

<source>
[LONG_CONTEXT]
</source>
```

OpenAI가 GPT-5.2 공식 가이드에서 권장하는 XML 태그 패턴. 10k 토큰이 넘는 PDF·계약서·논문·회의록에 질문할 때 두루뭉술 답변과 숫자 날조를 차단. "원문에 명시되지 않음" 응답을 명시적으로 허용해 모델이 추측하는 대신 모르는 것을 모른다고 말하게 만듦. Claude·ChatGPT 모두 XML 태그를 잘 인식.
