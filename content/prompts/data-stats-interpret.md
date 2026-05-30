---
title: 통계 결과 해석 (P-value·효과크기·CI 평이한 언어로)
slug: data-stats-interpret
category: data
platform: [공통]
language: 영문
addedAt: 2026-05-31
source:
  name: Chatsmith — 10 ChatGPT Prompts for Quantitative Data Analysis
  url: https://chatsmith.io/blogs/prompt/chatgpt-prompts-for-quantitative-data-analysis-00354
variables:
  - { name: TEST_OR_MODEL, label: "수행한 분석 (검정·모형)" }
  - { name: OUTPUT, label: "통계 출력 (p값·CI·계수·적합도)" }
  - { name: QUESTION, label: "연구 질문" }
---

```
Help me interpret the following statistical output. The analysis I ran: [TEST_OR_MODEL]. The output: [OUTPUT]. My research question: [QUESTION].

Please explain in plain language:
1. What each key statistic means in this specific context (not generic definitions).
2. Whether the result is statistically significant, and what that does and does not tell me.
3. The practical/clinical significance of the effect size, and why it matters alongside the p-value.
4. What the result means for my original research question.
5. What I CANNOT conclude from this output.

Flag any result that is statistically significant but practically trivial, or practically meaningful but statistically uncertain.
```

학부 통계 지식 있는 대학원생의 #1 니즈. p값을 "효과 확률"로 오해하지 않도록 막아주는 마지막 두 줄이 결정적입니다. 분석 종류·전체 출력·연구 질문 3가지를 모두 붙여야 해석이 구체적으로 나옵니다.
