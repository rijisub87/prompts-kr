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

같은 사건이나 주제를 다룬 출처 3~5개를 한꺼번에 넣으면, 주장별로 어느 출처가 지지·반박·침묵하는지 표(클레임 매트릭스)로 정리하고 충돌 지점만 골라 신뢰도까지 비교해 줍니다. 단순 요약이 아니라 "출처들이 어디서 갈라지는가"를 드러내는 게 핵심이라, 논쟁적 주제의 학술 종설·뉴스 종합·경쟁사 비교 보고서에 적합합니다. 활용 팁: SOURCES_WITH_URLS에 매체명·발행일·저자를 함께 적어 두면 STEP 3의 신뢰도 판단(최신성·권위·방법론)이 훨씬 근거 있게 나옵니다. 주의할 점은 출처 본문을 직접 붙여 넣지 않고 URL만 주면 모델이 내용을 추정해 인용이 부정확해질 수 있으니, 가능하면 원문 발췌를 함께 넣으세요.
