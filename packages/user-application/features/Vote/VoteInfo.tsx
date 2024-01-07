import React, { useMemo } from "react";
import { WidgetCard } from "../../components/Common/WidgetCard";
import { useInfoGetter, TDataDistributeRewards } from "./Hooks/useInfoGetter";
import { ethers } from "ethers";

export const VoteInfo = () => {
  const { distributeRewardsData, contractBalance, currentVoteWinner } = useInfoGetter();

  return (
    <WidgetCard
      title="Elections Results"
    >
      <VotesResultsHistory
        data={distributeRewardsData}
      />
      <CurrentVoteWinner
        currentWinner={currentVoteWinner}
        currentFunds={contractBalance}
      />
    </WidgetCard>
  );
}

/* Internal components */
const VotesResultsHistory = ({ data }:{
  data: TDataDistributeRewards[]
}) => {

  /* Hooks */
  const renderData = useMemo(() => {
    return data.length > 0;
  }, [data]);

  return (
    <>
      {(renderData) && (
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <p className="w-full text-lg font-bold text-black text-center border-y-2 border-blue-600">
            {`Last Months Elections Results`}
          </p>
          <div className="w-full flex flex-col items-center justify-center gap-1">
            {data.map((item, index) => (
              <div
                key={index}
                className="w-full flex flex-row items-center justify-center gap-2"
              >
                <p className="text-base font-bold text-blue-600">
                  {`${new Date(parseInt(item._date) * 1000).toLocaleDateString()}`}
                </p>
                <p className="text-base font-bold text-black">
                  {`${item._destination === 0 ? "University" : item._destination === 1 ? "Teachers" : "Students"}`}
                </p>
                <p className="text-base font-bold text-black">
                  {`${ethers.formatEther(item._amountDistributed)} UDOT`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const CurrentVoteWinner = ({ currentWinner, currentFunds }:{
  currentWinner: string
  currentFunds: string
}) => {

  /* Hooks */
  const currentWinnerName = useMemo(() => {
    if (currentWinner === "0") {
      return "University";
    } else if (currentWinner === "1") {
      return "Teachers";
    } else {
      return "Students";
    }
  }, [currentWinner]);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-2">
      <p className="w-full text-lg font-bold text-black text-center border-y-2 border-blue-600">
        {`Live Elections Results`}
      </p>
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex flex-row items-center justify-center gap-2">
          <p className="text-base font-bold text-blue-600">
            {`Current Winner:`}
          </p>
          <p className="text-base font-bold text-black">
            {`${currentWinnerName}`}
          </p>
        </div>
        <div className="w-full flex flex-row items-center justify-center gap-2">
          <p className="text-base font-bold text-blue-600">
            {`Current Funds:`}
          </p>
          <p className="text-base font-bold text-black">
            {`${currentFunds} UDOT`}
          </p>
        </div>
      </div>
    </div>
  );
};
