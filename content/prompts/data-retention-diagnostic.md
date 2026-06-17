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

고객 리텐션을 한 번에 진단하고 추적할 KPI 베이스라인까지 잡아주는 프롬프트입니다. 활동·매출·고객 피드백을 입력하면 리텐션 지표 5~8개(정의·목표 범위 포함), 코호트별 건강도 진단과 가장 위험한 코호트, 근거가 붙은 리스크 톱3와 매주 볼 선행 지표, 그리고 퀵윈과 전략 베팅으로 나눈 실행 계획을 마크다운 리포트로 정리해줍니다. 그로스 분석가가 새 제품을 맡은 첫 주차 현황 파악에 적합합니다. 입력 변수가 많은 만큼 채워 넣을수록 결과가 구체적이니, 코호트별 매출·활동 데이터는 CSV로 첨부하면 진단 품질이 크게 올라갑니다. 단, 목표 범위나 리스크 우선순위는 AI 추정이므로 자사 과거 추이와 대조해 조정한 뒤 실행하세요.
