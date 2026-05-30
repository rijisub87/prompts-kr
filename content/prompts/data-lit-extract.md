---
title: 체계적 문헌고찰용 데이터 추출 표
slug: data-lit-extract
category: data
platform: [공통]
language: 영문
addedAt: 2026-05-31
source:
  name: Nature Scientific Reports — Prompt engineering for literature review
  url: https://www.nature.com/articles/s41598-025-99423-9
variables:
  - { name: PAPER_TEXT, label: "논문 본문 (방법+결과+결론)" }
---

```
You will extract data from the paper text below for a systematic literature review.

Return a single Markdown table with these columns:
| Author (Year) | Country | Design | Population & N | Intervention/Exposure | Comparator | Outcomes measured | Key effect size (with 95% CI) | Reported limitations |

Rules:
- Use ONLY information explicitly stated in the paper. If a field is not reported, write "Not reported".
- Do NOT infer numerical values. Copy them verbatim with units.
- After the table, briefly note (≤ 3 bullets) where the paper's reporting was unclear or where you had low confidence.

Paper text:
[PAPER_TEXT]
```

⚠️ 한 번에 한 논문씩 처리하고, 추출 후 반드시 본인이 원문과 1행씩 대조하세요. GPT-4o 추출도 5%는 거짓 데이터가 발생합니다 (논문 보고). "Not reported" 규칙과 신뢰도 노트가 환각 차단 핵심.
