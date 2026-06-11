---
title: AI 과잉 작업 차단 — 시키지 않은 리팩토링·추상화 방지 규칙
slug: code-no-overengineering-rule
category: code
platform: [Claude]
language: 영문
addedAt: 2026-06-11
source:
  name: "Anthropic 공식 — Prompting Claude Fable 5"
  url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5"
  author: "Anthropic"
---

```
Don't add features, refactor, or introduce abstractions beyond what the task requires.
A bug fix doesn't need surrounding cleanup and a one-shot operation usually doesn't
need a helper. Don't design for hypothetical future requirements: do the simplest
thing that works well. Avoid premature abstraction and half-finished implementations.
Don't add error handling, fallbacks, or validation for scenarios that cannot happen.
Trust internal code and framework guarantees. Only validate at system boundaries
(user input, external APIs).
```

Anthropic이 Claude Fable 5 공식 가이드에서 제시한, **고성능 모델이 시키지도 않은 정리·추상화·과잉 방어 코드를 추가하는 경향**을 막는 시스템 프롬프트. 바이브 코딩할 때 "버그 하나 고쳐달랬더니 주변 코드까지 다 리팩토링", "한 번 쓰는 함수에 헬퍼·추상화 남발" 같은 문제를 차단. 핵심 원칙 — 가장 단순하게 동작하는 것만, 가상의 미래 요구를 위한 설계 금지, 일어날 수 없는 시나리오의 에러 처리 금지, 검증은 시스템 경계(사용자 입력·외부 API)에서만. `CLAUDE.md`·`AGENTS.md`나 시스템 프롬프트에 추가해 쓰면 diff가 깔끔해짐.
