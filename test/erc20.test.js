const { expect } = require("chai");
const { ethers } = require("hardhat");

async function deployErc20() {
    const erc20 = await ethers.getContractFactory("erc20Token");
    const erc20Depl = await erc20.deploy();
    return erc20Depl;
}

describe("Testing erc20 contract", async function() {
    beforeEach(async function() {
        this.erc20 = await deployErc20(); 
        this.deployer = await ethers.getSigners();
    });
    describe("deploy minted tokens for the owner correctly", async function() {
        it("should mint tokens correctly", async function() {
            let balance = await this.erc20.balanceOf(this.deployer[0].address);
            expect(Number(balance) / 10**18).to.equal(1000000);
        });
    });
});