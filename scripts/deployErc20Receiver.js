async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const Erc20Receive = await hre.ethers.getContractFactory("ReceiveERC20");

    const contract = await Erc20Receive.deploy();

    await contract.deployed();
    console.log("Token address:", contract.address);
  }

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});
  