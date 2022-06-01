const { assert } = require("chai")

const BN = web3.utils.BN;

const MaxiContract = artifacts.require("./MaxiGain.sol") 

require("chai")
  .use(require("chai-as-promised"))
  .should()

contract('MaxiContract', ([contractOwner, secondAddress, thirdAddress]) => {
  let MaxiGain

  // this would attach the deployed smart contract and its methods 
  // to the `MaxiGain` variable before all other tests are run
  before(async () => {
    MaxiGain = await MaxiContract.deployed()
  })

  // check if deployment goes smooth
  describe('deployment', () => {
    // check if the smart contract is deployed 
    // by checking the address of the smart contract
    it('deploys successfully', async () => {
      const address = await MaxiGain.address

      assert.notEqual(address, '')
      assert.notEqual(address, undefined)
      assert.notEqual(address, null)
      assert.notEqual(address, 0x0)
    })

    it('contract has a name', async () => {
      const name = await MaxiGain.name()
      assert.equal(name, 'MaxiGain')
    })

    it('contract has a symbol', async () => {
      const symbol = await MaxiGain.symbol()
      assert.equal(symbol, 'MXG08')
    })

    it('contract has decimals', async () => {
      const decimals = await MaxiGain.decimals()
      assert.equal(decimals, 18)
    })
  })

  describe('set swap and liquify enabled', () => {
    it('owner can call this function', async () => {
      
      await MaxiGain.setSwapAndLiquifyEnabled(true, { from: contractOwner }) 

      // I'm trying to get a read a global contract variable here, not sure
      // if this is the right way, though
      const state = await MaxiGain.swapAndLiquifyEnabled()
      assert.equal(state, true)
    })

    it('others cannot', async () => {
      await MaxiGain.setSwapAndLiquifyEnabled(true, { from: secondAddress })
        .should.be.rejected

      await MaxiGain.setSwapAndLiquifyEnabled(true, { from: thirdAddress })
        .should.be.rejected
    })

    // add test if proper events were emitted
  })

  describe('set buyback enabled', () => {
    it('owner can call this function', async () => {
      
      await MaxiGain.setBuyBackEnabled(true, { from: contractOwner }) 

      const state = await MaxiGain.buyBackEnabled()
      assert.equal(state, true)
    })

    it('others cannot', async () => {
      await MaxiGain.setBuyBackEnabled(true, { from: secondAddress })
        .should.be.rejected

      await MaxiGain.setBuyBackEnabled(true, { from: thirdAddress })
        .should.be.rejected
    })
    
    // add test if proper events were emitted
  })

  describe('prepare for presale', () => {
    it('owner can call this function', async () => {
      
      await MaxiGain.prepareForPreSale({ from: contractOwner }) 

      const swap = await MaxiGain.swapAndLiquifyEnabled()
      assert.equal(swap, false)
      
      const bb = await MaxiGain.buyBackEnabled()
      assert.equal(bb, false)

      // check if fees are off
      const fees = await MaxiGain.totalFees()
      assert.equal(fees, 0)
    })

    it('others cannot', async () => {
      await MaxiGain.prepareForPreSale(true, { from: secondAddress })
        .should.be.rejected

      await MaxiGain.prepareForPreSale(true, { from: thirdAddress })
        .should.be.rejected
    })
    
    // add test if proper events were emitted
  })

  describe('after presale', () => {
    it('owner can call this function', async () => {
      
      await MaxiGain.afterPreSale({ from: contractOwner }) 

      const swap = await MaxiGain.swapAndLiquifyEnabled()
      assert.equal(swap, true)
      
      const bb = await MaxiGain.buyBackEnabled()
      assert.equal(bb, true)

      // check if fees are on
      const fees = await MaxiGain.totalFees()
      //assert.operator(fees, '>', 0)
    })

    it('others cannot', async () => {
      await MaxiGain.afterPreSale(true, { from: secondAddress })
        .should.be.rejected

      await MaxiGain.afterPreSale(true, { from: thirdAddress })
        .should.be.rejected
    })
    
    // add test if proper events were emitted
  })
})
