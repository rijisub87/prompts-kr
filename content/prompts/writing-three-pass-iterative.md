---
title: 3회 반복 개선 (V1·V2·V3 비교) — 어디서 멈출지 직접 결정
slug: writing-three-pass-iterative
category: writing
platform: [공통]
language: 한국어
addedAt: 2026-06-08
source:
  name: "r/PromptEngineering 2026 상반기 인기 프롬프트"
  url: "https://www.aitooldiscovery.com/guides/chatgpt-prompts-reddit"
variables:
  - { name: TEXT, label: "고쳐야 할 본문 (이메일·자소서 문단·블로그 글 등)" }
  - { name: GOAL, label: "이 글의 목적 한 줄" }
  - { name: CONSTRAINT, label: "제약 (길이·톤·대상 독자)" }
---

```
다음 텍스트를 3번 연속으로 개선해주세요. 매 단계 더 명확하고 효과적이 되도록.

원문:
[TEXT]

목적: [GOAL]
제약: [CONSTRAINT]

출력 형식:

== V1 ==
(개선한 결과 1차)

V1의 변화:
- 무엇을 바꿨는가
- 왜 그 변화가 목적에 더 맞는가

== V2 ==
(개선한 결과 2차)

V2의 변화:
- 무엇을 바꿨는가
- 왜 그 변화가 더 나은가

== V3 ==
(개선한 결과 3차)

V3의 변화:
- 무엇을 바꿨는가
- 왜 그 변화가 가장 좋은가

마지막에 "이 글의 경우 V2에서 멈춰도 충분합니다" 같이 어느 버전이 목적에 가장 적합한지 한 줄 평을 더해주세요.
```

한 번에 끝내지 않고 점진적으로 다듬는 결과를 볼 때 유용. V1이 너무 안전한 톤이고 V3이 과하게 손을 댄 경우, 본인이 V2에서 멈출지 결정할 수 있다는 게 차별점. 메일·자소서 문단·블로그 도입부 같은 짧은 텍스트에 효과적.
