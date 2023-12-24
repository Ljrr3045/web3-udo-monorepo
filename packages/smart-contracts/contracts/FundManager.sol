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
    address public keeperSystem;

    uint32 public votesForUniversity;
    uint32 public votesForTeachers;
    uint32 public votesForStudents;

    uint32 public constant VOTES_DURATION = 30 days;
    uint256 public constant MINIMUM_AMOUNT_TO_VOTE = 1 * (10**18);
    uint256 public constant MINIMUM_AMOUNT_TO_DISTRIBUTE = 10 * (10**18);
    uint256 public votesInit;

// enums
    enum FundsDestination {
        University,
        Teachers,
        Students
    }

    FundsDestination public lastFundsDestination;

//Arrays & Mappings
    address[] public teachersWallets;
    address[] public studentsWallets;

    mapping(address => bool) public isWalletAlreadyVoted;

//Events
    event AddTeacherWallet(address _wallet);
    event AddStudentWallet(address _wallet);
    event RemoveTeacherWallet(address _wallet);
    event RemoveStudentWallet(address _wallet);
    event ChangeKeeperSystem(address _newKeeperSystem, address _oldKeeperSystem);

//Modifiers
    modifier onlyUnregisteredWallets(address _wallet) {
        require(
            _wallet != address(0) &&
            _wallet != _msgSender() &&
            _wallet != address(this) &&
            _wallet != udoWallet &&
            _wallet != keeperSystem
        , "FundManager: The wallet cannot be a invalid address");
        require(!whitelisted[_wallet], "FundManager: The wallet is already registered");
        _;
    }

    modifier onlyRegisteredWallets(address _wallet) {
        require(
            _wallet != address(0) &&
            _wallet != _msgSender() &&
            _wallet != address(this) &&
            _wallet != udoWallet &&
            _wallet != keeperSystem
        , "FundManager: The wallet cannot be a invalid address");
        require(whitelisted[_wallet], "FundManager: The wallet is not registered");
        _;
    }

    modifier beforeVote() {
        require(!isWalletAlreadyVoted[_msgSender()], "FundManager: The wallet already voted");
        require(balanceOf(_msgSender()) >= MINIMUM_AMOUNT_TO_VOTE, "FundManager: The wallet is not UDOT holder");
        _;
    }

    modifier onlyKeeperSystem() {
        require(_msgSender() == keeperSystem, "FundManager: Only the keeper system can call this function");
        _;
    }

//Constructor
    constructor(address _udoWallet, address _keeperSystem) UDOT() {
        require(_udoWallet != address(0), "FundManager: The UDOT wallet cannot be a invalid address");

        whitelisted[_udoWallet] = true;
        udoWallet = _udoWallet;

        whitelisted[_keeperSystem] = true;
        keeperSystem = _keeperSystem;

        votesInit = block.timestamp;
    }

//Votes Functions
    /**
     * @notice Allows to vote for a destination of the funds
     * @param _destination The destination of the funds
    */
    function voteForDestination(FundsDestination _destination) external beforeVote {
        if (_destination == FundsDestination.University) {
            votesForUniversity++;
        } else if (_destination == FundsDestination.Teachers) {
            votesForTeachers++;
        } else if (_destination == FundsDestination.Students) {
            votesForStudents++;
        }

        isWalletAlreadyVoted[_msgSender()] = true;
    }

    /**
     * @notice Allows to get the destination with more votes
    */
    function getDestinationWithMoreVotes() external view returns (FundsDestination) {
        return _getDestinationWithMoreVotes();
    }

//Keeper Functions
    /**
     * @notice Allows the keeper system to update data of the contract and reset the votes
    */
    function updateData() external onlyKeeperSystem {
        require(block.timestamp >= votesInit + VOTES_DURATION, "FundManager: The votes are not finished yet");

        lastFundsDestination = _getDestinationWithMoreVotes();

        if (_getTotalFundsRaised() >= MINIMUM_AMOUNT_TO_DISTRIBUTE) {
            _distributeRewards(_getTotalFundsRaised(), lastFundsDestination);
        }

        votesForUniversity = 0;
        votesForTeachers = 0;
        votesForStudents = 0;
        votesInit = block.timestamp;
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

    /**
     * @notice Allows the owner to change the keeper system
     * @param _newKeeperSystem The new keeper system
    */
    function changeKeeperSystem(address _newKeeperSystem) external onlyOwner {
        require(_newKeeperSystem != address(0), "FundManager: The keeper system cannot be a invalid address");

        emit ChangeKeeperSystem(_newKeeperSystem, keeperSystem);
        keeperSystem = _newKeeperSystem;
    }

//View Functions
    /**
     * @notice Allows to get the total amount of funds raised
    */
    function getTotalFundsRaised() external view returns (uint256) {
        return _getTotalFundsRaised();
    }

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

//Internal Functions
    function _getTotalFundsRaised() internal view returns (uint256) {
        return balanceOf(address(this));
    }

    function _getDestinationWithMoreVotes() internal view returns (FundsDestination) {
        if (votesForUniversity > votesForTeachers && votesForUniversity > votesForStudents) {
            return FundsDestination.University;
        } else if (votesForTeachers > votesForUniversity && votesForTeachers > votesForStudents) {
            return FundsDestination.Teachers;
        } else if (votesForStudents > votesForUniversity && votesForStudents > votesForTeachers) {
            return FundsDestination.Students;
        } else {
            return FundsDestination.University;
        }
    }

    function _distributeRewards(uint256 _totalFundsRaised, FundsDestination _fundsDestination) internal {
        if (_fundsDestination == FundsDestination.Teachers) {
            uint256 _totalTeachersWallets = teachersWallets.length;
            uint256 _amountToDistribute = _totalFundsRaised / _totalTeachersWallets;

            for (uint256 i = 0; i < _totalTeachersWallets; i++) {
                super._update(address(this), teachersWallets[i], _amountToDistribute);
            }
        } else if (_fundsDestination == FundsDestination.Students) {
            uint256 _totalStudentsWallets = studentsWallets.length;
            uint256 _amountToDistribute = _totalFundsRaised / _totalStudentsWallets;

            for (uint256 i = 0; i < _totalStudentsWallets; i++) {
                super._update(address(this), studentsWallets[i], _amountToDistribute);
            }
        } else {
            super._update(address(this), udoWallet, _totalFundsRaised);
        }
    }
}

