import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UDOTAddress } from "../../utils/Constants";
import { WidgetCard } from "../../components/Common/WidgetCard";
import { useAccount, useBalance } from "wagmi";
import { useSell } from "./Hooks/useSell";
import { CgSpinnerAlt } from "react-icons/cg";
import { InputNumber } from "../../components/Common/InputNumber";
import { Button } from "../../components/Common/Button";

export const Sell = () => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("0.0");
  const [currentBalance, setCurrentBalance] = useState<string>("0.0");
  const { address } = useAccount();
  const { sendTransaction } = useSell({ value: amount });
  const { data: udotBalance, isSuccess } = useBalance({
    address: address,
    token: UDOTAddress,
  });

/* Internal functions */
  const handleChange = (amount: string) => {
    setAmount(amount);
  }

  const handleSell = () => {
    setIsLoading(true);
    sendTransaction();
    setIsLoading(false);
  }

/* Effects */
  useEffect(() => {
    if (isSuccess) {
      setShowInput(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (udotBalance?.formatted) {
      setCurrentBalance(udotBalance?.formatted);
    }
  }, [udotBalance]);

  useEffect(() => {
    if (Number(amount) >= 0 && Number(amount) <= Number(udotBalance?.formatted)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [amount]);

  return (
    <WidgetCard
      title="Sell"
    >
      <div className="w-full flex flex-row items-center justify-start gap-2">
        <Image
          src="/images/udo-logo.png"
          alt="UDO Logo"
          width={25}
          height={25}
        />
        <p className="text-sm font-normal text-black text-start zero:max-w-[260px] 2md:max-w-none">
          {`Sell your UDOT and receive Polygon's native currency (MATIC) in exchange.`}
        </p>
      </div>
      {!showInput && (
        <CgSpinnerAlt
          size={32}
          className="loading-icon"
        />
      )}
      {showInput && (
        <>
          <InputNumber
            amount={amount}
            onChange={handleChange}
            maxAmount={Number(currentBalance)}
            isError={!isValid}
            errorMessage="Invalid amount, please enter a correct amount."
            currentBalance={currentBalance}
            currencySymbol="UDOT"
          />
          <Button
            text="Sell UDOT"
            onClick={handleSell}
            isLoading={isLoading}
            isDisabled={Number(amount) === 0 || !isValid}
          />
        </>
      )}
    </WidgetCard>
  )
}
