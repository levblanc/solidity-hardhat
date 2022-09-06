const { ethers, run, network } = require('hardhat');
const hre = require('hardhat');
require('@nomiclabs/hardhat-etherscan');

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');

  console.log('>>>>>> Deploying contract ...');
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();

  console.log('>>>>>> Contract address', simpleStorage.address);

  // 0x519b3cbf0ef422e38f6ec197cb5c5c3045491a1b
  // yarn hardhat verify 0x519B3Cbf0EF422e38F6Ec197cB5C5C3045491a1B --network rinkeby --show-stack-traces

  // if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
  //   await simpleStorage.deployTransaction.wait(3);
  //   await verify(simpleStorage.address, []);
  // }

  const currentValue = await simpleStorage.retrieve();
  console.log(`>>>>>> Current Value: ${currentValue}`);

  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);

  const updatedValue = await simpleStorage.retrieve();
  console.log(`>>>>>> Updated Value: ${updatedValue}`);
}

async function verify(contractAddress, args) {
  console.log('>>>>>> Verifying contract ...');

  try {
    await run('verify:verify', {
      address: contractAddress,
      // constructorArgsParams: args,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes('already verified')) {
      console.log('>>>>>> Already verified!');
    } else {
      console.error(error);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
