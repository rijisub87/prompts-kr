---
title: 실적 발표·어닝콜 핵심 요약 — 숫자·강조점·Q&A·시장 함의
slug: summary-earnings-call
category: summary
platform: [공통]
language: 한국어
addedAt: 2026-06-09
source:
  name: "Prompts-KR 자체 큐레이션"
  url: ""
variables:
  - { name: COMPANY, label: "회사명 (예: NVIDIA, 삼성전자)" }
  - { name: QUARTER, label: "분기 (예: 2026 Q1, FY26 1Q)" }
  - { name: TRANSCRIPT, label: "어닝콜 transcript 또는 실적 발표 자료 본문" }
---

```
다음 [COMPANY]의 [QUARTER] 실적 발표 자료를 5분 안에 핵심만 파악할 수 있게 정리하라.

원문:
[TRANSCRIPT]

다음 4개 블록으로 출력:

1. 숫자 요약 (표)
| 항목 | 이번 분기 | 컨센서스 | 전년동기 대비 |
- 매출, 영업이익, 순이익, EPS, 가이던스

2. 경영진이 강조한 3가지 (각 1줄)
- 가장 많이 언급한 키워드와 그 맥락
- 새로 등장한 표현이 있다면 표시

3. Q&A 핵심 (애널리스트 질문 → 답변 요지, 3~5개)
- 회피한 질문이 있다면 별도 표시

4. 시장 함의 (3줄)
- 어닝 서프라이즈 여부 (컨센서스 대비)
- 가이던스의 톤 (보수적/적극적/유보)
- 다음 분기까지 주목할 변수 1~2개

[제약]
- 추측 금지, transcript에 없는 정보는 "공개 안 됨"으로 표기
- 경영진 톤(자신감/방어적) 한 줄 평
- 컨센서스 수치는 본인이 따로 입력하거나 "외부 확인 필요"로 표시
```

분기마다 쏟아지는 어닝콜 transcript(보통 30~50페이지)를 즉시 핵심만 뽑아주는 프롬프트. 숫자 표 + 경영진 강조점 + Q&A + 시장 함의 4블록 강제가 핵심. 한국 기업은 IR 보도자료, 미국은 Seeking Alpha나 회사 IR 페이지의 transcript 첨부.
