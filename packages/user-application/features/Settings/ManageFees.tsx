import React, { useState } from "react";
import Image from "next/image";
import { WidgetCard } from "../../components/Common/WidgetCard";
import { InputPercentage } from "../../components/Common/InputPercentage";
import { Button } from "../../components/Common/Button";
import { useManageFees } from "./Hooks/useManageFees";

export const ManageFees = () => {
  const [percentage, setPercentage] = useState<string>("");
  const {
    currentReceiverTax,
    currentSenderTax,
    sendTxReceiverTax,
    sendTxSenderTax
  } = useManageFees({ value: percentage });

  return (
    <WidgetCard
      title="Manage Fees"
    >
      <div className="w-full flex flex-row items-center justify-start gap-2">
        <Image
          src="/images/udo-logo.png"
          alt="UDO Logo"
          width={25}
          height={25}
        />
        <p className="text-sm font-normal text-black text-start">
          {`Set the sender or receiver tax percentage for each transaction.`}
        </p>
      </div>
      <div className="w-full flex flex-col items-center gap-1">
        <div className="w-full flex flex-row items-start justify-between px-1">
          <p className="text-xs font-normal text-blue-600 text-start">
            {`Current Sender Tax: ${currentSenderTax}%, Current Receiver Tax: ${currentReceiverTax}%`}
          </p>
        </div>
        <InputPercentage
          value={percentage}
          onChange={setPercentage}
          placeholder={"0"}
          isError={Number(percentage) < 0 || Number(percentage) > 10}
          errorMessage={"Invalid percentage, the percentage must be >= 0 or <= 10."}
        />
      </div>
      <div className="w-full flex flex-col items-center gap-1">
        <Button
          text="Set Sender Tax"
          onClick={sendTxSenderTax}
          isDisabled={percentage === "" || Number(percentage) < 0 || Number(percentage) > 10}
        />
        <Button
          text="Set Receiver Tax"
          onClick={sendTxReceiverTax}
          isDisabled={percentage === "" || Number(percentage) < 0 || Number(percentage) > 10}
        />
      </div>
    </WidgetCard>
  )
}
