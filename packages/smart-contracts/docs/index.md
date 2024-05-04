## FundManager

### udoWallet

```solidity
address udoWallet
```

### keeperSystem

```solidity
address keeperSystem
```

### votesForUniversity

```solidity
uint32 votesForUniversity
```

### votesForTeachers

```solidity
uint32 votesForTeachers
```

### votesForStudents

```solidity
uint32 votesForStudents
```

### VOTES_DURATION

```solidity
uint32 VOTES_DURATION
```

### MINIMUM_AMOUNT_TO_VOTE

```solidity
uint256 MINIMUM_AMOUNT_TO_VOTE
```

### MINIMUM_AMOUNT_TO_DISTRIBUTE

```solidity
uint256 MINIMUM_AMOUNT_TO_DISTRIBUTE
```

### votesInit

```solidity
uint256 votesInit
```

### FundsDestination

```solidity
enum FundsDestination {
  University,
  Teachers,
  Students
}
```

### lastFundsDestination

```solidity
enum FundManager.FundsDestination lastFundsDestination
```

### teachersWallets

```solidity
address[] teachersWallets
```

### studentsWallets

```solidity
address[] studentsWallets
```

### walletsAlreadyVoted

```solidity
address[] walletsAlreadyVoted
```

### AddTeacherWallet

```solidity
event AddTeacherWallet(address _wallet)
```

### AddStudentWallet

```solidity
event AddStudentWallet(address _wallet)
```

### RemoveTeacherWallet

```solidity
event RemoveTeacherWallet(address _wallet)
```

### RemoveStudentWallet

```solidity
event RemoveStudentWallet(address _wallet)
```

### ChangeKeeperSystem

```solidity
event ChangeKeeperSystem(address _newKeeperSystem, address _oldKeeperSystem)
```

### VoteForDestination

```solidity
event VoteForDestination(address _wallet, enum FundManager.FundsDestination _destination, uint256 _date)
```

### DistributeReward

```solidity
event DistributeReward(enum FundManager.FundsDestination _destination, uint256 _amountDistributed, uint256 _date)
```

### VotesValidation

```solidity
event VotesValidation(uint256 _votesForUniversity, uint256 _votesForTeachers, uint256 _votesForStudents, uint256 _resetDate, bool _isDistributed)
```

### onlyUnregisteredWallets

```solidity
modifier onlyUnregisteredWallets(address _wallet)
```

### onlyRegisteredWallets

```solidity
modifier onlyRegisteredWallets(address _wallet)
```

### beforeVote

```solidity
modifier beforeVote()
```

### onlyKeeperSystem

```solidity
modifier onlyKeeperSystem()
```

### isVotesEnded

```solidity
modifier isVotesEnded()
```

### constructor

```solidity
constructor(address _udoWallet, address _keeperSystem) public
```

### voteForDestination

```solidity
function voteForDestination(enum FundManager.FundsDestination _destination) external
```

Allows to vote for a destination of the funds

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _destination | enum FundManager.FundsDestination | The destination of the funds |

### getDestinationWithMoreVotes

```solidity
function getDestinationWithMoreVotes() external view returns (enum FundManager.FundsDestination)
```

Allows to get the destination with more votes

### checker

```solidity
function checker() external view returns (bool canExec, bytes memory execPayload)
```

Allows the keeper system to check if the contract can execute the votesValidation function.

### votesValidation

```solidity
function votesValidation() external
```

Allows the keeper system to update data of the contract, distribute rewards and reset the votes.

### addTeacherWallet

```solidity
function addTeacherWallet(address _wallet) external
```

Allows the owner to add a teacher wallet

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _wallet | address | The wallet to add |

### addStudentWallet

```solidity
function addStudentWallet(address _wallet) external
```

Allows the owner to add a student wallet

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _wallet | address | The wallet to add |

### removeTeacherWallet

```solidity
function removeTeacherWallet(address _wallet) external
```

Allows the owner to remove a teacher wallet

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _wallet | address | The wallet to remove |

### removeStudentWallet

```solidity
function removeStudentWallet(address _wallet) external
```

Allows the owner to remove a student wallet

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _wallet | address | The wallet to remove |

### changeKeeperSystem

```solidity
function changeKeeperSystem(address _newKeeperSystem) external
```

Allows the owner to change the keeper system

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _newKeeperSystem | address | The new keeper system |

### getTotalFundsRaised

```solidity
function getTotalFundsRaised() external view returns (uint256)
```

Allows to get the total amount of funds raised

### getTeachersWallets

```solidity
function getTeachersWallets() external view returns (address[])
```

Allows to get the teacher wallets

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address[] | The teacher wallets |

### getStudentsWallets

```solidity
function getStudentsWallets() external view returns (address[])
```

Allows to get the student wallets

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address[] | The student wallets |

### getWalletsAlreadyVoted

```solidity
function getWalletsAlreadyVoted() external view returns (address[])
```

Allows to get the wallets that already voted

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address[] | The wallets that already voted |

