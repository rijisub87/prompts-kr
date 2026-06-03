---
title: B2B 영업 이메일 첫 두 문장 (Opus 4.8)
slug: email-opus48-b2b-sales-opener
category: email
platform: [Claude]
language: 영문
formality: 격식체
addedAt: 2026-06-03
source:
  name: MindStudio Blog — How to Prompt Claude Opus 4.8 Differently
  url: https://www.mindstudio.ai/blog/how-to-prompt-claude-opus-4-8
  author: MindStudio
variables:
  - { name: PRODUCT, label: "제품·서비스" }
  - { name: RECIPIENT_ROLE, label: "수신자 직책" }
---

```
I'm writing a sales email for a [PRODUCT].
The reader is a [RECIPIENT_ROLE] who gets 100 emails a day and is
skeptical of vendor claims. Write a subject line and opening two
sentences that earn the next 10 seconds of their attention.
```

**수신자 상황 + 시간 제약(10초)** 을 같이 명시하는 게 핵심. 한국 B2B 영업이면 `VP of Operations`를 `구매 담당 팀장 / CFO / 마케팅 본부장` 등으로 교체. 출력을 한국어 격식체로 받으려면 끝에 `Respond in Korean formal business style.` 추가.
