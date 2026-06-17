---
title: 문헌 검토용 두 논문 비교 분석
slug: data-paper-compare
category: data
platform: [공통]
language: 영문
addedAt: 2026-05-31
source:
  name: Editage Insights
  url: https://www.editage.co.kr/insights/top-5-prompts-research-scientists-can-use-to-make-their-literature-search-easier-using-chat-gpt
variables:
  - { name: STUDY_1, label: "논문 1 (초록·방법·결과)" }
  - { name: STUDY_2, label: "논문 2 (초록·방법·결과)" }
---

```
Compare the research methods and results of these two studies: [STUDY_1] and [STUDY_2].

Structure the comparison as a table covering:
- Research question / hypothesis
- Population and sample size
- Study design and methodology
- Key variables and measures
- Main statistical findings (with effect sizes if reported)
- Limitations
- How the two findings agree, disagree, or extend each other

After the table, write a 1-paragraph synthesis I could adapt for a literature review.
```

문헌 검토 단계에서 두 논문의 연구 질문·표본·설계·주요 통계 결과·한계를 한 표로 정렬해 비교하고, 두 결과가 일치하는지·충돌하는지·서로를 확장하는지까지 정리해주는 프롬프트입니다. 표 뒤에 리뷰에 그대로 옮겨 쓸 수 있는 종합 문단 한 개도 붙여줍니다. STUDY_1·STUDY_2에는 제목만 넣지 말고 각 논문의 초록·방법·결과 본문을 함께 붙여 넣어야 표가 정확해집니다. 주의할 점은 인용 정확성입니다. AI가 효과크기, 페이지 번호, 표본 수, 통계값을 그럴듯하게 지어내는 경우가 잦으므로 표의 숫자는 반드시 원문과 대조해 확인하세요. 세 편 이상을 비교하려면 변수를 늘리기보다 두 편씩 나눠 돌리는 편이 정확합니다. 한국 학술 지원 사이트(Editage) 출처입니다.
