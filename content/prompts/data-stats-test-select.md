---
title: 연구 설계에 맞는 통계 검정 선택
slug: data-stats-test-select
category: data
platform: [공통]
language: 영문
addedAt: 2026-05-31
source:
  name: Chatsmith — 10 ChatGPT Prompts for Quantitative Data Analysis
  url: https://chatsmith.io/blogs/prompt/chatgpt-prompts-for-quantitative-data-analysis-00354
variables:
  - { name: RESEARCH_QUESTION, label: "연구 질문" }
  - { name: STUDY_DESIGN, label: "연구 설계 (실험/관찰/단면/종단 등)" }
  - { name: OUTCOME_VAR, label: "종속변수와 척도 (명목/서열/등간/비율)" }
  - { name: PREDICTOR_VARS, label: "독립변수 목록과 척도" }
  - { name: SAMPLE_STRUCTURE, label: "표본 크기·집단 구조·반복측정 여부" }
  - { name: KNOWN_ISSUES, label: "결측치·정규성·군집 등 알려진 이슈" }
---

```
Help me choose the right statistical method for my analysis.

- Research question: [RESEARCH_QUESTION]
- Study design: [STUDY_DESIGN]
- Outcome (dependent) variable and its type: [OUTCOME_VAR]
- Predictor (independent) variables and their types: [PREDICTOR_VARS]
- Sample size and group structure: [SAMPLE_STRUCTURE]
- Known issues (missing data, non-normality, clustering, etc.): [KNOWN_ISSUES]

Please:
1. Recommend the most appropriate primary test or model, and 1–2 alternatives.
2. List the assumptions of each and how to check them.
3. Flag common mistakes researchers make with this design.
4. Tell me what reporting metrics (effect size, CI, etc.) I should include.
```

종속/독립변수의 측정 척도(명목·서열·등간·비율)를 반드시 명시해야 적절한 검정이 추천됩니다. 검정 후보가 나오면 "왜 X가 아닌 Y인지" 추가 질문으로 깊이를 더하세요. "가정 체크 방법까지 알려달라"는 줄이 환각 방지 안전장치.
