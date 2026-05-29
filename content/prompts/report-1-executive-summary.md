---
title: 회의록 → 임원 1줄 요약 (Executive Summary)
slug: report-1-executive-summary
category: report
platform: [공통]
language: 한국어
source:
  name: "GPTers \"귀찮은 회의록 정리 나대신 GPT가 정리하게 만들기\""
  url: https://www.gpters.org/dev/post/gwicanheun-hoeyirog-jeongri-nadaesin-gptga-jeongrihage-mandeulgi-harue-h9Bm6cHFAWFAa0B
variables:
  - { name: 날짜, label: 날짜 }
---

```
다음 회의록을 임원에게 보낼 짧은 요약으로 압축해줘.

[회의록 원본]

출력 (총 7줄 이내, 마크다운):

**[회의 제목] — [날짜] — 참석자 N명**

1. **결정된 것 (1줄)**: 이번 회의에서 최종 합의된 핵심 결정 1개
2. **결정되지 않은 것 (1줄)**: 다음 회의로 넘어간 가장 큰 미해결 이슈 1개
3. **수치/숫자 (1줄)**: 회의에서 등장한 가장 중요한 숫자 1개와 맥락
4. **리스크/우려 (1줄)**: 임원이 알아야 할 가장 큰 잠재 리스크 1개
5. **임원 결정 요청 (1줄)**: 임원에게 결재·결정을 요청하는 사항 (없으면 "없음")
6. **다음 회의 예정**: 날짜 / 안건

추상적 표현 금지, 구체적 명사·숫자·이름으로 작성.
```

일반 회의록 요약과 결정적 차이는 **"결정된 것 vs 결정되지 않은 것"의 분리**입니다. 한국 임원은 "그래서 결론이 뭔데" 한 줄을 가장 빨리 보고 싶어해서, 이 구조가 임원 만족도를 크게 올립니다. 슬랙 #임원보고 채널에 그대로 붙여 넣을 수 있는 분량.
