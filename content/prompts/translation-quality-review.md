---
title: 번역 품질 리뷰 (5축 점수 + 수정안)
slug: translation-quality-review
category: translation
platform: [공통]
language: 한국어
addedAt: 2026-06-06
source:
  name: Prompts-KR 큐레이션
  url: ""
variables:
  - { name: ORIGINAL_LANG, label: "원문 언어" }
  - { name: ORIGINAL_TEXT, label: "원문" }
  - { name: TARGET_LANG, label: "번역 대상 언어" }
  - { name: TRANSLATED_TEXT, label: "번역문" }
---

```
당신은 [ORIGINAL_LANG] → [TARGET_LANG] 번역 전문 리뷰어입니다. 다음 번역을 평가해주세요.

원문 ([ORIGINAL_LANG]):
[ORIGINAL_TEXT]

번역 ([TARGET_LANG]):
[TRANSLATED_TEXT]

평가 5축 (각각 1-5점 + 구체 사례):
1. 정확성 — 의미가 그대로 전달되는가, 누락·왜곡 없는가
2. 자연스러움 — 모국어 화자에게 자연스러운가, 번역투 없는가
3. 문체 일관성 — 원문 톤·격식·전문성 보존
4. 전문용어 — 분야별 표준 용어, 일관성 유지
5. 가독성 — 문장 길이·구조·단락 흐름

출력:
1. 종합 점수 (5점 만점)
2. 5축별 점수 + 근거 (반드시 원문/번역문에서 구체 인용)
3. 수정안 — 가장 문제 있는 3곳 (원문 → 현재 번역 → 개선안 표)
4. 반복 패턴 — 이 번역가/번역 도구가 일관되게 보이는 약점 한 줄
5. 한 줄 총평
```

사내 번역 검수, 학위 논문 영작 점검, AI 번역 산출물 평가에 직격. **5축 분리 점수 + 구체 인용 강제**로 "그냥 어색하다" 식의 모호한 피드백 차단.
