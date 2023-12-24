//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

/**
    @title UDOT Contract
    @author ljrr3045
    @notice ERC20 contract to function as a utility token for the Univerdidad de Oriente.
    @dev Each minted token will be backed 1:1 by MATIC.
*/

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract UDOT is ERC20, Ownable, Pausable {

    uint32 public senderTax;
    uint32 public receiverTax;
    uint256 public cap;

//Mappings

    mapping(address => bool) public whitelisted;

//Events

    event UserWhiteList(address _user, bool _status);
    event ChangeSenderTax(uint256 _lastTax, uint256 _newTax);
    event ChangeReceiverTax(uint256 _lastTax, uint256 _newTax);
    event RescueStuckToken(address _token, uint256 _amount, uint256 _date);

//Constructor

    constructor()
        Ownable(msg.sender)
        ERC20("Universidad de Oriente Token", "UDOT")
    {
        whitelisted[address(this)] = true;

        senderTax = 500; // 5%
        receiverTax = 500; // 5%

        cap = 1000000 * (10**decimals());
    }

//Useful Functions

    /**
        @notice Allows the user to mine UDOT in exchange for MATIC, each UDOT will be backed 1:1 by MATIC
    */
    function mint() external payable {
        require(msg.value > 0, "UDOT: The amount must be greater than 0");
        require((ERC20.totalSupply() + msg.value) <= cap, "UDOT: Maximum capital exceeded");

        _mint(_msgSender(), msg.value);
    }

    /**
        @notice Allows the user to burn UDOT in exchange for MATIC. For each UDOT that is burned, the user will
        receive the same value in MATIC.
    */
    function burn(uint256 _amount) external {
        require(_amount > 0, "UDOT: The amount must be greater than 0");

        _burn(_msgSender(), _amount);

        (bool _success,) = payable(_msgSender()).call{ value: _amount }("");
        require(_success, "UDOT: Error returning funds");
    }

//Only Owner Functions

    ///@dev Owner can pause token transfer
    function pause() external onlyOwner {
        _pause();
    }

    ///@dev Owner can unpause token transfer
    function unpause() external onlyOwner {
        _unpause();
    }

    ///@dev The owner can add a user to the white list and thus not pay transfer taxes
    function whiteList(address _user, bool _isWhitelisted) external onlyOwner {
        require(address(0) != _user, "UDOT: User is zero address");

        whitelisted[_user] = _isWhitelisted;
        emit UserWhiteList(_user, _isWhitelisted);
    }

    ///@dev The owner can establish what the sender tax will be
    function setSenderTax(uint32 _taxPercent) external onlyOwner {
        require((_taxPercent > 0) && (_taxPercent < 1000), "UDOT: Taxes cannot be higher than 10%");

        emit ChangeSenderTax(senderTax, _taxPercent);
        senderTax = _taxPercent;
    }

    ///@dev The owner can establish what the receiver tax will be
    function setReceiverTax(uint32 _taxPercent) external onlyOwner {
        require((_taxPercent > 0) && (_taxPercent < 1000), "UDOT: Taxes cannot be higher than 10%");

        emit ChangeReceiverTax(receiverTax, _taxPercent);
        receiverTax = _taxPercent;
    }

    ///@dev The owner can recover tokens stuck in the contract (but not MATIC)
    function rescueStuckToken(address _token, address _to) external onlyOwner {
        require(_token != address(this), "UDOT: Cannot recover UDOT");

        uint256 _amount = ERC20(_token).balanceOf(address(this));
        ERC20(_token).transfer(_to, _amount);

        emit RescueStuckToken(_token, _amount, block.timestamp);
    }

//Override Functions

    ///@dev overwrite the transfer function to be able to take the taxes
    function _update(address from, address to, uint256 amount) internal override whenNotPaused{
        uint256 _fee;
        uint _finalAmount = amount;

        if (from == address(0) || to == address(0)){
            super._update(from, to, _finalAmount);
            return;
        }

        if ((!whitelisted[from]) && (senderTax > 0)) {
            _fee += (amount * senderTax)/10000;
            _finalAmount -= _fee;
        }

        if ((!whitelisted[to]) && (receiverTax > 0)) {
            _fee += (amount * receiverTax)/10000;
            _finalAmount -= _fee;
        }

        super._update(from, address(this), _fee);
        super._update(from, to, _finalAmount);
    }
}
