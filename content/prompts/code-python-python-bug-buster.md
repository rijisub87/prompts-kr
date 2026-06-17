---
title: Python 버그 헌터 (Python Bug Buster)
slug: code-python-python-bug-buster
category: code
platform: [공통]
language: 영문
addedAt: 2026-05-29
source:
  name: Anthropic Prompt Library
  url: https://docs.anthropic.com/en/resources/prompt-library/python-bug-buster
variables: []
---

```
Your task is to analyze the provided Python code snippet, identify any bugs or errors present, and provide a corrected version of the code that resolves these issues. Explain the problems you found in the original code and how your fixes address them. The corrected code should be functional, efficient, and adhere to best practices in Python programming.
```

붙여 넣은 파이썬 코드에서 버그나 오류를 찾아 수정본을 제시하고, 원래 무엇이 문제였고 수정이 어떻게 그것을 해결하는지까지 설명해주는 프롬프트입니다. 예외가 터지는데 원인을 모르겠거나, 의도와 다른 값이 나오는 로직 오류를 빠르게 짚어야 할 때 유용합니다. 활용 팁은 코드만 넣지 말고 전체 스택 트레이스와 "기대한 출력 vs 실제 출력"을 함께 적는 것입니다. 그러면 모델이 표면 증상이 아니라 진짜 원인을 짚을 확률이 올라갑니다. "왜 이 버그가 발생했는지"를 함께 설명해줘서 같은 실수를 반복하지 않는 학습 효과도 있습니다. 한 가지 주의할 점은 모델이 보이지 않는 코드(호출하는 함수, 외부 데이터)의 동작을 추측해 엉뚱한 수정을 제안할 수 있다는 것입니다. 받은 수정본은 기존 테스트나 직접 만든 케이스로 검증한 뒤 반영하세요.
