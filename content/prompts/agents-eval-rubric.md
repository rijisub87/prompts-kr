---
title: 에이전트 평가 rubric + edge case 세트
slug: agents-eval-rubric
category: agents
platform: [공통]
language: 영문
addedAt: 2026-06-03
source:
  name: Anthropic Engineering — Demystifying evals for AI agents
  url: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
  author: Anthropic Applied AI team
variables:
  - { name: AGENT_NAME, label: "에이전트 이름" }
  - { name: AGENT_PURPOSE, label: "에이전트 목적" }
  - { name: INPUT_SHAPE, label: "입력 형태" }
  - { name: TOOLS, label: "사용 가능 도구" }
  - { name: GOOD_ENOUGH, label: "이해관계자가 정의한 '충분히 좋은' 답" }
  - { name: KNOWN_FAILURES, label: "도그푸딩에서 본 실패 모드" }
---

```
You are an AI evaluation designer. Build a rubric and edge-case suite for [AGENT_NAME]
that does [AGENT_PURPOSE].

Inputs the agent receives: [INPUT_SHAPE]
Tools it can use: [TOOLS]
Stakeholder-defined "good enough" answer: [GOOD_ENOUGH]
Failure modes seen in dogfooding so far: [KNOWN_FAILURES]

## Part A — Three-layer rubric (one isolated LLM judge per dimension)

### Layer 1: Session-level outcome (Pass / Partial / Fail)
- Pass criteria (must satisfy ALL):
- Partial criteria (some user value delivered):
- Fail criteria:
- Judge prompt (include "Return Unknown if you cannot tell"):

### Layer 2: Trace-level response quality (1-5 per turn)
- Dimensions to grade SEPARATELY (one judge each): factuality, tool-use efficiency,
  instruction-following, safety.
- For each: rubric anchors at 1, 3, 5.

### Layer 3: Tool-level correctness (code-based, not LLM-judged)
- Per tool: exact-match / regex / fail-to-pass / outcome-check. Pick one + spec it.

## Part B — Edge case suite (12 cases minimum)
Balance "should do X" and "should NOT do X". Cover:
1. Ambiguous request (needs clarification before acting)
2. Adversarial input (prompt injection in tool result)
3. Tool returns empty
4. Tool returns error
5. Conflicting information across tools
6. Out-of-scope request (should refuse)
7. Long-horizon task that hits context limit
8. Request with hidden assumption that's wrong
9. Multi-step task where step 2 invalidates step 1
10. Repeat of a previous request (should reuse memory, not re-fetch)
11. Request the agent CAN'T solve (must fail gracefully)
12. Easy happy path (baseline)

For each: input, expected behavior, pass condition.

## Part C — Calibration
Have 2 domain experts independently score 20 sample runs. If their pass/fail agreement
is <90%, the rubric is too vague — rewrite anchors. Report kappa.

Also compute: pass@1, pass@3, pass^3.
```

Anthropic 핵심 인용: **"a good task is one where two domain experts would independently reach the same pass/fail verdict"**. 합의율 90% 안 나오면 rubric이 모호한 것. pass^k는 일관성, pass@k는 최선 한 번 측정.
