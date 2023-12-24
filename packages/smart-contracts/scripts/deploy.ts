import { ethers } from "hardhat";

async function main() {
    const udoWallet = "0xb615f402D84258039467316506441b238F5bA778";
    const keeperSystem = "0xF737eA896eE20c8c2Bf6be067462CD91Cc4424eE";

    const FundManager = await ethers.getContractFactory("FundManager");
    const fundManager = await FundManager.deploy(udoWallet, keeperSystem);

    await fundManager.waitForDeployment();

    console.log("Contract deployed to:", await fundManager.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
