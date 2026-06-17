---
title: 업무 지연 사과 이메일
slug: email-apology-delay
category: email
platform: [공통]
language: 한국어
formality: 격식체
addedAt: 2026-05-31
source:
  name: 실무로그 (silmulog)
  url: https://silmulog.com/entry/chatgpt-email
  author: 실무로그 운영자
variables:
  - { name: TASK, label: "지연된 업무" }
  - { name: ORIGINAL_DEADLINE, label: "원래 기한" }
  - { name: REASON, label: "지연 사유 (사실)" }
  - { name: NEW_DEADLINE, label: "새 기한 약속" }
  - { name: PREVENTION, label: "재발 방지책" }
  - { name: RECIPIENT, label: "수신자 (팀장님/협력사 등)" }
---

```
내가 약속한 업무가 지연된 상황에 대해 한국 직장에서 보낼 사과 이메일을 작성해줘.

[상황]
- 지연된 업무: [TASK]
- 원래 약속 기한: [ORIGINAL_DEADLINE]
- 지연 사유 (객관적 사실만): [REASON]
- 새 기한 약속: [NEW_DEADLINE]
- 재발 방지책: [PREVENTION]

[수신자]
- 직급/관계: [RECIPIENT] (예: 팀장님 / 협력사 과장님)

[작성 규칙]
1. 변명·핑계 어조 금지. 사과 → 사실 → 약속 → 재발방지 순서로.
2. "~하다 보니", "어쩔 수 없이" 같은 책임 회피 표현 사용 금지.
3. 본문 4~5문장 이내. 너무 장황하면 진정성이 떨어져 보임.
4. 격식체(~드립니다, ~하겠습니다) 유지.
5. 마지막은 새 기한 약속을 다시 한 번 명시하며 마무리.
```

업무·납기가 지연됐을 때 변명처럼 들리지 않는 사과 메일을 빠르게 초안 잡는 프롬프트입니다. 사과 → 사실 → 새 기한 약속 → 재발방지 순서를 고정하고, "~하다 보니", "어쩔 수 없이" 같은 책임 회피 표현을 차단하는 것이 핵심입니다. 지연 사유는 감정이나 추측을 빼고 객관적 사실만 적어야 결과물이 깔끔합니다. 한국 직장 문화에서 사과 메일은 재발방지책 명시가 사실상 필수이니 이 항목은 비우지 마세요. 다만 생성된 초안을 그대로 보내기보다 본인 평소 어미("~겠습니다"→"~도록 하겠습니다" 등)로 한두 군데 손보면 위화감이 줄고, 책임 소재가 복잡한 사안은 메일 전 구두 보고를 먼저 하는 편이 안전합니다.
