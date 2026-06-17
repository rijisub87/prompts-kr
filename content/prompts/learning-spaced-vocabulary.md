---
title: 스페인어 단어 학습 (Spaced Vocabulary)
slug: learning-spaced-vocabulary
category: learning
platform: [공통]
language: 영문
addedAt: 2026-05-29
source:
  name: awesome-claude-prompts (langgptai)
  url: https://github.com/langgptai/awesome-claude-prompts
variables: []
---

```
Help me practice my Spanish vocab. For every turn, message me with a single Spanish word that I should translate to English. Start with a very easy word. If I get it right, make the next word more difficult. If I get it wrong, explain what the correct answer was, and reduce difficulty for the next turn. You can include emoji hints to help me.
```

모델이 매 턴 단어를 하나씩 제시하면 내가 뜻을 맞히고, 맞히면 다음 단어가 어려워지고 틀리면 정답을 알려준 뒤 난이도를 낮추는 적응형 단어 학습 프롬프트입니다. 쉬운 단어부터 시작해 내 수준을 따라 자동으로 조절되므로, 게임하듯 짧게 반복하며 어휘를 늘리기 좋습니다. "Spanish"를 "일본어", "프랑스어" 등 원하는 언어로 바꾸면 그대로 쓸 수 있고, "tomorrow"처럼 영어 단어를 한국어로 옮기는 방향으로 돌려 영단어 암기에도 응용 가능합니다. 자동으로 붙는 이모지 힌트가 부담스러우면 "힌트 없이"라고 지시하세요. 다만 채점·난이도 조절은 모델의 주관적 판단이라 가끔 어긋날 수 있으니, 체계적인 복습 일정이 필요하면 별도의 SRS 앱과 병행하는 편이 좋습니다.
