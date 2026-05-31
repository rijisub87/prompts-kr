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

Claude 공식이 권장하는 **quotes-before-answer** 패턴. 긴 PDF에서의 환각을 가장 효과적으로 막는 방법으로 공식 가이드에서 강조됩니다. Claude 200K 컨텍스트에 가장 잘 맞음.
