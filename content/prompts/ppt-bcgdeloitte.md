---
title: 컨설팅사 스타일(BCG·Deloitte 풍) 슬라이드 변환
slug: ppt-bcgdeloitte
category: ppt
platform: ["Claude | ChatGPT"]
language: 한국어
addedAt: 2026-05-29
source:
  name: "GPTers 트리즈챔피언 \"Claude Sonnet 3.7을 이용하여 보고서 PPT 장표 만들기\""
  url: https://www.gpters.org/wealth/post/create-report-ppt-using-UCvlAx5eB6ot9jZ
variables: []
---

```
아래 문장을 Accenture, Deloitte, PwC, EY와 같은 글로벌 최고 수준의 전략 컨설팅 기업에서 사용하는 프레젠테이션 슬라이드 스타일로 제작해주세요.

원문:
[보고서 본문 또는 보고 내용 붙여넣기]

조건:
- 헤더(주장 1줄) → 본문(근거 3개 불릿) → 푸터(출처) 구조
- 좌측/우측 2단 구성 (50:50) 옵션이 가능하면 함께 제시
- 다이어그램/도식이 들어갈 자리는 [도식: 설명] 으로 표시
- 출력은 SVG 포맷으로 (파워포인트 내 편집 가능하도록)
```

"컨설팅 스타일"이라는 말이 모호한데 4대 회사 이름을 명시하면 LLM이 **헤더-한줄 주장(governing thought) + 3개 근거 불릿** 구조를 안정적으로 잡아줍니다. SVG 출력은 Claude Artifacts에서 미리보기 → 다운로드 → PPT에 이미지 삽입 또는 직접 도형 변환의 경로로 사용. 한국어 본문이라도 슬라이드 헤더는 영문 약자(Key Insight, Implication 등)를 섞으면 컨설팅 톤이 강해집니다.
