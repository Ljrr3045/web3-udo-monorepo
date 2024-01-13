import React from "react";
import type { NextPage } from "next";
import { BuyTx } from "../features/TransactionHistory/BuyTx";
import { SellTx } from "../features/TransactionHistory/SellTx";
import { TransferTx } from "../features/TransactionHistory/TransferTx";

const TransactionHistory: NextPage = () => {
  return (
    <div className="w-full flex flex-wrap items-center justify-center gap-4">
      <div className="w-full flex flex-col items-center justify-center gap-4 max-w-[566px]">
        <BuyTx />
        <SellTx />
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-4 max-w-[566px]">
        <TransferTx />
      </div>
    </div>
  );
}

export default TransactionHistory;