### getTeachersWalletsLength

```solidity
function getTeachersWalletsLength() external view returns (uint256)
```

Allows to get the total amount of teachers wallets

### getStudentsWalletsLength

```solidity
function getStudentsWalletsLength() external view returns (uint256)
```

Allows to get the total amount of students wallets

### getWalletsAlreadyVotedLength

```solidity
function getWalletsAlreadyVotedLength() external view returns (uint256)
```

Allows to get the total amount of wallets that already voted

### isTeacherWallet

```solidity
function isTeacherWallet(address _wallet) external view returns (bool)
```

Allows to verify is a wallet is a teacher wallet

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _wallet | address | The wallet to verify |

### isStudentWallet

```solidity
function isStudentWallet(address _wallet) external view returns (bool)
```

Allows to verify is a wallet is a student wallet

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _wallet | address | The wallet to verify |

### isWalletAlreadyVoted

```solidity
function isWalletAlreadyVoted(address _wallet) external view returns (bool)
```

Allows to verify if a wallet already voted

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _wallet | address | The wallet to verify |

### _getTotalFundsRaised

```solidity
function _getTotalFundsRaised() internal view returns (uint256)
```

Allows to get the total amount of funds raised

### _cleanWalletsAlreadyVoted

```solidity
function _cleanWalletsAlreadyVoted() internal
```

Allows to clean the wallets that already voted

### _isWalletAlreadyVoted

```solidity
function _isWalletAlreadyVoted(address _wallet) internal view returns (bool)
```

Allows to verify if a wallet already voted

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _wallet | address | The wallet to verify |

### _isTeacherWallet

```solidity
function _isTeacherWallet(address _wallet) internal view returns (bool)
```

Allows to verify is a wallet is a teacher wallet

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _wallet | address | The wallet to verify |

### _isStudentWallet

```solidity
function _isStudentWallet(address _wallet) internal view returns (bool)
```

Allows to verify is a wallet is a student wallet

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _wallet | address | The wallet to verify |

### _getDestinationWithMoreVotes

```solidity
function _getDestinationWithMoreVotes() internal view returns (enum FundManager.FundsDestination)
```

Allows to get the destination with more votes

### _distributeReward

```solidity
function _distributeReward(uint256 _totalFundsRaised, enum FundManager.FundsDestination _fundsDestination) internal
```

Allows to distribute the rewards

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _totalFundsRaised | uint256 | The total amount of funds raised |
| _fundsDestination | enum FundManager.FundsDestination | The destination of the funds |

## UDOT

### senderTax

```solidity
uint32 senderTax
```

### receiverTax

```solidity
uint32 receiverTax
```

### cap

```solidity
uint256 cap
```

### whitelisted

```solidity
mapping(address => bool) whitelisted
```

### UserWhiteList

```solidity
event UserWhiteList(address _user, bool _status)
```

### ChangeSenderTax

```solidity
event ChangeSenderTax(uint256 _lastTax, uint256 _newTax)
```

### ChangeReceiverTax

```solidity
event ChangeReceiverTax(uint256 _lastTax, uint256 _newTax)
```

### RescueStuckToken

```solidity
event RescueStuckToken(address _token, uint256 _amount, uint256 _date)
```

### beforeMint

```solidity
modifier beforeMint()
```

### beforeBurn

```solidity
modifier beforeBurn(uint256 _amount)
```

### beforeRescueStuckToken

```solidity
modifier beforeRescueStuckToken(address _token)
```

### taxValidator

```solidity
modifier taxValidator(uint32 _taxPercent)
```

### constructor

```solidity
constructor() public
```

### mint

```solidity
function mint() external payable
```

Allows the user to mine UDOT in exchange for MATIC, each UDOT will be backed 1:1 by MATIC

### burn

```solidity
function burn(uint256 _amount) external
```

Allows the user to burn UDOT in exchange for MATIC, each UDOT will be backed 1:1 by MATIC

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _amount | uint256 | The amount of UDOT to burn |

### pause

```solidity
function pause() external
```

_Owner can pause token transfer_

### unpause

```solidity
function unpause() external
```

_Owner can unpause token transfer_

### setSenderTax

```solidity
function setSenderTax(uint32 _taxPercent) external
```

_The owner can establish what the sender tax will be_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _taxPercent | uint32 | The tax percentage to be applied |

### setReceiverTax

```solidity
function setReceiverTax(uint32 _taxPercent) external
```

_The owner can establish what the receiver tax will be_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _taxPercent | uint32 | The tax percentage to be applied |

### rescueStuckToken

```solidity
function rescueStuckToken(address _token, address _to) external
```

_The owner can recover tokens stuck in the contract (but not MATIC or UDOT)_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _token | address | The address of the token to be recovered |
| _to | address | The address to which the tokens will be sent |

### _update

```solidity
function _update(address from, address to, uint256 amount) internal
```

_overwrite the transfer function to be able to take the taxes_

