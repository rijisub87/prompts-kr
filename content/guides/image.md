---
title: AI 이미지 생성 입문 — Midjourney·Stable Diffusion·DALL-E 비교 가이드
slug: image
category: image
summary: 어떤 도구로 시작할지부터 프롬프트 구조 + 한국적 스타일(조선 민화·수묵화)까지, 한국 사용자 관점의 이미지 생성 입문.
updatedAt: 2026-05-30
---

## 도구 선택 — 3개 중 어디로 시작하나

| 도구 | 강점 | 약점 | 가격 |
|---|---|---|---|
| **Midjourney** | 예술성·일관성 최고. SNS·블로그 썸네일에 최적 | Discord 필수, 진입 장벽 | 월 $10~ |
| **Stable Diffusion** | 무료(로컬) + 무한 커스터마이징 | GPU 필요, 설정 복잡 | 무료 / 클라우드 유료 |
| **DALL-E 3 (ChatGPT 내)** | 자연어로 즉시, ChatGPT Plus에 포함 | 일관성·세밀함은 약함 | ChatGPT Plus $20 |
| **Imagen 3 (Gemini)** | 무료 사용량 큼, Workspace 통합 | 디자이너용 세밀 제어 부족 | 대부분 무료 |

**한국 사용자 추천 시작 순서**:
1. **DALL-E 3** (ChatGPT Plus 이미 있으면) — 가장 쉬움
2. **Midjourney** — 예술적 결과물이 필요하면
3. **Stable Diffusion** — GPU 있고 마음껏 만들고 싶으면

## 프롬프트 구조 — 모든 도구 공통

영문 프롬프트가 표준이고 영어로 쓸 때 결과 품질이 가장 좋습니다. 한국어로 자연스럽게 시키는 건 DALL-E·Imagen만 가능합니다.

```
[Subject], [Action/Pose], [Setting/Background],
[Style/Mood], [Lighting], [Camera/Quality],
[Technical params]
```

### 예시 — 인물

```
A young Korean woman in her late 20s, sitting at a wooden cafe table,
modern minimalist coffee shop in Seongsu-dong Seoul,
warm afternoon light through window,
shot on Canon 5D Mark IV, 85mm f/1.4 lens, shallow depth of field,
soft natural lighting, cinematic, hyperdetailed --ar 3:4 --v 6 --style raw
```

### 예시 — 풍경

```
A serene mountain landscape with morning mist,
Korean traditional pagoda at the foot of the mountain,
in the style of Joseon dynasty ink wash painting (수묵화),
soft brushstrokes, monochromatic with subtle gradient,
mounted hanji paper background --ar 16:9 --v 6 --style raw
```

## Midjourney 핵심 파라미터

| 파라미터 | 의미 | 예시 |
|---|---|---|
| `--ar 16:9` | 화면비 | `--ar 1:1` (정방형), `--ar 16:9` (와이드), `--ar 3:4` (세로) |
| `--v 6` | 버전 | 최신 사용 (현재 v6) |
| `--style raw` | 스타일 강도 | "raw"는 자연스럽고 미세 조정 가능, 빼면 더 회화적 |
| `--niji` | 애니메이션 모델 | 한국·일본 애니메이션 스타일 |
| `--quality 2` | 품질 (비용 ↑) | 일반 작업은 기본값 |

## 한국적 스타일 (차별화 포인트)

영문 사이트의 이미지 갤러리에는 잘 없는 것 — **한국 전통 스타일** 프롬프트입니다.

### 조선 민화

```
A traditional Korean Minhwa (민화) painting,
folk art style with vivid pigments, flat perspective,
tiger and magpie composition (까치호랑이),
bold black outlines, decorative patterns, gold leaf accents,
mounted on aged hanji paper --ar 3:4 --v 6 --style raw
```

### 수묵화 풍경

```
Korean ink wash painting (수묵화) of misty mountains,
sparse brush strokes, negative space dominant,
sumi ink on hanji paper, minimal monochrome,
in the tradition of Joseon dynasty landscapes,
zen aesthetic --ar 16:9 --v 6 --style raw
```

### 한국 웹툰 캐릭터

```
Korean webtoon style character portrait,
young protagonist with sharp features,
cell shading, vibrant flat colors,
manhwa illustration aesthetic, clean line art,
similar to Solo Leveling or Tower of God style --ar 2:3 --niji 6
```

## DALL-E 3 (ChatGPT) 한국어 직접 사용

DALL-E 3는 한국어로 그대로 시킬 수 있습니다 — 가장 진입장벽 낮은 방법.

```
서울 성수동의 미니멀한 카페에서 노트북으로 작업하는 한국 20대 후반 여성을
사진처럼 사실적으로 그려줘. 따뜻한 오후 햇살이 창문으로 들어오고,
배경은 흐릿하게 처리, 세로 비율로.
```

내부적으로 ChatGPT가 영문 프롬프트로 번역해서 DALL-E 3에 전달합니다.

## 자주 하는 실수

- **너무 많은 요구를 한 줄에 넣음**: 5~6개 핵심 요소만. 7개 넘어가면 결과 흐려짐
- **부정문 사용**: "사람 없는 풍경" → "사람" 단어가 들어가서 사람이 나옴. **Stable Diffusion만** 부정 프롬프트 별도 지원
- **카메라·렌즈 정보 누락**: "사진처럼"보다 "Canon 5D, 85mm f/1.4"가 훨씬 잘 통함
- **한국어 텍스트를 이미지에 넣기**: 모든 모델 약함. 텍스트는 후처리로 합성하는 게 안전

## 저작권·상업 사용

| 도구 | 상업 사용 |
|---|---|
| Midjourney | Pro 이상 플랜 가입 시 가능 |
| DALL-E 3 | OpenAI 약관상 가능 (생성자에게 권리) |
| Imagen 3 | 약관 확인 (제한 있음) |
| Stable Diffusion (로컬) | 라이선스 확인 (대부분 가능) |

**주의**: 실존 인물·캐릭터·브랜드를 닮은 이미지는 상업 사용 시 분쟁 위험. 미키마우스, 한국 연예인 닮은 이미지 등은 피하세요.

## 마무리

이미지 생성은 한 번 익히면 블로그·SNS·발표 자료·제품 모킹업까지 활용처가 무궁무진합니다. 한국 사용자에겐 특히 **조선 민화·수묵화 같은 K-스타일이 차별화 포인트**가 됩니다 — 영문 컨텐츠와 다른 결과물을 만들 수 있어요.

> 핵심: **도구는 DALL-E 3부터, 프롬프트는 6요소 구조, 한국적 스타일로 차별화**.
