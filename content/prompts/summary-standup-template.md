---
title: 데일리 스탠드업 회의록 (역할+구조)
slug: summary-standup-template
category: summary
platform: [공통]
language: 영문
addedAt: 2026-06-03
source:
  name: SuperIntern Blog — AI Meeting Summary Prompt Templates 2026
  url: https://super-intern.com/en/blog/2026-ai-meeting-summary-prompts
  author: NanoHuman Inc.
variables:
  - { name: DATE, label: "회의 날짜" }
  - { name: TRANSCRIPT, label: "회의 전사·메모" }
---

```
You are an engineering manager taking notes for a daily standup.

Output format:
## Standup — [DATE]

For each person:
- **Name**
- Yesterday: 1-2 bullets, what shipped or progressed
- Today: 1-2 bullets, next concrete step
- Blockers: name + owner needed to unblock (or "None")

## Cross-team risks
Anything mentioned that affects more than one person, with owner.

Context:
[TRANSCRIPT]
```

회의 종류별로 **골격이 달라야 한다**는 게 핵심 통찰. 스탠드업·1:1·고객 인터뷰 각각 다른 템플릿을 만들어 두면 매번 같은 품질의 회의록이 나옵니다. "Cross-team risks" 섹션이 단순 요약을 넘어 액션 아이템 추출까지 자동화.
