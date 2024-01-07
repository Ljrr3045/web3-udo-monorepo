import React from "react";
import { WidgetCard } from "../../components/Common/WidgetCard";
import { useInfoGetter } from "./Hooks/useInfoGetter";

export const VoteInfo = () => {
  const { distributeRewardsData, contractBalance, currentVoteWinner } = useInfoGetter();

  console.log('DistributeRewardsData', distributeRewardsData);
  console.log('contractBalance', contractBalance);
  console.log('currentVoteWinner', currentVoteWinner);

  return (
    <WidgetCard
      title="VoteInfo"
    >
      VoteInfo
    </WidgetCard>
  );
}
