import { ethers, run, network }  from 'hardhat';
import '@nomiclabs/hardhat-etherscan';

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');

  console.log('>>>>>> Deploying contract ...');
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();

  console.log('>>>>>> Contract address', simpleStorage.address);

  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(3);
    await verify(simpleStorage.address, []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`>>>>>> Current Value: ${currentValue}`);

  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);

  const updatedValue = await simpleStorage.retrieve();
  console.log(`>>>>>> Updated Value: ${updatedValue}`);
}

async function verify(contractAddress: string, args: any[]) {
  console.log('>>>>>> Verifying contract ...');

  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error: any) {
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
