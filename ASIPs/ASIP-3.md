---
asip: 3
title: Smart Contract Avascription ASC-20 lists
description: This proposal is used to allow smart contracts to support ASC-20 lists 
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
event avascriptions_protocol_ListASC20Token(
    address indexed to,
    string indexed ticker,
    uint256 amount
)
```
Event signature:
```solidity
// "0xd8de386cd760c4eb2cbf2916de17f3ade460658204bcc61332c3229e4da08e24"
keccak256("avascriptions_protocol_ListASC20Token(addresss,string,uint256)");
```
When a contract emits this event, valid ASC-20 tokens will be listed on smart contract of marketplace, provided:

1. to: the address of the token recipient. typically, it will be marketplace contract address
2. ticker: Identifier of the ASC-20 tokens
3. amount: amount of listing ASC-20 tokens

## Rationale
Inscription ASC-20 token can be listed in the marketplace by EOA wallet, smart contracts can also own them. However, smart contracts cannot list them in the marketplace.
It makes the protocol difficult to use for smart contract wallet users.
This proposal lays out a simple and low gas mechanism for enabling smart contract to list their ASC-20 tokens.