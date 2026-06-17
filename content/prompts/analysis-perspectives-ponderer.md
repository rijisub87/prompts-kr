---
title: 의사결정 장단점 분석기 (Perspectives Ponderer)
slug: analysis-perspectives-ponderer
category: analysis
platform: [공통]
language: 영문
addedAt: 2026-05-29
source:
  name: Anthropic Prompt Library
  url: https://docs.anthropic.com/en/resources/prompt-library/perspectives-ponderer
variables: []
---

```
Your task is to analyze the provided topic or question from multiple perspectives, weighing the pros and cons of each viewpoint. Present a balanced examination of the issue, considering various aspects and potential outcomes. Conclude by offering a reasoned judgment based on the available information, while acknowledging any uncertainties or limitations in your analysis.
```

하나의 주제나 질문을 여러 관점에서 뜯어보고 각 입장의 장단점을 저울질한 뒤, 불확실성까지 인정하면서 근거 있는 결론을 내려주는 프롬프트입니다. "지금 이직할지 말지", "이 기술 스택을 도입할지", "이 기능을 이번 분기에 출시할지"처럼 한쪽으로 마음이 기운 상태에서 놓치는 반대 근거를 끌어내고 싶을 때 유용합니다. 활용 팁은 단순히 주제만 던지지 말고 본인이 처한 제약(예산, 일정, 팀 규모)이나 우선순위를 함께 적는 것입니다. 그러면 추상적인 찬반이 아니라 상황에 맞는 비교가 나옵니다. 한 가지 주의할 점은 결론을 그대로 따르기보다, 정리된 관점들을 의사결정의 입력 자료로 보는 편이 안전하다는 것입니다. 최종 판단의 책임과 맥락은 본인이 더 잘 알기 때문입니다.
