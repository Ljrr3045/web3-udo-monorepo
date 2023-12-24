//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.20;

/**
 * @title Fund Manager Contract
 * @author ljrr3045
 * @notice Contract in charge of managing all funds raised through the UDOT token.
*/
import "./UDOT.sol";

contract FundManager is UDOT {
    address public udoWallet;

//Arrays
    address[] public teachersWallets;
    address[] public studentsWallets;

//Events
    event AddTeacherWallet(address _wallet);
    event AddStudentWallet(address _wallet);
    event RemoveTeacherWallet(address _wallet);
    event RemoveStudentWallet(address _wallet);

//Modifiers
    modifier onlyUnregisteredWallets(address _wallet) {
        require(
            _wallet != address(0) &&
            _wallet != _msgSender() &&
            _wallet != address(this) &&
            _wallet != udoWallet
        , "FundManager: The wallet cannot be a invalid address");
        require(!whitelisted[_wallet], "FundManager: The wallet is already registered");
        _;
    }

    modifier onlyRegisteredWallets(address _wallet) {
        require(
            _wallet != address(0) &&
            _wallet != _msgSender() &&
            _wallet != address(this) &&
            _wallet != udoWallet
        , "FundManager: The wallet cannot be a invalid address");
        require(whitelisted[_wallet], "FundManager: The wallet is not registered");
        _;
    }

//Constructor
    constructor(address _udoWallet) UDOT() {
        whitelisted[_udoWallet] = true;
        udoWallet = _udoWallet;
    }

//OnlyOwner Functions
    /**
     * @notice Allows the owner to add a teacher wallet
     * @param _wallet The wallet to add
    */
    function addTeacherWallet(address _wallet) external onlyOwner onlyUnregisteredWallets(_wallet) {
        whitelisted[_wallet] = true;
        teachersWallets.push(_wallet);

        emit AddTeacherWallet(_wallet);
    }

    /**
     * @notice Allows the owner to add a student wallet
     * @param _wallet The wallet to add
    */
    function addStudentWallet(address _wallet) external onlyOwner onlyUnregisteredWallets(_wallet) {
        whitelisted[_wallet] = true;
        studentsWallets.push(_wallet);

        emit AddStudentWallet(_wallet);
    }

    /**
     * @notice Allows the owner to remove a teacher wallet
     * @param _wallet The wallet to remove
    */
    function removeTeacherWallet(address _wallet) external onlyOwner onlyRegisteredWallets(_wallet) {
        for (uint256 i = 0; i < teachersWallets.length; i++) {
            if (teachersWallets[i] == _wallet) {
                teachersWallets[i] = teachersWallets[teachersWallets.length - 1];
                whitelisted[_wallet] = false;
                teachersWallets.pop();
                break;
            }
        }

        emit RemoveTeacherWallet(_wallet);
    }

    /**
     * @notice Allows the owner to remove a student wallet
     * @param _wallet The wallet to remove
    */
    function removeStudentWallet(address _wallet) external onlyOwner onlyRegisteredWallets(_wallet) {
        for (uint256 i = 0; i < studentsWallets.length; i++) {
            if (studentsWallets[i] == _wallet) {
                studentsWallets[i] = studentsWallets[studentsWallets.length - 1];
                whitelisted[_wallet] = false;
                studentsWallets.pop();
                break;
            }
        }

        emit RemoveStudentWallet(_wallet);
    }

//View Functions
    /**
     * @notice Allows to get the teacher wallets
     * @return The teacher wallets
    */
    function getTeachersWallets() external view returns (address[] memory) {
        return teachersWallets;
    }

    /**
     * @notice Allows to get the student wallets
     * @return The student wallets
    */
    function getStudentsWallets() external view returns (address[] memory) {
        return studentsWallets;
    }

    /**
     * @notice Allows to get the total amount of teachers wallets
    */
    function getTeachersWalletsLength() external view returns (uint256) {
        return teachersWallets.length;
    }

    /**
     * @notice Allows to get the total amount of students wallets
    */
    function getStudentsWalletsLength() external view returns (uint256) {
        return studentsWallets.length;
    }

    /**
     * @notice Allows to verify is a wallet is a teacher wallet
     * @param _wallet The wallet to verify
    */
    function isTeacherWallet(address _wallet) external view returns (bool) {
        for (uint256 i = 0; i < teachersWallets.length; i++) {
            if (teachersWallets[i] == _wallet) {
                return true;
            }
        }

        return false;
    }

    /**
     * @notice Allows to verify is a wallet is a student wallet
     * @param _wallet The wallet to verify
    */
    function isStudentWallet(address _wallet) external view returns (bool) {
        for (uint256 i = 0; i < studentsWallets.length; i++) {
            if (studentsWallets[i] == _wallet) {
                return true;
            }
        }

        return false;
    }
}

