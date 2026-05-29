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

긴 PDF(연차 보고서·IR 자료)는 Claude의 긴 컨텍스트 윈도우와 잘 맞습니다. `{{REPORT}}` 부분을 실제 보고서 본문으로 교체하세요. 산업이 다르면 ESG 부분을 본인 도메인에 맞게 수정하세요.
