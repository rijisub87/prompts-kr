---
title: MCP 서버 통합 패턴 — 도구 풀 + 권한 + 보안
slug: agents-mcp-integration-pattern
category: agents
platform: [Claude]
language: 영문
addedAt: 2026-06-03
source:
  name: Claude Agent SDK Docs — Connect to external tools with MCP
  url: https://code.claude.com/docs/en/agent-sdk/mcp
  author: Anthropic / Claude Code Docs
variables:
  - { name: AGENT_PURPOSE, label: "에이전트 목적" }
  - { name: SYSTEMS, label: "외부 시스템 목록 (GitHub/Postgres/Slack 등)" }
  - { name: ACTIONS_PER_SYSTEM, label: "시스템별 액션 (read-only/write/both)" }
  - { name: DEPLOYMENT, label: "배포 환경 (local-dev/CI/production)" }
  - { name: DATA_SENSITIVITY, label: "데이터 민감도 (public/internal/PII/secrets)" }
---

```
You are an MCP integration architect. Produce a complete, security-reviewed MCP setup
for the following agent.

Agent purpose: [AGENT_PURPOSE]
External systems it needs: [SYSTEMS]
Required actions per system: [ACTIONS_PER_SYSTEM]
Deployment context: [DEPLOYMENT]
Sensitivity of data touched: [DATA_SENSITIVITY]

Output the following sections:

## 1. Transport choice per server
For each system: stdio (local process) / http / sse / sdk (in-process). Justify.

## 2. .mcp.json (or programmatic config)
Produce valid JSON with mcpServers + env var references using ${VAR} syntax.
Never inline secrets. Read-only DB users for read-only roles.

## 3. allowedTools allowlist (prefer over permission modes)
Use the `mcp__<server>__<tool>` naming convention.
- Use wildcard `mcp__server__*` ONLY when the agent legitimately needs the whole server.
- Otherwise enumerate the exact tools. Justify per tool.
DO NOT use `permissionMode: "bypassPermissions"` — it disables all safety prompts.

## 4. Secret handling
- Where each credential lives (vault / env / OAuth flow).
- Token TTL and rotation cadence.
- Revocation test plan.

## 5. Connection-failure handling
Reference the SDK `system / init` message: list servers, check `status !== "connected"`,
decide fail-open vs fail-closed per server.

## 6. Tool-search posture
If total MCP tool count > ~30, enable tool search so definitions don't burn context.

## 7. Threat model (1 paragraph each)
- Prompt injection via tool result returning malicious content.
- Over-scoped credentials being exfiltrated through a tool output.
- Supply chain: which MCP servers are official vs community forks?

Refuse to recommend any server you haven't seen documented or whose source you couldn't audit.
```

MCP는 **`allowedTools` 화이트리스트가 정석**. `bypassPermissions`는 절대 쓰지 마세요 (다른 안전 프롬프트까지 꺼짐). 도구 30개 넘으면 tool search 켜야 컨텍스트 안 터집니다. Postgres MCP는 read-only DB 유저로 연결이 사실상 표준.
