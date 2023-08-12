import { HardhatUserConfig } from "hardhat/config";
import "@openzeppelin/hardhat-upgrades";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "hardhat-contract-sizer";
import "hardhat-dependency-compiler";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "@nomiclabs/hardhat-web3";

require("hardhat-dependency-compiler");

import networks from "./hardhat.networks";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
        {
            version: "0.8.21",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 1000000,
                },
            },
        }
    ],
  },
  networks,
  namedAccounts: {
    deployer: 0,
    admin: 1,
    minter: 2,
    user: 3
  }
};

export default config;
