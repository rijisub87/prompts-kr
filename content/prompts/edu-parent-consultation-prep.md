---
title: 학부모 입장에서 담임 상담 준비
slug: edu-parent-consultation-prep
category: edu-parent
platform: [공통]
language: 한국어
formality: 격식체
addedAt: 2026-05-31
source:
  name: 코지맘 (사교육없이 1등급)
  url: https://cozymom.kr/2679/
  author: 코지맘 운영자
variables:
  - { name: GRADE, label: "학년" }
  - { name: GENDER, label: "성별" }
  - { name: STRENGTH, label: "학습 강점" }
  - { name: CONCERN, label: "학습/생활 고민" }
  - { name: PEER_RELATIONSHIP, label: "친구 관계" }
  - { name: CHANGE_AT_HOME, label: "가정에서 관찰한 변화" }
  - { name: DURATION, label: "상담 시간(분)" }
  - { name: TOP_QUESTION, label: "가장 알고 싶은 것" }
---

```
너는 초등 학부모 상담을 도와주는 교육 컨설턴트야.
내가 곧 담임 선생님과 상담을 가는데, 짧은 시간 안에 핵심을 전달하고 필요한 정보를 얻을 수 있도록 도와줘.

[우리 아이 정보]
- 학년/성별: [GRADE] / [GENDER]
- 학습 강점: [STRENGTH]
- 학습/생활 고민: [CONCERN]
- 친구 관계: [PEER_RELATIONSHIP]
- 가정에서 관찰한 변화: [CHANGE_AT_HOME]

[상담 조건]
- 상담 시간: [DURATION]분
- 가장 알고 싶은 것: [TOP_QUESTION]

[출력]
1. 선생님께 먼저 전할 한 문단 (우리 아이에 대한 객관적 소개, 200자 이내)
2. 시간 안에 꼭 물어볼 질문 5개 (우선순위 순)
3. 선생님 답변을 듣고 추가로 물어볼 꼬리질문 예시 2개
4. 상담 후 가정에서 실천할 수 있는 액션 3개를 메모할 수 있는 양식

주의: 아이를 평가절하하거나 다른 아이와 비교하는 표현 금지.
```

담임 상담 시간이 보통 15~20분으로 짧다는 제약을 전제로, 그 안에 핵심을 전하고 정작 궁금한 것을 빠짐없이 묻도록 준비를 도와주는 프롬프트입니다. 선생님께 먼저 전할 아이 소개 한 문단, 우선순위순 질문 5개, 답변에 따라 이어갈 꼬리질문, 상담 후 가정 실천 액션을 적을 메모 양식까지 한 번에 만들어줍니다. CONCERN과 TOP_QUESTION을 구체적으로 적을수록 질문이 막연하지 않고 실제 상황에 맞게 나옵니다. 아이를 평가절하하거나 다른 아이와 비교하는 표현을 금지한 점도 한국 상담 문화를 고려한 부분입니다. 5개 질문을 다 못 물어도 상위 항목부터 순서대로 묻는 게 효과적이며, 중·고등학생 상담이라면 첫 줄의 "초등"만 바꿔 쓰면 됩니다.
