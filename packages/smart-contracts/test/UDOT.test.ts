import {
    expect
} from "chai";
import {
    ethers,
    network
} from "hardhat";
import {
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("UDOT", function () {
    const deployContract= async () => {
        const [owner, user1, user2] = await ethers.getSigners();

        const UDOT = await ethers.getContractFactory("UDOT");
        const udot = await UDOT.deploy();

        const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
        const erc20Mock = await ERC20Mock.deploy();

        await network.provider.send("hardhat_setBalance", [
            user1.address,
            ethers.encodeBytes32String("1000000000000000000000000"),
        ]);

        return { udot, erc20Mock, owner, user1, user2 };
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

    describe("Transfer Process", async ()=> {
        it("Fee Wallet should receive transaction taxes", async ()=> {
            const { udot, owner, user1, user2 } = await loadFixture(deployContract);

            await udot.connect(user1).mint({ value: ethers.parseEther("500") });
            await udot.connect(user1).transfer(user2.address, ethers.parseEther("200"));

            expect(await udot.connect(owner).balanceOf(await udot.getAddress())).to.equal(ethers.parseEther("20"));
        });

        it("If the contract is paused, transfers cannot be made", async ()=> {
            const { udot, owner, user1, user2 } = await loadFixture(deployContract);

            await udot.connect(owner).pause();
            await expect(udot.connect(user1).transfer(
                user2.address,
                ethers.parseEther("100"))
            ).to.be.revertedWithCustomError(udot, "EnforcedPause");
        });
    });

    describe("Rescue locked tokens", async ()=> {
        it("Error: Cannot recover UDOT token", async ()=> {
            const { udot, owner, user1 } = await loadFixture(deployContract);

            await udot.connect(user1).mint({ value: ethers.parseEther("500") });
            await udot.connect(user1).transfer(await udot.getAddress(), ethers.parseEther("200"));
            expect(await udot.connect(owner).balanceOf(await udot.getAddress())).to.equal(ethers.parseEther("200"));

            await expect(udot.connect(owner).rescueStuckToken(
                await udot.getAddress(),
                owner.address
            )).to.be.revertedWith("UDOT: Cannot recover UDOT");
        });

        it("If the contract is paused, transfers cannot be made", async ()=> {
            const { udot, erc20Mock, owner, user1 } = await loadFixture(deployContract);

            await erc20Mock.connect(owner).transfer(await udot.getAddress(), ethers.parseEther("500"));
            expect(await erc20Mock.connect(owner).balanceOf(await udot.getAddress())).to.equal(ethers.parseEther("500"));

            await udot.connect(owner).rescueStuckToken(await erc20Mock.getAddress(), user1.address);
            expect(await erc20Mock.connect(owner).balanceOf(await udot.getAddress())).to.equal(0);
            expect(await erc20Mock.connect(owner).balanceOf(user1.address)).to.equal(ethers.parseEther("500"));
        });
    });

    describe("Only Owner Access", async ()=> {
        it("Error: only the owner can access certain functions", async ()=> {
            const { udot, owner, user1 } = await loadFixture(deployContract);

            await expect(udot.connect(user1).pause(
            )).to.be.revertedWithCustomError(udot, "OwnableUnauthorizedAccount");

            await expect(udot.connect(user1).unpause(
            )).to.be.revertedWithCustomError(udot, "OwnableUnauthorizedAccount");

            await expect(udot.connect(user1).setSenderTax(
                300
            )).to.be.revertedWithCustomError(udot, "OwnableUnauthorizedAccount");

            await expect(udot.connect(user1).setReceiverTax(
                300
            )).to.be.revertedWithCustomError(udot, "OwnableUnauthorizedAccount");

            await expect(udot.connect(user1).rescueStuckToken(
                owner.address,
                user1.address
            )).to.be.revertedWithCustomError(udot, "OwnableUnauthorizedAccount");
        });

        it("Valid data must be provided", async ()=> {
            const { udot, owner } = await loadFixture(deployContract);

            await expect(udot.connect(owner).setSenderTax(
                3000
            )).to.be.revertedWith("UDOT: Taxes cannot be higher than 10%");

            await expect(udot.connect(owner).setReceiverTax(
                3000
            )).to.be.revertedWith("UDOT: Taxes cannot be higher than 10%");
        });

        it("Owner must be able to change data", async ()=> {
            const { udot, owner } = await loadFixture(deployContract);

            await udot.connect(owner).setSenderTax(700);
            await udot.connect(owner).setReceiverTax(700);

            expect(await udot.connect(owner).senderTax()).to.equal(700);
            expect(await udot.connect(owner).receiverTax()).to.equal(700);
        });
    });
});
