import { assert } from 'chai';
import { ethers } from 'hardhat';
import {SimpleStorage, SimpleStorage__factory} from '../typechain-types'

describe('SimpleStorage', () => {
  let simpleStorageFactory: SimpleStorage__factory 
  let simpleStorage: SimpleStorage;

  beforeEach(async () => {
    simpleStorageFactory = (await ethers.getContractFactory('SimpleStorage')) as SimpleStorage__factory;
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it('Should start with a fav num of 0', async () => {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = '0';
    assert.equal(currentValue.toString(), expectedValue);
  });

  it('Should update when we call store()', async () => {
    const expectedValue = '7';
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);

    const updatedValue = await simpleStorage.retrieve();
    assert.equal(updatedValue.toString(), expectedValue);
  });
});
