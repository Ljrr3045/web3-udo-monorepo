import {
  AddStudentWallet as AddStudentWalletEvent,
  AddTeacherWallet as AddTeacherWalletEvent,
  Approval as ApprovalEvent,
  ChangeKeeperSystem as ChangeKeeperSystemEvent,
  ChangeReceiverTax as ChangeReceiverTaxEvent,
  ChangeSenderTax as ChangeSenderTaxEvent,
  DistributeRewards as DistributeRewardsEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  RemoveStudentWallet as RemoveStudentWalletEvent,
  RemoveTeacherWallet as RemoveTeacherWalletEvent,
  RescueStuckToken as RescueStuckTokenEvent,
  Transfer as TransferEvent,
  Unpaused as UnpausedEvent,
  UserWhiteList as UserWhiteListEvent,
  VoteForDestination as VoteForDestinationEvent,
  VotesValidation as VotesValidationEvent
} from "../generated/FundManager/FundManager"
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
} from "../generated/schema"

export function handleAddStudentWallet(event: AddStudentWalletEvent): void {
  let entity = new AddStudentWallet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._wallet = event.params._wallet

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAddTeacherWallet(event: AddTeacherWalletEvent): void {
  let entity = new AddTeacherWallet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._wallet = event.params._wallet

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleChangeKeeperSystem(event: ChangeKeeperSystemEvent): void {
  let entity = new ChangeKeeperSystem(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._newKeeperSystem = event.params._newKeeperSystem
  entity._oldKeeperSystem = event.params._oldKeeperSystem

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleChangeReceiverTax(event: ChangeReceiverTaxEvent): void {
  let entity = new ChangeReceiverTax(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._lastTax = event.params._lastTax
  entity._newTax = event.params._newTax

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleChangeSenderTax(event: ChangeSenderTaxEvent): void {
  let entity = new ChangeSenderTax(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._lastTax = event.params._lastTax
  entity._newTax = event.params._newTax

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDistributeRewards(event: DistributeRewardsEvent): void {
  let entity = new DistributeRewards(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._destination = event.params._destination
  entity._amountDistributed = event.params._amountDistributed
  entity._date = event.params._date

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRemoveStudentWallet(
  event: RemoveStudentWalletEvent
): void {
  let entity = new RemoveStudentWallet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._wallet = event.params._wallet

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRemoveTeacherWallet(
  event: RemoveTeacherWalletEvent
): void {
  let entity = new RemoveTeacherWallet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._wallet = event.params._wallet

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRescueStuckToken(event: RescueStuckTokenEvent): void {
  let entity = new RescueStuckToken(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._token = event.params._token
  entity._amount = event.params._amount
  entity._date = event.params._date

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUserWhiteList(event: UserWhiteListEvent): void {
  let entity = new UserWhiteList(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._user = event.params._user
  entity._status = event.params._status

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoteForDestination(event: VoteForDestinationEvent): void {
  let entity = new VoteForDestination(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._wallet = event.params._wallet
  entity._destination = event.params._destination
  entity._date = event.params._date

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVotesValidation(event: VotesValidationEvent): void {
  let entity = new VotesValidation(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._votesForUniversity = event.params._votesForUniversity
  entity._votesForTeachers = event.params._votesForTeachers
  entity._votesForStudents = event.params._votesForStudents
  entity._resetDate = event.params._resetDate
  entity._isDistributed = event.params._isDistributed

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
