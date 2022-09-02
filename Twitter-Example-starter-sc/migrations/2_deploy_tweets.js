const Tweets = artifacts.require("Tweets");

module.exports = function (deployer) {
  deployer.deploy(Tweets);
};
