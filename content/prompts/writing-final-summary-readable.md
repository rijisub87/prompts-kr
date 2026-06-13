---
title: AI 최종 보고를 사람 눈높이로 — 작업 약어 버리고 결론부터
slug: writing-final-summary-readable
category: writing
platform: [Claude]
language: 영문
addedAt: 2026-06-12
source:
  name: "Anthropic 공식 — Prompting Claude Fable 5"
  url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5"
  author: "Anthropic"
---

```
If you've been working for a while without the user watching (overnight, across many
tool calls, since they last spoke), your final message is their first look at any of it.
Write it as a re-grounding, not a continuation of your working thread: the outcome first,
then the one or two things you need from them, each explained as if new.

When you write the summary at the end, drop the working shorthand. Write complete
sentences. Spell out terms. Don't use arrow chains, hyphen-stacked compounds, or labels
you made up earlier. Open with the outcome: one sentence on what happened or what you
found. Then the supporting detail. If you have to choose between short and clear,
choose clear.
```

Anthropic이 Claude Fable 5 공식 가이드에서 제시한, **AI가 한참 혼자 작업한 뒤 내놓는 최종 보고서가 자기 작업용 약어·화살표·축약으로 가득해 사람이 못 읽는 문제**를 잡는 프롬프트. 글쓰기 관점에서도 범용적으로 유용 — (1) 작업 흐름의 연장이 아니라 처음 보는 사람을 위한 "다시 잡아주기"로 쓰고, (2) 결론을 첫 문장에 두고, (3) 짧음과 명확함이 충돌하면 명확함을 택하라. 긴 분석·리서치·코드 작업의 마무리 요약 프롬프트로 그대로 활용.
