import { expect, use } from "chai";
import { ethers } from "hardhat";
import { Contract } from 'ethers';
import { deployContract, MockProvider, solidity } from "ethereum-waffle";

use(solidity);

describe("MaxiGain basic tests", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("MaxiGain");
    let token = await Greeter.deploy();
    await token.deployed();
    expect(await token.name()).to.equal("MaxiGain");

    const setGreetingTx = await token.initWallets();

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await token.symbol()).to.equal("MXG08");

    expect(await token.setSwapAndLiquifyEnabled(true))
      .to.emit(token, "SwapAndLiquifyEnabledUpdated")
      .withArgs(true);
  });
});
