---
title: 회의록 자동 정리 — 한국 직장인용
slug: meeting-minutes
category: report
platform: [공통]
language: 한국어
formality: 격식체
charLimit: null
source:
  name: AI Ground
  url: https://www.aiground.co.kr/practical-gpts-guide-meeting-minutes-data-collection/
  author: AI Ground
variables:
  - { name: 회의명, label: 회의 이름 }
  - { name: 일시, label: 회의 일시 }
  - { name: 참석자, label: 참석자 명단 }
  - { name: 녹취록, label: 녹취 텍스트 또는 회의 노트 }
---

```
다음 회의 내용을 한국 직장의 표준 회의록 형식으로 정리해줘.

회의명: [회의명]
일시: [일시]
참석자: [참석자]

원본 내용:
"""
[녹취록]
"""

출력 형식:
1. 회의 개요 (3줄 이내)
2. 주요 안건별 논의 내용 (각 안건마다 결정사항 명시)
3. 액션 아이템 — 담당자·기한 포함, 표 형태
4. 다음 회의 일정 (언급되었다면)

작성 규칙:
- 격식체, "~함/~임" 끝맺음
- 추측·해석 금지, 회의에서 언급된 내용만 정리
- 액션 아이템에 담당자가 불명확하면 "[담당자 확인 필요]" 표기
- 회의에서 결정되지 않은 사항은 "[결정 보류]"로 명시
```

녹취록이 길수록 Claude(긴 컨텍스트)나 Gemini 1.5 Pro가 유리합니다. "~함/~임" 종결은 한국 공문서 표준이라 격식체로 명시해야 자연스럽게 나옵니다. 액션 아이템 단계가 회의록의 가치 90%를 결정합니다.
