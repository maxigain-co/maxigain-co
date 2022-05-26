const Token = artifacts.require('MaxiGain');

require('web3');

module.exports = async function (deployer) {
  // Token
  await deployer.deploy( Token );
};
