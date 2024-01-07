import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { ethers } from "ethers";
import { VoteBlocked } from "../features/Vote/VoteBlocked";
import { VotePanel } from "../features/Vote/VotePanel";
import { CgSpinnerAlt } from "react-icons/cg";
import { useDataGetter } from "../features/Layout/Hooks/useDataGetter";

const Vote: NextPage = () => {
  const [isVoteEnabled, setIsVoteEnabled] = useState<boolean>(false);
  const [waitingBlockchainData, setWaitingBlockchainData] = useState<boolean>(true);
  const { balanceOfUser, isLoading } = useDataGetter();

  useEffect(() => {
    if (ethers.parseEther(balanceOfUser ?? "0") >= ethers.parseEther("1")) {
      setIsVoteEnabled(true);
    } else {
      setIsVoteEnabled(false);
    }
  }, [balanceOfUser]);

  useEffect(() => {
    if (isLoading) {
      setWaitingBlockchainData(true);
    } else {
      setWaitingBlockchainData(false);
    }
  }, [isLoading]);

  return (
    <div className="w-full flex flex-wrap items-center justify-center gap-4">
      {(waitingBlockchainData) && (
        <CgSpinnerAlt
          size={50}
          className="loading-icon text-blue-600"
        />
      )}
      {(!isVoteEnabled && !waitingBlockchainData) && (
        <VoteBlocked />
      )}
      {(isVoteEnabled && !waitingBlockchainData) && (
        <VotePanel />
      )}
    </div>
  );
}

export default Vote;
