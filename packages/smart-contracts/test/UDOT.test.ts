import { expect } from "chai";
import { ethers, network } from "hardhat";
import {
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("UDOT", function () {
    const deployContract= async () => {
        const [owner, user1, user2] = await ethers.getSigners();

        const UDOT = await ethers.getContractFactory("UDOT");
        const udot = await UDOT.deploy();

        await network.provider.send("hardhat_setBalance", [
            user1.address,
            ethers.encodeBytes32String("1000000000000000000000000"),
        ]);

        return { udot, owner, user1, user2 };
    }

    describe("Deployment of smart contract", function () {
        it("UDOT should be deployed", async () => {
            const { udot } = await loadFixture(deployContract);

            expect(await udot.getAddress()).to.not.equals("");
            expect(await udot.getAddress()).to.be.properAddress;
        });
    });

});
