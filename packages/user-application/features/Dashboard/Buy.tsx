import React, { useState, useEffect } from "react";
import Image from "next/image";
import { WidgetCard } from "../../components/Common/WidgetCard";
import { InputNumber } from "../../components/Common/InputNumber";
import { Button } from "../../components/Common/Button";
import { useAccount, useBalance } from "wagmi";
import { useBuy } from "./Hooks/useBuy";
import { CgSpinnerAlt } from "react-icons/cg";

export const Buy = () => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("0.0");
  const [currentBalance, setCurrentBalance] = useState<string>("0.0");
  const { address } = useAccount();
  const { sendTransaction } = useBuy({ value: amount });
  const { data: maticBalance, isSuccess } = useBalance({
    address: address,
  });

/* Internal functions */
  const handleChange = (amount: string) => {
    setAmount(amount);
  }

  const handleBuy = () => {
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
    if (maticBalance?.formatted) {
      setCurrentBalance(maticBalance?.formatted);
    }
  }, [maticBalance]);

  useEffect(() => {
    if (Number(amount) === 0 || (Number(amount) >= 0 && Number(amount) <= Number(maticBalance?.formatted))) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [amount]);

  return (
    <WidgetCard
      title="Buy"
    >
      <div className="w-full flex flex-row items-center justify-start gap-2">
        <Image
          src="/images/udo-logo.png"
          alt="UDO Logo"
          width={25}
          height={25}
        />
        <p className="text-sm font-normal text-black text-start zero:max-w-[260px] 2md:max-w-none">
          {`Buy UDOT token using the Polygon's Native Currency (MATIC).`}
        </p>
      </div>
      {!showInput && (
        <CgSpinnerAlt
          size={32}
          className="loading-icon text-blue-600"
        />
      )}
      {showInput && (
        <>
          <InputNumber
            amount={amount}
            onChange={handleChange}
            maxAmount={Number(currentBalance)}
            isError={Number(amount) !== 0 && !isValid}
            errorMessage="Invalid amount, please enter a correct amount."
            currentBalance={currentBalance}
            currencySymbol="MATIC"
          />
          <Button
            text="Buy UDOT"
            onClick={handleBuy}
            isLoading={isLoading}
            isDisabled={Number(amount) === 0 || !isValid}
          />
        </>
      )}
    </WidgetCard>
  );
}
