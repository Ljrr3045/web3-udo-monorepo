import React from "react";
import { WidgetCard } from "../../components/Common/WidgetCard";
import { useTransferTxGetter } from "./Hooks/useTransferTxGetter";
import { ethers } from "ethers";

export const TransferTx = () => {
  const { transferTxData } = useTransferTxGetter();

  return (
    <WidgetCard
      title="Transfer Transactions"
    >
      <div className="w-full flex flex-col items-center justify-center gap-2">
        {transferTxData.map((item, index) => (
          <div
            key={index}
            className="w-full flex flex-row items-center justify-center gap-4 p-2 cursor-pointer rounded-xl border-2 border-blue-600"
            onClick={() => window.open(`https://mumbai.polygonscan.com/tx/${item.transactionHash}`, "_blank")}
          >
            <p className="text-base font-bold text-blue-600">
              {`${new Date(parseInt(item.blockTimestamp) * 1000).toLocaleDateString()}`}
            </p>
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-base font-bold text-black">
                {`From: ${item.from.slice(0, 6)}...${item.from.slice(-4)}`}
              </p>
              <p className="text-base font-bold text-black">
                {`To: ${item.from.slice(0, 6)}...${item.from.slice(-4)}`}
              </p>
            </div>
            <p className="text-base font-bold text-black">
              {`${ethers.formatEther(item.value)} UDOT`}
            </p>
          </div>
        ))}
      </div>
    </WidgetCard>
  )
}
