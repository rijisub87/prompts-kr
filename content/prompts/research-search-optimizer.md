---
title: 검색어·쿼리 최적화 (연산자 활용)
slug: research-search-optimizer
category: research
platform: [공통]
language: 한국어
addedAt: 2026-05-31
source:
  name: Google Search Help — Refine web searches
  url: https://support.google.com/websearch/answer/2466433
  author: Google
variables:
  - { name: GOAL, label: "리서치 목표" }
  - { name: LANGUAGE, label: "언어" }
  - { name: DATE_RANGE, label: "기간 제한 (없으면 '없음')" }
---

```
당신은 검색 전문가다. 내 리서치 목표를 받아 효과적인 검색 쿼리 세트를 만들어라.

리서치 목표: [GOAL]
검색엔진: Google / Google Scholar / Perplexity / 네이버
언어: [LANGUAGE]
기간 제한: [DATE_RANGE]

다음을 출력하라:

1. 핵심 키워드 3종(좁은/중간/넓은)
2. 부울/연산자 쿼리 5개. 각각 다음 연산자 중 적절히 사용:
   - "정확한 구문"
   - site:도메인
   - filetype:pdf
   - intitle:키워드
   - -제외어
   - OR
   - before:YYYY-MM-DD / after:YYYY-MM-DD
3. 각 쿼리가 어떤 종류의 결과를 가져올지 한 줄 설명
4. 1차 결과에서 발견될 가능성이 높은 "다음 단계 쿼리" 3개
5. 한국어/영어 검색 결과 차이가 예상되면 양쪽 쿼리 모두 제시
```

AI가 직접 검색하지 못해도 이 출력만 받아 직접 구글링하면 리서치 속도가 2~3배 빨라집니다. 연산자 목록은 Google Search Help 공식.
