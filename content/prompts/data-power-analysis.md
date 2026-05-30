---
title: 표본 크기·검정력(Power) 분석 가이드
slug: data-power-analysis
category: data
platform: [공통]
language: 영문
addedAt: 2026-05-31
source:
  name: Chatsmith — 10 ChatGPT Prompts for Quantitative Data Analysis
  url: https://chatsmith.io/blogs/prompt/chatgpt-prompts-for-quantitative-data-analysis-00354
variables:
  - { name: PLANNED_ANALYSIS, label: "계획한 분석 (t검정·ANOVA·회귀 등)" }
  - { name: EFFECT_SIZE, label: "기대 효과크기와 근거 (선행연구·파일럿·최소 의미 있는 효과)" }
  - { name: POWER, label: "원하는 검정력 (보통 0.80)" }
  - { name: ALPHA, label: "유의수준 (보통 0.05, 양측)" }
  - { name: DROPOUT, label: "예상 탈락률 (%)" }
---

```
Help me think through a power analysis for my study (prospective, not post-hoc).

Inputs:
- Planned analysis: [PLANNED_ANALYSIS]
- Expected effect size and how I justified it: [EFFECT_SIZE]
- Desired power: [POWER]
- Alpha level: [ALPHA]
- Any expected dropout/missingness: [DROPOUT]

Please:
1. Walk me through the formula or G*Power inputs I'd use, step by step.
2. Estimate the required sample size, showing the calculation.
3. Explain what "power = 0.80" actually means in plain language.
4. Warn me about common pitfalls (post-hoc power, inflated effect-size guesses, multiple comparisons).
5. Tell me when I should NOT trust your number and consult a statistician instead.
```

⚠️ ChatGPT 단독 표본 크기 계산은 단순 사례조차 자주 틀린다고 보고됩니다 (PMC12411907 등). G*Power·R `pwr` 패키지로 반드시 교차 검증하세요. 마지막 줄("언제 통계학자에게 가야 하나")이 안전장치 역할.
