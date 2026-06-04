---
title: Claude Code Skill 작성 골격 (Gotchas 우선)
slug: code-claude-skill-template-gotchas
category: code
platform: [Claude]
language: 영문
addedAt: 2026-06-04
source:
  name: Anthropic Claude Blog — Lessons from Building Claude Code
  url: https://claude.com/blog/lessons-from-building-claude-code-how-we-use-skills
  author: Thariq Shihipar (Anthropic, Member of Technical Staff)
variables:
  - { name: SKILL_NAME, label: "스킬 이름" }
  - { name: TRIGGER, label: "호출 조건" }
  - { name: NOT_FOR, label: "호출하면 안 되는 인접 상황" }
  - { name: GOTCHA_1, label: "현장 실패 모드 1" }
  - { name: GOTCHA_2, label: "현장 실패 모드 2" }
  - { name: CONSTRAINT, label: "한 번 당해본 비명시적 제약" }
  - { name: VERIFY_CMD, label: "검증 명령·테스트" }
  - { name: SUCCESS_OUTPUT, label: "성공 시 관측 가능한 출력" }
---

```
# Skill: [SKILL_NAME]

## When to use
Use this skill ONLY when: [TRIGGER]
Do NOT use for: [NOT_FOR]

## Gotchas (read first)
- [GOTCHA_1]
- [GOTCHA_2]
- [CONSTRAINT]

## Verification
After making changes, verify by: [VERIFY_CMD]
Success looks like: [SUCCESS_OUTPUT]

## Reference snippets
See ./snippets/ for canonical patterns. Do not invent new patterns when one exists.
```

**"Claude가 이미 아는 것"은 쓰지 말고, 현장에서 당해본 함정(gotchas)과 검증 방법만** 적는 게 Anthropic 내부 결론. 9개 카테고리 중 verification 스킬이 출력 품질에 가장 큰 영향을 줬다고 보고. Claude Code의 `.claude/skills/`에 그대로 저장 가능.
