const networks: any = {
    localhost: {
        chainId: 31337,
        url: "http://127.0.0.1:8545",
        allowUnlimitedContractSize: true,
        timeout: 1000 * 60,
    },
    hardhat: {
        live: false,
        forking: {
            url: `https://eth.llamarpc.com`,
            blockNumber: 17790973
        },
        allowUnlimitedContractSize: true,
        tags: ["test", "local"],
    },
    polygon: {
        url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
        chainId: 137,
        accounts: {mnemonic: process.env.MNEMONIC ? process.env.MNEMONIC : ""},
    },
    mumbai_dev: {
        live: true,
        chainId: 80001,
        url: process.env.ALCHMEMY_KEY ?
            `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
            : "https://rpc.ankr.com/polygon_mumbai",
        accounts: {
            mnemonic: process.env.MNEMONIC ? process.env.MNEMONIC : "",
        },
        allowUnlimitedContractSize: false,
        timeout: 1000 * 60,
        tags: ["testnet"],
    },
    mumbai_stage: {
        live: true,
        chainId: 80001,
        url: process.env.ALCHMEMY_KEY ? 
            `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
            : "https://rpc.ankr.com/polygon_mumbai",
        accounts: {
            mnemonic: process.env.MNEMONIC ? process.env.MNEMONIC : "",
        },
        allowUnlimitedContractSize: false,
        timeout: 1000 * 60,
        tags: ["testnet"],
    },
    goerli_dev: {
        live: true,
        chainId: 5,
        url: process.env.GOERLI_ALCHEMY_KEY
            ? `https://eth-goerli.g.alchemy.com/v2/${process.env.GOERLI_ALCHEMY_KEY}`
            : `https://goerli.infura.io/v3/${process.env.GOERLI_INFURA_KEY}`,
        accounts: {
            mnemonic: process.env.MNEMONIC ? process.env.MNEMONIC : "",
        },
        allowUnlimitedContractSize: false,
        timeout: 1000 * 60,
        tags: ["eth-testnet"],
    },
    goerli_stage: {
        live: true,
        chainId: 5,
        url: process.env.GOERLI_ALCHEMY_KEY
            ? `https://eth-goerli.g.alchemy.com/v2/${process.env.GOERLI_ALCHEMY_KEY}`
            : `https://goerli.infura.io/v3/${process.env.GOERLI_INFURA_KEY}`,
        accounts: {
            mnemonic: process.env.MNEMONIC ? process.env.MNEMONIC : "",
        },
        allowUnlimitedContractSize: false,
        timeout: 1000 * 60,
        tags: ["eth-testnet"],
    },
    fuji_dev: {
        live: true,
        chainId: 43113,
        url: "https://api.avax-test.network/ext/bc/C/rpc",
        accounts: {
            mnemonic: process.env.MNEMONIC ? process.env.MNEMONIC : "",
        },
        allowUnlimitedContractSize: false,
        timeout: 1000 * 60,
        tags: ["avax-testnet"],
    },
    fuji_stage: {
        live: true,
        chainId: 43113,
        url: "https://api.avax-test.network/ext/bc/C/rpc",
        accounts: {
            mnemonic: process.env.MNEMONIC ? process.env.MNEMONIC : "",
        },
        allowUnlimitedContractSize: false,
        timeout: 1000 * 60,
        tags: ["avax-testnet"],
    },
    bscTest_dev: {
        live: true,
        chainId: 97,
        url: "https://data-seed-prebsc-1-s1.binance.org:8545",
        accounts: {
            mnemonic: process.env.MNEMONIC ? process.env.MNEMONIC : "",
        },
        allowUnlimitedContractSize: false,
        timeout: 1000 * 60,
    },
    bscTest_stage: {
        live: true,
        chainId: 97,
        url: "https://data-seed-prebsc-1-s1.binance.org:8545",
        accounts: {
            mnemonic: process.env.MNEMONIC ? process.env.MNEMONIC : "",
        },
        allowUnlimitedContractSize: false,
        timeout: 1000 * 60,
    },
    arbitrumGoerli_dev: {
        live: true,
        chainId: 421613,
        url: "https://arbitrum-goerli.public.blastapi.io",
        accounts: {
            mnemonic: process.env.MNEMONIC ? process.env.MNEMONIC : "",
        },
        allowUnlimitedContractSize: false,
        timeout: 1000 * 60,
    },
    arbitrumGoerli_stage: {
        live: true,
        chainId: 421613,
        url: "https://arbitrum-goerli.public.blastapi.io",
        accounts: {
            mnemonic: process.env.MNEMONIC ? process.env.MNEMONIC : "",
        },
        allowUnlimitedContractSize: false,
        timeout: 1000 * 60,
    },
    tenderly: {
        url: process.env.TENDERLY_RPC ? process.env.TENDERLY_RPC : "",
    },
};

export default networks;
