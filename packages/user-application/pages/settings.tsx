import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useAccount } from "wagmi";
import { CgSpinnerAlt } from "react-icons/cg";
import { ManageStudents } from "../features/Settings/ManageStudents";
import { ManageTeachers } from "../features/Settings/ManageTeachers";
import { ManageFees } from "../features/Settings/ManageFees";
import { PauseToken } from "../features/Settings/PauseToken";

const Settings: NextPage = () => {
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
    <div className="w-full flex flex-wrap items-center justify-center gap-4" >
      {showSpinner && (
        <CgSpinnerAlt
          size={50}
          className="loading-icon"
        />
      )}
      {showDashboard && (
        <>
          <div className="w-full flex flex-col items-center justify-center gap-4 max-w-[566px]">
            <ManageStudents />
            <ManageTeachers />
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-4 max-w-[566px]">
            <PauseToken />
            <ManageFees />
          </div>
        </>
      )}
    </div>
  );
}

export default Settings;
