---
title: 제품·포스터 이미지의 영문 텍스트만 한국어로 교체
slug: image-text-localize-korean
category: image
platform: [Gemini, 공통]
language: 한국어
addedAt: 2026-06-08
source:
  name: "Google Blog — Nano Banana Pro 공식 가이드"
  url: "https://blog.google/products-and-platforms/products/gemini/prompting-tips-nano-banana-pro/"
variables:
  - { name: OBJECT, label: "텍스트가 들어간 대상 (예: '노란 캔 3개', '포스터 상단', '제품 패키지 정면')" }
---

```
[OBJECT] 위의 모든 영문 텍스트를 한국어로 번역해주세요. 다른 요소는 모두 그대로 유지합니다.

제약 조건:
- 원본 폰트 굵기·색상·배치를 최대한 그대로 보존
- 단어 단위 직역이 아니라 한국 네이티브가 실제 제품에 쓸 자연스러운 한국어로 표현
- 브랜드명·상표명은 원어 그대로 유지
- 줄바꿈과 전체 구성을 그대로 유지
- 한국어가 원래 공간에 안 들어가면 정확한 일치보다 가독성을 우선
```

이미지 생성이 아니라 **기존 이미지의 텍스트만 한국어로 교체**하는 로컬라이제이션 워크플로. 영문 제품 시안·해외 광고·소셜 카드 등을 한국 시장용으로 빠르게 변환할 때 유용. Gemini의 Nano Banana Pro 또는 텍스트 편집을 지원하는 멀티모달 모델에 이미지를 첨부하고 이 프롬프트로 요청.
