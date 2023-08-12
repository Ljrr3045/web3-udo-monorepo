import { ethers, deployments } from "hardhat";
import { BigNumber, Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

require("colors");

//
// Parse to
//

export function bigNumberify(n: number) {
    return ethers.BigNumber.from(n);
}

export function fromBigNumber(bn: BigNumber) {
    return bn.toNumber();
}

export function numberToBytes(data: number, value: number) {
    return ethers.utils.hexZeroPad(ethers.utils.hexlify(data), value);
}

export function toBytes32(data: string) {
    return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(data));
}

export function keccak256(data: string) {
    return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(data));
}

export function fromBytes32(data: string) {
    return ethers.utils.parseBytes32String(data);
}

export function encode(func: string, name: string, args: any[]) {
    let ABI = [func];
    let abi = new ethers.utils.Interface(ABI);
    return abi.encodeFunctionData(name, args);
}

//
// Block utils
//

export async function latestTime() {
    return (await ethers.provider.getBlock("latest")).timestamp;
}

export async function calculateAverageBlockTime() {
    const blockTimes = [];
    const blockNumber = await ethers.provider.getBlockNumber();

    for (let i = blockNumber - 5; i < blockNumber; i++) {
        const block = await ethers.provider.getBlock(i);
        const oldBlock = await ethers.provider.getBlock(i - 1);
        blockTimes.push(block.timestamp - oldBlock.timestamp);
    }
    const average = blockTimes.reduce((a, b) => a + b, 0) / blockTimes.length;
    return average;
}

export async function getFutureTimeStamp(seconds: number) {
    const currentTime = await latestTime();
    const futureTime = currentTime + seconds;
    return futureTime;
}


//
// Signature
//

export async function getSignature(eid: BigNumber, sid: number, attendee: string, eventSigner: SignerWithAddress) {
    const abi = ethers.utils.defaultAbiCoder;
    const data = abi.encode(["uint256", "uint8", "address"], [eid, sid, attendee]);

    const messageHash = ethers.utils.keccak256(data);

    const messageHashBytes = ethers.utils.arrayify(messageHash);
    // Sign the binary data
    const flatSig = await eventSigner.signMessage(messageHashBytes);
    // For Solidity, we need the expanded-format of a
    const sig = ethers.utils.splitSignature(flatSig);
    return {flatSig, sig};
}


//
// JSON handler
//

export function JSONfromBase64(base64: string) {
    return JSON.parse(Buffer.from(base64, "base64").toString());
}

export function readJSON(file: string): any {
    const fs = require("fs");
    return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function writeJSON(file: string, data: any) {
    const fs = require("fs");
    fs.writeFileSync(file, JSON.stringify(data));
}


//
// Utilities
//

export const chainName = (chainId: number) => {
    switch (chainId) {
        case 5:
            return "Goerli";
        case 31337:
            return "HardhatEVM";
        case 80001:
            return "Mumbai";
        default:
            return "Unknown";
    }
};

export async function getContract(contractName: string): Promise<Contract> {
    await deployments.fixture([contractName]);

    const myContract = await deployments.get(contractName);

    return await ethers.getContractAt(myContract.abi, myContract.address);
}

export const displayResult = (name: string, result: any) => {
    if (!result.newlyDeployed) {
        console.log(`Re-used existing ${name} at ${result.address}`);
    } else {
        console.log(`${name} deployed at ${result.address}`);
    }
};

export const isLocalEnvironment = (chainId: number) => chainId === 31337 || chainId === 1337;

export function randomNumber(min: number, max: number, evenOnly: boolean) {
    let nb = Math.round(Math.random() * (max - min) + min);
    if (evenOnly) {
        if (nb % 2 === 1) {
            nb = nb + 1;
        }
    }
    return nb;
}