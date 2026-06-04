---
title: GitHub Copilot 1M 컨텍스트 + Reasoning Level 사용 패턴
slug: code-copilot-1m-context-reasoning
category: code
platform: [공통]
language: 영문
addedAt: 2026-06-05
source:
  name: GitHub Changelog — Larger context & configurable reasoning
  url: https://github.blog/changelog/2026-06-04-larger-context-windows-and-configurable-reasoning-levels-for-github-copilot
  author: GitHub Copilot team
variables:
  - { name: REASONING_LEVEL, label: "추론 강도 (low/medium/high)" }
  - { name: CONTEXT_SIZE, label: "컨텍스트 크기 (1M 등)" }
  - { name: TARGET_MODULE, label: "리팩터링 대상 모듈" }
---

```
# VS Code Copilot Chat — 모델 선택 후 reasoning level 조정
@workspace /set reasoning [REASONING_LEVEL]
@workspace /set context [CONTEXT_SIZE]

# 그다음 멀티파일 리팩터링 요청
@workspace Refactor the [TARGET_MODULE] across all services.
Compare the OAuth flow in services/auth/*, services/gateway/*,
and clients/web/src/auth/*. Identify duplicated token-validation
logic and propose a shared package layout. Cite file:line for
every claim. Reserve high reasoning for the architecture proposal,
not for trivial renames.
```

⚠️ 1M 토큰 컨텍스트 + high reasoning은 **AI 크레딧을 훨씬 많이 먹습니다**. 일상 코드 완성에는 기본값으로 두고, "여러 파일 걸친 리팩터링/디버깅"일 때만 한 세션 단위로 올리세요. 마지막 한 줄("Reserve high reasoning for the architecture proposal")이 추론을 필요한 부분에만 집중시키는 핵심.
