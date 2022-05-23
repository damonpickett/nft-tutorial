const { task } = require('hardhat/config');
const { getContract } = require('./helpers');

task('mint', 'Mints from the NFT contract')
.addParam('address', 'The address to receive a token')
.setAction(async function (taskArguments, hre) {
    const contract = await getContract("NFT", hre);
    const transactionResponse = await contract.mintTo(taskArguments.address, {
        gasLimit: 500_000,
    });
    console.log(`Transaction Hash: ${transactionResponse.hash}`)
});

// This script takes in an instance of the contract deployed by this app...
// It then calls the contracts mintTo() function