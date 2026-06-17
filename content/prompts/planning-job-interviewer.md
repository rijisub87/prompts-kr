---
title: 면접 시뮬레이션 (Job Interviewer)
slug: planning-job-interviewer
category: planning
platform: [공통]
language: 영문
addedAt: 2026-05-29
source:
  name: awesome-chatgpt-prompts (f/awesome-chatgpt-prompts)
  url: https://github.com/f/awesome-chatgpt-prompts
variables: []
---

```
I want you to act as an interviewer. I will be the candidate and you will ask me the interview questions for the ${Position:Software Developer} position. I want you to only reply as the interviewer. Do not write all the conversation at once. I want you to only do the interview with me. Ask me the questions and wait for my answers. Do not write explanations. Ask me the questions one by one like an interviewer does and wait for my answers. My first sentence is "Hi"
```

이직·취업 준비 때 모의 면접 상대로 쓰는 프롬프트입니다. 한꺼번에 대화를 쏟아내지 않고 질문을 하나씩 던진 뒤 답을 기다리도록 설계돼 있어, 실제 면접처럼 한 문항씩 주고받으며 연습할 수 있습니다. `${Position}` 부분에 지원 직무(예: Frontend Developer, 마케팅 PM)를 적으면 그 직무에 맞는 질문이 나옵니다. 핵심 활용법은 면접이 끝난 뒤 "지금까지 내 답변을 종합해 강점·약점과 개선점을 평가해 줘"라고 요청하는 것으로, 이러면 모의 면접에 피드백까지 더해집니다. 회사 정보를 주고 "이 회사 컬처핏 면접관처럼 질문해 줘"라고 역할을 좁히면 더 실전에 가까워집니다. 다만 모델이 직무를 일반적으로 해석할 수 있으니, 채용 공고의 요구사항을 먼저 붙여 넣으면 질문이 구체적으로 잡힙니다.
