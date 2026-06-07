---
title: 아이디어 적군 검증 (Red Team) — 약점·위험·실패 시나리오 매트릭스
slug: analysis-red-team-idea
category: analysis
platform: [공통]
language: 한국어
addedAt: 2026-06-08
source:
  name: "r/PromptEngineering 2026 상반기 최다 추천"
  url: "https://www.aitooldiscovery.com/guides/chatgpt-prompts-reddit"
variables:
  - { name: IDEA, label: "검증할 아이디어·기획안 본문" }
---

```
다음 아이디어에 대해 Red Team(적군 입장) 분석을 해주세요.

아이디어:
[IDEA]

이 아이디어의 문제점·약점·위험·실패 시나리오를 구체적으로 짚어주세요.

각 약점에 대해 다음 4가지를 포함해주세요:
1. 실패 모드를 한 줄로 명명 (예: "초기 사용자 확보 실패")
2. 어떻게 실패하는지 메커니즘 설명
3. 발생 가능성 (낮음/중간/높음)과 영향도 (낮음/중간/높음)
4. 이 위험을 가장 크게 줄일 수 있는 단일 변화 1가지

마지막에 가장 먼저 고쳐야 할 약점 TOP 3을 순위로 정리해주세요.
```

상사·투자자·동료에게 들고 가기 전 약점을 미리 잡는 용도. 단순한 "비판해줘"가 아니라 발생 가능성 × 영향도 매트릭스로 우선순위까지 뽑아내는 게 차별점. 사업 계획·신규 기능·인사 결정 등 의사결정 직전 30분 투자로 큰 사고를 막을 수 있음.
