const Lottery = artifacts.require("Lottery");

module.exports = async function(_deployer) {
  // Use deployer to state migration tasks.
  await _deployer.deploy(Lottery);
};
