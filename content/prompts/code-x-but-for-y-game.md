---
title: "'X인데 Y 버전' — 6단어로 게임·앱 프로토타입 만들기"
slug: code-x-but-for-y-game
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
[FAMILIAR_THING], but for [NEW_DOMAIN]
```

예: `Balatro, but for the game of coin flips` (발라트로인데 동전 던지기 버전)

Ethan Mollick이 보여준, 단 몇 단어의 모호한 프롬프트로 플레이 가능한 게임을 통째로 받는 패턴. 원문에서는 이 6단어만으로 모델이 외부 에셋 없이 아트·3D 오브젝트까지 수학으로 생성한 카드게임을 만들어냈다. 원리는 두 가지 — 사람이 **이미 잘 아는 것(X)** 의 메커니즘을 모델이 알고 있고, **새 영역(Y)** 으로 옮기는 창의적 변환은 모델이 채우게 두는 것. 게임 외에도 "스프레드시트인데 음악용", "트렐로인데 요리 레시피용"처럼 앱 프로토타이핑 브레인스토밍에 그대로 응용 가능.
