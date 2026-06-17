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

통계 분석은 알지만 R 문법이 막히는 대학원생을 위한 코딩 튜터 프롬프트입니다. 데이터 로드부터 가정 검정, 분석 실행, 출판용 요약(평균·표준편차·검정통계량·자유도·p·효과크기) 출력까지 주석 달린 코드로 만들어주고, 각 블록 설명·점검할 진단 플롯·초보가 자주 겪는 오류 2개와 해결법까지 함께 줍니다. 핵심 팁은 데이터 첫 3행을 SAMPLE_ROWS에 꼭 붙여 넣는 것입니다. 그래야 컬럼명·자료형을 지어내는 환각이 크게 줄어듭니다. "내가 주지 않은 컬럼명은 발명하지 말라"는 마지막 한 줄도 같은 역할을 합니다. SPSS나 Python으로 바꾸고 싶으면 첫 줄의 "R tutor"만 교체하면 됩니다. 단, 생성된 코드는 실제 데이터에 한 번 돌려보고 결과를 검증한 뒤 논문에 쓰세요.
