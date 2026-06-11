---
title: 에이전트 허위 진행보고 차단 — 증거 기반 상태 보고 규칙
slug: agents-evidence-based-progress
category: agents
platform: [Claude]
language: 영문
addedAt: 2026-06-11
source:
  name: "Anthropic 공식 — Prompting Claude Fable 5"
  url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5"
  author: "Anthropic"
---

```
Before reporting progress, audit each claim against a tool result from this session.
Only report work you can point to evidence for; if something is not yet verified,
say so explicitly. Report outcomes faithfully: if tests fail, say so with the output;
if a step was skipped, say that; when something is done and verified, state it plainly
without hedging.
```

Anthropic이 Claude Fable 5 공식 프롬프팅 가이드에서 제시한, **장시간 자율 실행 중 AI의 허위 진행 보고(fabricated status report)를 막는** 시스템 프롬프트 조각. 에이전트가 "다 됐습니다"라고 했지만 실제로는 테스트가 깨져 있거나 단계를 건너뛴 경우를 차단. 핵심은 (1) 보고 전 각 주장을 이번 세션의 실제 tool 결과와 대조, (2) 검증 안 된 건 명시적으로 "아직 확인 안 됨"이라고 말하기, (3) 실패는 출력과 함께 솔직히. 코딩 에이전트·자동화 워크플로의 시스템 프롬프트에 그대로 추가하면 신뢰도가 크게 올라감.
