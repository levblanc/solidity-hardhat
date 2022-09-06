import { task } from 'hardhat/config';

// Run task with default hardhat network:
// yarn hardhat block-number

// Run task with custom network:
// yarn hardhat block-number --network <your-choice-of-network>
export default task('block-number', 'Prints the block number').setAction(
  async (taskArgs, hre) => {
    const blockNum = await hre.ethers.provider.getBlockNumber();
    console.log(`Current block number: ${blockNum}`);
  }
);
