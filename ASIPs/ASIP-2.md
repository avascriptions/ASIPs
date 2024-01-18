---
asip: 2
title: Safe Trustless Smart Contract ASC20-Token Escrow
description: A More Secure Way to Implement Smart Contract Transfers ASC-20
author: avascriptions
discussions-to: https://discord.com/channels/1187753805798965289/1187772213278015568
status: Final
category: Core
created: 2024-12-11
requires: 
---

## Specification
Add a new smart contract event into the Avascriptions Protocol:
```solidity
event avascriptions_protocol_TransferASC20TokenForListing(
    address indexed from,
    address indexed to,
    bytes32 id
);
```
Event signature:
```solidity
// "0xe2750d6418e3719830794d3db788aa72febcd657bcd18ed8f1facdbf61a69a9a"
keccak256("avascriptions_protocol_TransferASC20TokenForListing(address,address,bytes32)")
```
When a contract emits this event, the protocol should register a valid ASC-20 tokens transfer from the emitting contract to recipient, provided:  
from:  the address of the user who initiated the valid list.  
to:  the address of the token recipient.  
id: the avasription ID of the listing transaction.  
After receiving this event, the indexer needs to retrieve corresponding information from the previously recorded list avascription. It's necessary to verify whether the contract address and the initiator's address match the previously recorded listing. If they match, the ASC-20 tokens are transferred according to the tick and amount information recorded in the listing.  

## Rationale 
ASIP-2 is primarily designed to facilitate secure escrowing of ASC-20 tokens by smart contracts.  
The concept of smart contract escrow involves sending ASC-20 tokens to a smart contract, where the tokens are owned by the contract, yet the sender retains certain control over them—usually the ability to withdraw them or direct the smart contract to transfer them to another party.  
Marketplaces represent a prevalent use case for smart contract ASC-20 token escrows. Presently, individuals cannot grant smart contracts permission to transfer their ASC-20 tokens. Therefore, to list an ASC-20 token for sale, it must first be transferred to the marketplace contract.  
While the introduction of avascriptions_protocol_TransferASC20Token in ASIP-1 grants smart contracts the capability to send and receive ASC-20 tokens and function as marketplaces or escrows, ASIP-1 alone doesn't equip smart contracts with the necessary information to operate securely as escrows without additional assistance.  
The aim of ASIP-2 is to empower smart contracts to overcome this limitation.