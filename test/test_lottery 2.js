require("@openzeppelin/test-helpers/configure")({
  provider: web3.currentProvider,
  singletons: {
    abstraction: "truffle",
  },
});

const Lottery = artifacts.require("Lottery");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */

contract("Lottery", async function (accounts) {
  let lottery;
  const manager = accounts[0];

  before("make sure Lottery is deployed", async () => {
    lottery = await Lottery.deployed();
  });

  it("should send transaction", async function () {
    const sendTxn = lottery.sendTransaction({
      from: accounts[0],
      gas: "1000000",
    });
    return assert.isNotNull(sendTxn);
  });

  it("allows one account to enter", async () => {
    await lottery.enter().send({from: accounts[0], value: web3.utils.toWei("0.02","ether")});
  });
});
