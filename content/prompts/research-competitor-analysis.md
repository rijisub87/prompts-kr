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

경쟁사 웹사이트 본문에서 사업 정보를 구조화해 뽑아 줄 때 쓰는 프롬프트입니다. 회사명·태그라인, 제공 제품·서비스, 타깃 고객, 차별점, 가격 정보, 주요 파트너십·수상 이력을 헤딩과 불릿으로 정리해 줍니다. 경쟁사의 About·Products·Pricing 페이지 본문을 통째로 복사해 WEBSITE_CONTENT에 붙여 넣으면, 결과를 그대로 경쟁사 분석표나 SWOT의 강점·약점(S/W) 항목으로 옮길 수 있습니다. 여러 경쟁사를 같은 형식으로 한 곳씩 돌린 뒤 결과를 모아 비교하면 포지셔닝 차이가 한눈에 보입니다. 주의할 점은 이 프롬프트가 붙여 넣은 텍스트 안의 정보만 추출한다는 것으로, 웹사이트에 안 적힌 매출·점유율 같은 수치는 나오지 않으니 별도 자료로 보완해야 합니다. Anthropic 공식 프롬프트 라이브러리 기반입니다.
