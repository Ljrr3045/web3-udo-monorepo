import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "solidity-docgen";

require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
        optimizer: {
          enabled: true,
          runs: 1000000,
        },
    },
  },
  networks: {
    hardhat: {
      forking: {
        url: process.env.POLYGON_MAINNET_URL ?? "",
        blockNumber: 51478507,
      }
    },
    polygonMainnet: {
      url: process.env.POLYGON_MAINNET_URL ?? "",
      accounts:{
        mnemonic: process.env.MNEMONIC ?? "",
      },
    },
  },
  etherscan: {
    apiKey: {
      polygon: process.env.POLYGONSCAN_API_KEY ?? "",
    }
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    token: "MATIC",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY ?? "",
  },
};

export default config;
