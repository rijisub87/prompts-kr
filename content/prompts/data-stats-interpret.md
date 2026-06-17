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

R·SPSS 등에서 뽑은 통계 출력을 통계 정의가 아니라 "내 연구 질문에서 이게 무슨 뜻인가"로 풀어 설명해주는 프롬프트입니다. 각 수치의 맥락별 의미, 통계적 유의성이 말해주는 것과 못 말해주는 것, p값과 함께 봐야 할 효과크기의 실질적 의미, 연구 질문에 대한 결론, 그리고 이 출력으로는 결론지을 수 없는 것까지 짚어줍니다. p값을 "효과가 있을 확률"로 오해하지 않도록 막고, 유의하지만 실질적으로 사소한 결과나 그 반대 경우를 따로 표시해주는 마지막 부분이 특히 유용합니다. TEST_OR_MODEL(분석 종류), OUTPUT(전체 출력), QUESTION(연구 질문) 세 가지를 모두 붙여야 일반론이 아닌 맥락 해석이 나옵니다. 출력 일부만 잘라 넣으면 해석도 부분적이 되니 표 전체를 넣으세요.
