---
title: 우선순위 프레임워크 적용 (RICE/ICE/MoSCoW)
slug: data-prioritization-framework
category: data
platform: [공통]
language: 영문
addedAt: 2026-05-31
source:
  name: Kraftful — Top ChatGPT Prompts for PMs
  url: https://www.kraftful.com/prompts-for-pm
variables:
  - { name: FRAMEWORK, label: "프레임워크 (RICE/ICE/MoSCoW 등)" }
  - { name: VISION, label: "회사 목표 또는 제품 비전" }
  - { name: ITEMS, label: "우선순위 매길 기능·과제 목록" }
---

```
Using [FRAMEWORK] (e.g. RICE scoring model, ICE scoring model, Value vs. Complexity Quadrant, Kano Model, Weighted Scoring Prioritization, the MoSCoW method, Opportunity Scoring) and given [VISION], help me prioritize the following: [ITEMS].
```

분석에서 나온 인사이트를 실제 실행 순서로 바꾸는, 즉 "무엇부터 할까"를 정하는 단계에 쓰는 프롬프트입니다. RICE·ICE·MoSCoW·Kano·가치 대비 복잡도 등 여러 우선순위 프레임워크 중 하나를 골라 ITEMS에 넣은 기능·과제 목록에 일관되게 적용해줍니다. VISION에는 회사 OKR이나 분기 목표를 넣으세요. 그래야 점수가 회사 방향과 정렬되어 "급하지만 목표와 무관한 일"이 위로 올라오는 걸 막을 수 있습니다. 프레임워크 선택권을 주는 게 강점이지만, 매번 다른 프레임워크를 쓰면 결과를 비교하기 어려우니 팀이 익숙한 하나를 정해 일관되게 쓰는 게 좋습니다. RICE의 Reach·Impact 같은 점수는 AI 추정치일 뿐이므로 실데이터로 보정해 쓰세요.
