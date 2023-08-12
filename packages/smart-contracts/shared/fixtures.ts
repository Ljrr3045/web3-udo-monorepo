import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

export async function deployContract(name: string, args: any[], signer: SignerWithAddress) {
    const contractFactory = await ethers.getContractFactory(name);
    return await contractFactory.connect(signer).deploy(...args);
}
