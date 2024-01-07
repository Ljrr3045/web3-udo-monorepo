import { ethers } from "hardhat";

async function main() {
    const udoWallet = "0xb615f402D84258039467316506441b238F5bA778";
    const keeperSystem = "0xe11252624052043e95a31290fffc49f8801857b7";

    const FundManager = await ethers.getContractFactory("FundManager");
    const fundManager = await FundManager.deploy(udoWallet, keeperSystem);

    await fundManager.waitForDeployment();

    console.log("Contract deployed to:", await fundManager.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
