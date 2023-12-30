import React, { useState, useEffect } from "react";
import { WidgetCard } from "../../components/Common/WidgetCard";
import { InputNumber } from "../../components/Common/InputNumber";
import { useAccount, useBalance } from "wagmi";

export const Buy = () => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("0.0");
  const [currentBalance, setCurrentBalance] = useState<string>("0.0");
  const { address } = useAccount();
  const { data: maticBalance } = useBalance({
    address: address,
  });

/* Internal functions */
  const handleChange = (amount: string) => {
    setAmount(amount);
  }

/* Effects */
  useEffect(() => {
    if (maticBalance?.formatted) {
      setCurrentBalance(maticBalance?.formatted);
    }
  }, [maticBalance]);

  useEffect(() => {
    if (Number(amount) >= 0 && Number(amount) <= Number(maticBalance?.formatted)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [amount]);

  return (
    <WidgetCard
      title="Buy"
    >
      <div className="w-full flex items-start justify-start">
        <p className="text-sm font-normal text-black text-start">
          {`Buy UDOT token using the Polygon's Native Currency (MATIC).`}
        </p>
      </div>
      <InputNumber
        amount={amount}
        onChange={handleChange}
        maxAmount={Number(maticBalance?.formatted)}
        isError={!isValid}
        errorMessage="Invalid amount, please enter a correct amount."
        currentBalance={currentBalance}
        currencySymbol="MATIC"
      />
    </WidgetCard>
  )
}
