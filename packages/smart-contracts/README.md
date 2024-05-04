# Smart Contracts

In this section you can find everything related to the development of the smart contracts linked to the UDOT project.

## Token Characteristics

- Maximum Supplement: 1.000.000 UDOT
- Used Network: Polygon Mainnet
- Contract Address: 0x2969297cc328064D46e4D9FB6C632Daf4a927e59

### Use Cases

The UDOT token is an ERC20 utility token. This can can be used as a digital currency. The main real uses that it could have are:

- Create reserve of university funds
- Currency to create funds for rewards or incentives for professors and teachers of the university
- Currency to create funds for rewards or incentives for outstanding students within the university.

### Notes

- UDOT will be a token which is backed by the native currency of the Polygon network (MATIC).
- The relationship between UDOT and MATIC will be 1:1, this means that each time a UDOT is created it will be backed in an equivalent way by a MATIC.
- As the relationship between UDON and MATIC is 1:1, every time a UDOT is burned, it will return the equivalent value in MATIC to the user.

## Technologies & Protocols Used

This project uses the following technologies and protocols:
* [Solidity](https://docs.soliditylang.org/en/v0.8.23/)
* [Typescript](https://www.typescriptlang.org/docs/)
* [Hardhat](https://hardhat.org/docs)
* [OpenZeppelin](https://docs.openzeppelin.com/)
* [Polygon](https://docs.polygon.technology/) 

## Documentation

The information on smart contracts can be found at the following link:
* [Documentation](https://github.com/Ljrr3045/web3-udo-monorepo/blob/master/packages/smart-contracts/docs/index.md)

You can verify the contract in the Polygon Mainnet Scan at the following link:
* [Contract Verified](https://polygonscan.com/address/0x2969297cc328064D46e4D9FB6C632Daf4a927e59#code)

## Useful Commands

```
# Run Build
npm run compile

# Run Tests
npm run test

# Run Coverage
npm run coverage

# Run Deploy (Local Network)
npm run deploy:local

# Run Deploy (Mainnet Network)
npm run deploy:mainnet

# Verify Contract (Mainnet Network)
npm run verify:contract

# Run Generate Documentation
npm run docgen
```
