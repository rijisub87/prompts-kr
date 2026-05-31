---
title: 유튜브 한국어 쇼츠/롱폼 대본
slug: writing-youtube-script-kr
category: writing
platform: [공통]
language: 한국어
addedAt: 2026-05-31
source:
  name: 오픈프롬프트 (OpenPrompt)
  url: https://www.prpt.ai/prompt/textDetail/419
  author: 오픈프롬프트 커뮤니티
variables:
  - { name: VIDEO_LENGTH, label: "영상 길이(분)" }
  - { name: TOPIC, label: "주제" }
  - { name: CHANNEL_TONE, label: "채널 톤" }
  - { name: TARGET_VIEWER, label: "타겟 시청자" }
  - { name: FORMAT, label: "형태 (쇼츠 60초 / 롱폼 8~10분)" }
---

```
너는 한국 유튜브 대본 전문 작가야. [VIDEO_LENGTH]분 분량 동영상 대본을 작성해줘.

[영상 정보]
- 주제: [TOPIC]
- 채널 톤: [CHANNEL_TONE] (예: 친근한 일상 / 정보형 / 자극적 후킹)
- 타겟 시청자: [TARGET_VIEWER]
- 영상 형태: [FORMAT] (쇼츠 60초 / 롱폼 8~10분)

[출력 구조]
1. 후킹 (첫 3초): 한국 유튜브 알고리즘 특성상 가장 중요. 질문 / 충격적 사실 / 반전 중 하나 사용
2. 인트로 (10~15초): 채널 소개·이 영상에서 얻을 것
3. 본문 (타임라인 구간별로):
 - 구간별 시간 / 자막용 텍스트 / 카메라 컷·B-roll 제안
 - 한국 시청자가 지루해하지 않도록 30~40초마다 화면 전환 포인트 명시
4. CTA: "구독·좋아요·알림" 자연스럽게 (한국식 멘트, 영문 번역투 X)
5. 썸네일 텍스트 안 (15자 이내) 3개
6. 영상 설명란용 한 문단 + 해시태그 7개

[금지]
- "여러분 안녕하세요" 식 식상한 도입
- 영어 단어 남발 (꼭 필요한 용어 외)
```

영문 유튜브 대본 프롬프트와 달리, 한국 유튜브의 **"안녕하세요" 도입 회피**·**자막 위주 시청 문화** 반영. 후킹 문장은 3개 정도 받아서 직접 소리 내 읽어보고 가장 자연스러운 것을 선택하세요.
