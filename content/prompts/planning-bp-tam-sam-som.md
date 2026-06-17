---
title: TAM / SAM / SOM 시장 규모 분석
slug: planning-bp-tam-sam-som
category: planning
platform: [공통]
language: 영문
addedAt: 2026-05-31
source:
  name: HubSpot — TAM, SAM & SOM
  url: https://blog.hubspot.com/marketing/tam-sam-som
  author: HubSpot Marketing Blog
variables:
  - { name: PRODUCT, label: "제품" }
  - { name: CUSTOMER, label: "고객" }
  - { name: GEO, label: "지역" }
  - { name: ARPU, label: "연간 고객당 매출" }
---

```
Run a market-sizing analysis for the product below. Produce TAM, SAM, and SOM
using BOTH top-down and bottom-up methods, then reconcile them.

── Step 1: Define ──
- Product / category in one sentence
- Unit of consumption (e.g., seat/month, transaction, device)
- Geography & time horizon (e.g., Korea, Year 3)

── Step 2: TAM (Total Addressable Market) ──
Top-down: cite analyst report figure with source + URL placeholder
Bottom-up: (# of all potential customers globally) × (avg annual spend)
→ State TAM in USD and KRW, show the math

── Step 3: SAM (Serviceable Addressable Market) ──
Apply filters that match your product reality:
- Geography you can serve
- Customer segment your product fits
- Channel/regulation constraints
→ State SAM with the % of TAM and the filter logic

── Step 4: SOM (Serviceable Obtainable Market) ──
Bottom-up by sales capacity:
(reachable leads/yr) × (conversion %) × (avg deal size) × (retention)
→ State SOM for Year 1, Year 3, Year 5

── Step 5: Reconciliation table ──
| Layer | Method | Value | % of layer above | Key assumption |
| TAM   | ...    | ...   | 100%             | ...            |
| SAM   | ...    | ...   | ...%             | ...            |
| SOM   | ...    | ...   | ...%             | ...            |

── Step 6: Sanity check ──
- Does SOM × 10 still fit inside SAM? If not, revisit
- Is TAM > $1B? If "no" investors may pass — discuss expansion vectors

Inputs:
- Product: [PRODUCT]
- Customer: [CUSTOMER]
- Geography: [GEO]
- Average revenue per customer per year: [ARPU]
```

사업계획서나 피치덱에 들어갈 시장 규모(TAM/SAM/SOM)를 추정할 때 쓰는 프롬프트입니다. 이 프롬프트의 차별점은 톱다운(분석 리포트 인용)과 바텀업(고객 수 × 객단가) 두 방식을 모두 계산한 뒤 서로 대조하게 한다는 점입니다. **톱다운만 제시하면 VC가 즉시 의심하므로, 바텀업도 함께 내고 두 값이 같은 자릿수로 수렴해야** 신뢰도가 올라갑니다. 입력할 때 제품·고객·지역·연간 객단가(ARPU)를 구체적으로 적을수록 SOM 추정이 현실적으로 나옵니다. 마지막 Step 6의 sanity check(SOM×10이 SAM 안에 들어가는지, TAM이 10억 달러를 넘는지)가 과장된 추정을 자동으로 걸러 줍니다. 단, 모델이 인용하는 분석 리포트 수치는 placeholder인 경우가 많으니 실제 출처로 교체해 검증하세요.
