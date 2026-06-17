---
title: 방법론(Methods) 섹션 초안 작성
slug: data-methods-section
category: data
platform: [공통]
language: 영문
addedAt: 2026-05-31
source:
  name: GitHub — chatgpt-prompts-for-academic-writing
  url: https://github.com/ahmetbersoz/chatgpt-prompts-for-academic-writing
  author: Ahmet Bersoz
variables:
  - { name: TOPIC, label: "연구 주제 한 문장" }
  - { name: METHOD, label: "구체적 연구 방법 (질적 반구조화 면접/설문/RCT 등)" }
---

```
Write a detailed methodology section for a study on [TOPIC] using [METHOD].

Cover, in standard academic order:
1. Research design and rationale (why this design fits the question)
2. Participants / sample (recruitment, inclusion/exclusion, sample size justification)
3. Materials / instruments (validated scales, version, reliability evidence)
4. Procedure (step by step, in past tense, third person)
5. Data analysis plan (which tests, software, handling of missing data, significance level)
6. Ethics (IRB/consent)

Write in formal academic English suitable for an APA-style paper. Mark any section where you are inventing details that I must replace with my own.
```

논문·학위논문의 방법론(Methods) 섹션 1차 초안을 표준 학술 순서(연구 설계·표본·도구·절차·분석 계획·윤리)대로 한 번에 뽑아주는 프롬프트입니다. 빈 문서 앞에서 막막할 때 뼈대를 빠르게 세우는 용도로 유용합니다. METHOD에는 "질적 반구조화 면접", "온라인 설문", "이중맹검 RCT"처럼 실제 사용한 방법을 구체적으로 넣어야 절차가 현실적으로 나옵니다. 가장 큰 강점은 마지막 줄로, AI가 지어낸 세부사항(표본 수, 신뢰도 수치 등)에 표시를 남기게 해서 본인 자료로 교체할 부분을 한눈에 찾을 수 있다는 점입니다. APA가 아닌 학술지 양식이 필요하면 마지막 문장의 "APA-style"을 해당 양식으로 바꿔 지정하세요. 표시된 부분을 실제 데이터로 채우기 전에는 제출용으로 쓰면 안 됩니다.
