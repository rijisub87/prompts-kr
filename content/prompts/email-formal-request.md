---
title: 직장 협조 요청 이메일 (격식체)
slug: email-formal-request
category: email
platform: [공통]
language: 한국어
formality: 격식체
addedAt: 2026-05-31
source:
  name: 오픈프롬프트 (OpenPrompt)
  url: https://www.prpt.ai/prompt/textDetail/679
  author: 오픈프롬프트 커뮤니티
variables:
  - { name: MY_COMPANY, label: "내 회사" }
  - { name: MY_TEAM, label: "내 팀" }
  - { name: MY_TITLE, label: "내 직급" }
  - { name: MY_NAME, label: "내 이름" }
  - { name: RECIPIENT_COMPANY, label: "수신자 회사" }
  - { name: RECIPIENT_TITLE, label: "수신자 직급" }
  - { name: RELATIONSHIP, label: "관계 (초면/기존 협력)" }
  - { name: PURPOSE, label: "요청 목적" }
  - { name: KEY_POINTS, label: "필수 포함 사항" }
  - { name: DEADLINE, label: "회신 기한" }
  - { name: ATTACHMENTS, label: "첨부" }
---

```
업무용 이메일을 한국어 격식체로 작성해줘.
구성은 [인사 → 자기소개 → 본론(목적·요청사항·기한) → 첨부 안내 → 마무리 인사] 순서로.

[발신자]
- 회사/소속: [MY_COMPANY] / [MY_TEAM]
- 직급/이름: [MY_TITLE] [MY_NAME]

[수신자]
- 회사/직급: [RECIPIENT_COMPANY] / [RECIPIENT_TITLE]
- 관계: [RELATIONSHIP] (예: 초면 / 기존 협력)

[요청 내용]
- 목적: [PURPOSE]
- 필수 포함 사항: [KEY_POINTS]
- 회신 기한: [DEADLINE]
- 첨부: [ATTACHMENTS]

[톤 지시]
- 공식적이되 압박감이 들지 않게
- "바쁘신 와중에 죄송하지만" 같은 한국식 완충 표현 1회 포함
- 본문 200자 이내, 한 단락이 4줄을 넘지 않도록
- 제목도 함께 제안 (대괄호로 부서/사안 표기 포함)
```

한국 직장 이메일 특유의 **[부서] 사안** 제목 양식과 완충 표현(쿠션어) 문화를 명시. 초면이면 [RELATIONSHIP]에 "초면, 인사팀 통해 메일 주소 전달받음" 처럼 맥락 한 줄을 넣으면 어색함이 사라집니다.
