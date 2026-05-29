---
title: 함수 자동 생성기 (Function Fabricator)
slug: code-function-fabricator
category: code
platform: [공통]
language: 영문
source:
  name: Anthropic Prompt Library
  url: https://docs.anthropic.com/en/resources/prompt-library/function-fabricator
variables: []
---

```
Your task is to create Python functions based on the provided natural language requests. The requests will describe the desired functionality of the function, including the input parameters and expected return value. Implement the functions according to the given specifications, ensuring that they handle edge cases, perform necessary validations, and follow best practices for Python programming. Please include appropriate comments in the code to explain the logic and assist other developers in understanding the implementation.
```

"이런 입력을 받아 이런 출력을 반환하는 함수가 필요해"라고 자연어로 적으면 엣지 케이스까지 처리된 함수를 만들어줍니다. 함수 시그니처와 docstring까지 신경 써줘서 그대로 프로젝트에 붙여 쓰기 좋습니다.
