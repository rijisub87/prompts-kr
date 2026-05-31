---
title: 일일 인텔리전스 브리핑 (Daily Briefing)
slug: research-daily-briefing
category: research
platform: [ChatGPT]
language: 영문
addedAt: 2026-05-31
source:
  name: Perplexity Help Center
  url: https://www.perplexity.ai/hub/faq
  author: Perplexity
variables:
  - { name: DATE, label: "날짜" }
  - { name: TOPIC, label: "주제·회사·키워드" }
  - { name: SOURCE_LIST, label: "스캔할 URL·매체 목록" }
  - { name: READER_ROLE, label: "독자 역할" }
---

```
Create a daily intelligence briefing for [DATE] on the topic of [TOPIC].

Sources to scan: [SOURCE_LIST]
Reader profile: [READER_ROLE] (e.g., "PM at a Korean fintech")

Structure:

## TL;DR (3 bullets, <25 words each)

## What changed today
For each item:
- Headline + source + timestamp
- 2-sentence "so what" for the reader profile
- Original link

## Themes of the week
Pattern across multiple stories, with supporting headlines.

## Watchlist
3 things to monitor tomorrow and the trigger that would make them important.

## Signal vs noise
Mark any item as [LIKELY HYPE] if it is unverified speculation, press-release-driven, or single-source.

Tone: terse, analyst, no marketing fluff.
```

Perplexity Spaces나 ChatGPT 커스텀 GPT에 등록해두고 매일 같은 URL 리스트로 돌리면 자동 일일 브리핑이 됩니다. **Signal vs noise** 섹션이 PR 기반 과장 정보를 자동으로 라벨링.
