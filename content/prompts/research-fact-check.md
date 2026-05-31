---
title: 팩트체크 워크플로 (6단계 verdict)
slug: research-fact-check
category: research
platform: [공통]
language: 영문
addedAt: 2026-05-31
source:
  name: Anthropic Prompt Library
  url: https://docs.anthropic.com/en/resources/prompt-library/library
  author: Anthropic
variables:
  - { name: CLAIM, label: "검증할 주장" }
  - { name: SOURCES, label: "근거 출처들" }
---

```
You are a meticulous fact-checker. For the claim below, perform the following:

1. Restate the claim in precise, falsifiable terms.
2. Identify the 2-3 sub-claims it depends on.
3. For each sub-claim, evaluate the evidence in the provided sources:
   - Quote the supporting/refuting passage verbatim with source ID.
   - Note any missing context.
4. Issue one of these verdicts per sub-claim:
   TRUE / MOSTLY TRUE / MIXED / MOSTLY FALSE / FALSE / UNVERIFIABLE
5. Give an overall verdict for the original claim with a one-paragraph rationale.
6. List what additional sources would strengthen or change your verdict.

Claim: [CLAIM]
Sources:
[SOURCES]
```

6단계 verdict는 PolitiFact·Snopes식 표준 척도라 결과 신뢰감이 큽니다. ⚠️ 출처 없이 던지면 모델이 임의 판단하니 반드시 근거를 함께 첨부하세요.
