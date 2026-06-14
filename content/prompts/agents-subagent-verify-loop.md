---
title: 서브에이전트 자기검증 루프 — 일정 간격마다 명세 대조 검증
slug: agents-subagent-verify-loop
category: agents
platform: [Claude]
language: 영문
addedAt: 2026-06-14
source:
  name: "Anthropic 공식 — Prompting Claude Fable 5"
  url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5"
  author: "Anthropic"
---

```
Establish a method for checking your own work at an interval of [X] as you build.
Run this every [X interval], verifying your work with subagents against the
specification.
```

Anthropic이 Claude Fable 5 가이드에서 권장하는, **긴 작업을 만드는 도중 일정 간격마다 별도 서브에이전트로 자기 작업을 검증**하게 하는 패턴. 핵심은 "자기 비평(self-critique)"보다 **새 컨텍스트의 검증 전용 서브에이전트**가 더 객관적으로 잡아낸다는 것 — 같은 맥락에 갇힌 자기 점검의 사각지대를 피함. `[X]`에 "매 기능 완성마다" "500줄마다" 같은 검증 주기를 넣어 사용. 명세(스펙)와 대조하는 게 포인트라 명세를 먼저 명확히 줘야 효과가 큼.
