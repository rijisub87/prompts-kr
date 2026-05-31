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

**가정 로그(Assumption log)가 가장 중요** — VC는 숫자가 아니라 그 숫자에 도달한 논리를 봅니다. SCORE는 미국 SBA 공식 파트너의 검증된 3년 재무 추정 템플릿.
