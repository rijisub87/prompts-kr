---
title: 기업 보고서·IR 핵심 인사이트 추출 (Corporate Clairvoyant)
slug: data-corporate-report
category: data
platform: [공통]
language: 영문
addedAt: 2026-05-31
source:
  name: Anthropic Prompt Library
  url: https://docs.anthropic.com/en/resources/prompt-library/corporate-clairvoyant
  author: Anthropic
variables:
  - { name: REPORT, label: "보고서 본문" }
---

```
Your task is to analyze the following report:

<report>
[REPORT]
</report>

Summarize this report in a concise, bulleted way. Identify and discuss the top 5 most important insights, trends, and risks discussed. Then, output a 5-bullet memo to the team summarizing what to take away, with an emphasis on forecasting operating and revenue risks in the coming quarter and how our company should prepare.
```

경쟁사 분기 실적 PDF, 시장조사 보고서, 산업 백서 같은 긴 문서를 임원 메모로 전환합니다. [REPORT]에 텍스트 paste — Claude는 200K 컨텍스트라 분기 IR 자료 전체도 한 번에 가능. Anthropic 공식.
