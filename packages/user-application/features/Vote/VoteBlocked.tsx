import React from "react";
import { useRouter } from "next/router";
import { Card } from "../../components/Common/Card";
import { CgSmileSad } from "react-icons/cg";
import { Button } from "../../components/Common/Button";

export const VoteBlocked = () => {
  const router = useRouter();

  return (
    <Card>
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <CgSmileSad
          size={100}
          className="text-blue-600"
        />
        <p className="text-base font-normal text-black text-center">
          {`Sorry... your balance is not enough to be able to vote, you must have at least 1 UDOT in your wallet.`}
        </p>
      </div>
      <Button
        text="Come Back to Dashboard"
        onClick={() => router.push("/dashboard")}
      />
    </Card>
  );
}
