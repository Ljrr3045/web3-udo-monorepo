import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AddStudentWallet } from "../generated/schema"
import { AddStudentWallet as AddStudentWalletEvent } from "../generated/FundManager/FundManager"
import { handleAddStudentWallet } from "../src/fund-manager"
import { createAddStudentWalletEvent } from "./fund-manager-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _wallet = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newAddStudentWalletEvent = createAddStudentWalletEvent(_wallet)
    handleAddStudentWallet(newAddStudentWalletEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AddStudentWallet created and stored", () => {
    assert.entityCount("AddStudentWallet", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AddStudentWallet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_wallet",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
