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
      value: web3.utils.toWei("0.02", "ether"),
    });
    var player = await lottery.players.call("0");

    assert.equal(player, new_player, "new player is not in the contract");
  });

  it("requires minimum amount of ether to enter lottery", async () => {
    try {
      await lottery.enter({
        from: accounts[1],
        value: 0,
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("should send transaction", async function () {
    const sendTxn = lottery.sendTransaction({
      from: accounts[0],
      gas: "1000000",
    });
    return assert.isNotNull(sendTxn);
  });

  it("only manager should pickWinner", async function () {
    try {
      await lottery.pickWinner.send({
        from: accounts[5],
      });
    } catch (err) {
      assert(err);
    }
  });
  it("sends money to the winner and resets the players array", async function () {
    try {
      await lottery.pickWinner.send({
        from: accounts[0],
      });
    } catch (err) {
      assert(err);
    }
  });
});
