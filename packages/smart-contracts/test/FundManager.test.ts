import {
    expect,
} from "chai";
import {
    ethers,
} from "hardhat";
import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("FundManager", function () {
    const deployContract = async ()=> {
        const [owner, keeperSystem, udoWallet, teacher, student, user1, user2] = await ethers.getSigners();

        const nextVoteTime = (await time.latest()) + (31 * 86400);

        const FundManager = await ethers.getContractFactory("FundManager");
        const fundManager = await FundManager.deploy(udoWallet, keeperSystem);

        return { fundManager, owner, keeperSystem, udoWallet, teacher, student, user1, user2, nextVoteTime };
    }

    describe("Deployment of smart contract", async ()=> {
        it("FundManager should be deployed", async ()=> {
            const { fundManager } = await loadFixture(deployContract);

            expect(await fundManager.getAddress()).to.not.equals("");
            expect(await fundManager.getAddress()).to.be.properAddress;
        });
    });

    describe("Handle account process", async ()=> {
        it("Error: only owner can edit wallet address", async ()=> {
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

        it("Error: only owner can edit keeper system", async ()=> {
            const { fundManager, user1 } = await loadFixture(deployContract);

            await expect(fundManager.connect(user1).changeKeeperSystem(
                user1.address
            )).to.be.revertedWithCustomError(fundManager, "OwnableUnauthorizedAccount");
        });

        it("Owner should be able to add/remove teachers and students", async ()=> {
            const { fundManager, owner, teacher, student } = await loadFixture(deployContract);

            // Add
            await fundManager.connect(owner).addTeacherWallet(teacher.address);
            await fundManager.connect(owner).addStudentWallet(student.address);

            expect(await fundManager.connect(owner).isTeacherWallet(teacher.address)).to.be.true;
            expect(await fundManager.connect(owner).isStudentWallet(student.address)).to.be.true;
            expect(await fundManager.connect(owner).getTeachersWalletsLength()).to.equal(1);
            expect(await fundManager.connect(owner).getStudentsWalletsLength()).to.equal(1);

            // Remove
            await fundManager.connect(owner).removeTeacherWallet(teacher.address);
            await fundManager.connect(owner).removeStudentWallet(student.address);

            expect(await fundManager.connect(owner).isTeacherWallet(teacher.address)).to.be.false;
            expect(await fundManager.connect(owner).isStudentWallet(student.address)).to.be.false;
            expect(await fundManager.connect(owner).getTeachersWalletsLength()).to.equal(0);
            expect(await fundManager.connect(owner).getStudentsWalletsLength()).to.equal(0);
        });

        it("Owner should be able to change keeper system address", async ()=> {
            const { fundManager, owner, user1 } = await loadFixture(deployContract);

            await fundManager.connect(owner).changeKeeperSystem(user1.address);
            expect(await fundManager.connect(owner).keeperSystem()).to.be.equal(user1.address);
        });

        it("Error: Cannot add a teacher/student twice", async ()=> {
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

        it("Error: Cannot remove a teacher/student twice", async ()=> {
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

        it("Error: Cannot remove a teacher/student that does not exist", async ()=> {
            const { fundManager, owner, teacher, student } = await loadFixture(deployContract);

            await expect(fundManager.connect(owner).removeTeacherWallet(
                teacher.address
            )).to.be.revertedWith("FundManager: The wallet is not registered");

            await expect(fundManager.connect(owner).removeStudentWallet(
                student.address
            )).to.be.revertedWith("FundManager: The wallet is not registered");
        });

        it("Error: Cannot add the same address to two lists", async ()=> {
            const { fundManager, owner, teacher } = await loadFixture(deployContract);

            await fundManager.connect(owner).addTeacherWallet(teacher.address);
            expect(await fundManager.connect(owner).isTeacherWallet(teacher.address)).to.be.true;

            await expect(fundManager.connect(owner).addStudentWallet(
                teacher.address
            )).to.be.revertedWith("FundManager: The wallet is already registered");
        });

        it("Error: Cannot add/remove an invalid wallet", async ()=> {
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

    describe("Votes process", async ()=> {
        it("Error: Only keeper system can validate votes", async ()=> {
            const { fundManager, owner } = await loadFixture(deployContract);

            await expect(fundManager.connect(owner).votesValidation()).to.be.revertedWith("FundManager: Only the keeper system can call this function");
        });

        it("Error: Data can be updated only when vote date finish", async ()=> {
            const { fundManager, keeperSystem } = await loadFixture(deployContract);

            await expect(fundManager.connect(keeperSystem).votesValidation()).to.be.revertedWith("FundManager: The votes are not finished yet");
        });

        it("Error: Only UDOT holders can vote", async ()=> {
            const { fundManager, user1 } = await loadFixture(deployContract);

            await expect(fundManager.connect(user1).voteForDestination(
                1
            )).to.be.revertedWith("FundManager: Only UDOT holders can vote");
        });

        it("Users should vote", async ()=> {
            const { fundManager, owner, user1, user2 } = await loadFixture(deployContract);

            await fundManager.connect(user1).mint({ value: ethers.parseEther("500") });
            await fundManager.connect(user2).mint({ value: ethers.parseEther("500") });

            await fundManager.connect(user1).voteForDestination(1);
            await fundManager.connect(user2).voteForDestination(1);

            expect(await fundManager.connect(owner).votesForTeachers()).to.equal(2);
            expect(await fundManager.connect(owner).votesForStudents()).to.equal(0);
            expect(await fundManager.connect(owner).getDestinationWithMoreVotes()).to.equal(1);
            expect(await fundManager.connect(owner).getWalletsAlreadyVotedLength()).to.equal(2);
        });

        it("Error: Users cannot vote twice", async ()=> {
            const { fundManager, user1 } = await loadFixture(deployContract);

            await fundManager.connect(user1).mint({ value: ethers.parseEther("500") });

            await fundManager.connect(user1).voteForDestination(1);
            await expect(fundManager.connect(user1).voteForDestination(
                1
            )).to.be.revertedWith("FundManager: The wallet already voted");
        });

        it("The votes should finish to distribute the rewards", async ()=> {
            const { fundManager, owner, udoWallet, teacher, student, user1, user2, keeperSystem } = await loadFixture(deployContract);

            // Add
            await fundManager.connect(owner).addTeacherWallet(teacher.address);
            await fundManager.connect(owner).addStudentWallet(student.address);

            expect(await fundManager.connect(owner).isTeacherWallet(teacher.address)).to.be.true;
            expect(await fundManager.connect(owner).isStudentWallet(student.address)).to.be.true;
            expect(await fundManager.connect(owner).getTeachersWalletsLength()).to.equal(1);
            expect(await fundManager.connect(owner).getStudentsWalletsLength()).to.equal(1);

            // Vote
            await fundManager.connect(user1).mint({ value: ethers.parseEther("500") });
            await fundManager.connect(user2).mint({ value: ethers.parseEther("500") });

            await fundManager.connect(user1).voteForDestination(1);
            await fundManager.connect(user2).voteForDestination(1);

            expect(await fundManager.connect(owner).votesForTeachers()).to.equal(2);
            expect(await fundManager.connect(owner).votesForStudents()).to.equal(0);
            expect(await fundManager.connect(owner).getDestinationWithMoreVotes()).to.equal(1);
            expect(await fundManager.connect(owner).getWalletsAlreadyVotedLength()).to.equal(2);

            // Validate
            await expect(fundManager.connect(keeperSystem).votesValidation()).to.be.revertedWith("FundManager: The votes are not finished yet");

            expect(await fundManager.connect(owner).balanceOf(teacher.address)).to.equal(0);
            expect(await fundManager.connect(owner).balanceOf(student.address)).to.equal(0);
            expect(await fundManager.connect(owner).balanceOf(udoWallet.address)).to.equal(0);
        });

        it("Should distribute the rewards only if the reward amount is enough", async ()=> {
            const { fundManager, owner, udoWallet, teacher, student, user1, user2, keeperSystem, nextVoteTime } = await loadFixture(deployContract);

            // Add
            await fundManager.connect(owner).addTeacherWallet(teacher.address);
            await fundManager.connect(owner).addStudentWallet(student.address);

            expect(await fundManager.connect(owner).isTeacherWallet(teacher.address)).to.be.true;
            expect(await fundManager.connect(owner).isStudentWallet(student.address)).to.be.true;
            expect(await fundManager.connect(owner).getTeachersWalletsLength()).to.equal(1);
            expect(await fundManager.connect(owner).getStudentsWalletsLength()).to.equal(1);

            // Vote
            await fundManager.connect(user1).mint({ value: ethers.parseEther("500") });
            await fundManager.connect(user2).mint({ value: ethers.parseEther("500") });

            await fundManager.connect(user1).transfer(user2.address, ethers.parseEther("50"));

            await fundManager.connect(user1).voteForDestination(1);
            await fundManager.connect(user2).voteForDestination(1);

            expect(await fundManager.connect(owner).votesForTeachers()).to.equal(2);
            expect(await fundManager.connect(owner).votesForStudents()).to.equal(0);
            expect(await fundManager.connect(owner).getDestinationWithMoreVotes()).to.equal(1);
            expect(await fundManager.connect(owner).getWalletsAlreadyVotedLength()).to.equal(2);

            // Validate
            await time.increaseTo(nextVoteTime);
            await fundManager.connect(keeperSystem).votesValidation();

            expect(await fundManager.connect(owner).votesForTeachers()).to.equal(0);
            expect(await fundManager.connect(owner).votesForStudents()).to.equal(0);
            expect(await fundManager.connect(owner).votesForUniversity()).to.equal(0);
            expect(await fundManager.connect(owner).getDestinationWithMoreVotes()).to.equal(0);
            expect(await fundManager.connect(owner).getWalletsAlreadyVotedLength()).to.equal(0);

            expect(await fundManager.connect(owner).balanceOf(teacher.address)).to.equal(0);
            expect(await fundManager.connect(owner).balanceOf(student.address)).to.equal(0);
            expect(await fundManager.connect(owner).balanceOf(udoWallet.address)).to.equal(0);
        });

        it("Should distribute the rewards to teachers", async ()=> {
            const { fundManager, owner, udoWallet, teacher, student: teacher2, user1, user2, keeperSystem, nextVoteTime } = await loadFixture(deployContract);

            // Add
            await fundManager.connect(owner).addTeacherWallet(teacher.address);
            await fundManager.connect(owner).addTeacherWallet(teacher2.address);

            expect(await fundManager.connect(owner).isTeacherWallet(teacher.address)).to.be.true;
            expect(await fundManager.connect(owner).isTeacherWallet(teacher2.address)).to.be.true;
            expect(await fundManager.connect(owner).getTeachersWalletsLength()).to.equal(2);

            // Vote
            await fundManager.connect(user1).mint({ value: ethers.parseEther("500") });
            await fundManager.connect(user2).mint({ value: ethers.parseEther("500") });

            await fundManager.connect(user1).transfer(user2.address, ethers.parseEther("200"));

            await fundManager.connect(user1).voteForDestination(1);
            await fundManager.connect(user2).voteForDestination(1);

            expect(await fundManager.connect(owner).votesForTeachers()).to.equal(2);
            expect(await fundManager.connect(owner).votesForStudents()).to.equal(0);
            expect(await fundManager.connect(owner).getDestinationWithMoreVotes()).to.equal(1);
            expect(await fundManager.connect(owner).getWalletsAlreadyVotedLength()).to.equal(2);

            // Validate
            await time.increaseTo(nextVoteTime);
            await fundManager.connect(keeperSystem).votesValidation();

            expect(await fundManager.connect(owner).votesForTeachers()).to.equal(0);
            expect(await fundManager.connect(owner).votesForStudents()).to.equal(0);
            expect(await fundManager.connect(owner).votesForUniversity()).to.equal(0);
            expect(await fundManager.connect(owner).getDestinationWithMoreVotes()).to.equal(0);
            expect(await fundManager.connect(owner).getWalletsAlreadyVotedLength()).to.equal(0);

            expect(await fundManager.connect(owner).balanceOf(teacher.address)).to.equal(ethers.parseEther("10"));
            expect(await fundManager.connect(owner).balanceOf(teacher2.address)).to.equal(ethers.parseEther("10"));
            expect(await fundManager.connect(owner).balanceOf(udoWallet.address)).to.equal(0);
        });

        it("Should distribute the rewards to students", async ()=> {
            const { fundManager, owner, udoWallet, teacher: student2, student, user1, user2, keeperSystem, nextVoteTime } = await loadFixture(deployContract);

            // Add
            await fundManager.connect(owner).addStudentWallet(student.address);
            await fundManager.connect(owner).addStudentWallet(student2.address);

            expect(await fundManager.connect(owner).isStudentWallet(student.address)).to.be.true;
            expect(await fundManager.connect(owner).isStudentWallet(student2.address)).to.be.true;
            expect(await fundManager.connect(owner).getStudentsWalletsLength()).to.equal(2);

            // Vote
            await fundManager.connect(user1).mint({ value: ethers.parseEther("500") });
            await fundManager.connect(user2).mint({ value: ethers.parseEther("500") });

            await fundManager.connect(user1).transfer(user2.address, ethers.parseEther("200"));

            await fundManager.connect(user1).voteForDestination(2);
            await fundManager.connect(user2).voteForDestination(2);

            expect(await fundManager.connect(owner).votesForTeachers()).to.equal(0);
            expect(await fundManager.connect(owner).votesForStudents()).to.equal(2);
            expect(await fundManager.connect(owner).getDestinationWithMoreVotes()).to.equal(2);
            expect(await fundManager.connect(owner).getWalletsAlreadyVotedLength()).to.equal(2);

            // Validate
            await time.increaseTo(nextVoteTime);
            await fundManager.connect(keeperSystem).votesValidation();

            expect(await fundManager.connect(owner).votesForTeachers()).to.equal(0);
            expect(await fundManager.connect(owner).votesForStudents()).to.equal(0);
            expect(await fundManager.connect(owner).votesForUniversity()).to.equal(0);
            expect(await fundManager.connect(owner).getDestinationWithMoreVotes()).to.equal(0);
            expect(await fundManager.connect(owner).getWalletsAlreadyVotedLength()).to.equal(0);

            expect(await fundManager.connect(owner).balanceOf(student.address)).to.equal(ethers.parseEther("10"));
            expect(await fundManager.connect(owner).balanceOf(student2.address)).to.equal(ethers.parseEther("10"));
            expect(await fundManager.connect(owner).balanceOf(udoWallet.address)).to.equal(0);
        });

        it("Should distribute the rewards to university", async ()=> {
            const { fundManager, owner, udoWallet, teacher, student, user1, user2, keeperSystem, nextVoteTime } = await loadFixture(deployContract);

            // Add
            await fundManager.connect(owner).addStudentWallet(student.address);
            await fundManager.connect(owner).addTeacherWallet(teacher.address);

            expect(await fundManager.connect(owner).isStudentWallet(student.address)).to.be.true;
            expect(await fundManager.connect(owner).isTeacherWallet(teacher.address)).to.be.true;
            expect(await fundManager.connect(owner).getStudentsWalletsLength()).to.equal(1);
            expect(await fundManager.connect(owner).getTeachersWalletsLength()).to.equal(1);

            // Vote
            await fundManager.connect(user1).mint({ value: ethers.parseEther("500") });
            await fundManager.connect(user2).mint({ value: ethers.parseEther("500") });

            await fundManager.connect(user1).transfer(user2.address, ethers.parseEther("200"));

            await fundManager.connect(user1).voteForDestination(0);
            await fundManager.connect(user2).voteForDestination(0);

            expect(await fundManager.connect(owner).votesForTeachers()).to.equal(0);
            expect(await fundManager.connect(owner).votesForStudents()).to.equal(0);
            expect(await fundManager.connect(owner).votesForUniversity()).to.equal(2);
            expect(await fundManager.connect(owner).getDestinationWithMoreVotes()).to.equal(0);
            expect(await fundManager.connect(owner).getWalletsAlreadyVotedLength()).to.equal(2);

            // Validate
            await time.increaseTo(nextVoteTime);
            await fundManager.connect(keeperSystem).votesValidation();

            expect(await fundManager.connect(owner).votesForTeachers()).to.equal(0);
            expect(await fundManager.connect(owner).votesForStudents()).to.equal(0);
            expect(await fundManager.connect(owner).votesForUniversity()).to.equal(0);
            expect(await fundManager.connect(owner).getDestinationWithMoreVotes()).to.equal(0);
            expect(await fundManager.connect(owner).getWalletsAlreadyVotedLength()).to.equal(0);

            expect(await fundManager.connect(owner).balanceOf(student.address)).to.equal(0);
            expect(await fundManager.connect(owner).balanceOf(teacher.address)).to.equal(0);
            expect(await fundManager.connect(owner).balanceOf(udoWallet.address)).to.equal(ethers.parseEther("20"));
        });
    });
});
