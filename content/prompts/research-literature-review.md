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

⚠️ **[VERIFY] 마크가 붙은 논문은 반드시 Google Scholar에서 실재 확인을 거치세요** — 환각 논문이 가장 흔히 나오는 단계입니다. 학위논문 1차 문헌 검색에 직격.
