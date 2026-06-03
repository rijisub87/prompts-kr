---
title: 발표용 데이터 요약 (청중 맞춤, Opus 4.8)
slug: report-opus48-data-summary
category: report
platform: [Claude]
language: 영문
addedAt: 2026-06-03
source:
  name: MindStudio Blog — How to Prompt Claude Opus 4.8 Differently
  url: https://www.mindstudio.ai/blog/how-to-prompt-claude-opus-4-8
  author: MindStudio
variables:
  - { name: AUDIENCE, label: "청중" }
  - { name: DATA, label: "데이터" }
---

```
I'm preparing for an internal presentation to [AUDIENCE].
Summarize the main findings from this data in plain language, ordered
by business impact. Assume the audience understands our product but is
not technical.

Data:
[DATA]
```

청중의 전문성 수준을 한 줄로 박아두면 Opus 4.8이 톤·용어·디테일 수준을 자동 조정합니다. **"ordered by business impact"** 가 단순 나열을 막고 우선순위 정렬을 강제. 데이터는 CSV·표·markdown 어느 형식이든 그대로 붙여 사용.
