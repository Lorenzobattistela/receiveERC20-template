
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const Erc20 = await hre.ethers.getContractFactory("erc20Token");
    const erc20 = await Erc20.deploy();
    await erc20.deployed();

    await erc20.mint("payer address", ethers.BigNumber.from(10000));
    await erc20.approve("erc20receiveraddress", ethers.BigNumber.from(100000));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
