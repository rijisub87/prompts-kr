---
title: 지자체 인구 추이 분석 → 공공기관 양식 보고서 초안
slug: report-public-population-policy
category: report
platform: [공통]
language: 한국어
addedAt: 2026-06-08
source:
  name: "브런치 — Via Nova '공무원과 직장인을 위한 ChatGPT 프롬프트 가이드'"
  url: "https://brunch.co.kr/@shiner/59"
  author: "Via Nova"
variables:
  - { name: REGION, label: "분석할 지자체명 (예: 화성시, 서울 강남구)" }
  - { name: PERIOD, label: "분석 기간 (예: 최근 5년, 2020~2025)" }
  - { name: POLICY_TOPIC, label: "정책 주제 (예: 인구정책, 청년정책, 노인복지)" }
---

```
너는 [POLICY_TOPIC] 전문가야. [REGION] [PERIOD] 인구 추이를 분석해줘.

1. 행정안전부 주민등록인구데이터와 통계청 KOSIS 자료 등 신뢰성 있는 자료를 바탕으로 분석해줘.
2. 출생·사망·전입·전출 등 인구변화의 주요 원인을 알려주고
3. 특정 연령대나 특정 지역(행정동)에서 변화가 있는지도 리포팅해줘.
4. 데이터 자료는 표 형태로 표현해줘.
5. 이 자료를 바탕으로 [POLICY_TOPIC] 기본 보고서를 만들 수 있도록 공공기관 보고서 형식의 계층적 구조화로 진행해줘.
6. 출처가 불확실한 수치는 "추정치" 또는 "[검증 필요]"로 표시해줘.
```

공공기관 보고서 특유의 **계층적 구조화**(목차 → 1 → 1.1 → 1.1.1) 관행과 한국 공식 통계 출처(KOSIS, 행안부)를 명시한 정부·지자체 실무 프롬프트. 지자체명·정책 주제만 바꾸면 전국 응용 가능. AI 환각 방지로 "추정치/[검증 필요]" 표기 규칙 추가 — 실제 수치는 KOSIS에서 직접 확인 필요.
