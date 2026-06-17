---
title: 학술 문헌 리뷰 스캐폴딩 (논문 탐색 트리)
slug: research-literature-review
category: research
platform: [공통]
language: 영문
addedAt: 2026-05-31
source:
  name: Elicit — How to use Elicit for literature review
  url: https://elicit.com/blog/how-to-use-elicit-for-literature-review
  author: Elicit (Ought)
variables:
  - { name: RQ, label: "연구 질문" }
  - { name: FIELD, label: "분야" }
  - { name: DECISION, label: "왜 필요한가 / 어떤 결정에 쓸 건가" }
---

```
You are a research librarian. Help me scope a literature review.

Research question: [RQ]
Field: [FIELD]
Why I care / decision: [DECISION]

Produce:

1. **Concept map**: decompose the question into 4-6 sub-concepts. For each, list 3-5 synonyms / related terms in English (and Korean if applicable) suitable for database searches.

2. **Seed papers**: name 5 likely-foundational papers or authors in this area. For each, give:
   - Author, year, plausible title
   - Why it is likely foundational
   - WARNING if you are not certain it exists — mark [VERIFY]

3. **Database strategy**: for each of [Google Scholar, Semantic Scholar, PubMed/ACM/SSRN as appropriate], give one Boolean query.

4. **Inclusion/exclusion criteria**: propose 4 inclusion rules and 4 exclusion rules to keep the review tractable.

5. **Snowballing plan**: which 2 seed papers to backward-cite and forward-cite first, and why.

6. **Expected timeline**: rough estimate of hours for a solo reviewer at each stage.
```

학술 문헌 리뷰를 시작하기 전, 무엇을 어떻게 찾을지 범위를 잡아 주는 프롬프트입니다. 연구 질문을 4~6개의 하위 개념으로 쪼개 검색어·동의어를 정리하고, 후보 시드 논문, 데이터베이스별 불리언 검색식, 포함·제외 기준, 스노볼링(인용 추적) 계획, 단계별 예상 소요 시간까지 한 번에 설계해 줍니다. 학위논문이나 리포트의 1차 문헌 탐색을 막막한 백지에서 시작하지 않게 해 주는 점이 강점입니다. 입력할 때 연구 질문뿐 아니라 분야와 "이 리뷰를 어떤 결정에 쓸 것인지"를 적으면 포함·제외 기준이 실용적으로 잡힙니다. 가장 주의할 점은 시드 논문입니다. **[VERIFY] 마크가 붙은 논문은 반드시 Google Scholar 등에서 실재 여부를 확인하세요** — 존재하지 않는 논문(환각)이 가장 흔히 나오는 단계입니다.
