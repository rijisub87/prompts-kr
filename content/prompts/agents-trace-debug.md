---
title: 에이전트 디버깅 — trace 분석 & 루프 진단
slug: agents-trace-debug
category: agents
platform: [공통, Claude]
language: 영문
addedAt: 2026-06-03
source:
  name: Anthropic Engineering — How we built our multi-agent research system
  url: https://www.anthropic.com/engineering/multi-agent-research-system
  author: Anthropic Engineering
variables:
  - { name: TRACE, label: "전체 trace (timestamps + thoughts + tool calls + results)" }
  - { name: EXPECTED, label: "예상 결과" }
  - { name: ACTUAL, label: "실제 결과" }
---

```
You are an AI agent post-mortem analyst. I will paste a full trace of an agent run.
Diagnose the failure with evidence from the trace.

Trace:
<trace>
[TRACE]
</trace>

Expected outcome: [EXPECTED]
Actual outcome: [ACTUAL]

Answer step by step:

1. **Timeline.** Reconstruct the agent's decision path as numbered steps:
   `[step N] thought: ... → tool: name(args) → result: ...`

2. **Failure type.** Pick one and justify with a step number:
   - tool selection error (wrong tool for the goal)
   - argument hallucination (params not grounded in context)
   - stuck loop (same tool + same args ≥ 2 times)
   - early stop (stopped before success criteria)
   - missing stop (kept going past success criteria)
   - context rot (relevant info pushed out of window)
   - silent tool failure (tool returned error, agent ignored it)

3. **Root cause.** Was it:
   (a) ambiguous system prompt → quote the ambiguous sentence,
   (b) tool description gap → quote what was missing,
   (c) missing tool → name it,
   (d) bad context placement → say where it should have been,
   (e) model limitation → justify why prompting won't fix it.

4. **Minimum fix.** Smallest change that prevents this failure mode. Write the diff
   (system prompt edit OR tool description edit OR new stop condition).

5. **Regression test.** One eval input that would have caught this before prod.
```

⚠️ trace 없이 추측으로 고치면 무한 회귀. **같은 tool + 같은 args가 2회 이상이면 거의 100% loop 버그.** "최소 수정 + 회귀 테스트"까지 강제해야 진짜 고쳐집니다. 7가지 failure type은 실전에서 가장 자주 나오는 분류.
