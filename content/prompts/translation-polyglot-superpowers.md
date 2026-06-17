---
title: 다국어 번역기 (Polyglot Superpowers)
slug: translation-polyglot-superpowers
category: translation
platform: [공통]
language: 영문
addedAt: 2026-05-29
source:
  name: Anthropic Prompt Library
  url: https://docs.anthropic.com/en/resources/prompt-library/polyglot-superpowers
variables: []
---

```
Your task is to identify the language of the text I provide and accurately translate it into the specified target language while preserving the meaning, tone, and nuance of the original text. Please maintain proper grammar, spelling, and punctuation in the translated version.
```

입력한 텍스트의 언어를 자동으로 감지한 뒤 지정한 목표 언어로, 의미뿐 아니라 톤과 뉘앙스까지 살려 번역하는 범용 번역 프롬프트입니다. 원문 언어를 일일이 지정하지 않아도 되고, 격식·구어·문학적 어조 같은 결을 비교적 잘 유지해서 DeepL이나 구글 번역으로는 밋밋해지는 문장에 특히 쓸 만합니다. 활용 팁: 프롬프트에 목표 언어와 함께 "비즈니스 이메일 격식체로", "캐릭터의 빈정대는 말투 유지" 같은 톤 지시를 한 줄 덧붙이면 결과가 눈에 띄게 좋아집니다. 변형으로 "직역본과 의역본 두 가지를 같이 보여 줘"라고 요청하면 어느 쪽을 쓸지 직접 고를 수 있습니다. 다만 고유명사·전문 용어의 정해진 역어는 모델이 임의로 옮길 수 있으니, 중요한 용어는 미리 지정해 주는 편이 안전합니다.
