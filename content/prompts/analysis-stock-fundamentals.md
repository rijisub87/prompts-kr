---
title: 종목 펀더멘털 분석 — 사업·실적·경쟁·리스크·밸류
slug: analysis-stock-fundamentals
category: analysis
platform: [공통]
language: 한국어
addedAt: 2026-06-09
source:
  name: "Prompts-KR 자체 큐레이션"
  url: ""
variables:
  - { name: COMPANY_NAME, label: "회사명 (예: 삼성전자, NVIDIA)" }
  - { name: TICKER, label: "티커 (예: 005930.KS, NVDA)" }
  - { name: PERIOD, label: "분석 기간 (예: 최근 3년, 최근 5년)" }
---

```
역할: 너는 10년 경력의 주식 애널리스트다. 추측 없이 공개된 자료(IR·분기보고서·뉴스)만 사용해 분석한다.

분석 대상: [COMPANY_NAME] ([TICKER])
관심 기간: [PERIOD]

다음 6개 섹션을 순서대로 작성:

1. 사업 모델 — 매출이 어디서 발생하는가 (세그먼트 비중 표)
2. 최근 실적 — 매출·영업이익·순이익 추이 + 마진 변화 (표)
3. 경쟁 환경 — 직접 경쟁사 3곳, 시장 지위, 차별점
4. 주요 리스크 — 비즈니스·재무·규제·매크로 중 3~5개
5. 밸류에이션 — PER·PBR·EV/EBITDA 현재값 + 5년 평균과 비교
6. 투자 포인트 정리 — 강점·약점·중립 각 2~3개

[제약]
- 모든 수치는 출처 명시 (회사 IR, DART/SEC, Bloomberg 등)
- "매수 추천"·"목표주가" 같은 단정 금지 — 판단 재료만 제공
- 불확실한 부분은 "공개 자료 없음" 또는 "추정"으로 표기
- 한국 종목은 DART, 미국 종목은 SEC 자료를 우선으로
```

웹 검색·문서 분석이 되는 모델(Claude·ChatGPT Pro 등)에서 사용. 단순 "이 종목 어때?" 질문보다 6개 섹션을 강제해 균형 잡힌 분석을 끌어내는 게 핵심. "매수 추천 금지" 제약이 모델의 단정적 발언을 차단해 본인 판단 재료로만 활용 가능.
