---
title: 팟캐스트 인트로 90단어 (낭독용, Opus 4.8)
slug: writing-opus48-podcast-intro
category: writing
platform: [Claude]
language: 영문
addedAt: 2026-06-03
source:
  name: MindStudio Blog — How to Prompt Claude Opus 4.8 Differently
  url: https://www.mindstudio.ai/blog/how-to-prompt-claude-opus-4-8
  author: MindStudio
variables:
  - { name: TOPIC, label: "주제" }
---

```
This is for a podcast intro about [TOPIC] — it will be read aloud by a
host. Write in short sentences that are easy to say quickly. Aim for 90
words. The tone is confident and a little irreverent.
```

**"낭독용(read aloud)"** 이라고 명시하는 순간 Opus 4.8이 발음하기 어려운 단어와 호흡이 긴 문장을 자동 회피합니다. 팟캐스트 외에 유튜브 오프닝, 사내 발표 도입부, 광고 카피에도 그대로. 한국어 출력 원하면 끝에 `Respond in Korean, 한국어 낭독용으로` 추가.
