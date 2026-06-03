---
title: Few-shot Example Pattern (Opus 4.8 효과 大)
slug: planning-fewshot-pattern
category: planning
platform: [Claude]
language: 영문
addedAt: 2026-06-03
source:
  name: Linas Substack — Claude Opus 4.7/4.8 Prompting Guide
  url: https://linas.substack.com/p/claude-opus-4-7-prompting-guide
  author: Linas
variables:
  - { name: EXAMPLE_INPUT, label: "예시 입력" }
  - { name: EXAMPLE_OUTPUT, label: "예시 출력 (원하는 톤·구조)" }
  - { name: SITUATION, label: "분석할 상황" }
---

```
<examples>
  <example>
    Input: "[EXAMPLE_INPUT]"
    Output: "[EXAMPLE_OUTPUT]"
  </example>
</examples>

Now analyze this situation using the same approach:
"[SITUATION]"
```

추상적 지시("분석해줘") 대신 1-3개의 `<example>` 짝을 보여주면 **Opus 4.8이 톤·구조·논리 흐름까지 그대로 모사**. 자료에 따르면 Opus 4.7/4.8에서 Few-shot 효과가 이전 모델 대비 가장 크게 증가. 경영 의사결정·전략 분석·정성 평가 등에 강력. 예시는 1개만으로도 큰 차이.
