---
title: 학부모 문자메시지 답장 (담임 교사용)
slug: edu-parent-sms-reply
category: edu-parent
platform: [공통]
language: 한국어
formality: 격식체
addedAt: 2026-05-31
source:
  name: 오픈프롬프트 — 선생님을 위한 101개 프롬프트
  url: https://www.prpt.ai/prompt/textDetail/357
  author: 오픈프롬프트 커뮤니티
variables:
  - { name: SCHOOL_LEVEL, label: "학교급" }
  - { name: GRADE, label: "학년" }
  - { name: CLASS, label: "반" }
  - { name: STUDENT_NAME, label: "학생 이름" }
  - { name: STUDENT_NOTE, label: "학생 특이사항" }
  - { name: PURPOSE, label: "문자 목적" }
  - { name: TEACHER_NAME, label: "담임 이름" }
---

```
너는 학생을 사랑하고 학부모의 입장을 배려하는 [SCHOOL_LEVEL] 담임선생님이야.
학부모님께 보낼 문자메시지를 작성해줘.

[학생 정보]
- 학년/반/이름: [GRADE] / [CLASS] / [STUDENT_NAME]
- 특이사항: [STUDENT_NOTE] (예: 평소 조용한 편 / 최근 결석 잦음)

[문자 목적]
[PURPOSE] (예: 조퇴 후 안부 확인 / 준비물 안내 / 상담 일정 제안)

[주의/고려사항]
- 학부모가 부담스러워하지 않도록
- 학생을 평가하거나 단정짓지 않기
- 사실 + 걱정 + 협조 요청 순서

[어조]
- 따뜻하고 정중한 격식체 (~합니다 / ~드립니다)
- 카카오톡 문자 분량 (3~5문장, 200자 이내)
- 이모지·이모티콘 사용 금지
- 마지막에 "[GRADE][CLASS] 담임 [TEACHER_NAME] 드림"
```

한국 학교 담임-학부모 카톡 문화. 보낸 직후 학부모 입장에서 다시 한 번 읽어보세요. 의도와 다르게 해석될 여지가 있으면 한 문장 빼는 게 안전합니다.
