---
title: 코드 설명 도우미 (Code Clarifier)
slug: code-code-clarifier
category: code
platform: [공통]
language: 영문
addedAt: 2026-05-29
source:
  name: Anthropic Prompt Library
  url: https://docs.anthropic.com/en/resources/prompt-library/code-clarifier
variables: []
---

```
Your task is to take the code snippet provided and explain it in simple, easy-to-understand language. Break down the code's functionality, purpose, and key components. Use analogies, examples, and plain terms to make the explanation accessible to someone with minimal coding knowledge. Avoid using technical jargon unless absolutely necessary, and provide clear explanations for any jargon used.
```

코드 조각을 비유와 예시를 동원해 쉬운 말로 풀어 설명하고, 꼭 필요한 전문용어는 그 뜻까지 함께 짚어주는 프롬프트입니다. 처음 보는 오픈소스 라이브러리 내부를 파악할 때, 인수인계받은 레거시 코드를 빠르게 이해할 때, 또는 비개발자 동료(기획·디자인)에게 동작 원리를 설명해야 할 때 유용합니다. 활용 팁은 코드와 함께 "주니어 신입에게 설명하는 톤으로", "마케터가 이해할 수 있게"처럼 대상 수준을 지정하는 것입니다. 그러면 비유의 난이도가 맞춰집니다. 변형으로 정규표현식이나 복잡한 SQL, 셸 스크립트처럼 한 줄에 의미가 압축된 코드를 넣어 한 단계씩 해부해 달라고 해도 잘 작동합니다. 다만 설명은 이해를 돕기 위한 것이므로, 비유가 실제 동작을 단순화한 부분은 정확한 동작과 다를 수 있다는 점을 염두에 두세요.
