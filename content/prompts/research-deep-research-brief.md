---
title: Deep Research 구조화 브리프 (ChatGPT·Perplexity Pro)
slug: research-deep-research-brief
category: research
platform: [ChatGPT, Gemini]
language: 영문
addedAt: 2026-05-31
source:
  name: OpenAI Help Center — Deep Research FAQ
  url: https://help.openai.com/en/articles/10500283-deep-research-faq
  author: OpenAI
variables:
  - { name: TOPIC, label: "주제" }
  - { name: DECISION_OR_OUTPUT, label: "내릴 결정 또는 산출물" }
  - { name: KNOWN_BACKGROUND, label: "이미 아는 배경 (중복 회피용)" }
  - { name: Q1, label: "질문 1 (우선순위 높음)" }
  - { name: Q2, label: "질문 2" }
  - { name: Q3, label: "질문 3" }
  - { name: REGION_YEAR_RANGE, label: "지역·연도 범위 선호" }
  - { name: YEAR, label: "이 연도 이전은 회피" }
---

```
I want you to conduct deep research on the following topic. Use this brief to plan your search:

# Topic
[TOPIC]

# Decision I need to make
[DECISION_OR_OUTPUT]

# What I already know (so don't re-cover)
[KNOWN_BACKGROUND]

# Specific questions to answer (ranked)
1. [Q1]
2. [Q2]
3. [Q3]

# Source preferences
- Prefer: peer-reviewed papers, official statistics, primary sources from [REGION_YEAR_RANGE]
- Avoid: SEO blogs, content farms, sources older than [YEAR]

# Output format
- Executive summary (5 bullets)
- Findings per question, each with at least 2 cited sources
- Conflicting evidence section
- Confidence rating per finding (High/Med/Low)
- Open questions for follow-up
- Full bibliography with URLs

Begin by clarifying any ambiguous scope with me before searching.
```

ChatGPT Deep Research / Perplexity Pro에서 그대로 사용. **"begin by clarifying"** 한 줄이 결과 품질을 크게 끌어올립니다 — 도구가 검색을 시작하기 전에 모호한 지점을 먼저 정리해주니까.
