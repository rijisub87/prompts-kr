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

톱다운만 쓰면 VC가 즉시 의심함. **반드시 바텀업도 같이 내고 두 값이 같은 자릿수로 수렴해야** 신뢰도 상승. Step 6 sanity check가 비현실적 SOM을 자동으로 잡아냄.
