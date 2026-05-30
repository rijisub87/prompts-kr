---
title: R 코드 작성·디버깅 튜터 (대학원생용)
slug: data-r-tutor
category: data
platform: [공통]
language: 영문
addedAt: 2026-05-31
source:
  name: Business Science — How to R code faster with ChatGPT
  url: https://www.business-science.io/code-tools/2023/04/30/chatgpt-prompt-osmdata.html
  author: Matt Dancho
variables:
  - { name: GOAL, label: "분석 목표 (예: 그룹 간 점수 차이에 일원배치 ANOVA)" }
  - { name: FILENAME, label: "파일명·형식 (예: data.csv)" }
  - { name: COLUMNS, label: "주요 컬럼명과 자료형" }
  - { name: SAMPLE_ROWS, label: "첫 3행 샘플" }
---

```
You are an R tutor for a graduate student with basic R knowledge. I want to: [GOAL].

My data:
- Filename and format: [FILENAME]
- Key columns and types: [COLUMNS]
- Sample of the first 3 rows: [SAMPLE_ROWS]

Please:
1. Write minimal, well-commented R code that loads the data, checks the relevant assumptions, runs the analysis, and prints a publication-ready summary (means, SDs, test statistic, df, p, effect size).
2. After the code, explain in 5 short bullets what each block does.
3. Suggest one diagnostic plot to inspect.
4. List the 2 most common errors beginners hit with this analysis and how to fix them.

Use tidyverse where it makes the code clearer. Do not invent column names that I did not provide.
```

데이터 첫 3행을 꼭 보여주면 컬럼명·자료형 환각이 크게 줄어듭니다. SPSS·Python으로 바꾸려면 첫 줄만 교체. "발명 금지" 한 줄이 환각 방지에 결정적.
