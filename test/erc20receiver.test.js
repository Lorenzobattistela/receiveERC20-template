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
        this.contract = await deployErc20Receiver(this.erc20.address, 10 * 10**14);
    });
    it("should deploy contract with correct erc20 tkn address", async function() {
        const erc20Tkn = await this.contract.getErc20Token();
        expect(erc20Tkn.paytoken).to.equals(this.erc20.address)
        expect(erc20Tkn.cost).to.equals(100);
    });

    describe("testing payContract function", async function() {
        it("should pay the contract correctly", async function() {
            let deployer = await ethers.getSigners();
            tx = await this.contract.payContract();
        })
        
    })

});

