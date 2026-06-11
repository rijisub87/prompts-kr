---
title: 한 줄로 프로젝트 통째로 만들기 — 모호하게 던지고 크게 받기
slug: code-one-line-vibe-build
category: code
platform: [Claude]
language: 영문
addedAt: 2026-06-11
source:
  name: "Ethan Mollick — One Useful Thing 'What it feels like to work with Mythos'"
  url: "https://www.oneusefulthing.org/p/what-it-feels-like-to-work-with-mythos"
  author: "Ethan Mollick"
---

```
i want you to build a fully researched and beautiful [PROJECT] that lets me
[CORE_INTERACTION]. I want the design to be unique.

You should take into account [REAL_FACTORS_TO_RESEARCH].
The data does not need to be live but should be real based on your research and data.
You can start with [SMALL_SCOPE] but more general is better — this should be an
entirely new project.
```

Ethan Mollick(와튼스쿨 교수)이 공유한, 강력한 코딩 에이전트(Claude 등)에 **짧고 모호한 한 문단**을 던져 완성된 프로젝트를 받는 패턴. 원문에서는 "도시별 등시선(isochrone) 지도를 만들어줘 — 공항·기차·도보·운전 이동시간을 반영해서"라는 한 문단으로 모델이 스스로 2,200개 스케줄을 수집하고 코드를 작성·자가 검증했다. 핵심은 (1) "fully researched", "beautiful", "unique"로 품질 기준을 올리고 (2) "more general is better", "entirely new project"로 모델에게 넓은 재량을 주는 것. 변수만 본인 프로젝트로 바꿔 사용.
