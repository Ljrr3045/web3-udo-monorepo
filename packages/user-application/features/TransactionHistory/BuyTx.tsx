import React from "react";
import { ethers } from "ethers";
import { WidgetCard } from "../../components/Common/WidgetCard";
import { useBuyTxGetter } from "./Hooks/useBuyTxGetter";

export const BuyTx = () => {
  const { buyTxData } = useBuyTxGetter();

  return (
    <WidgetCard
      title="Buy Transactions"
    >
      <div className="w-full flex flex-col items-center justify-center gap-2">
        {buyTxData.map((item, index) => (
          <div
            key={index}
            className="w-full flex flex-row items-center justify-center gap-4 p-2 cursor-pointer rounded-xl border-2 border-blue-600"
            onClick={() => window.open(`https://polygonscan.com/tx/${item.transactionHash}`, "_blank")}
          >
            <p className="text-base font-bold text-blue-600">
              {`${new Date(parseInt(item.blockTimestamp) * 1000).toLocaleDateString()}`}
            </p>
            <p className="text-base font-bold text-black">
              {`From: ${item.to.slice(0, 6)}...${item.to.slice(-4)}`}
            </p>
            <p className="text-base font-bold text-black">
              {`${ethers.formatEther(item.value)} UDOT`}
            </p>
          </div>
        ))}
      </div>
    </WidgetCard>
  )
}
