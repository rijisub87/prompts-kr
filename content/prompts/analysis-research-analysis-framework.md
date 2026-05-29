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

시장 진입 검토·경쟁 분석·산업 트렌드 리서치에 사용하세요. `{{}}` 부분을 본인 상황에 맞춰 채우면 됩니다. XML 구조가 Claude에서 특히 잘 작동합니다.
