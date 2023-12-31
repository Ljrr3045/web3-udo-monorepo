import React, { useState } from "react";
import Image from "next/image";
import { ethers } from "ethers";
import { WidgetCard } from "../../components/Common/WidgetCard";
import { InputAddress } from "../../components/Common/InputAddress";
import { Button } from "../../components/Common/Button";
import { useManageStudents } from "./Hooks/useManageStudents";

export const ManageStudents = () => {
  const [address, setAddress] = useState<string>("");
  const { sendTxAddStudentWallet, sendTxRemoveStudentWallet } = useManageStudents({ value: address });

  return (
    <WidgetCard
      title="Manage Students"
    >
      <div className="w-full flex flex-row items-center justify-start gap-2">
        <Image
          src="/images/udo-logo.png"
          alt="UDO Logo"
          width={25}
          height={25}
        />
        <p className="text-sm font-normal text-black text-start">
          {`Add or remove students from the beneficiary list.`}
        </p>
      </div>
      <InputAddress
        value={address}
        onChange={setAddress}
        placeholder={ethers.ZeroAddress}
        isError={address !== "" && !ethers.isAddress(address)}
        errorMessage={"Invalid address, please enter an appropriate address."}
      />
      <div className="w-full flex flex-col items-center gap-1">
        <Button
          text="Add Student"
          onClick={sendTxAddStudentWallet}
        />
        <Button
          text="Remove Student"
          onClick={sendTxRemoveStudentWallet}
        />
      </div>
    </WidgetCard>
  )
}
