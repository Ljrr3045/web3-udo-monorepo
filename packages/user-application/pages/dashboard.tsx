import React from "react";
import type { NextPage } from "next";
import { WidgetCard } from "../components/Common/WidgetCard";
import { Receive } from "../features/Dashboard/Receive";

const Dashboard: NextPage = () => {
  return (
    <div className="w-full flex flex-wrap items-center justify-center gap-4">
      <div className="w-full flex flex-col items-center justify-center gap-4 max-w-[566px]">
        <WidgetCard
          title="Buy"
        >
          {`Mint`}
        </WidgetCard>
        <WidgetCard
          title="Sell"
        >
          {`Burn`}
        </WidgetCard>
      </div>
      <Receive />
    </div>
  );
}

export default Dashboard;
