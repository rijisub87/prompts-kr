---
title: 프리모템(사전 부검) — 이미 실패했다고 가정하고 가차없이 진단
slug: planning-pre-mortem
category: planning
platform: [공통]
language: 한국어
addedAt: 2026-06-16
source:
  name: "Pre-mortem 의사결정 기법 — Digital Thought Disruption 정리"
  url: "https://digitalthoughtdisruption.com/2025/08/19/30-day-failure-pre-mortem-prompt/"
variables:
  - { name: DECISION, label: "앞둔 결정·프로젝트 내용" }
---

```
이번 결정에 대해 프리모템(사전 부검)을 진행해줘.

상황: [DECISION]

1년 후 이 계획이 "완전히 실패했다"고 가정해. 그 시점에서 회고하듯 답해줘.

- 가장 가능성 높은 실패 원인 5가지 (구체적 헤드라인 형태로, "막연한 리스크" 금지)
- 각 원인별: 발생 확률 / 피해 심각도 / 지금 막을 수 있는 대응책
- 실패의 조기 경보 신호(early warning indicator)와 그 임계치
- 발을 빼야 하는 중단 기준(kill criteria)

나를 안심시키지 마. 균형 잡힌 척하지 말고, 구체적이고 가차없이 말해줘.
```

"이미 실패했다"고 미리 가정하고 원인을 거꾸로 찾는 **프리모템** 의사결정 기법. 핵심은 마지막 줄 — **"나를 안심시키지 마"** 트리거로, AI가 기본적으로 사용자에게 동조·위안하는 경향을 깨고 냉정한 진단을 끌어냄. 사업·투자·이직·큰 지출 등 되돌리기 어려운 결정 전에 사각지대를 미리 드러낸다. red team 검증과 함께 쓰면 더 강력.
