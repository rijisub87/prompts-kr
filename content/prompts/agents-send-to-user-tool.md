---
title: send_to_user 도구 — 장기 비동기 에이전트가 산출물을 원문 그대로 전달
slug: agents-send-to-user-tool
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
{
  "name": "send_to_user",
  "description": "Display a message directly to the user. Use this for progress updates, partial results, or content the user must see exactly as written before the task finishes.",
  "input_schema": {
    "type": "object",
    "properties": {
      "message": { "type": "string", "description": "The content to display to the user." }
    },
    "required": ["message"]
  }
}
```

위 도구를 정의한 뒤, 시스템 프롬프트에 다음 지시를 더한다:

```
Between tool calls, when you have content the user must read verbatim (a partial
deliverable, a direct answer to their question), call the send_to_user tool with
that content. Use send_to_user only for user-facing content, not for narration
or reasoning.
```

Anthropic이 Claude Fable 5 가이드에서 소개한 실전 에이전트 UX 패턴. 핵심 원리 — **도구(tool) 입력값은 요약되지 않고 원문 그대로 전달**된다는 점을 활용해, 야간·장시간 자율 실행 중에도 중간 산출물을 손실 없이 사용자에게 보여줌. 일반 응답은 길어지면 요약·축약될 수 있지만 `send_to_user`로 보낸 내용은 그대로 노출. 에이전트를 직접 만드는 개발자가 "진행 상황·부분 결과를 정확히 보여주고 싶을 때" 쓰는 도구 설계 + 호출 유도문 한 세트.
