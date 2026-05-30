---
title: 5 Whys 근본 원인 분석 (지표 하락 진단)
slug: data-5-whys
category: data
platform: [공통]
language: 영문
addedAt: 2026-05-31
source:
  name: Shushant Lakhyani — Medium
  url: https://medium.com/@slakhyani20/10-new-chatgpt-prompts-for-root-cause-analysis-a18ce625115b
  author: Shushant Lakhyani
variables:
  - { name: CONTEXT, label: "문제 배경 (구체적으로)" }
  - { name: ISSUE, label: "표면적 문제" }
  - { name: OUTPUT_FORMAT, label: "원하는 출력 형식" }
---

```
I'm [CONTEXT]. Act as a structured facilitator for a 5 Whys analysis. The surface-level problem is: [ISSUE]. Guide me step by step through five iterations of asking "Why did this happen?" Keep each response logically connected to the previous answer. At the end, summarize the root cause identified, note any assumptions made, and provide at least 3 corrective actions that address the deepest cause. I want you to [OUTPUT_FORMAT].
```

"이번 주 가입 전환율 -15%" 같은 갑작스러운 지표 변동 원인을 빠르게 트리로 풀어볼 때 사용. 단순 "왜?"가 아니라 가정 명시·교정 조치 3개까지 요구해 분석 위생이 좋습니다.
