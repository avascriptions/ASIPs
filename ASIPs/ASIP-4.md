---
asip: 4
title: Smart Contract Avascription ASC-20 Deploys
description: This proposal is used to allow smart contracts to support ASC-20 deploys 
author: fumeng00mike
discussions-to: https://discord.com/channels/1187753805798965289/1187772213278015568
status: Draft
category: Core
created: 2024-1-19
requires: 
---

## Specification
Incorporate one new smart contract event into the Avascriptions Protocol:
```solidity
event avascriptions_protocol_DeployASC20Token(
    string indexed ticker,
    uint256 max,
    uint256 lim
);
```
Event signature:
```solidity
// "0xba9ac751f4eb235378b04b0bd21d019d2aff33ec615459ea5dc29b6c2e647c65"
keccak256("avascriptions_protocol_DeployASC20Token(string,uint256,uint256)");
```
When a contract emits this event, the protocol should deploy a valid ASC-20 token, provided:

1. ticker:  Identifier of the ASC-20 tokens
2. max: Set max supply of the ASC-20 tokens
3. lim: Limit per mint

After receiving this event, the indexer needs to retrieve corresponding information from the previously recorded list of avascription ASC-20 tokens. It's necessary to verify whether the ticker has been occupied. If valid, the ASC-20 token was deployed.
  
## Avascription and AVAX Transactions remain 1-1
ASIP-3 does not change the fact that each AVAX transaction may have only one corresponding ASC-20 token. If multiple aspects of a transaction constitute valid ASC-20 token creations, calldata will be prioritized over events, and events with lower log indices will be prioritized over those with higher indices.

Example 1:

1. Calldata: valid creation
2. Event Log Index 1: valid creation
3. Event Log Index 2: valid creation

In this case, a ASC-20 token will be created according to the calldata and Events 1 and 2 will be ignored.

Example 2:

1. Calldata: empty (i.e., invalid creation)
2. Event Log Index 1: valid creation
3. Event Log Index 2: valid creation

Here, Event 1's log will trigger the ASC-20 token creation. If calldata and Event 1 were both invalid, then Event 2's log would trigger the avascription creation.

## Rationale
Contracts must have the same powers as EOAs and this is the cheapest way to do it.
We propose maintaining the 1-1 correspondence between avascriptions and AVAX transactions because the convention that avascriptionId = transactionHash has proven useful.