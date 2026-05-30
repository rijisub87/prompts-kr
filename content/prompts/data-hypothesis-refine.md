---
title: 모호한 아이디어 → 검증 가능한 가설로 정제
slug: data-hypothesis-refine
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
---

```
Generate a list of research hypotheses related to [TOPIC].

For each hypothesis, structure it as:
- Independent variable(s) and how they will be operationalized
- Dependent variable(s) and how they will be measured
- Expected direction of the relationship (or null)
- The population it applies to
- One concrete way to falsify it

Rewrite any vague claim into a precise, testable form.
```

학위논문 주제 정제에 직격. [TOPIC]은 본인 연구의 한 문장 요약. 독립/종속변수·방향·반증가능성까지 명시되므로 IRB 신청서·proposal에도 그대로 재활용 가능합니다.
