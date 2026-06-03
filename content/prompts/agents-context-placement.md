---
title: 컨텍스트 엔지니어링 — 5-slot 배치 설계
slug: agents-context-placement
category: agents
platform: [Claude, 공통]
language: 영문
addedAt: 2026-06-03
source:
  name: Anthropic Engineering — Effective context engineering for AI agents
  url: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
  author: Anthropic Applied AI team
variables:
  - { name: AGENT_TASK, label: "에이전트 작업" }
  - { name: INFO_SOURCES, label: "정보 소스 목록 (docs/DB/API/history/prefs)" }
  - { name: TURNS, label: "예상 대화 길이 (턴)" }
  - { name: TOKEN_BUDGET, label: "턴당 토큰 예산" }
  - { name: TOOLS, label: "사용 가능 도구" }
---

```
You are a context engineer. For the agent task below, decide WHERE each piece of
information should live and WHY. Use Anthropic's structured-section convention.

Task: [AGENT_TASK]
Available information sources: [INFO_SOURCES]
Expected conversation length: [TURNS]
Token budget per turn: [TOKEN_BUDGET]
Tools the agent has: [TOOLS]

For each information source, place it in exactly ONE of these slots and justify:

## Slot 1 — System prompt
Use ONLY for: identity, success criteria, stop conditions, output format, hard rules
that apply to EVERY turn.
Structure with tags: <background_information>, <instructions>, ## Tool guidance, ## Output description.
Striving for "the minimal set of information that fully outlines expected behavior."

## Slot 2 — Tool definitions
Use for: information the model needs ONLY when deciding to call that tool.

## Slot 3 — Tool results (just-in-time retrieval)
Use for: bulky reference data the agent can re-fetch on demand.

## Slot 4 — User message / runtime injection
Use for: per-request data (current query, today's date, this user's prefs).

## Slot 5 — External memory (write, not in-context)
Use for: state that must survive context compaction (plans, decisions, intermediate facts).

Then output:
1. A placement table: source → slot → 1-line justification.
2. Compaction strategy: which slots get cleared first, what MUST survive a summary.
3. The actual system prompt skeleton with the tags above filled in.
```

**"전부 시스템 프롬프트에 넣기"는 가장 흔한 실수.** 재호출 가능한 데이터는 tool result로, 영구 상태는 memory로 분리해야 long-horizon 작업에서 살아남습니다. 5-slot으로 강제 분류시키는 게 핵심.
