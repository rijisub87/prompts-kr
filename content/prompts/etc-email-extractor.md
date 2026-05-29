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

긴 문서·계약서·메일 본문에서 연락처만 빠르게 추출하고 싶을 때. "정확히 적힌 것만 추출"하도록 제약을 걸어 환각(hallucination)을 막은 점이 포인트입니다.
