---
title: 코드 리뷰 체크리스트 (XML Code Review)
slug: analysis-xml-code-review
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
<task>Review this code and provide detailed feedback</task>

<review_criteria>
  <security>Check for vulnerabilities, injection risks, and unsafe patterns</security>
  <performance>Identify bottlenecks, inefficient algorithms, and memory issues</performance>
  <maintainability>Assess readability, naming conventions, and documentation</maintainability>
  <best_practices>Verify adherence to language-specific conventions</best_practices>
</review_criteria>

<output_format>
  For each issue found:
  1. Location (file/line if applicable)
  2. Severity (Critical/High/Medium/Low)
  3. Description of the issue
  4. Suggested fix with code example
</output_format>
```

PR을 머지하기 전에 셀프 리뷰용으로 돌리면 좋습니다. 보안·성능·유지보수·관용구를 모두 체크해서 중요도(Critical/High/Medium/Low)로 분류해줍니다.
