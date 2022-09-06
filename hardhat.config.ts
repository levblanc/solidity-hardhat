import '@nomicfoundation/hardhat-toolbox';
import 'dotenv/config';
// run: yarn hardhat typechain, to generate type annotation files
import '@typechain/hardhat'
import 'hardhat-gas-reporter';
import './tasks/block-number';
// run: yarn hardhat coverage
import 'solidity-coverage';

const { RINKEBY_RPC_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: 'hardhat',
  solidity: '0.8.8',
  networks: {
    // yarn hardhat run scripts/deploy.js --network rinkeby
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 4,
    },
    // To spin up a local hardhat node:
    // yarn hardhat node
    localhost: {
      url: 'http://127.0.0.1:8545',
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: false, // set to true when needs a report
    outputFile: 'gas-report.md',
    noColors: true,
    // currency: 'USD',
    token: 'MATIC',
  },
};
