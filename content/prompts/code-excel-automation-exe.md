---
title: 매월 반복 엑셀 정리 → 클릭 한 번 자동화 (.exe) 의뢰
slug: code-excel-automation-exe
category: code
platform: [Claude, ChatGPT]
language: 한국어
addedAt: 2026-06-08
source:
  name: "AI 레시피 뉴스레터 — 김연지 '클로드4, 곧바로 써먹는 프롬프트 17선'"
  url: "https://maily.so/airecipe/posts/8do78glprgq"
  author: "김연지"
variables:
  - { name: TASK, label: "현재 매월 반복하는 업무 (예: 매출 데이터 정리, 인사 평가 집계)" }
  - { name: HOURS, label: "월 소요 시간 (예: 4시간)" }
  - { name: SOURCE_FILES, label: "원본 파일 위치·이름 (예: D:/매출/2026/*.xlsx)" }
  - { name: OUTPUT_FORMAT, label: "원하는 결과물 (예: PPT 보고서, PDF, 엑셀 요약본)" }
---

```
역할: 당신은 업무 자동화 전문 개발자입니다.

프로젝트 상황:
- 현재 업무: [TASK]
- 소요 시간: 월 [HOURS]
- 자동화 목표: 클릭 한 번으로 결과물 완성

요구사항:
1. 데이터 수집: [SOURCE_FILES]의 모든 엑셀 파일 읽기
2. 데이터 처리: 중복 제거, 날짜 형식 통일, 결측치 처리
3. 분석 및 계산: 월별·항목별·지역별 등 필요 집계
4. 시각화: 차트 3개 (추세·구성비·증감률)
5. 결과물 생성: [OUTPUT_FORMAT]으로 자동 생성

기술 제약:
- Python 사용 (pandas, openpyxl, matplotlib, python-pptx 등)
- 비개발자도 실행 가능하도록 .exe 파일로 변환 (PyInstaller)
- 에러 발생 시 사용자 친화적 메시지 출력 (한국어로)
- Windows·Mac 둘 다 호환되면 좋지만 Windows 우선

코드와 함께 다음을 포함해주세요:
1. 설치 가이드 (필요 라이브러리, 환경설정 단계)
2. 사용법 매뉴얼 (단계별 + 스크린샷 들어갈 자리 표시)
3. 문제 해결 FAQ (자주 발생하는 에러 5가지와 해결법)
```

**비개발자가 .exe로 받아 동료에게 배포**하는 한국 사무직 현실 제약을 프롬프트에 명시한 점이 핵심. 단순 코드 작성이 아니라 설치 가이드·매뉴얼·FAQ까지 한 번에 받아 곧바로 팀에 배포 가능. 월 4시간 반복 업무를 클릭 한 번으로 자동화 — 1년이면 48시간 절감.
