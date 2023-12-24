//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.20;

/**
 * @title ERC-20 Mock Contract
 * @notice ERC-20 contract for testing purposes.
*/
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Mock is ERC20 {
    constructor() ERC20("ERC-20 Mock", "ERC20Mock") {
        _mint(msg.sender, 1000000 * (10**decimals()));
    }
}
