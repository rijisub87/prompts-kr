---
title: AI 코딩 에이전트 4원칙 — CLAUDE.md / AGENTS.md 본문 템플릿
slug: code-karpathy-think-before-coding
category: code
platform: [Claude, ChatGPT]
language: 영문
addedAt: 2026-06-08
source:
  name: "Andrej Karpathy CLAUDE.md template (forrestchang/andrej-karpathy-skills)"
  url: "https://dev.to/max_quimby/karpathys-claudemd-template-5800-stars-and-what-it-does-4a09"
  author: "Andrej Karpathy"
---

```
# Engineering Principles

## 1. Think Before Coding
Don't assume. Don't hide confusion. Surface tradeoffs.
Before implementing anything non-trivial, state your assumptions explicitly.
If there are multiple valid interpretations, present them and ask.
If something is unclear, halt and ask — do not guess.

## 2. Simplicity First
Write the minimum code that solves the problem. Nothing speculative.
No "while I'm here" refactors. No frameworks for one caller.
If a function is used once, inline it. If a config has one value, hardcode it.

## 3. Surgical Changes
Touch only what you must. Clean up only your own mess.
Do not reformat unrelated files. Do not rename variables you didn't add.
A diff should be readable as a single thought.

## 4. Goal-Driven Execution
Define success criteria before writing code:
- What command proves it works?
- What output am I expecting?
Loop until that criterion is met. Do not stop at "it compiles."
```

Claude Code · Cursor · Copilot 같은 코딩 에이전트에 프로젝트 루트의 `CLAUDE.md` 또는 `AGENTS.md`로 넣어두는 본문. AI가 함부로 코드를 늘리거나(슬롭), 의심 없이 추측해서 실행하는 것을 막는 4원칙. 한국 개발자 커뮤니티에서 "AI 슬롭 방지" 키워드로 회자 중. 본 사이트의 `AGENTS.md`도 같은 철학을 채택. 영문 그대로 쓰는 것이 모델 인식률이 가장 높음.
