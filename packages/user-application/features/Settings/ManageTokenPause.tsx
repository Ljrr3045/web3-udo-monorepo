import React, { useEffect, useState } from "react";
import Image from "next/image";
import { WidgetCard } from "../../components/Common/WidgetCard";
import { Button } from "../../components/Common/Button";
import { useManageTokenPause } from "./Hooks/useManageTokenPause";

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
        <Image
          src="/images/udo-logo.png"
          alt="UDO Logo"
          width={25}
          height={25}
        />
        <p className="text-sm font-normal text-black text-start">
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
