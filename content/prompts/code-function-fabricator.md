---
title: 함수 자동 생성기 (Function Fabricator)
slug: code-function-fabricator
category: code
platform: [공통]
language: 영문
addedAt: 2026-05-29
source:
  name: Anthropic Prompt Library
  url: https://docs.anthropic.com/en/resources/prompt-library/function-fabricator
variables: []
---

```
Your task is to create Python functions based on the provided natural language requests. The requests will describe the desired functionality of the function, including the input parameters and expected return value. Implement the functions according to the given specifications, ensuring that they handle edge cases, perform necessary validations, and follow best practices for Python programming. Please include appropriate comments in the code to explain the logic and assist other developers in understanding the implementation.
```

"이런 입력을 받아 이런 출력을 반환하는 함수가 필요해"라고 자연어로 적으면, 엣지 케이스 처리와 입력 검증, 주석까지 갖춘 파이썬 함수를 만들어주는 프롬프트입니다. 자료구조 변환, 문자열 파싱, 날짜 계산처럼 자주 쓰는 유틸 함수를 직접 짜기 번거로울 때 초안을 빠르게 뽑는 용도로 유용합니다. 활용 팁은 요청에 입력 파라미터의 타입, 예상 반환값, 그리고 "빈 리스트가 들어오면", "음수가 들어오면"처럼 경계 조건을 함께 명시하는 것입니다. 그래야 의도한 대로 방어 코드가 들어갑니다. 함수 시그니처와 docstring까지 신경 써주므로 그대로 프로젝트에 붙여 쓰기 좋지만, 한 가지 주의할 점은 모델이 가정한 동작이 본인 의도와 미묘하게 다를 수 있다는 것입니다. 받은 함수는 간단한 테스트 케이스 몇 개로 동작을 확인한 뒤 사용하세요.
