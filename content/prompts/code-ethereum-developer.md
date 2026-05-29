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

EVM 기반 컨트랙트 설계 학습용으로 좋습니다. 메신저 예시를 본인 도메인(DAO, NFT mint, vault)으로 바꿔도 잘 작동합니다. 실제 배포 전엔 반드시 별도 보안 감사를 받으세요.
