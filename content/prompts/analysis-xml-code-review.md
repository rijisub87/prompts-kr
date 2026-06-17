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

붙여 넣은 코드를 보안(취약점·인젝션·위험 패턴), 성능(병목·비효율 알고리즘·메모리), 유지보수성(가독성·네이밍·문서화), 언어 관용구 네 가지 기준으로 점검하고, 발견한 문제마다 위치·심각도(Critical/High/Medium/Low)·설명·수정 코드 예시까지 정해진 형식으로 정리해주는 템플릿입니다. PR을 올리기 전 셀프 리뷰나, 리뷰어가 부족한 팀에서 1차 필터로 쓰기 좋습니다. 활용 팁은 함수 한두 개보다는 의미 있는 단위(파일 또는 모듈)를 통째로 넣고, 사용 언어와 프레임워크를 함께 알려주는 것입니다. 그래야 관용구 검사와 심각도 판단이 정확해집니다. 한 가지 주의할 점은 모델이 실행 컨텍스트를 모른 채 판단하므로 오탐(false positive)이 섞일 수 있다는 것입니다. 특히 Critical/High로 표시된 항목은 사람이 한 번 더 확인한 뒤 반영하는 것이 좋습니다. XML 구조라 Claude에서 형식을 안정적으로 지킵니다.
