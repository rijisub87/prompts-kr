---
title: 모호한 아이디어 → 검증 가능한 가설로 정제
slug: data-hypothesis-refine
category: data
platform: [공통]
language: 영문
addedAt: 2026-05-31
source:
  name: GitHub — chatgpt-prompts-for-academic-writing
  url: https://github.com/ahmetbersoz/chatgpt-prompts-for-academic-writing
  author: Ahmet Bersoz
variables:
  - { name: TOPIC, label: "연구 주제 한 문장" }
---

```
Generate a list of research hypotheses related to [TOPIC].

For each hypothesis, structure it as:
- Independent variable(s) and how they will be operationalized
- Dependent variable(s) and how they will be measured
- Expected direction of the relationship (or null)
- The population it applies to
- One concrete way to falsify it

Rewrite any vague claim into a precise, testable form.
```

"~가 ~에 영향을 줄 것 같다" 정도의 막연한 연구 아이디어를, 변수와 측정 방법이 명시된 검증 가능한 가설로 바꿔주는 프롬프트입니다. 각 가설마다 독립변수의 조작적 정의, 종속변수의 측정 방법, 예상되는 관계의 방향, 적용 모집단, 그리고 가설을 반증할 구체적 방법 한 가지까지 구조화해주는 게 핵심입니다. 반증가능성을 강제하므로 "검증 불가능한 주장"을 걸러내는 데 특히 유용합니다. TOPIC에는 본인 연구를 한 문장으로 압축해 넣으세요. 출력된 변수·방향·측정 항목은 IRB 신청서나 연구 계획서(proposal)에 거의 그대로 옮겨 쓸 수 있습니다. 다만 생성된 가설이 선행연구와 충돌하지 않는지는 문헌으로 따로 확인해야 합니다.
