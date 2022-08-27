async function main() {
    const contract = await getContract('contract here')

    let tx = await contract.payContract();
    console.log(tx)
    console.log(await tx.wait());
}

main().catch((error) => {
console.error(error);
process.exitCode = 1;
});
  

async function getContract(contractAddress) {
    const [signer] = await ethers.getSigners()
    const receiverABI = (await ethers.getContractFactory('ReceiveERC20')).interface
    return await new ethers.Contract(contractAddress, receiverABI, signer);
}
