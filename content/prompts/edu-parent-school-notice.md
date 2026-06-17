---
title: 가정통신문 초안 작성 (교사용)
slug: edu-parent-school-notice
category: edu-parent
platform: [공통]
language: 한국어
formality: 격식체
addedAt: 2026-05-31
source:
  name: 브런치 (정종영 교사 매거진)
  url: https://brunch.co.kr/@jyjoung/375
  author: 정종영
variables:
  - { name: SCHOOL_LEVEL, label: "학교급 (초/중/고)" }
  - { name: GRADE, label: "학년" }
  - { name: TOPIC, label: "통신문 주제" }
  - { name: WHEN_WHERE, label: "일시·장소·대상" }
  - { name: DETAILS, label: "주요 안내사항" }
  - { name: PARENT_ACTIONS, label: "학부모 협조 요청사항" }
  - { name: REPLY_METHOD, label: "회신/동의 방법" }
  - { name: CONTACT, label: "문의처" }
  - { name: TEACHER_NAME, label: "담임 이름" }
---

```
당신은 [SCHOOL_LEVEL] [GRADE]학년 담임교사입니다.
학부모님께 발송할 가정통신문 초안을 작성해주세요.

[통신문 주제]
[TOPIC] (예: 현장체험학습 안내 / 상담주간 안내)

[반드시 포함할 내용 — 누락 없이]
- 일시·장소·대상: [WHEN_WHERE]
- 주요 안내사항: [DETAILS]
- 학부모 협조 요청사항: [PARENT_ACTIONS]
- 회신/동의 방법: [REPLY_METHOD]
- 문의처: [CONTACT]

[형식 규칙]
1. 구조: 인사말 → 본문(항목별 글머리표) → 협조 요청 → 마무리 인사 → 담임교사명
2. 어조: 존댓말로 정중하되 따뜻하게. 행정 공문 같은 딱딱함은 피할 것
3. 한 문장이 너무 길지 않게, 학부모가 한 번 읽고 이해되는 수준
4. 마지막에 "감사합니다. [GRADE]학년 담임 [TEACHER_NAME] 드림"
5. A4 반 장 분량 (약 400~500자)
```

교사가 현장체험학습, 상담주간, 행사 안내 같은 가정통신문 초안을 빠르게 잡을 때 쓰는 프롬프트입니다. 한국 학교 통신문 특유의 인사말 → 항목별 본문 → 협조 요청 → 마무리 인사 → 담임명 구조를 그대로 따르고, 행정 공문처럼 딱딱하지 않게 정중하면서 따뜻한 어조로, 학부모가 한 번 읽고 이해할 분량(A4 반 장)으로 맞춰줍니다. 일시·장소, 회신 방법, 문의처 같은 누락되면 곤란한 정보를 변수로 분리해둔 게 실용적입니다. 다만 GPT가 이런 필수 항목 중 1~2개를 빠뜨리는 경우가 있으니, 출력 후 [반드시 포함할 내용]을 항목별로 대조해 확인하세요. 주제가 민감한 안내(안전사고, 학교폭력 등)라면 어조 지시에 "신중하게"를 덧붙여 톤을 조정하는 게 좋습니다.
