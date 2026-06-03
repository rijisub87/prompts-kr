---
title: Tool 사양 설계 — JSON Schema + docstring 패턴
slug: agents-tool-spec-design
category: agents
platform: [Claude, 공통]
language: 영문
addedAt: 2026-06-03
source:
  name: Anthropic API Docs — Define tools
  url: https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/implement-tool-use
  author: Anthropic Docs Team
variables:
  - { name: WHAT_THE_TOOL_DOES, label: "도구 기능" }
  - { name: SERVICE_NAMESPACE, label: "서비스·도메인 접두사" }
  - { name: AVAILABLE_INPUTS, label: "호출자가 가진 입력" }
  - { name: KNOWN_FAILURES, label: "에이전트가 알아야 할 실패 모드" }
  - { name: EXISTING_TOOL, label: "기존 도구와 겹침 (없으면 'none')" }
---

```
Design a tool definition for the following capability. Output ONLY valid JSON
matching Anthropic's tool schema (name, description, input_schema, optional input_examples).

Capability: [WHAT_THE_TOOL_DOES]
Service/domain: [SERVICE_NAMESPACE]
Inputs the caller will have: [AVAILABLE_INPUTS]
Failure modes the agent must know about: [KNOWN_FAILURES]

Rules:
1. name: use namespace prefix → `[SERVICE_NAMESPACE]_[verb]_[noun]`, regex ^[a-zA-Z0-9_-]{1,64}$.
2. description: 3-4+ sentences, written like a docstring for a junior dev. Cover:
   - what the tool does,
   - when it SHOULD be used,
   - when it should NOT be used (alternatives),
   - what each parameter means,
   - what is NOT returned (so the agent doesn't expect it),
   - failure behavior (does it throw? return empty? partial?).
3. input_schema: every property has its own "description". Use enum for closed sets.
   Mark required[] explicitly. No recursive schemas; flatten nesting.
4. Add input_examples (2-3) showing: typical call, edge case, minimal call with only required fields.
5. If this tool overlaps with [EXISTING_TOOL], propose consolidation via an `action` parameter instead.

After the JSON, add a 3-line "Why this design" note explaining the namespace choice and the most important sentence in the description.
```

도구 description은 **"주니어에게 설명한다 생각하고 3~4문장 이상"** 이 Anthropic 공식 기준. 한 줄짜리 description은 호출 실패의 주범. `input_examples`(토큰 20~200개)가 정확도를 크게 올립니다.
