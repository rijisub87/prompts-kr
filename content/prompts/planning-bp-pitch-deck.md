---
title: IR 피치덱 10장 (Sequoia + Kawasaki 10/20/30)
slug: planning-bp-pitch-deck
category: planning
platform: [공통]
language: 영문
addedAt: 2026-05-31
source:
  name: Sequoia Capital Pitch Deck Template (UVic 호스팅 PDF)
  url: https://www.uvic.ca/gustavson/_assets/docs/pitch-deck-template-web.pdf
  author: Sequoia Capital
variables:
  - { name: COMPANY, label: "회사" }
  - { name: STAGE_AND_RAISE, label: "단계·라운드·조달액" }
  - { name: TRACTION, label: "트랙션" }
  - { name: INVESTOR_TYPE, label: "투자자 타입" }
---

```
Draft a 10-slide investor pitch deck for the company below. For each slide,
provide: (a) slide title, (b) headline message (1 sentence ≤ 12 words),
(c) 3-5 supporting bullets, (d) 1 suggested visual.

Slide structure (Sequoia template):
1. Company Purpose — declarative single-sentence mission
2. Problem — pain, who feels it, current insufficient alternatives
3. Solution — value proposition, "why now"
4. Why Now — inflection point / enabling shifts
5. Market Size — TAM, SAM, SOM with sources
6. Competition — 2×2 map + your wedge
7. Product — what it does + demo flow
8. Business Model — revenue model, unit economics, pricing
9. Team — founders, why-this-team, key hires/advisors
10. Financials & The Ask — 3-yr forecast, raise amount, use of funds, milestones unlocked

Constraints (Kawasaki 10/20/30): max 10 slides, deliverable in 20 minutes,
≥30pt font equivalent (i.e., headline ≤ 12 words, bullets ≤ 10 words each).

Inputs:
- Company: [COMPANY]
- Stage & raise: [STAGE_AND_RAISE]
- Traction so far: [TRACTION]
- Target investors: [INVESTOR_TYPE]
```

투자 유치용 IR 피치덱의 뼈대를 빠르게 잡을 때 쓰는 프롬프트입니다. Sequoia가 공개한 10개 슬라이드 구성(목적·문제·해결책·왜 지금·시장규모·경쟁·제품·비즈니스모델·팀·재무와 The Ask)을 그대로 따르고, 여기에 Kawasaki의 **10장/20분/30pt** 원칙을 제약으로 결합했습니다. 슬라이드마다 제목·한 줄 헤드라인·근거 불릿·추천 비주얼을 함께 뽑아 주므로 디자인 전 단계의 스토리라인 설계에 적합합니다. 입력란의 트랙션과 조달 단계를 구체적으로 적을수록 The Ask 슬라이드가 현실적으로 나옵니다. 한국 VC를 대상으로 한다면 "10번 슬라이드 뒤에 '한국 시장 진입 전략' 슬라이드를 한 장 추가해 줘"라고 지시해 현지화하세요. 단, 생성된 시장 규모·재무 수치는 그대로 쓰지 말고 본인 데이터로 검증한 뒤 채워 넣어야 합니다.
