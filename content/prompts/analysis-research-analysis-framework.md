---
title: 보고서·시장 분석 프레임워크 (Research Analysis Framework)
slug: analysis-research-analysis-framework
category: analysis
platform: [Claude]
language: 영문
addedAt: 2026-05-29
source:
  name: aipromptlibrary.app (Anthropic XML 템플릿 정리)
  url: https://www.aipromptlibrary.app/blog/anthropic-prompt-library-examples
variables: []
---

```
<task>Conduct comprehensive research analysis</task>

<research_parameters>
  <scope>{{Broad overview / Deep dive / Comparative analysis}}</scope>
  <perspective>{{Academic / Business / Technical / Consumer}}</perspective>
  <time_frame>{{Last 6 months / Last year / All time}}</time_frame>
</research_parameters>

<analysis_framework>
  <current_state>What is the current landscape?</current_state>
  <key_players>Who are the major stakeholders?</key_players>
  <trends>What patterns are emerging?</trends>
  <challenges>What obstacles exist?</challenges>
  <opportunities>What gaps can be exploited?</opportunities>
  <predictions>Where is this heading?</predictions>
</analysis_framework>

<output_requirements>
  <format>Structured report with sections</format>
  <length>2000-3000 words</length>
  <citations>Include sources where possible</citations>
  <visuals>Suggest charts/graphs where helpful</visuals>
</output_requirements>
```

하나의 주제를 현재 상황, 주요 이해관계자, 트렌드, 장애물, 기회, 전망의 여섯 축으로 나눠 구조화된 리서치 보고서를 만들어주는 템플릿입니다. 새 시장 진입 검토, 경쟁사 분석, 산업 트렌드 정리처럼 빠진 항목 없이 한 바퀴 훑어야 하는 작업에 맞습니다. 사용법은 `{{}}` 안의 값을 본인 상황에 맞게 고르는 것입니다. 예를 들어 scope에 "Comparative analysis", perspective에 "Business", time_frame에 "Last year"를 넣으면 최근 1년 기준 비즈니스 관점의 비교 분석이 나옵니다. 분량(2000~3000단어)이나 인용·차트 요구는 필요에 따라 줄이거나 늘려도 됩니다. 다만 모델이 제시하는 출처와 수치는 부정확하거나 오래됐을 수 있으니, 보고서 골격을 잡는 용도로 쓰고 핵심 데이터는 별도로 검증하는 편이 좋습니다. XML 구조라 Claude에서 특히 안정적으로 동작합니다.
