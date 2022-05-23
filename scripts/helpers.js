const { ethers } = require('ethers');
const { getContractAt } = require('@nomiclabs/hardhat-ethers/internal/helpers');

// Helper method for fetching environment variables from .env...
// Used within this file
function getEnvVariable(key, defaultValue) {
    if (process.env[key]) {
        return process.env[key];
    }
    if (!defaultValue) {
        throw `${key} is not defined and no default value was provided`;
    }
    return defaultValue;
}

// Helper method for fetching a connection provider to the Ethereum network...
// Used within this file 
function getProvider() {
    return ethers.getDefaultProvider(getEnvVariable('NETWORK', 'rinkeby'), {
        alchemy: getEnvVariable('ALCHEMY_KEY'),
    });
}

// Helper method for fetching a wallet account using an environment variable for the PK...
// Used within this file and deploy.js
function getAccount() {
    return new ethers.Wallet(getEnvVariable('ACCOUNT_PRIVATE_KEY'), getProvider());
}

// Helper method for fetching a contract instance at a given address...
// Used by mint.js
function getContract(contractName, hre) {
    const account = getAccount();
    return getContractAt(hre, contractName, getEnvVariable("NFT_CONTRACT_ADDRESS"), account);
}

module.exports = {
    getEnvVariable,
    getProvider,
    getAccount,
    getContract,
}