import {
    expect,
} from "chai";
import {
    ethers,
} from "hardhat";
import {
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("FundManager", function () {
    const deployContract = async ()=> {
        const [owner, keeperSystem, udoWallet, user1, user2] = await ethers.getSigners();

        const FundManager = await ethers.getContractFactory("FundManager");
        const fundManager = await FundManager.deploy(udoWallet, keeperSystem);

        return { fundManager, owner, keeperSystem, udoWallet, user1, user2 };
    }

    describe("Deployment of smart contract", async ()=> {
        it("FundManager should be deployed", async () => {
            const { fundManager } = await loadFixture(deployContract);

            expect(await fundManager.getAddress()).to.not.equals("");
            expect(await fundManager.getAddress()).to.be.properAddress;
        });
    });
});
