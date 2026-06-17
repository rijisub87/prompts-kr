---
title: 회의록 요약기 (Meeting Scribe)
slug: summary-meeting-scribe
category: summary
platform: [공통]
language: 영문
addedAt: 2026-05-29
source:
  name: Anthropic Prompt Library
  url: https://docs.anthropic.com/en/resources/prompt-library/meeting-scribe
variables: []
---

```
Your task is to review the provided meeting notes and create a concise summary that captures the essential information, focusing on key takeaways and action items assigned to specific individuals or departments during the meeting. Use clear and professional language, and organize the summary in a logical manner using appropriate formatting such as headings, subheadings, and bullet points. Ensure that the summary is easy to understand and provides a comprehensive but succinct overview of the meeting's content, with a particular focus on clearly indicating who is responsible for each action item.
```

회의 메모나 녹취록을 받아 핵심 결정 사항과 실행 항목(액션 아이템)을 누가 맡았는지까지 명시해 정리하는 프롬프트입니다. 제목·소제목·불릿을 활용한 구조로 출력해 회의 후 공유용 요약으로 바로 쓸 수 있습니다. 줌·구글미트·클로바노트의 자동 자막을 그대로 붙여 넣어도 작동하며, 한국어 회의록에도 잘 맞습니다. 활용 팁: 발화자 이름이 자막에 라벨로 남아 있으면 담당자 배정이 훨씬 정확해지니, 자막을 정리하지 말고 화자 구분이 있는 원본을 넣으세요. 주의할 점은 다음 마감일이나 책임 소재가 회의에서 말로만 흐릿하게 언급된 경우 모델이 임의로 단정할 수 있으므로, 마감 기한과 담당자 부분은 회의 참석자가 한 번 검토하는 것이 좋습니다.
