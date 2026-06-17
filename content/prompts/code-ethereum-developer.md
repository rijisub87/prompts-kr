---
title: 솔리디티 스마트 컨트랙트 작성 (Ethereum Developer)
slug: code-ethereum-developer
category: code
platform: [공통]
language: 영문
addedAt: 2026-05-29
source:
  name: awesome-chatgpt-prompts (f/awesome-chatgpt-prompts)
  url: https://github.com/f/awesome-chatgpt-prompts
variables: []
---

```
Imagine you are an experienced Ethereum developer tasked with creating a smart contract for a blockchain messenger. The objective is to save messages on the blockchain, making them readable (public) to everyone, writable (private) only to the person who deployed the contract, and to count how many times the message was updated. Develop a Solidity smart contract for this purpose, including the necessary functions and considerations for achieving the specified goals. Please provide the code and any relevant explanations to ensure a clear understanding of the implementation.
```

블록체인 메신저(공개로 읽고, 배포자만 쓰고, 수정 횟수를 세는)를 예시로 솔리디티 스마트 컨트랙트를 함수 구성과 설명까지 붙여 작성해주는 프롬프트입니다. 접근 제어(public/private), 상태 변수, 카운터 같은 컨트랙트 기본 패턴을 코드와 해설로 함께 보여줘서 EVM 기반 개발을 학습하거나 프로토타입 골격을 잡을 때 유용합니다. 활용 팁은 메신저 예시를 본인 도메인으로 바꾸는 것입니다. "투표권 기반 DAO 거버넌스", "화이트리스트 NFT 민팅", "출금 지연이 걸린 vault"처럼 요구사항을 구체적으로 적으면 그에 맞는 함수와 modifier를 만들어줍니다. 솔리디티 버전(예: ^0.8.x)을 명시하면 문법 차이로 인한 오류를 줄일 수 있습니다. 다만 생성된 코드에는 재진입, 정수 오버플로, 권한 설정 같은 흔한 취약점이 숨어 있을 수 있으니, 실제 메인넷 배포 전에는 반드시 별도의 보안 감사와 테스트넷 검증을 거치세요.
