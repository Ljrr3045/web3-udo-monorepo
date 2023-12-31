import React, { useState } from "react";
import Image from "next/image";
import { WidgetCard } from "../../components/Common/WidgetCard";
import { InputAddress } from "../../components/Common/InputAddress";
import { ethers } from "ethers";
import { Button } from "../../components/Common/Button";
import { useManageTeachers } from "./Hooks/useManageTeachers";

export const ManageTeachers = () => {
  const [address, setAddress] = useState<string>("");
  const { sendTxAddTeacherWallet, sendTxRemoveTeacherWalletConfig } = useManageTeachers({ value: address });

  return (
    <WidgetCard
      title="Manage Teachers"
    >
      <div className="w-full flex flex-row items-center justify-start gap-2">
        <Image
          src="/images/udo-logo.png"
          alt="UDO Logo"
          width={25}
          height={25}
        />
        <p className="text-sm font-normal text-black text-start">
          {`Add or remove teachers from the beneficiary list.`}
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
          text="Add Teacher"
          onClick={sendTxAddTeacherWallet}
          isDisabled={address === "" || !ethers.isAddress(address)}
        />
        <Button
          text="Remove Teacher"
          onClick={sendTxRemoveTeacherWalletConfig}
          isDisabled={address === "" || !ethers.isAddress(address)}
        />
      </div>
    </WidgetCard>
  )
}
