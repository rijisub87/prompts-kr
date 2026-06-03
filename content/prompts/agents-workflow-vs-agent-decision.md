---
title: 워크플로 vs 에이전트 결정 진단
slug: agents-workflow-vs-agent-decision
category: agents
platform: [공통]
language: 영문
addedAt: 2026-06-03
source:
  name: Anthropic Engineering — Building Effective Agents
  url: https://www.anthropic.com/engineering/building-effective-agents
  author: Anthropic (Erik Schluntz, Barry Zhang)
variables:
  - { name: USE_CASE, label: "사용 사례" }
  - { name: REQS_PER_DAY, label: "일일 요청 수" }
  - { name: LATENCY_SLO, label: "지연 SLO" }
  - { name: COST_CEILING, label: "요청당 비용 상한" }
  - { name: FAILURE_TOLERANCE, label: "허용 가능한 실패 모드" }
  - { name: INPUTS, label: "요청 시점 입력" }
  - { name: DECISION_TREE_KNOWN, label: "결정 트리 사전 매핑 가능? (yes/no/partial)" }
  - { name: FEEDBACK, label: "환경 피드백 (테스트·API 에러·사용자 응답 등)" }
---

```
You are an LLM systems architect. Decide whether [USE_CASE] should be built as:
(A) a single optimized LLM call (+ retrieval / few-shot),
(B) a workflow (LLMs orchestrated in PREDEFINED code paths),
(C) an agent (LLM dynamically directing tools in a loop).

Use case: [USE_CASE]
Expected request volume: [REQS_PER_DAY]
Latency budget per request: [LATENCY_SLO]
Cost ceiling per request: [COST_CEILING]
Acceptable failure mode if it goes wrong: [FAILURE_TOLERANCE]
Inputs available at request time: [INPUTS]
Can you pre-map the decision tree? (yes/no/partial): [DECISION_TREE_KNOWN]
Does the environment give the model feedback (test results, API errors, user replies)? [FEEDBACK]

Answer in this exact structure:

## Verdict
A / B / C — one sentence.

## Why not the others
- Why not A:
- Why not B:
- Why not C:

## If B (workflow), which pattern
Pick one: prompt chaining / routing / parallelization / orchestrator-workers / evaluator-optimizer.
Sketch the nodes.

## If C (agent), define
- the tools (3-7 max),
- the stop condition,
- the eval signal that proves it's worth the token spend over (A) or (B).

## Red flags to watch
3 specific failure modes for THIS use case.
```

Anthropic 핵심 메시지: **"에이전트를 함부로 짓지 마라"** — 단일 LLM 호출로 풀리는 일에 에이전트를 쓰면 비용·지연·디버깅 난이도가 10배. C 답이 나오면 "왜 토큰 비용을 정당화하는가"까지 답하게 하는 게 포인트.
