import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AddStudentWallet,
  AddTeacherWallet,
  Approval,
  ChangeKeeperSystem,
  ChangeReceiverTax,
  ChangeSenderTax,
  DistributeRewards,
  OwnershipTransferred,
  Paused,
  RemoveStudentWallet,
  RemoveTeacherWallet,
  RescueStuckToken,
  Transfer,
  Unpaused,
  UserWhiteList,
  VoteForDestination,
  VotesValidation
} from "../generated/FundManager/FundManager"

export function createAddStudentWalletEvent(
  _wallet: Address
): AddStudentWallet {
  let addStudentWalletEvent = changetype<AddStudentWallet>(newMockEvent())

  addStudentWalletEvent.parameters = new Array()

  addStudentWalletEvent.parameters.push(
    new ethereum.EventParam("_wallet", ethereum.Value.fromAddress(_wallet))
  )

  return addStudentWalletEvent
}

export function createAddTeacherWalletEvent(
  _wallet: Address
): AddTeacherWallet {
  let addTeacherWalletEvent = changetype<AddTeacherWallet>(newMockEvent())

  addTeacherWalletEvent.parameters = new Array()

  addTeacherWalletEvent.parameters.push(
    new ethereum.EventParam("_wallet", ethereum.Value.fromAddress(_wallet))
  )

  return addTeacherWalletEvent
}

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return approvalEvent
}

export function createChangeKeeperSystemEvent(
  _newKeeperSystem: Address,
  _oldKeeperSystem: Address
): ChangeKeeperSystem {
  let changeKeeperSystemEvent = changetype<ChangeKeeperSystem>(newMockEvent())

  changeKeeperSystemEvent.parameters = new Array()

  changeKeeperSystemEvent.parameters.push(
    new ethereum.EventParam(
      "_newKeeperSystem",
      ethereum.Value.fromAddress(_newKeeperSystem)
    )
  )
  changeKeeperSystemEvent.parameters.push(
    new ethereum.EventParam(
      "_oldKeeperSystem",
      ethereum.Value.fromAddress(_oldKeeperSystem)
    )
  )

  return changeKeeperSystemEvent
}

export function createChangeReceiverTaxEvent(
  _lastTax: BigInt,
  _newTax: BigInt
): ChangeReceiverTax {
  let changeReceiverTaxEvent = changetype<ChangeReceiverTax>(newMockEvent())

  changeReceiverTaxEvent.parameters = new Array()

  changeReceiverTaxEvent.parameters.push(
    new ethereum.EventParam(
      "_lastTax",
      ethereum.Value.fromUnsignedBigInt(_lastTax)
    )
  )
  changeReceiverTaxEvent.parameters.push(
    new ethereum.EventParam(
      "_newTax",
      ethereum.Value.fromUnsignedBigInt(_newTax)
    )
  )

  return changeReceiverTaxEvent
}

export function createChangeSenderTaxEvent(
  _lastTax: BigInt,
  _newTax: BigInt
): ChangeSenderTax {
  let changeSenderTaxEvent = changetype<ChangeSenderTax>(newMockEvent())

  changeSenderTaxEvent.parameters = new Array()

  changeSenderTaxEvent.parameters.push(
    new ethereum.EventParam(
      "_lastTax",
      ethereum.Value.fromUnsignedBigInt(_lastTax)
    )
  )
  changeSenderTaxEvent.parameters.push(
    new ethereum.EventParam(
      "_newTax",
      ethereum.Value.fromUnsignedBigInt(_newTax)
    )
  )

  return changeSenderTaxEvent
}

export function createDistributeRewardsEvent(
  _destination: i32,
  _amountDistributed: BigInt,
  _date: BigInt
): DistributeRewards {
  let distributeRewardsEvent = changetype<DistributeRewards>(newMockEvent())

  distributeRewardsEvent.parameters = new Array()

  distributeRewardsEvent.parameters.push(
    new ethereum.EventParam(
      "_destination",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_destination))
    )
  )
  distributeRewardsEvent.parameters.push(
    new ethereum.EventParam(
      "_amountDistributed",
      ethereum.Value.fromUnsignedBigInt(_amountDistributed)
    )
  )
  distributeRewardsEvent.parameters.push(
    new ethereum.EventParam("_date", ethereum.Value.fromUnsignedBigInt(_date))
  )

  return distributeRewardsEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createRemoveStudentWalletEvent(
  _wallet: Address
): RemoveStudentWallet {
  let removeStudentWalletEvent = changetype<RemoveStudentWallet>(newMockEvent())

  removeStudentWalletEvent.parameters = new Array()

  removeStudentWalletEvent.parameters.push(
    new ethereum.EventParam("_wallet", ethereum.Value.fromAddress(_wallet))
  )

  return removeStudentWalletEvent
}

