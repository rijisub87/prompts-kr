---
title: Chain of Density 요약 — 같은 분량, 5회 반복으로 정보 밀도 극대화
slug: summary-chain-of-density
category: summary
platform: [공통]
language: 영문
addedAt: 2026-06-16
source:
  name: "Chain of Density (Adams et al. 2023) — KDnuggets 정리"
  url: "https://www.kdnuggets.com/unlocking-gpt-4-summarization-with-chain-of-density-prompting"
variables:
  - { name: ARTICLE, label: "요약할 원문 (기사·보고서·논문 등)" }
---

```
Article: [ARTICLE]

You will generate increasingly concise, entity-dense summaries of the above Article.

Repeat the following 2 steps 5 times.

Step 1. Identify 1-3 informative Entities ("; " delimited) from the Article which are missing from the previously generated summary.
Step 2. Write a new, denser summary of identical length which covers every entity and detail from the previous summary plus the Missing Entities.

A Missing Entity is:
- Relevant: to the main story.
- Specific: descriptive yet concise (5 words or fewer).
- Novel: not in the previous summary.
- Faithful: present in the Article.
- Anywhere: located anywhere in the Article.

Guidelines:
- The first summary should be long (4-5 sentences, ~80 words) yet highly non-specific, containing little information beyond the entities marked as missing.
- Make every word count: rewrite the previous summary to improve flow and make space for additional entities.
- Make space with fusion, compression, and removal of uninformative phrases like "the article discusses".
- The summaries should become highly dense and concise yet self-contained, e.g., easily understood without the Article.
- Never drop entities from the previous summary. If space cannot be made, add fewer new entities.
- Use the exact same number of words for each summary.

Answer in Korean. Output as a list (length 5) of {Missing_Entities, Denser_Summary}.
```

학계에서 검증된 **Chain of Density(CoD)** 기법. 한 번에 요약하지 않고, 같은 분량을 유지하면서 5회 반복으로 빠진 핵심 개체(entity)를 채워 넣어 **정보 밀도를 점점 높이는** 방식. 1차는 두루뭉술하게 시작해 5차에서 가장 압축적이면서도 그 자체로 이해되는 요약이 나옴. 긴 기사·보고서·논문을 "짧지만 빠짐없이" 요약할 때 일반 요약보다 훨씬 알차다. 마지막 5번째 요약을 쓰면 됨.
