import {expect} from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { deployContract } from "../shared/fixtures";
import { makeSuite, TestEnv } from "./helpers/make-suite";
import { Greeter } from "../typechain";

let mainSnap: any;

export default async function suite() {
  makeSuite("Greeter", (testEnv: TestEnv) => {
    let deployer: SignerWithAddress;
    let users: SignerWithAddress[];

    let Greeter: Greeter;
    let snap: string;

    before(async () => {
        deployer = testEnv.deployer;
        users = testEnv.users;

        // Deploy a test Greeter
        Greeter = (await deployContract("Greeter", ["Hello!"], deployer)) as Greeter;

        mainSnap = await ethers.provider.send("evm_snapshot", []);
    });

    beforeEach(async () => {
        snap = await ethers.provider.send("evm_snapshot", []);
    });

    afterEach(async function () {
        await ethers.provider.send("evm_revert", [snap]);
    });

    describe("Greeting", async () => {
      it("Should return the new greeting once it's changed", async function () {
        expect(await Greeter.greet()).to.be.equal("Hello!");
    
        await Greeter.connect(users[0]).setGreeting("Hello, World!");
    
        expect(await Greeter.greet()).to.be.equal("Hello, World!");
      });
    });
});
};
