---
title: 이메일 주소 추출기 (Email Extractor)
slug: etc-email-extractor
category: etc
platform: [공통]
language: 영문
addedAt: 2026-05-29
source:
  name: Anthropic Prompt Library
  url: https://docs.anthropic.com/en/resources/prompt-library/email-extractor
variables: []
---

```
Precisely copy any email addresses from the following text and then write them, one per line. Only write an email address if it's precisely spelled out in the input text. If there are no email addresses in the text, write "N/A". Do not say anything else.
```

회의록, 계약서, 긴 메일 스레드, 명함 OCR 결과처럼 여러 사람의 정보가 섞인 텍스트에서 이메일 주소만 한 줄에 하나씩 뽑아낼 때 쓰는 프롬프트입니다. "입력에 정확히 적힌 것만 추출하고, 없으면 N/A"라는 제약을 걸어 모델이 그럴듯한 주소를 지어내는 환각을 막은 점이 핵심입니다. 추출한 목록을 그대로 메일링 리스트나 스프레드시트에 붙여 쓰기 좋습니다. 같은 방식으로 마지막 문장의 추출 대상을 전화번호나 URL로 바꾸면 다른 연락처 추출기로도 응용할 수 있습니다. 다만 "사람 이름@회사"처럼 변형해 쓴 주소나 이미지 속 텍스트는 잡지 못하니, 추출 후 한 번 눈으로 확인하세요.
