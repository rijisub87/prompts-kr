---
title: 기업 보고서 요약 (Corporate Clairvoyant)
slug: summary-corporate-clairvoyant
category: summary
platform: [Claude]
language: 영문
addedAt: 2026-05-29
source:
  name: Anthropic Prompt Library
  url: https://docs.anthropic.com/en/resources/prompt-library/corporate-clairvoyant
variables: []
---

```
Your task is to analyze the following report:

<report>{{REPORT}}</report>

Summarize this annual report in a concise and clear manner, and identify key market trends and takeaways. Output your findings as a short memo I can send to my team. The goal of the memo is to ensure my team stays up to date on how financial institutions are faring and qualitatively forecast and identify whether there are any operating and revenue risks to be expected in the coming quarter. Please include all relevant details in your summary. As ESG considerations are flagged by the SEC, please also include any relevant references and detail.
```

연차 보고서나 IR 자료를 읽고, 단순 요약을 넘어 시장 트렌드·운영/매출 리스크·다음 분기 전망까지 짚어 팀에 그대로 돌릴 수 있는 메모 형태로 출력하는 프롬프트입니다. ESG 항목도 함께 챙기도록 지시되어 있어 금융기관 모니터링이나 동향 파악에 적합합니다. 분량이 큰 보고서를 다루므로 컨텍스트 윈도우가 넓은 Claude와 잘 맞고, `{{REPORT}}` 자리에 보고서 본문(또는 첨부 PDF)을 넣어 사용합니다. 활용 팁: "특히 부채 비율과 신규 사업 부문에 주목"처럼 관심 항목을 한 줄 덧붙이면 메모가 더 날카로워집니다. 주의할 점은 모델이 추세를 "전망"으로 서술할 때 보고서에 없는 추정을 섞을 수 있으니, 수치 근거가 붙은 문장 위주로 검증하고 ESG 부분은 본인 산업 기준에 맞게 손보세요.
