---
title: 리텐션 진단 + KPI 베이스라인 설정
slug: data-retention-diagnostic
category: data
platform: [공통]
language: 영문
addedAt: 2026-05-31
source:
  name: Shushant Lakhyani — Medium
  url: https://medium.com/@slakhyani20/10-chatgpt-prompts-for-customer-retention-strategy-creation-a01c3385d4d7
  author: Shushant Lakhyani
variables:
  - { name: COMPANY, label: "회사명" }
  - { name: BUSINESS_MODEL, label: "비즈니스 모델 (B2B/B2C, 산업, 구독/거래형)" }
  - { name: DATE_RANGE, label: "분석 기간" }
  - { name: ACTIVITY_DATA, label: "활동 데이터 (MAU/DAU/신규가입/활성/이탈)" }
  - { name: REVENUE_DATA, label: "코호트별 매출" }
  - { name: FEEDBACK, label: "고객 피드백 테마" }
  - { name: COHORT_PERIOD, label: "코호트 단위 (월별/분기별)" }
---

```
I'm working on customer retention. Company: [COMPANY]. Business model: [BUSINESS_MODEL].
Provide a retention diagnostic for the period [DATE_RANGE] using these inputs:
- Activity: [ACTIVITY_DATA]
- Revenue: [REVENUE_DATA]
- Voice of customer: [FEEDBACK]

Deliver:
1) A baseline KPI set for retention (5–8 metrics, with definitions and target ranges).
2) Cohort-level health diagnosis ([COHORT_PERIOD]), flagging the riskiest cohort.
3) Top 3 retention risks with evidence and 3 leading indicators to monitor weekly.
4) A prioritized action plan (Quick wins vs. Strategic bets).

Output as a structured markdown report.
```

변수가 많지만 그만큼 결과 구체성이 높습니다. 그로스 분석가 첫 주차 진단에 적합. 코호트 데이터를 CSV로 첨부 후 사용하면 결과 품질이 크게 올라갑니다.
