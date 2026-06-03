---
title: Sub-agent 분기 설계 — orchestrator/worker 위임 명세
slug: agents-subagent-delegation
category: agents
platform: [Claude, 공통]
language: 영문
addedAt: 2026-06-03
source:
  name: Anthropic Engineering — How we built our multi-agent research system
  url: https://www.anthropic.com/engineering/multi-agent-research-system
  author: Anthropic Research Team
variables:
  - { name: PARENT_TASK, label: "상위 작업" }
  - { name: WHY_DELEGATE, label: "왜 단일 에이전트로 부족한가" }
  - { name: TOOL_POOL, label: "오케스트레이터가 부여 가능한 도구 풀" }
---

```
You are designing an orchestrator-worker agent system. Given the parent task,
decide if delegation is justified and, if so, produce subagent specs.

Parent task: [PARENT_TASK]
Why a single agent isn't enough: [WHY_DELEGATE]
Available tools the orchestrator can grant: [TOOL_POOL]

## Step 1 — Sizing (use Anthropic's effort rules)
Pick ONE bucket and justify:
- Simple fact-finding → 1 agent, 3-10 tool calls. NO delegation; stop here.
- Direct comparison → 2-4 subagents, 10-15 calls each.
- Complex research → 10+ subagents with clearly divided responsibilities.

## Step 2 — Division of labor
Decompose into subagents. Each MUST have non-overlapping scope. If two subagents
could plausibly run the same search, merge or redraw the boundary.

## Step 3 — Subagent spec (repeat per subagent)
For SUBAGENT_NAME = [name]:
- Objective (1 sentence, concrete):
- Output format (schema, not prose):
- Tools allowed (subset of TOOL_POOL):
- Sources to use (and which NOT to use):
- Task boundaries (what to skip, hand back to orchestrator):
- Effort budget (max tool calls):
- Done-signal (what proves it finished):

## Step 4 — Result integration pattern
Pick ONE and justify:
- Artifacts written to shared memory (recommended for large outputs)
- Condensed summary returned to orchestrator (recommended for small structured facts)
- Hybrid: artifact + 1-paragraph summary

## Step 5 — Orchestrator prompt
Write the lead-agent system prompt covering: how to plan, how to dispatch in parallel,
how to reconcile conflicting subagent findings, when to spawn a NEW subagent vs accept.

Subagents cannot spawn subagents. Top out at one level deep.
```

Anthropic 인용: **"vague instructions caused subagents to duplicate work"** — 위임 실패의 90%는 경계 겹쳐서 같은 작업 두 번. 객관식 sizing부터 강제해서 과한 위임을 막는 게 포인트.
