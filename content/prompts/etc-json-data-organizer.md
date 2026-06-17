---
title: 데이터 구조화 — 비정형→JSON (Data Organizer)
slug: etc-json-data-organizer
category: etc
platform: [공통]
language: 영문
addedAt: 2026-05-29
source:
  name: Anthropic Prompt Library
  url: https://docs.anthropic.com/en/resources/prompt-library/data-organizer
variables: []
---

```
Your task is to take the unstructured text provided and convert it into a well-organized table format using JSON. Identify the main entities, attributes, or categories mentioned in the text and use them as keys in the JSON object. Then, extract the relevant information from the text and populate the corresponding values in the JSON object. Ensure that the data is accurately represented and properly formatted within the JSON structure. The resulting JSON table should provide a clear, structured overview of the information presented in the original text.
```

제품 설명, 뉴스 기사, 이메일, 고객 후기처럼 줄글로 된 텍스트를 키-값이 정리된 JSON으로 변환할 때 쓰는 프롬프트입니다. 모델이 텍스트에서 주요 항목(이름·날짜·가격·속성 등)을 스스로 찾아 키로 잡고 값을 채워주므로, 스키마를 일일이 정의하지 않아도 됩니다. 비정형 데이터를 표나 데이터베이스에 넣기 전 1차 구조화 단계로 적합하고, 결과를 후속 처리 코드의 입력으로 바로 넘길 수 있습니다. 결과 안정성을 위해 temperature를 0에 가깝게 두는 것이 좋습니다. 키 이름을 고정하고 싶다면 원하는 필드 목록을 프롬프트에 추가하고, 변환 후에는 JSON 파싱 검증을 한 번 거치는 편이 안전합니다.
