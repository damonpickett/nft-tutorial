# NFT Minter
Tutorial from [Open Sea Docs](https://docs.opensea.io/docs/creating-an-nft-contract)

## Tech Stack
- Javascript
- [Solidity](https://docs.soliditylang.org/en/v0.8.14/): For writing smart contract.
- [Hardhat](https://hardhat.org/): Through hardhat I'm able to use terminal commands (eg. `npx hardhat compile`, `npx hardhat deploy`, `npx hardhat mint`, etc.) to interact with the testnet.
- [Alchemy](https://www.alchemy.com/): My Alchemy project API key is used in my hardhat configuration file.
- [nft.storage](https://nft.storage/): This app allows me to upload files (images, metadata) to IPFS and returns a CID which I then use to set the base URI in my smart contract.

##### May 23rd, 2022, 1:12pm PST

At present, the primary functions of this app are:
- `npx hardhat check-balance`: Returns the account balance of the given wallet/network.
- `npx hardhat deploy`: Deploys the NFT.sol contract. Returns the address that the contract has been deployed to.
- `npx hardhat mint --address {wallet address}`: Mints a token to the given wallet address. Returns the transaction hash.

These functions are executed through the terminal.

##### May 24th, 2022

Converted images folder and metadata folder to .car files via terminal and uploaded to IPFS via [nft.storage](https://nft.storage/)

Added NFT contract functions to mint.js script

Ran terminal commands to mint tokens to my 'NFT Wallet' wallet:
- `npx hardhat compile`
- `npx hardhat deploy`
- `npx hardhat set-base-token-uri --base-url "https://{CID}.ipfs.dweb.link/metadata/"`
- `npx hardhat mint --address {wallet address}` x 3
- `npx hardhat token-uri --token-id {token id number}` (returns corresponding metadata)

## Verifying smart contract on Etherscan
In part 4 of the tutorial we begin learning how to verify your smart contract on Etherscan. This allows us to read and interact with the contract on Etherscan. It's also supposed to help build trust with the community since it allows them to ensure the code written is safe. So I created an Etherscan account and generated an api key and added `ETHERSCAN_API_KEY` to my .env file. I then entered `npx hardhat verify {contract address}` in the terminal. This produced an error initially but the contract was verified and I was able to see my contract on Etherscan.

## Setting a token supply limit
A constant is added to the top of the contract:
`uint256 public constant TOTAL_SUPPLY = 10_000;`

The following lines of code were added to the mintTo() function in NFT.sol:

```sol
uint256 tokenId = currentTokenId.current();
require(tokenId < TOTAL_SUPPLY, "Max supply reached");
```


If the require line resolves to false then the function will not execute and the the user will not be charged.

## Setting a price for minting your NFT
A constant is added to the top of the contract:

`uint256 public constant MINT_PRICE = 0.08 ether;`

The `payable` modifier is added to the `mintTo()` function. And this require line is added to the function:

`require(msg.value == MINT_PRICE, "Transaction value did not equal the mint price");`

## Withdrawing Funds
After adding `import "@openzeppelin/contracts/security/PullPayment.sol";` and extending `contract` with `PullPayment` (`contract NFT is ERC721, PullPayment`), and after re-deploying my contract and verifying, I can now navigate to my contract on Etherscan and withdraw payments to an address of my choosing (Contract -> Write Contract)

## Roles and Access
To prevent anyone other than myself from withdrawing funds from my contract, I've added `import "@openzeppelin/contracts/access/Ownable.sol";` to my imports, extended `contract` with `Ownable` and added this function:

```sol
function withdrawPayments(address payable payee) public override onlyOwner virtual {
   super.withdrawPayments(payee);
}
```

The ownership contract also gives me access to helpers such as `renounceOwnership()`, `transferOwnership()`, and `isOwner()`.





