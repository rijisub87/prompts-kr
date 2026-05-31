---
title: 수능 영어 지문 분석 & 오답 노트
slug: learning-suneung-english
category: learning
platform: [공통]
language: 한국어
formality: 평어체
addedAt: 2026-05-31
source:
  name: 지피터스 (GPTers)
  url: https://www.gpters.org/c/planning/chat-gpt-w-r
  author: 지피터스 커뮤니티
variables:
  - { name: PASSAGE, label: "지문" }
  - { name: QUESTION_TYPE, label: "문제 유형 (빈칸추론/주제/함축)" }
  - { name: MY_ANSWER, label: "내가 고른 답" }
  - { name: CORRECT_ANSWER, label: "정답" }
---

```
너는 수능 영어 1타 강사야. 내가 푼 수능/모의고사 영어 지문을 다음 형식으로 분석해줘.

[입력 지문]
[PASSAGE]

[문제 유형]
[QUESTION_TYPE] (예: 빈칸추론 / 주제 / 함축의미)

[내가 고른 답 / 정답]
[MY_ANSWER] / [CORRECT_ANSWER]

[출력 형식 — 반드시 이 순서]
1. 지문 한글 직역 (의역 X, 영어 어순 그대로)
2. 지문 자연스러운 한글 번역 (수능 해설 톤)
3. 핵심 문장 (Topic Sentence) 1개 추출 + 이유
4. 구문 분석: 어려운 문법 구조 3개를 영문→한글 순으로 풀이
5. 필수 어휘 7개 (영단어 / 한글 뜻 / 동의어 1개 / 지문 내 쓰임)
6. 오답 분석: 왜 내가 틀렸는지, 정답 근거 문장 인용
7. 같은 유형 변형 문제 1개 생성 (수능 난이도 기준)
```

한국 수능 영어 학습 관행(직역→의역→구문→어휘→오답분석) 그대로 반영한 EBS·메가스터디 해설 구조. GPT의 한글 직역과 의역을 모두 받아두면 영어 어순 감각과 자연스러운 한국어 표현을 동시에 익힐 수 있습니다.
