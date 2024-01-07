import React from "react";
import { VoteSelector } from "./VoteSelector";
import { VoteInfo } from "./VoteInfo";

export const VotePanel = () => {
  return (
    <div className="w-full flex flex-wrap items-center justify-center gap-4">
      <div className="w-full flex flex-col items-center justify-center gap-4 max-w-[566px]">
        <VoteSelector />
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-4 max-w-[566px]">
        <VoteInfo />
      </div>
    </div>
  )
}
