---
title: Python 코드 최적화 컨설턴트 (Code Consultant)
slug: code-python-code-consultant
category: code
platform: [공통]
language: 영문
addedAt: 2026-05-29
source:
  name: Anthropic Prompt Library
  url: https://docs.anthropic.com/en/resources/prompt-library/code-consultant
variables: []
---

```
Your task is to analyze the provided Python code snippet and suggest improvements to optimize its performance. Identify areas where the code can be made more efficient, faster, or less resource-intensive. Provide specific suggestions for optimization, along with explanations of how these changes can enhance the code's performance. The optimized code should maintain the same functionality as the original code while demonstrating improved efficiency.
```

동작은 그대로 유지하면서 더 빠르고 자원을 덜 쓰도록 파이썬 코드의 성능 개선안을 짚어주는 프롬프트입니다. 각 제안마다 왜 그 변경이 효율을 높이는지 설명을 붙여줘서, 느린 데이터 처리 스크립트나 중첩 반복문이 무거운 코드를 개선할 때 알고리즘 복잡도, 자료구조 선택(list 대신 set/dict), 내장 함수·라이브러리(예: 컴프리헨션, NumPy, 제너레이터) 활용 관점에서 방향을 잡기 좋습니다. 활용 팁은 코드만 넣지 말고 "리스트 길이가 수백만", "메모리가 부족해 OOM" 같은 실제 병목 상황과 입력 규모를 함께 적는 것입니다. 그래야 추측이 아닌 맥락에 맞는 최적화가 나옵니다. 프롬프트의 Python을 다른 언어(JS, Go 등)로 바꿔도 비슷하게 작동합니다. 다만 제안된 코드가 원본과 동일하게 동작하는지, 개선 효과가 실제로 있는지는 timeit이나 프로파일러로 직접 측정해 확인하는 것이 안전합니다.
