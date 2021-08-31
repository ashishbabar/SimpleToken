const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC20 SimpleToken test", function () {
  it("Should tranfer tokens from one account to another", async function () {
    const [signer1,signer2] = await ethers.getSigners();
    const name="Simple Token";
    const symbol="ST";
    const totalSupply = 1000;
    const transferAmount = 100;
    const TokenFactory = await ethers.getContractFactory("SimpleToken");
    const token = await TokenFactory.deploy(name,symbol,totalSupply);
    await token.deployed();
    // console.log("\t Deployed contract address",token.address);
    expect(await token.name()).to.equal(name);
    expect(await token.symbol()).to.equal(symbol);

    const balance = await token.balanceOf(signer1.address);
    const transferTransaction = await token.transfer(signer2.address, transferAmount);

    // wait until the transaction is mined
    await transferTransaction.wait();

    const signer1Balance = await token.balanceOf(signer1.address);
    const signer2Balance = await token.balanceOf(signer2.address);

    expect(signer2Balance).to.equal(transferAmount);
    expect(signer1Balance).to.equal(balance-transferAmount);
  });
});