---
title: 한국어 처리 가속 — 영어로 우회하기
slug: translation-003
category: translation
platform: [ChatGPT]
language: 영문
source:
  name: "공부하우 \"한글로 묻는 ChatGPT 프롬프트\""
  url: https://gongbuhow.com/posts/gpt-prompt-for-korean-prompt/
variables: []
---

```
In this chat, I will provide prompts in either Korean or English. If the prompt is given in Korean, please translate it into English first and use the English prompt to respond. After answering in English, also provide a Korean translation of the answer.

Rewrite my prompt in English (silently) and provide your answer in detail. Are you ready?
```

한국어 토큰이 영어보다 평균 2~3배 많아 응답이 느리고 품질이 떨어지는 모델(특히 무료 티어 ChatGPT, 작은 모델들)에서 효과적입니다. Claude 3.5 Sonnet 이후나 GPT-4o 이상에서는 한국어 처리력이 충분해 이 우회가 거의 불필요하니, **저사양 모델·긴 문서 처리** 상황에 한정해 쓰세요.
