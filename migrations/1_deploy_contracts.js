const Lottery = artifacts.require("Lottery");

module.exports = async function (deployer) {
  // Use deployer to state migration tasks.
  await deployer.deploy(Lottery);
};
