const { task } = require('hardhat/config');
const { getAccount } = require('./helpers');

task('check-balance', 'Prints out the balance of your account')
.setAction(async function (taskArguments, hre) {
    const account = getAccount();
    console.log(`Account balance for ${account.address}: ${await account.getBalance()}`);
});

task('deploy', 'Deploys the NFT.sol contract')
.setAction(async function (taskArguments, hre) {
    nftContractFactory = await hre.ethers.getContractFactory('NFT', getAccount());
    const nft = await nftContractFactory.deploy();
    console.log(`Contract deployed to address: ${nft.address}`);
});

// This script deploys the contract
// The check-balance task allows me to check the balance...
// of the given wallet address via my private key... 
// This is called and displayed through the terminal
// The deploy task gets my contract and wallet and deploys the contract...
// This is called through the terminal...
// The address the contract is deployed to is displayed in the terminal