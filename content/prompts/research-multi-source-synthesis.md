---
title: 다중 출처 종합 (충돌 탐지)
slug: research-multi-source-synthesis
category: research
platform: [공통]
language: 영문
addedAt: 2026-05-31
source:
  name: DAIR.AI Prompt Engineering Guide
  url: https://www.promptingguide.ai/techniques/cot
  author: DAIR.AI
variables:
  - { name: TOPIC, label: "주제" }
  - { name: SOURCES_WITH_URLS, label: "소스 목록 (URL 포함)" }
---

```
You are a research synthesis assistant. I will give you N sources on the same topic. Your job:

STEP 1 - Extract claims:
For each source, list the 3-5 key factual claims with direct quotes.

STEP 2 - Build a claim matrix:
| Claim | Source A | Source B | Source C | Agreement? |
Mark each cell: Supports / Contradicts / Silent / Nuance.

STEP 3 - Flag conflicts:
For any row with contradictions, write a 2-sentence analysis: which source is more credible and why (recency, authority, methodology).

STEP 4 - Synthesis:
Write a single coherent paragraph that represents the consensus, explicitly noting where evidence is contested.

Topic: [TOPIC]
Sources:
[SOURCES_WITH_URLS]
```

같은 사건/주제에 대한 기사 3~5개를 함께 넣으면 어떤 매체가 어디서 다른 말을 하는지 한눈에 보입니다. 학술 종설·뉴스 종합·시장 보고서 작성에 강력.
