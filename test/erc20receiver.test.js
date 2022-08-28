const { expect } = require("chai");
const { ethers } = require("hardhat");

async function deployErc20Receiver(erc20Token, cost) {
    const Erc20Rcvr = await ethers.getContractFactory("ReceiveERC20");
    const erc20Rcvr = await Erc20Rcvr.deploy(erc20Token, ethers.BigNumber.from(cost));
    return erc20Rcvr;
}

async function deployErc20() {
    const erc20 = await ethers.getContractFactory("erc20Token");
    const erc20Depl = await erc20.deploy();
    return erc20Depl;
}

describe("testing erc20 receiver contract", async function() {
    beforeEach(async function() {
        this.erc20 = await deployErc20();
        this.contract = await deployErc20Receiver(this.erc20.address, 100);
    });
    it("should deploy contract with correct erc20 tkn address", async function() {
        const erc20Tkn = await this.contract.getErc20Token();
        expect(erc20Tkn.paytoken).to.equals(this.erc20.address)
        expect(erc20Tkn.cost).to.equals(100);
    });

    describe("testing payContract function", async function() {
       describe("contract is allowed", async function() {
            beforeEach(async function() {
                let depl = await ethers.getSigners();
                this.deployer = depl[0];
                await this.erc20.approve(this.contract.address, 1000000);
            });
            it("should pay the contract correctly", async function() {
                balanceBefore = await this.erc20.balanceOf(this.deployer.address);
                tx = await this.contract.payContract();
                balanceAfter = await this.erc20.balanceOf(this.deployer.address);
                expect(balanceAfter).to.be.below(balanceBefore);
            });
       });
       
       describe("contract is not allowed", async function() {
            it("should revert with insufficiente allowance", async function() {
                await expect(this.contract.payContract()).to.be.revertedWith("ERC20: insufficient allowance");
            });
       });
    });

    describe("testing withdraw", async function() {
        beforeEach(async function() {
            this.erc20 = await deployErc20();
            this.contract = await deployErc20Receiver(this.erc20.address, 100000);
            await this.erc20.approve(this.contract.address, 1000000);
            let depl = await ethers.getSigners();
            this.deployer = depl[0];
        });
        it("should withdraw erc20 correctly", async function() {
            let contractBalanceBeforePay = await this.erc20.balanceOf(this.contract.address);

            let tx = await this.contract.payContract();

            let contractBalanceAfterPaying = await this.erc20.balanceOf(this.contract.address);

            expect(contractBalanceBeforePay).to.equals(0);
            expect(contractBalanceAfterPaying).to.be.above(0);

            let deployerBalanceBefore = await this.erc20.balanceOf(this.deployer.address);

            await this.contract.withdraw();

            let deployerBalanceAfter= await this.erc20.balanceOf(this.deployer.address);

            expect(deployerBalanceBefore).to.be.below(deployerBalanceAfter);
        });
    });
});

