const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('SimpleStorage', () => {
  let simpleStorageFactory, simpleStorage;

  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
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

  it('Should add a person with his favourite number', async () => {
    const number = '1';
    const name = 'Joe';

    const txResponse = await simpleStorage.addPerson(name, number);
    await txResponse.wait(1);

    const favNum = await simpleStorage.nameToFavoriteNumber(name);

    assert(number, favNum);
  });
});
