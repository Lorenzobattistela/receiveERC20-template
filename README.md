# Receive ERC20 Template

This repository implements a simple contract of ERC20 receiving, and its purppose is to serve as a template for other developers who need to receive ERC20 tokens in their contracts. Lets explain the files and how to use them.

This template is inspired by [this Repository](https://github.com/net2devcrypto/ERC721-Contracts/blob/main/ERC721-NFT-Collection-withAddCurrency-ERC20.sol), and the contract erc20.sol is entirely from there. Credits for [@Net2DevCrypto](https://github.com/net2devcrypto).

## Contracts/erc20.sol

This contract is a simple ERC20 implementation. This is needed to test our template, and this is the token that I used to test the receiveErc20 contract in `/test` directory.

It has just default functions of any ERC20 token. The thing to be noted here is the default function `approve()`. The function approve takes two arguments, an address and a uint256. This function basically allows that another address spends yours ERC20 token that this smart contract implements. But why do we need it? Because when we call our `receiveErc20` contract, it is the contract the one who executes the transfer of the erc20 token, which means that we need to allow it to spend. 

You can read more about the `approve()` function [here](https://medium.com/ethex-market/erc20-approve-allow-explained-88d6de921ce9).

## Contracts/receiveErc20.sol

This is our main contract, that implements our ERC20 receiving. Lets understand it. First, we create a TokenInfo structure:
```
struct TokenInfo {
        IERC20 paytoken;
        uint256 cost;
    }
```

It stores a IERC20 (which is the address of the token we want to receive) and the cost. We define this in our constructor (but it can be changed later). The function `changeErc20()` allows contract admins to change the receive token and cost.

The function `payContract()` transfers the value set in cost from the msg.sender account to the contract account. This is where we receive the token.

The `withdraw()` function is already configured to withdraw erc20 tokens.

The modifier `onlyAdmin()` allow us to control who has access to functions, in this case the changeErc20.

## Scripts

Sripts wrote in this contract need to be changed if you want to deploy it to some testnet, because you have to configure deployer settings, with private key.

But needed functions are called there.

## Test

If you change the contracts, you can test base functions running `npx hardhat test`, which will test JUST the functionalities implemented in the template.

## Thanking

Thanks for using my template! Leave a star here if you like, and feel free to contribute with possible improvement changes!