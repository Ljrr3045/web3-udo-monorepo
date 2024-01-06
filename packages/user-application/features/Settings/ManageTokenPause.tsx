import React, { useEffect, useState } from "react";
import { WidgetCard } from "../../components/Common/WidgetCard";
import { Button } from "../../components/Common/Button";
import { useManageTokenPause } from "./Hooks/useManageTokenPause";
import { CgCheckR } from "react-icons/cg";

export const ManageTokenPause = () => {
  const [newAction, setNewAction] = useState<string>("");
  const { sendTx, currentState } = useManageTokenPause();

/* Effects */
  useEffect(() => {
    if (currentState === "paused") {
      setNewAction("Active");
    } else {
      setNewAction("Pause");
    }
  }, [currentState]);

  return (
    <WidgetCard
      title="Manage Token Pause"
    >
      <div className="w-full flex flex-row items-center justify-start gap-2">
        <CgCheckR
          size={25}
          color="#2563eb"
        />
        <p className="text-sm font-normal text-black text-start zero:max-w-[260px] 2md:max-w-none">
          {`Set whether transactions are paused or active.`}
        </p>
      </div>
      <Button
        text={newAction}
        onClick={sendTx}
      />
    </WidgetCard>
  )
}
