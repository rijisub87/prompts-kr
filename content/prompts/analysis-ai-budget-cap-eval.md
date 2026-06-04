---
title: AI 도구 예산 한도 평가 프레임워크
slug: analysis-ai-budget-cap-eval
category: analysis
platform: [공통]
language: 영문
addedAt: 2026-06-04
source:
  name: Simon Willison's Weblog
  url: https://simonwillison.net/2026/Jun/3/uber-caps-usage/
  author: Simon Willison
variables:
  - { name: COMPANY, label: "회사" }
  - { name: CAP_AMOUNT, label: "도구당 월 한도 ($)" }
  - { name: NUM_TOOLS, label: "별도 예산 도구 수" }
  - { name: MEDIAN_COMP, label: "대상 직무 중간 총보상 ($/년)" }
---

```
You are evaluating whether a per-employee monthly AI tool spending cap is restrictive or permissive at [COMPANY].

Inputs:
- Proposed cap: $[CAP_AMOUNT] per tool per month
- Number of separately-budgeted tools: [NUM_TOOLS]
- Median total compensation for affected role: $[MEDIAN_COMP]/year

Do:
1. Compute annual ceiling per employee = CAP_AMOUNT * NUM_TOOLS * 12.
2. Express that ceiling as a percentage of median compensation MEDIAN_COMP.
3. Compare against industry benchmarks for productivity-tool spend (3-15% of comp is typical for high-leverage tooling).
4. State whether the cap is restrictive, balanced, or generous, and name the assumption that would flip your verdict.

Note that spending on one tool does not draw from another tool's budget.
```

AI 도구 도입 의사결정에서 **"비싸다/싸다" 직감 대신, 직무 총보상 대비 %** 로 환산하면 객관적 판단이 됩니다. Uber의 $1,500/월 캡은 중간 보상의 약 11%. 한국 IT 기업 결재 자료·예산 검토에 그대로 적용 가능.
