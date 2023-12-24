import { ethers } from "hardhat";

async function main() {
    const UDOT = await ethers.getContractFactory("UDOT");
    const udot = await UDOT.deploy();

    await udot.waitForDeployment();

    console.log("Contract deployed to:", await udot.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
