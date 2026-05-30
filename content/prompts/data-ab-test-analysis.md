---
title: A/B 테스트 결과 종합 분석 (A/B Test Analyst)
slug: data-ab-test-analysis
category: data
platform: [공통]
language: 영문
addedAt: 2026-05-31
source:
  name: PromptChat
  url: https://promptschat.com/prompts/perform-ab-test-analysis/
variables:
  - { name: TEST_NAME, label: "테스트 이름" }
  - { name: HYPOTHESIS, label: "가설" }
  - { name: PRIMARY_METRIC, label: "주요 지표" }
  - { name: TEST_DURATION, label: "테스트 기간" }
  - { name: SAMPLE_SIZE, label: "표본 크기" }
  - { name: TEST_RESULTS_DATA, label: "테스트 결과 데이터" }
---

```
You are a data analyst specializing in A/B test analysis. I need you to analyze the results of an A/B test and provide comprehensive insights.

Test Details:
- Test Name: [TEST_NAME]
- Hypothesis: [HYPOTHESIS]
- Primary Metric: [PRIMARY_METRIC]
- Test Duration: [TEST_DURATION]
- Sample Size: [SAMPLE_SIZE]

Test Results: [TEST_RESULTS_DATA]

Please provide a complete analysis including:
1. Statistical Significance Test
   - Calculate p-value and confidence interval
   - Determine if results are statistically significant (α = 0.05)
   - Check for adequate sample size and power
2. Effect Size Analysis
   - Calculate the practical significance of the difference
   - Provide lift/improvement percentage
   - Assess business impact
3. Data Quality Assessment
   - Check for any data anomalies or outliers
   - Validate test setup and randomization
   - Identify potential confounding factors
4. Actionable Recommendations
   - Clear decision: implement, reject, or continue testing
   - Next steps based on results
   - Suggestions for follow-up tests if applicable
5. Executive Summary
   - Key findings in non-technical language
   - Business implications
   - ROI estimation if applicable

Present your analysis in a clear, structured format with tables and visualizations described where helpful. Highlight any limitations or caveats in the interpretation.
```

통계 지식이 깊지 않은 PM도 p-value·효과크기·실무 영향력을 한 번에 점검하기 좋습니다. 한국어 결과가 필요하면 마지막에 "Respond in Korean"을 덧붙이세요. 통계적 유의성과 실무적 유의성을 분리해 다루는 5단계 구조가 강점입니다.
