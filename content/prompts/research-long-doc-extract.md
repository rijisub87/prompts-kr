---
title: 긴 PDF·페이지 핵심 발췌 (인용 + 답변)
slug: research-long-doc-extract
category: research
platform: [Claude]
language: 영문
addedAt: 2026-05-31
source:
  name: Anthropic — Long context prompting tips
  url: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/long-context-tips
  author: Anthropic
variables:
  - { name: DOCUMENT, label: "전체 문서 텍스트" }
  - { name: QUESTION, label: "질문" }
---

```
<document>
[DOCUMENT]
</document>

Before answering, do this:
1. Inside <quotes> tags, extract the most relevant verbatim passages (with page or section number if visible) that pertain to my question. Limit to 10 quotes.
2. If no relevant quote exists, write <quotes>No supporting quote found</quotes> and stop.

Then, inside <answer> tags:
- Answer my question using ONLY the extracted quotes.
- Cite each claim as [Q1], [Q2]... referring to the quote number.
- End with a "Gaps" section noting what the document does NOT address.

My question: [QUESTION]
```

긴 문서에서 질문에 대한 답을 근거와 함께 뽑아낼 때 쓰는 프롬프트입니다. 바로 답하지 않고 먼저 관련 원문 구절을 <quotes> 태그 안에 그대로 발췌(최대 10개, 가능하면 페이지·섹션 번호 포함)한 다음, 그 인용만 근거로 답하면서 각 주장에 [Q1], [Q2] 식으로 출처를 다는 **quotes-before-answer** 패턴이 핵심입니다. 이 방식은 모델이 문서에 없는 내용을 지어내는 환각을 효과적으로 줄여 Claude 공식 가이드에서 권장됩니다. 관련 구절이 없으면 "근거 없음"이라 답하고 멈추며, 끝에 문서가 다루지 않은 부분(Gaps)까지 짚어 주는 점도 유용합니다. 보고서·계약서·논문 등 긴 PDF를 다룰 때 적합하며, Claude의 대용량 컨텍스트에 특히 잘 맞습니다. 답이 빈약하면 [Q] 인용 번호를 따라가 원문을 직접 확인하는 식으로 검증할 수 있습니다.
