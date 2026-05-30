---
title: 설문 자유응답 테마 분석 (7~10개 주제 추출)
slug: data-survey-theme
category: data
platform: [공통]
language: 영문
addedAt: 2026-05-31
source:
  name: Zonka Feedback Blog
  url: https://www.zonkafeedback.com/blog/survey-analysis-with-chatgpt
variables:
  - { name: CONTEXT, label: "설문 맥락 (제품·대상·시점)" }
---

```
You are a qualitative data analyst reviewing open-ended responses from a [CONTEXT] survey. Identify the 7-10 most recurring themes based on language patterns and customer context. Each theme should be a meaningful category, not a generic word pulled from comments.

For each theme, provide: a short descriptive label, a 1-2 sentence explanation, 2-3 representative quotes, and the frequency (count and percentage). Then divide each theme into 3-4 specific sub-themes with descriptions and frequency counts.

Output format in a table: Themes | Sub-themes | Description | Sample Quote | Frequency.
```

NPS·CSAT·이탈 설문의 자유응답 텍스트를 그대로 붙여 넣으면 됩니다. 한국어 응답일 경우 "Korean responses, keep quotes in Korean"을 명시하세요. "generic word가 아닌 의미 있는 카테고리"라는 가드레일이 단일 단어 클러스터링의 함정을 막아줍니다.
