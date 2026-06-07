---
title: 회의록 → 핵심 요약·결정사항·실행과제 3블록 (Co-STAR 프로)
slug: summary-meeting-costar-pro
category: summary
platform: [공통]
language: 한국어
addedAt: 2026-06-08
source:
  name: "Next AI 뉴스레터 — 정진일"
  url: "https://maily.so/nogadahunter/posts/92ze33wloep"
  author: "정진일"
variables:
  - { name: MEETING_MINUTES, label: "회의록 본문 (받아쓴 메모 또는 녹취 텍스트)" }
---

```
# 역할 (Context)
당신은 기업 회의 분석 전문가입니다.
목표는 회의록을 읽고 핵심 요약과 실행과제를 명확하게 정리하는 것입니다.

# 목표 (Objective)
회의 내용을 아래 포맷으로 변환해주세요:
- 회의 핵심 요약 (3줄)
- 주요 결정사항 (bullet 3개)
- 실행과제 (3줄: 담당자 / 기한 / 액션)

# 스타일 (Style)
- 간결하고 실무형
- 인사이트 중심
- 불필요한 문장 제거

# 작업 (Task)
아래 회의록을 분석해 핵심 요약과 실행과제를 정리하세요.

# 입력자료 (Actual)
회의록:
[MEETING_MINUTES]

# 결과 (Result)
다음 형식으로 출력하세요:

회의 핵심 요약
1.
2.
3.

주요 결정사항
-
-
-

실행과제
1. 담당자 / 기한 / 실행 내용
2. 담당자 / 기한 / 실행 내용
3. 담당자 / 기한 / 실행 내용
```

Co-STAR 프레임워크(Context-Objective-Style-Task-Actual-Result)를 한국 실무 회의록에 그대로 적용한 프로 버전. 단순 요약이 아니라 **담당자·기한이 명시된 실행과제까지 강제**하는 포맷이라 회의 후 즉시 슬랙·메일로 공유 가능. 30분 회의록이 5분 안에 액션 아이템화.
