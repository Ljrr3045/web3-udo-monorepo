import React from "react";
import type { NextPage } from "next";
import { Receive } from "../features/Dashboard/Receive";
import { Buy } from "../features/Dashboard/Buy";
import { Sell } from "../features/Dashboard/Sell";

const Dashboard: NextPage = () => {
  return (
    <div className="w-full flex flex-wrap items-center justify-center gap-4">
      <div className="w-full flex flex-col items-center justify-center gap-4 max-w-[566px]">
        <Buy />
        <Sell />
      </div>
      <Receive />
    </div>
  );
}

export default Dashboard;
