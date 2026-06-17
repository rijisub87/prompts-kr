---
title: "PDF 요약 + 학습 Q&A 표 만들기"
slug: summary-pdf-qa
category: summary
platform: [Claude]
language: 영문
addedAt: 2026-05-29
source:
  name: awesome-claude-prompts (langgptai)
  url: https://github.com/langgptai/awesome-claude-prompts
variables: []
---

```
Summarize this PDF document in a bullet point outline. Make a markdown table of study questions and answers.
```

PDF를 불릿 개요로 요약하고, 동시에 학습용 질문과 답을 마크다운 표로 만들어 주는 한 줄 프롬프트입니다. 짧지만 "요약 + 자가 점검 문제"를 한 번에 뽑아 주기 때문에, 교재·논문·강의 슬라이드를 첨부해 시험 대비 학습 카드나 복습 퀴즈를 만들 때 효율이 좋습니다. 활용 팁: 문서를 첨부한 뒤 "질문은 객관식 위주로" 또는 "각 답에 페이지 번호를 달아 줘"처럼 한마디만 더하면 표가 훨씬 쓸모 있어집니다. 변형으로 표를 Anki/Quizlet에 넣기 좋게 "질문<탭>답 형식의 CSV로 출력"을 요청할 수도 있습니다. 다만 문서가 길면 일부 내용이 표에서 빠질 수 있으니, 핵심 단원은 따로 한 번 더 돌리는 것이 안전합니다.
