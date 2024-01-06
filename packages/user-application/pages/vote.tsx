import React from "react";
import type { NextPage } from "next";
import { useVote } from "../features/Vote/Hooks/useVote";
import { VoteBlocked } from "../features/Vote/VoteBlocked";
import { VotePanel } from "../features/Vote/VotePanel";

const Vote: NextPage = () => {
  const { isVoteEnabled } = useVote();

  return (
    <div className="w-full flex flex-wrap items-center justify-center gap-4">
      {!isVoteEnabled && (
        <VoteBlocked />
      )}
      {isVoteEnabled && (
        <VotePanel />
      )}
    </div>
  );
}

export default Vote;
