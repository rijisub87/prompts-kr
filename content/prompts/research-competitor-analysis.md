---
title: 경쟁사 홈페이지 분석 (Competitor Analysis)
slug: research-competitor-analysis
category: research
platform: [공통]
language: 영문
addedAt: 2026-05-31
source:
  name: Anthropic Prompt Library
  url: https://docs.anthropic.com/en/resources/prompt-library/company-relationship
  author: Anthropic
variables:
  - { name: WEBSITE_CONTENT, label: "웹사이트 본문" }
---

```
Your task is to analyze the provided text from a company's website and extract the following information about their products and services:
- Company name and tagline
- List of products/services offered with brief descriptions
- Target audience or customer segments
- Unique selling propositions or key differentiators
- Pricing information (if available)
- Any notable partnerships, awards, or achievements mentioned

Present the extracted information in a clear, structured format using headings and bullet points.

Website content:
[WEBSITE_CONTENT]
```

경쟁사 홈페이지 About/Products 페이지 본문을 통째로 붙여넣으면 SWOT의 S/W 항목으로 바로 활용 가능. Anthropic 공식 라이브러리.
