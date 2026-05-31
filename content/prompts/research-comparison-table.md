---
title: 비교 표 자동 작성 (셀별 출처 명시)
slug: research-comparison-table
category: research
platform: [공통]
language: 영문
addedAt: 2026-05-31
source:
  name: Anthropic Prompt Library
  url: https://docs.anthropic.com/en/resources/prompt-library/pro-coder
  author: Anthropic
variables:
  - { name: OPTION_A, label: "옵션 A" }
  - { name: OPTION_B, label: "옵션 B" }
  - { name: OPTION_C, label: "옵션 C" }
  - { name: USE_CASE, label: "사용 시나리오·구매자 프로파일" }
  - { name: SOURCES, label: "참고 출처" }
---

```
Build a side-by-side comparison table for the following options, using only information found in the provided sources. Do not invent specifications.

Options to compare: [OPTION_A], [OPTION_B], [OPTION_C]
Use case / buyer profile: [USE_CASE]

Required columns:
- Price (with currency & date)
- Core features (max 5 bullets each)
- Best-fit scenarios
- Known limitations
- Source URL for each cell

After the table, provide:
1. Recommendation ranked 1-2-3 for the stated use case.
2. Rationale in 3 sentences.
3. Caveat: list any data points you could NOT verify from the sources.

Sources:
[SOURCES]
```

**"do not invent specifications"** 와 **"source URL for each cell"** 두 줄 덕분에 허위 스펙 생성을 크게 줄입니다. SaaS·제품 비교·정책 비교 등에 강력.
