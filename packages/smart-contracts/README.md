# Universidad de Oriente Token - UDOT

<div align="center">
    <img 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Logo_UDO.svg/1200px-Logo_UDO.svg.png"
        width="200"
    />
</div>


This project was created under the idea of designing a decentralized and autonomous payment system, with which it is sought to serve as an economic and financial refuge for the "Universidad de Oriente Token". The main mission of this project is to allow the university to manage its funds autonomously.

## Token characteristics

- Maximum supplement: 1.000.000 UDOT
- Used network: Mumbai testnet
- Contract address: 0x25dcD86B0948703b7Ced7BD531BE723e86daFCDF

### Use cases
The UDOT token is an ERC20 utility token. This can can be used as a digital currency. The main real uses that it could have are:

- Create reserve of university funds
- Currency to create funds for rewards or incentives for professors and teachers of the university
- Currency to create funds for rewards or incentives for outstanding students within the university.

### Notes

- UDOT will be a token which is backed by the native currency of the Polygon network (MATIC).
- The relationship between UDOT and MATIC will be 1:1, this means that each time a UDOT is created it will be backed in an equivalent way by a MATIC.
- As the relationship between UDON and MATIC is 1:1, every time a UDOT is burned, it will return the equivalent value in MATIC to the user.

## Technologies and protocols used

This project uses the following technologies and protocols:
* [Solidity](https://docs.soliditylang.org/en/v0.8.23/)
* [Typescript](https://www.typescriptlang.org/docs/)
* [Hardhat](https://hardhat.org/docs)
* [OpenZeppelin](https://docs.openzeppelin.com/)
* [Polygon](https://docs.polygon.technology/) 

## Documentation

The information on smart contracts can be found at the following link:
* [Documentation](https://github.com/Ljrr3045/udo-erc20-token/blob/master/docs/index.md)

You can verify the contract in the Mumbai testnet network at the following link:
* [Contract verified](https://mumbai.polygonscan.com/address/0x25dcD86B0948703b7Ced7BD531BE723e86daFCDF)

## Useful commands

```
# Compile contracts
npm run compile

# Run tests
npm run test

# Run Coverage
npm run coverage

# Run deploy on local network
npm run deploy:local

# Run deploy on testnet network
npm run deploy:testnet

# Generate documentation
npm run docgen
```
