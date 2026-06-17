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

"이번 주 가입 전환율 -15%"처럼 갑자기 튄 지표의 원인을 5 Whys로 단계적으로 파고들 때 쓰는 프롬프트입니다. AI가 한 번에 결론을 내지 않고 "왜?"를 다섯 번 반복하며 직전 답과 논리적으로 연결되도록 진행하므로, 표면 증상이 아니라 근본 원인까지 내려갑니다. 단순 질문에서 그치지 않고 분석 과정의 가정 명시와 가장 깊은 원인을 겨냥한 교정 조치 3개까지 요구하는 게 강점입니다. CONTEXT에 팀·제품·기간 같은 배경을 구체적으로 넣을수록 추론이 현실적으로 나옵니다. 다만 데이터 없이 추측만으로 진행하면 그럴듯한 가설에 그칠 수 있으니, 각 단계에서 실제 수치로 검증하며 따라가는 게 좋습니다.
