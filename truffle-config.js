const { infura, cls, etherscan, deploy } = require('./secrets.json');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const path = require('path');

const providerFactory = (network) => {
  const ret = new HDWalletProvider({
    privateKeys: [deploy.key],
    providerOrUrl: `https://${network}.infura.io/v3/${infura.apiKey}`, // Provider URL => web3.HttpProvider
  });

  return ret;
};

module.exports = {
  contracts_build_directory: path.join(__dirname, 'compiled'),
  networks: {
    development: {
      host: '127.0.0.1', // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: '*', // Any network (default: none)
      gas: 4712388,
      gasPrice: 100000000000,
    },
  bsc_testnet: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [deploy.key],
          providerOrUrl: `https://data-seed-prebsc-1-s1.binance.org:8545`,
        }),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    bsc_mainnet: {
      provider: () =>
        new HDWalletProvider({
          privateKeys: [deploy.key],
          providerOrUrl: `https://bsc-dataseed1.binance.org`,
        }),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
  mocha: {
    // timeout: 100000
  },
  api_keys: {
    etherscan: etherscan.apiKey,
  },
  plugins: ['truffle-plugin-verify'],
  compilers: {
    solc: {
      version: '0.8.13', // Fetch exact version from solc-bin (default: truffle's version)
    },
  },
};
