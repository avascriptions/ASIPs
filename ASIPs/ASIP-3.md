---
asip: 3
title: Smart Contract Avascription ASC-20 lists
description: This proposal is used to allow smart contracts to support ASC-20 lists 
author: fumeng00mike
discussions-to: https://discord.com/channels/1187753805798965289/1187772213278015568
status: Review
category: Core
created: 2024-1-19
requires: 
---

## Specification
Incorporate one new smart contract event into the Avascriptions Protocol:
```solidity
event avascriptions_protocol_ListASC20Token(
    address indexed from,
    address indexed to,
    string indexed ticker,
    uint256 amount
)
```
Event signature:
```solidity
// "0xb2de1aec31252e2ec7dd0493ffe16c32a9f86939071394c278aad324fea582e2"
keccak256("avascriptions_protocol_ListASC20Token(address,address,string,uint256)");
```
When a contract emits this event, valid ASC-20 tokens will be listed on smart contract of marketplace, provided:

1. from: the address of the user who initiated the transfer.  
2. to: the address of the token recipient. typically, it will be marketplace contract address
3. ticker: Identifier of the ASC-20 tokens
4. amount: amount of listing ASC-20 tokens

## Rationale
Inscription ASC-20 token can be listed in the marketplace by EOA wallet, smart contracts can also own them. However, smart contracts cannot list them in the marketplace.
It makes the protocol difficult to use for smart contract wallet users.
This proposal lays out a simple and low gas mechanism for enabling smart contract to list their ASC-20 tokens.

## Note
ESIP-3 does not change the fact that each transaction may have only one listing operation. If multiple aspects of a transaction constitute valid listing operations, only the first operation will be considered valid.
