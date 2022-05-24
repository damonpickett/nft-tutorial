# NFT Minter
Tutorial from [Open Sea Docs](https://docs.opensea.io/docs/creating-an-nft-contract)

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

In part 4 of the tutorial we begin learning how verify your smart contract on Etherscan. This allows us to read and interact with the contract on Etherscan. It's also supposed to help build trust with the community since it allows them to ensure the code written is safe. So I created an Etherscan account and generated an api key and added `ETHERSCAN_API_KEY` to my .env file. I then entered `npx hardhat verify {contract address}` in the terminal. This produced an error initially but the contract was verified and I was able to see my contract on Etherscan.