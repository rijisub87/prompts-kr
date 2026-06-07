---
title: 데이터 필드 → 태블로 대시보드 그래프 5종 자동 구성안
slug: data-tableau-dashboard-fields
category: data
platform: [공통]
language: 한국어
addedAt: 2026-06-08
source:
  name: "브런치 — Suki '대시보드 알아서 구성해주는 ChatGPT 프롬프트'"
  url: "https://brunch.co.kr/@sukistory/31"
  author: "Suki"
variables:
  - { name: DATA_DOMAIN, label: "데이터 영역 (예: 영업마케팅, 인사, 생산, 재무)" }
  - { name: OBJECTIVE, label: "분석 목적 (예: 영업 실적 개선, 이탈 고객 예측)" }
  - { name: FIELDS, label: "필드명 목록 (공백으로 구분)" }
---

```
나에게 '[DATA_DOMAIN]' 데이터가 있어. '[OBJECTIVE]' 위해 태블로 대시보드를 만들고 싶어.

필드명은 다음과 같아:
[FIELDS]

대시보드 작성을 위해 어떤 5개의 그래프를 만들 수 있을지 다음 표 형태로 알려줘.

| 그래프명 | 그래프 상세 (용도 및 목적) | 차원 | 측정값 |
|---|---|---|---|

각 그래프에 대해 다음을 포함해줘:
- 어떤 인사이트를 보여주는가
- 어떤 의사결정에 활용 가능한가
- 추가로 필요한 계산 필드가 있다면 명시
```

데이터 분석가의 대시보드 기획 30분을 5분으로 단축. 유통·제조 실무에서 흔한 "제품분류체계 대/중, 유통형태 대/중/소" 같은 한국 필드 체계를 그대로 던져도 잘 매핑. 태블로 외에 Looker·Power BI·Superset 등 대부분의 BI 도구에도 동일하게 적용 가능. 결과를 표로 강제해서 회의에서 바로 공유.
