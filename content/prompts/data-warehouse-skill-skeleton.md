---
title: 데이터 웨어하우스 쿼리용 Skill 파일 스켈레톤
slug: data-warehouse-skill-skeleton
category: data
platform: [Claude, 공통]
language: 영문
addedAt: 2026-06-04
source:
  name: Anthropic Claude Blog — Self-Service Data Analytics
  url: https://claude.com/blog/how-anthropic-enables-self-service-data-analytics-with-claude
  author: Anthropic Data team (Chen Chang, Clement Peng, Justin Leder, Johanne Jiao, Josh Cherry)
variables:
  - { name: SKILL_NAME, label: "스킬 이름 (예: kr-sales-warehouse)" }
  - { name: VERSION, label: "버전 (예: 1.0.0)" }
  - { name: BUSINESS_DOMAINS, label: "비즈니스 도메인 목록" }
  - { name: ADJACENT_TASKS, label: "인접하지만 다른 작업 (호출 X)" }
  - { name: DOMAIN, label: "도메인 이름" }
  - { name: BUSINESS_CONTEXT, label: "도메인의 평이한 비즈니스 설명" }
  - { name: ENTITY_GRAIN, label: "한 행이 무엇을 의미하는가" }
  - { name: STANDARD_FILTER, label: "모든 쿼리에 적용되는 표준 위생 필터" }
---

```
---
name: [SKILL_NAME]
version: [VERSION]
description: "IF the user asks to query the company's data warehouse for any
[BUSINESS_DOMAINS] question — THEN invoke this skill. DO NOT invoke
for [ADJACENT_TASKS] or questions with no data-warehouse component."
---

# [DOMAIN] Tables

## Quick Reference

### Business Context
[BUSINESS_CONTEXT]

### Entity Grain
[ENTITY_GRAIN]

### Standard Hygiene Filter
[STANDARD_FILTER]
```

**IF/THEN/DO NOT 3구조** description이 에이전트가 "이 스킬을 언제 호출할지" 정확히 판단하게 만드는 핵심. Anthropic 데이터팀 보고에 따르면 이 패턴으로 95% 호출 정확도 달성. Claude Code Skills, Claude Projects, 사내 데이터 어시스턴트에 그대로 적용 가능.
