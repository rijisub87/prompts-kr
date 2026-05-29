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

이메일·뉴스·자유 텍스트에서 정형 데이터 뽑을 때 강력합니다. temperature를 0으로 두고 사용하면 결과가 안정적입니다. 후속 처리 파이프라인 입력으로 그대로 쓸 수 있습니다.
