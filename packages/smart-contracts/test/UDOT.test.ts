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

    describe("Mint Process", async ()=> {

        it("Error: If the user does not support the minted with MATIC, do not mint", async ()=> {
            const { udot, user1 } = await loadFixture(deployContract);

            await expect(udot.connect(user1).mint()).to.be.revertedWith(
                "UDOT: The amount must be greater than 0"
            );
        });

        it("User should be able to mint", async ()=> {
            const { udot, user1 } = await loadFixture(deployContract);

            await udot.connect(user1).mint({ value: ethers.parseEther("500") });
            expect(await udot.connect(user1).balanceOf(user1.address)).to.equal(ethers.parseEther("500"));
            expect(await udot.connect(user1).totalSupply()).to.equal(ethers.parseEther("500"));
        });

        it("Each UDOT must be backed by a MATIC", async ()=> {
            const { udot, user1 } = await loadFixture(deployContract);

            await udot.connect(user1).mint({ value: ethers.parseEther("500") });
            expect(await ethers.provider.getBalance(await udot.getAddress())).to.equal(ethers.parseEther("500"));
            expect(await udot.connect(user1).totalSupply()).to.equal(ethers.parseEther("500"));
        });

        it("Error: Cannot minted more than the maximum capital", async ()=> {
            const { udot, user1 } = await loadFixture(deployContract);

            await expect(udot.connect(user1).mint(
                { value: ethers.parseEther("1000001") }
            )).to.be.revertedWith("UDOT: Maximum capital exceeded");
        });
    });

    describe("Burn Process", async ()=> {

        it("Error: A user without tokens cannot burn", async ()=> {
            const { udot, user1 } = await loadFixture(deployContract);

            await expect(udot.connect(user1).burn(
                ethers.parseEther("500")
            )).to.be.revertedWithCustomError(udot, "ERC20InsufficientBalance");
        });

        it("Error: Burn amount cannot be 0", async ()=> {
            const { udot, user1 } = await loadFixture(deployContract);

            await expect(udot.connect(user1).burn(
                0
            )).to.be.revertedWith("UDOT: The amount must be greater than 0");
        });

        it("User should burn and receive MATIC", async ()=> {
            const { udot, user1 } = await loadFixture(deployContract);

            await udot.connect(user1).mint({ value: ethers.parseEther("500") });
            expect(await udot.connect(user1).balanceOf(user1.address)).to.equal(ethers.parseEther("500"));

            await udot.connect(user1).burn(ethers.parseEther("500"));
            expect(await udot.connect(user1).balanceOf(user1.address)).to.equal(0);
        });

        it("The contract should not have MATIC and the supplement should be 0", async ()=> {
            const { udot, user1 } = await loadFixture(deployContract);

            await udot.connect(user1).mint({ value: ethers.parseEther("500") });
            expect(await udot.connect(user1).balanceOf(user1.address)).to.equal(ethers.parseEther("500"));

            await udot.connect(user1).burn(ethers.parseEther("500"));
            expect(await udot.connect(user1).balanceOf(user1.address)).to.equal(0);

            expect(await ethers.provider.getBalance(await udot.getAddress())).to.equal(0);
            expect(await udot.connect(user1).totalSupply()).to.equal(0);
        });
    });
});
