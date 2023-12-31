import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { Receive } from "../features/Dashboard/Receive";
import { Buy } from "../features/Dashboard/Buy";
import { Sell } from "../features/Dashboard/Sell";
import { useAccount } from "wagmi";
import { CgSpinnerAlt } from "react-icons/cg";

const Dashboard: NextPage = () => {
  const [showSpinner, setShowSpinner] = useState<boolean>(true);
  const [showDashboard, setShowDashboard] = useState<boolean>(false);
  const { isConnected, isConnecting } = useAccount();

/* Effects */
  useEffect(() => {
    if (isConnecting || !isConnected) {
      setShowSpinner(true);
    } else {
      setShowSpinner(false);
    }
  }, [isConnected, isConnecting]);

  useEffect(() => {
    if (!isConnecting && isConnected) {
      setShowDashboard(true);
    } else {
      setShowDashboard(false);
    }
  }, [isConnected, isConnecting]);

  return (
    <div className="w-full flex flex-wrap items-center justify-center gap-4">
      {showSpinner && (
        <CgSpinnerAlt
          size={50}
          className="loading-icon"
        />
      )}
      {showDashboard && (
        <>
          <div className="w-full flex flex-col items-center justify-center gap-4 max-w-[566px]">
            <Buy />
            <Sell />
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-4 max-w-[566px]">
            <Receive />
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
