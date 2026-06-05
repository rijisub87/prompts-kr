---
title: 유튜브 자막 번역 (12~16자 호흡 + 톤 보존)
slug: translation-youtube-subtitle
category: translation
platform: [공통]
language: 한국어
addedAt: 2026-06-06
source:
  name: Prompts-KR 큐레이션
  url: ""
variables:
  - { name: ENGLISH_SUBTITLE, label: "영문 자막 (타임스탬프 포함)" }
  - { name: TONE_DESCRIPTION, label: "영상 톤 (예: 친근한 vlog / 전문 강의 / 코미디)" }
---

```
당신은 유튜브 자막 전문 번역가입니다. 다음 영문 자막을 한국어로 번역하세요.

원문 (타임스탬프 포함):
[ENGLISH_SUBTITLE]

영상 톤: [TONE_DESCRIPTION]

규칙:
1. 한 자막 줄당 한국어 12~16자 이내 (모바일 가독성 한계).
2. 영문 한 줄이 길면 한국어는 2줄로 분리 — 단, 발화 끊김 단위로.
3. 줄임말·구어체·감정 표현 살리기 — 문어체 번역 금지 ("저는" 대신 "전").
4. 톤 일관성 — 친근한 vlog인데 격식체 ❌, 강의인데 너무 가벼움 ❌.
5. 타임스탬프 형식 그대로 유지.
6. 한국어 어순 자연스럽게 — 영어 어순 직역 X.

출력:
- 타임스탬프 + 한국어 자막 (줄당 12~16자)
- 분기점에서 어떤 어조·표현 선택을 했는지 한 줄 메모 (선택)
```

유튜브 자막 표준 **줄당 12~16자**. 영상 톤 명시가 결정적 — "전문 강의"와 "친근한 vlog"는 같은 영어 문장도 완전히 다른 자막. AI 자동 자막 후처리에도 그대로 활용.
