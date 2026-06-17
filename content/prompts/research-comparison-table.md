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

여러 선택지를 표로 나란히 비교할 때 쓰는 프롬프트입니다. 핵심은 **"do not invent specifications"** 와 **"source URL for each cell"** 두 지시인데, 제공한 출처에 있는 정보만 쓰게 하고 셀마다 출처 URL을 달게 해서 모델이 스펙을 지어내는 일을 크게 줄입니다. 표 아래에는 사용 시나리오 기준 1·2·3위 추천과 그 근거, 그리고 출처에서 확인하지 못한 항목(Caveat)까지 따로 정리해 줍니다. SaaS 도구 선정, 제품·요금제 비교, 정책·플랜 비교 등에 적합합니다. 활용 팁은 비교할 옵션의 제품 페이지나 가격표 본문을 SOURCES에 직접 붙여 넣는 것으로, 출처가 빈약하면 Caveat 항목만 길어집니다. 사용 시나리오(USE_CASE)를 "예산이 빠듯한 5인 스타트업"처럼 구체적으로 적을수록 추천 순위가 실제 판단에 가까워집니다.
