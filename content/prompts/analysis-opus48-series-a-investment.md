---
title: Opus 4.8 시리즈 A 투자 평가 (XML 태그 구조)
slug: analysis-opus48-series-a-investment
category: analysis
platform: [Claude]
language: 영문
addedAt: 2026-06-03
source:
  name: Linas Substack — Claude Opus 4.8 Prompting Playbook
  url: https://linas.substack.com/p/claude-opus-4-8-prompting-playbook
  author: Linas
variables:
  - { name: COMPANY, label: "회사 설명" }
  - { name: ARR, label: "ARR" }
  - { name: GROWTH, label: "월 성장률" }
  - { name: SECTOR, label: "산업·버티컬" }
---

```
<context>
You are helping me evaluate a potential Series A investment.
The company is [COMPANY], currently at [ARR] ARR growing [GROWTH] MoM
in the [SECTOR] sector.
</context>

<instructions>
Analyze the three key risks that most commonly derail companies of this
shape at this stage. For each risk, explain the warning signs and what a
founder should be doing to mitigate them. Apply this analysis to all
three risks, not just the most obvious one.
</instructions>

<constraints>
- Be direct. Give your honest assessment, not a balanced "it depends"
- Use specific examples from real companies where possible
- Flag any assumptions you're making
- Maximum 600 words
</constraints>
```

Opus 4.8(2026-05-28 출시)이 instruction 문자 그대로 따르기를 강화해 **`<context>/<instructions>/<constraints>` XML 태그** 구조가 출력 품질을 가장 안정적으로 보장합니다. "be direct, not balanced" 같은 명시적 제약이 이전 모델보다 더 잘 먹힘.
