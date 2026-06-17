---
title: 3년 재무 추정 + 손익분기점(BEP) 분석
slug: planning-bp-financials
category: planning
platform: [공통]
language: 영문
addedAt: 2026-05-31
source:
  name: SCORE — Financial Projections Template
  url: https://www.score.org/resource/template/financial-projections-template
  author: SCORE Association (U.S. SBA resource partner)
variables:
  - { name: PRICING, label: "가격 모델" }
  - { name: CAC, label: "예상 CAC" }
  - { name: COMP, label: "산업·비교 기업" }
  - { name: STARTING_CASH, label: "초기 자본금" }
  - { name: RAISE_AMOUNT, label: "조달 예정액" }
---

```
Build a 3-year financial projection for the business below. Output four
tables (Years 1–3, monthly for Year 1; quarterly for Years 2–3) and a
break-even analysis. Use plausible benchmark ratios for the stated industry
and state every assumption explicitly.

── Table A: Revenue forecast ──
Driver-based: (# customers acquired) × (conversion %) × (ARPU) × (retention)
Show: new customers, churned customers, ending customers, MRR/ARR

── Table B: Cost of Goods Sold (COGS) ──
- Hosting / infra / payment fees / direct labor
- Gross margin % per row and per year

── Table C: Operating Expenses (OPEX) ──
- Salaries (headcount plan with hire dates)
- S&M (CAC × new customers; show CAC payback months)
- R&D, G&A, rent, software, marketing
- EBITDA per period

── Table D: Cash flow & runway ──
- Opening cash → +Revenue collected → −COGS −OPEX −Capex → Closing cash
- Months of runway at each period end
- When does cash hit zero without raise? (= the "raise-by" date)

── Break-even analysis ──
- Fixed costs (monthly)
- Contribution margin per unit = price − variable cost per unit
- BEP units/month = Fixed Costs ÷ Contribution margin
- BEP revenue/month = BEP units × price
- Expected month of BEP given Table A growth
- Sensitivity: BEP if price ±10% or variable cost ±10%

── Assumption log ──
List every assumption with [SOURCE: ...] tag (benchmark, founder estimate,
customer interview, comparable public company).

Inputs:
- Business model: [B2B SaaS / B2C marketplace / D2C / etc.]
- Pricing: [PRICING]
- CAC estimate: [CAC]
- Industry/comp: [COMP]
- Starting cash: [STARTING_CASH]
- Planned raise: [RAISE_AMOUNT]
```

초기 창업자가 투자 유치나 사업 계획 검토를 위해 3년 재무 추정과 손익분기점(BEP)을 한 번에 만들 때 쓰는 프롬프트입니다. 매출 예측은 단순 추정이 아니라 고객 수·전환율·ARPU·리텐션을 곱하는 드라이버 기반으로 짜이고, COGS·OPEX·현금흐름·런웨이까지 표로 나뉘어 나옵니다. **가정 로그(Assumption log)가 가장 중요합니다** — VC는 숫자 자체보다 그 숫자에 도달한 논리를 보기 때문에, 모든 가정에 [SOURCE] 태그를 붙이게 한 점이 이 템플릿의 핵심입니다. 입력할 때 PRICING·CAC·비교 기업을 구체적으로 적을수록 벤치마크 비율이 현실적으로 잡힙니다. 다만 모델이 산업 평균을 임의로 채워 넣을 수 있으니, 출력된 가정 중 자기 사업과 안 맞는 값은 직접 덮어쓰고 다시 계산을 요청하세요. SCORE는 미국 SBA 공식 파트너가 검증한 재무 추정 템플릿입니다.
