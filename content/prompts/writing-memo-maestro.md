---
title: 회사 메모 작성기 (Memo Maestro)
slug: writing-memo-maestro
category: writing
platform: [공통]
language: 영문
addedAt: 2026-05-29
source:
  name: Anthropic Prompt Library
  url: https://docs.anthropic.com/en/resources/prompt-library/memo-maestro
variables: []
---

```
Your task is to compose a comprehensive company memo based on the provided key points. The memo should be written in a professional tone, addressing all the relevant information in a clear and concise manner. Use appropriate formatting, such as headings, subheadings, and bullet points, to organize the content effectively. Ensure that the memo is well-structured, easy to read, and effectively conveys the intended message to the target audience.
```

간단히 적어 둔 핵심 포인트 몇 개를 받아, 제목·소제목·불릿으로 구조를 잡은 격식 있는 사내 메모로 완성해 주는 프롬프트입니다. 정책 변경 공지, 프로젝트 업데이트, 일정 변동 안내처럼 "내용은 정해졌는데 문서로 다듬는 게 일"인 상황에 맞습니다. 활용 팁: 포인트를 줄 때 대상 독자(전사/특정 팀)와 원하는 어조(정중한 공지/단호한 지시)를 함께 적으면 호칭과 표현이 그에 맞게 나옵니다. 한국어 사내 메모가 필요하면 "한국어로, 존댓말 공지체로"라고 명시하면 영어 번역투 없이 작성됩니다. 주의할 점은 입력 포인트가 부실하면 모델이 빈칸을 그럴듯한 일반론으로 채울 수 있으니, 날짜·담당·적용 범위 같은 사실 정보는 반드시 포인트에 넣고 결과에서 그대로 반영됐는지 확인하세요.
