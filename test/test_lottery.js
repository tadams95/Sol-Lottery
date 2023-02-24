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

  before(async () => {
    lottery = await Lottery.deployed();
  });
  it("allows one account to enter", async () => {
    const lotteryInstance = await Lottery.deployed();
    var new_player = accounts[1];
    await lotteryInstance.enter({
      from: new_player,
      value: "20000000000000000",
    });
    var player = await lottery.players.call("0");

    assert.equal(player, new_player, "new player is not in the contract");
  });
  it("should send transaction", async function () {
    const sendTxn = lottery.sendTransaction({
      from: accounts[0],
      gas: "1000000",
    });
    return assert.isNotNull(sendTxn);
  });
});