export function createRemoveTeacherWalletEvent(
  _wallet: Address
): RemoveTeacherWallet {
  let removeTeacherWalletEvent = changetype<RemoveTeacherWallet>(newMockEvent())

  removeTeacherWalletEvent.parameters = new Array()

  removeTeacherWalletEvent.parameters.push(
    new ethereum.EventParam("_wallet", ethereum.Value.fromAddress(_wallet))
  )

  return removeTeacherWalletEvent
}

export function createRescueStuckTokenEvent(
  _token: Address,
  _amount: BigInt,
  _date: BigInt
): RescueStuckToken {
  let rescueStuckTokenEvent = changetype<RescueStuckToken>(newMockEvent())

  rescueStuckTokenEvent.parameters = new Array()

  rescueStuckTokenEvent.parameters.push(
    new ethereum.EventParam("_token", ethereum.Value.fromAddress(_token))
  )
  rescueStuckTokenEvent.parameters.push(
    new ethereum.EventParam(
      "_amount",
      ethereum.Value.fromUnsignedBigInt(_amount)
    )
  )
  rescueStuckTokenEvent.parameters.push(
    new ethereum.EventParam("_date", ethereum.Value.fromUnsignedBigInt(_date))
  )

  return rescueStuckTokenEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}

export function createUserWhiteListEvent(
  _user: Address,
  _status: boolean
): UserWhiteList {
  let userWhiteListEvent = changetype<UserWhiteList>(newMockEvent())

  userWhiteListEvent.parameters = new Array()

  userWhiteListEvent.parameters.push(
    new ethereum.EventParam("_user", ethereum.Value.fromAddress(_user))
  )
  userWhiteListEvent.parameters.push(
    new ethereum.EventParam("_status", ethereum.Value.fromBoolean(_status))
  )

  return userWhiteListEvent
}

export function createVoteForDestinationEvent(
  _wallet: Address,
  _destination: i32,
  _date: BigInt
): VoteForDestination {
  let voteForDestinationEvent = changetype<VoteForDestination>(newMockEvent())

  voteForDestinationEvent.parameters = new Array()

  voteForDestinationEvent.parameters.push(
    new ethereum.EventParam("_wallet", ethereum.Value.fromAddress(_wallet))
  )
  voteForDestinationEvent.parameters.push(
    new ethereum.EventParam(
      "_destination",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_destination))
    )
  )
  voteForDestinationEvent.parameters.push(
    new ethereum.EventParam("_date", ethereum.Value.fromUnsignedBigInt(_date))
  )

  return voteForDestinationEvent
}

export function createVotesValidationEvent(
  _votesForUniversity: BigInt,
  _votesForTeachers: BigInt,
  _votesForStudents: BigInt,
  _resetDate: BigInt,
  _isDistributed: boolean
): VotesValidation {
  let votesValidationEvent = changetype<VotesValidation>(newMockEvent())

  votesValidationEvent.parameters = new Array()

  votesValidationEvent.parameters.push(
    new ethereum.EventParam(
      "_votesForUniversity",
      ethereum.Value.fromUnsignedBigInt(_votesForUniversity)
    )
  )
  votesValidationEvent.parameters.push(
    new ethereum.EventParam(
      "_votesForTeachers",
      ethereum.Value.fromUnsignedBigInt(_votesForTeachers)
    )
  )
  votesValidationEvent.parameters.push(
    new ethereum.EventParam(
      "_votesForStudents",
      ethereum.Value.fromUnsignedBigInt(_votesForStudents)
    )
  )
  votesValidationEvent.parameters.push(
    new ethereum.EventParam(
      "_resetDate",
      ethereum.Value.fromUnsignedBigInt(_resetDate)
    )
  )
  votesValidationEvent.parameters.push(
    new ethereum.EventParam(
      "_isDistributed",
      ethereum.Value.fromBoolean(_isDistributed)
    )
  )

  return votesValidationEvent
}
