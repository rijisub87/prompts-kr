---
title: 출처 신뢰도 평가 (CRAAP 테스트)
slug: research-craap-evaluation
category: research
platform: [공통]
language: 한국어
addedAt: 2026-05-31
source:
  name: CSU Chico Meriam Library — CRAAP Test
  url: https://library.csuchico.edu/help/source-or-information-good
  author: Meriam Library, CSU Chico
variables:
  - { name: RESEARCH_QUESTION, label: "내 리서치 질문" }
  - { name: URL, label: "평가 대상 URL" }
  - { name: EXCERPT, label: "본문 발췌" }
---

```
당신은 정보 리터러시 전문가다. 아래 URL/출처에 대해 CRAAP 기준으로 5점 만점 평가표를 작성하라.

평가 축:
1. Currency(시의성): 발행일, 최신 업데이트 여부
2. Relevance(관련성): 내 질문 "[RESEARCH_QUESTION]" 과의 적합도
3. Authority(권위): 저자/발행기관의 전문성, 도메인, 인용 빈도
4. Accuracy(정확성): 사실 검증 가능성, 출처 표기, 동료 검증 여부
5. Purpose(목적): 정보 제공/설득/판매/선전 중 무엇인가, 편향 여부

출력:
- 항목별 점수(1-5) + 근거 한 줄
- 종합 점수 + 신뢰도 한 줄 평
- "이 출처를 인용해도 되는가" Yes/No/조건부 + 조건

평가 대상:
URL: [URL]
본문 발췌: [EXCERPT]
```

ChatGPT/Claude 웹 검색을 켠 상태에서 URL만 던져도 자동 fetch 후 평가합니다. 학생 과제 리서치·블로그 출처 검증에 유용. **CRAAP**은 도서관학계 표준 프레임워크 (Currency·Relevance·Authority·Accuracy·Purpose).
