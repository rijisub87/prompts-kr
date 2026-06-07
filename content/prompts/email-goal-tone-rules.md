---
title: 이메일 답장 메타 컨테이너 — 목적·톤·규칙 강제
slug: email-goal-tone-rules
category: email
platform: [공통]
language: 한국어
addedAt: 2026-06-08
source:
  name: "TechRadar — Goal·Tone·Rules ChatGPT 이메일 프롬프트"
  url: "https://www.techradar.com/ai-platforms-assistants/chatgpt/i-tried-the-goal-tone-rules-chatgpt-prompt-and-it-fixed-my-awkward-ai-emails-while-also-saving-me-hours-a-week"
variables:
  - { name: GOAL, label: "이 답장으로 얻고 싶은 결과 한 줄" }
  - { name: TONE, label: "상대방과의 관계 (예: 2년 거래처, 신규 고객, 사내 팀장)" }
  - { name: INCOMING_EMAIL, label: "내가 답장할 원본 메일" }
  - { name: MY_NOTES, label: "하고 싶은 말 메모 (정제 안 된 거 그대로)" }
---

```
이메일 답장을 작성해주세요.

목적: [GOAL]

톤: [TONE]

규칙:
- 본문 120자 이내
- 느낌표 사용 금지
- "안녕하세요, 잘 지내시는지요" 같은 의례적 도입부 금지 — 본론부터
- 명확한 요청 1가지, 끝에는 구체적 다음 단계 (날짜·결정·산출물)
- 원본 메일의 격식 수준에 맞추기

답장할 원본 메일:
"""
[INCOMING_EMAIL]
"""

내 답장 메모 (정리 안 된 거):
"""
[MY_NOTES]
"""
```

AI가 써준 이메일에서 "잘 지내시는지요" 같은 의례적 도입부와 과한 격식체를 명시적으로 차단하는 메타 컨테이너 프롬프트. 매번 어떤 톤을 원하는지 다시 설명하지 않고 한 번에 골격을 지정해 자연스러운 답장을 뽑아냄. 영문 원본의 "I hope this email finds you well" 차단 규칙을 한국 비즈니스 매너에 맞게 의역.
