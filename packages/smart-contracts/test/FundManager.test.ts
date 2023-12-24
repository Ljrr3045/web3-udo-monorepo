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
        const [owner, keeperSystem, udoWallet, teacher, student, user1, user2] = await ethers.getSigners();

        const FundManager = await ethers.getContractFactory("FundManager");
        const fundManager = await FundManager.deploy(udoWallet, keeperSystem);

        return { fundManager, owner, keeperSystem, udoWallet, teacher, student, user1, user2 };
    }

    describe("Deployment of smart contract", async ()=> {
        it("FundManager should be deployed", async () => {
            const { fundManager } = await loadFixture(deployContract);

            expect(await fundManager.getAddress()).to.not.equals("");
            expect(await fundManager.getAddress()).to.be.properAddress;
        });
    });

    describe("Handle account process", async ()=> {
        it("Error: only owner can edit wallet address", async () => {
            const { fundManager, user1, teacher, student } = await loadFixture(deployContract);

            await expect(fundManager.connect(user1).addTeacherWallet(
                teacher.address
            )).to.be.revertedWithCustomError(fundManager, "OwnableUnauthorizedAccount");
            await expect(fundManager.connect(user1).addStudentWallet(
                student.address
            )).to.be.revertedWithCustomError(fundManager, "OwnableUnauthorizedAccount");

            await expect(fundManager.connect(user1).removeTeacherWallet(
                teacher.address
            )).to.be.revertedWithCustomError(fundManager, "OwnableUnauthorizedAccount");
            await expect(fundManager.connect(user1).removeStudentWallet(
                student.address
            )).to.be.revertedWithCustomError(fundManager, "OwnableUnauthorizedAccount");
        });

        it("Error: only owner can edit keeper system", async () => {
            const { fundManager, user1 } = await loadFixture(deployContract);

            await expect(fundManager.connect(user1).changeKeeperSystem(
                user1.address
            )).to.be.revertedWithCustomError(fundManager, "OwnableUnauthorizedAccount");
        });

        it("Owner should be able to add/remove teachers and students", async () => {
            const { fundManager, owner, teacher, student } = await loadFixture(deployContract);

            // Add teacher
            await fundManager.connect(owner).addTeacherWallet(teacher.address);
            await fundManager.connect(owner).addStudentWallet(student.address);

            expect(await fundManager.connect(owner).isTeacherWallet(teacher.address)).to.be.true;
            expect(await fundManager.connect(owner).isStudentWallet(student.address)).to.be.true;

            // Remove teacher
            await fundManager.connect(owner).removeTeacherWallet(teacher.address);
            await fundManager.connect(owner).removeStudentWallet(student.address);

            expect(await fundManager.connect(owner).isTeacherWallet(teacher.address)).to.be.false;
            expect(await fundManager.connect(owner).isStudentWallet(student.address)).to.be.false;
        });

        it("Owner should be able to change keeper system address", async () => {
            const { fundManager, owner, user1 } = await loadFixture(deployContract);

            await fundManager.connect(owner).changeKeeperSystem(user1.address);
            expect(await fundManager.connect(owner).keeperSystem()).to.be.equal(user1.address);
        });

        it("Error: Cannot add a teacher/student twice", async () => {
            const { fundManager, owner, teacher, student } = await loadFixture(deployContract);

            // Teacher
            await fundManager.connect(owner).addTeacherWallet(teacher.address);
            expect(await fundManager.connect(owner).isTeacherWallet(teacher.address)).to.be.true;

            await expect(fundManager.connect(owner).addTeacherWallet(
                teacher.address
            )).to.be.revertedWith("FundManager: The wallet is already registered");

            // Student
            await fundManager.connect(owner).addStudentWallet(student.address);
            expect(await fundManager.connect(owner).isStudentWallet(student.address)).to.be.true;

            await expect(fundManager.connect(owner).addStudentWallet(
                student.address
            )).to.be.revertedWith("FundManager: The wallet is already registered");
        });

        it("Error: Cannot remove a teacher/student twice", async () => {
            const { fundManager, owner, teacher, student } = await loadFixture(deployContract);

            // Teacher
            await fundManager.connect(owner).addTeacherWallet(teacher.address);
            expect(await fundManager.connect(owner).isTeacherWallet(teacher.address)).to.be.true;

            await fundManager.connect(owner).removeTeacherWallet(teacher.address);
            expect(await fundManager.connect(owner).isTeacherWallet(teacher.address)).to.be.false;

            await expect(fundManager.connect(owner).removeTeacherWallet(
                teacher.address
            )).to.be.revertedWith("FundManager: The wallet is not registered");

            // Student
            await fundManager.connect(owner).addStudentWallet(student.address);
            expect(await fundManager.connect(owner).isStudentWallet(student.address)).to.be.true;

            await fundManager.connect(owner).removeStudentWallet(student.address);
            expect(await fundManager.connect(owner).isStudentWallet(student.address)).to.be.false;

            await expect(fundManager.connect(owner).removeStudentWallet(
                student.address
            )).to.be.revertedWith("FundManager: The wallet is not registered");
        });

        it("Error: Cannot remove a teacher/student that does not exist", async () => {
            const { fundManager, owner, teacher, student } = await loadFixture(deployContract);

            await expect(fundManager.connect(owner).removeTeacherWallet(
                teacher.address
            )).to.be.revertedWith("FundManager: The wallet is not registered");

            await expect(fundManager.connect(owner).removeStudentWallet(
                student.address
            )).to.be.revertedWith("FundManager: The wallet is not registered");
        });

        it("Error: Cannot add the same address to two lists", async () => {
            const { fundManager, owner, teacher } = await loadFixture(deployContract);

            await fundManager.connect(owner).addTeacherWallet(teacher.address);
            expect(await fundManager.connect(owner).isTeacherWallet(teacher.address)).to.be.true;

            await expect(fundManager.connect(owner).addStudentWallet(
                teacher.address
            )).to.be.revertedWith("FundManager: The wallet is already registered");
        });

        it("Error: Cannot add/remove an invalid wallet", async () => {
            const { fundManager, owner, udoWallet, keeperSystem } = await loadFixture(deployContract);

            // add
            await expect(fundManager.connect(owner).addTeacherWallet(
                udoWallet.address
            )).to.be.revertedWith("FundManager: The wallet cannot be a invalid address");
            await expect(fundManager.connect(owner).addStudentWallet(
                owner.address
            )).to.be.revertedWith("FundManager: The wallet cannot be a invalid address");

            // remove
            await expect(fundManager.connect(owner).removeTeacherWallet(
                keeperSystem.address
            )).to.be.revertedWith("FundManager: The wallet cannot be a invalid address");
            await expect(fundManager.connect(owner).removeStudentWallet(
                await fundManager.getAddress()
            )).to.be.revertedWith("FundManager: The wallet cannot be a invalid address");
        });
    });


});
