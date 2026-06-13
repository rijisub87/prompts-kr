---
title: 에이전트 과잉 계획 방지 — 행동할 준비가 되면 행동하라
slug: agents-act-when-ready
category: agents
platform: [Claude]
language: 영문
addedAt: 2026-06-12
source:
  name: "Anthropic 공식 — Prompting Claude Fable 5"
  url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5"
  author: "Anthropic"
---

```
When you have enough information to act, act. Do not re-derive facts already
established in the conversation, re-litigate a decision the user has already made,
or narrate options you will not pursue in user-facing messages. If you are weighing
a choice, give a recommendation, not an exhaustive survey. This does not apply to
thinking blocks.
```

Anthropic이 Claude Fable 5 공식 프롬프팅 가이드에서 제시한, **에이전트의 "과잉 계획·장황한 선택지 나열" 성향을 잡는** 시스템 프롬프트 조각. 이미 대화에서 정해진 사실을 다시 끌어내거나, 사용자가 이미 내린 결정을 재론하거나, 하지도 않을 선택지를 늘어놓는 걸 차단. 핵심은 "충분하면 행동하고, 고민될 땐 전체 비교가 아니라 추천 하나를 줘라". 단, 내부 thinking 블록에는 적용 안 됨(생각은 자유롭게). 코딩 에이전트·자동화 워크플로의 시스템 프롬프트에 추가하면 답변이 짧고 결단력 있어짐.
