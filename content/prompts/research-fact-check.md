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

하나의 주장을 근거에 비춰 검증할 때 쓰는 프롬프트입니다. 주장을 반증 가능한 형태로 다시 진술하고, 의존하는 2~3개의 하위 주장으로 쪼갠 뒤, 각 하위 주장마다 출처의 문장을 그대로 인용해 평가하도록 단계를 나눠 둔 점이 핵심입니다. 판정은 TRUE / MOSTLY TRUE / MIXED / MOSTLY FALSE / FALSE / UNVERIFIABLE의 6단계로, PolitiFact·Snopes 같은 팩트체크 기관이 쓰는 척도와 비슷해 결과를 신뢰하고 인용하기 좋습니다. 기사·SNS 게시물·보고서의 주장을 검증하거나, 자기 글의 단언이 근거로 뒷받침되는지 점검할 때 유용합니다. 가장 주의할 점은 출처를 함께 주는 것입니다. SOURCES를 비워 두면 모델이 자체 지식으로 임의 판단하므로, 반드시 검증의 바탕이 될 자료를 첨부하고 마지막 6단계가 추천하는 "추가로 필요한 출처"도 참고하세요.
