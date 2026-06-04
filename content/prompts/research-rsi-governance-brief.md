---
title: Anthropic RSI(재귀적 자기개선) 거버넌스 1페이지 브리프
slug: research-rsi-governance-brief
category: research
platform: [Claude, ChatGPT, Gemini]
language: 영문
addedAt: 2026-06-05
source:
  name: Anthropic Institute — When AI builds itself
  url: https://www.anthropic.com/institute/recursive-self-improvement
  author: Marina Favaro, Jack Clark (Anthropic)
variables:
  - { name: WORKFLOW_INVENTORY, label: "사내 AI 워크플로 목록" }
  - { name: REVIEW_GATES, label: "기존 리뷰 게이트" }
  - { name: ESCALATION_TARGET, label: "에스컬레이션 대상 (법무·CISO 등)" }
---

```
You are an AI governance analyst. Read the attached Anthropic
position paper "When AI builds itself" (Favaro & Clark, 2026-06-04).

Produce a 1-page brief for a non-technical executive that:

1) Defines recursive self-improvement (RSI) in <80 words,
   using the paper's framing (humans set goals, AI supplies methods).
2) Lists the three futures the paper sketches, with one risk
   and one upside each. Quote the paper sparingly — paraphrase.
3) Identifies which of our internal AI workflows currently match
   the paper's "research taste / judgment" line (still human)
   vs. "method selection" line (already delegable to Claude).
   Pull examples only from the workflow inventory I pasted above:
   [WORKFLOW_INVENTORY]
4) Recommends 3 internal review gates we should add before
   letting any agent edit another agent's prompts or eval set.
   Existing gates: [REVIEW_GATES]
5) Ends with one open question we should escalate to [ESCALATION_TARGET].

Do not invent statistics. If the paper doesn't support a claim,
write "[unsupported]" instead.
```

Anthropic이 6/4 발표한 RSI 포지션 페이퍼를 **"어떤 업무를 AI에 위임해도 되는가" 사내 거버넌스 질문으로 번역**하는 도구. 단순 안전 담론이 아니라 실무 결정에 직결. "[unsupported]" 강제 라벨이 환각 인용 방지.
