---
asip: 5
title: Smart Contract Avascription ASC-20 Mints
description: This proposal is used to allow smart contracts to support ASC-20 mints 
author: fumeng00mike
discussions-to: 
status: Draft
category: Core
created: 2024-1-19
requires: 
---

## Specification
Incorporate one new smart contract event into the Avascriptions Protocol:
```solidity
event avascriptions_protocol_MintASC20Token(
    address indexed to,
    string indexed ticker,
    uint256 amount
);
```
Event signature:
```solidity
// "0x614d80f06cfac477421ae3965ae5468509fe25a330f9558e4a2cd9d60eefeb59"
keccak256("avascriptions_protocol_MintASC20Token(addresss,string,uint256)");
```
When a contract emits this event, the protocol should mint ASC-20 tokens to recipient address, provided:

1. to: the address of the token recipient.
2. ticker:  Identifier of the asc-20
3. amount:  the amount of mint

After receiving this event, the ASC-20 token was minted 
  
## Avascription and AVAX Transactions remain 1-1
Minting multiple ASC-20 tokens in a transaction will always be needed,but we don't want smart contract to take advantage of eoa in minting.

Example 1:

1. Calldata: valid mint
2. Event Log Index 1: valid mint
3. Event Log Index 2: valid mint

In this case, ASC-20 tokens will be minted according to the calldata and Events 1 and 2 will be ignored.

Example 2:

1. Calldata: empty (i.e., invalid creation)
2. Event Log Index 1: valid mint
3. Event Log Index 2: valid mint

Here, Event 1's log will trigger the ASC-20 tokens mint. If calldata and Event 1 were both invalid, then Event 2's log would trigger the asc-20 tokens mint.

## Rationale
We propose smart contract can mint avascription asc-20 tokens directly, meanwhile maintaining the 1-1 correspondence between avascription and AVAX transactions, enabling eoa and smart contract to participate in token launches fairly.