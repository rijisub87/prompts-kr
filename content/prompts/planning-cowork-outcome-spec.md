---
title: Claude Cowork 작업 정렬 (Outcome-first 명세)
slug: planning-cowork-outcome-spec
category: planning
platform: [Claude]
language: 영문
addedAt: 2026-06-04
source:
  name: Anthropic Claude Blog — Best Practices for Claude Cowork
  url: https://claude.com/blog/best-practices-for-getting-started-with-claude-cowork
  author: Austin Lau (Anthropic Growth Marketing Lead)
variables:
  - { name: OUTCOME, label: "원하는 산출물 (단계 X, 결과만)" }
  - { name: INPUTS, label: "입력 자료 (파일·폴더·앱 연결)" }
  - { name: QUALITY_BAR, label: "잘 됐다 의 기준" }
  - { name: FORMAT, label: "형식 (문서/덱/스프레드시트/리포트)" }
---

```
Before we begin, repeat my ask back to me so we're aligned, then ask me as many clarifying questions as you have.

Task: [OUTCOME]
Inputs: [INPUTS]
Quality bar: [QUALITY_BAR]
Format: [FORMAT]
```

**단계가 아니라 "결과물"로 지시**하는 게 핵심. Cowork는 outcome-oriented 프롬프트에서 step-by-step 대비 훨씬 잘 작동합니다. "먼저 내 요청을 다시 말해줘"가 정렬 실패를 사전에 차단. 사무 작업, 보고서 작성, 대시보드 만들기 등에 직격.
