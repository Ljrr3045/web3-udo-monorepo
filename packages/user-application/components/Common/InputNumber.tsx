import React from "react";

export const InputNumber = ({
  amount,
  onChange,
  maxAmount,
  isError,
  errorMessage,
  currentBalance,
  currencySymbol,
  placeholder = "0.0",
 }:{
  amount: string;
  onChange: (amount: string) => void;
  maxAmount: number;
  isError: boolean;
  errorMessage: string;
  currentBalance: string;
  currencySymbol: string;
  placeholder?: string;
}) => {
  const borderColor = isError ? "border-red-600 focus:border-red-600" : "border-blue-600 focus:border-blue-600";

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="w-full flex flex-row items-start justify-between px-1">
        <p className="text-xs font-normal text-blue-600 text-start">
          {`Balance: ${currentBalance} ${currencySymbol}`}
        </p>
        <p
          className="text-xs font-normal text-blue-600 text-end underline cursor-pointer select-none"
          onClick={() => onChange(maxAmount.toString())}
        >
          {`MAX`}
        </p>
      </div>
      <input
        className={
          `w-full p-4 text-base rounded-xl border-2 opacity-60 cursor-pointer focus:outline-none focus:opacity-100 ${borderColor}`
        }
        type="number"
        min={0}
        max={maxAmount}
        value={amount}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {isError && (
        <p className="text-xs font-normal text-red-600 text-start">
          {errorMessage}
        </p>
      )}
    </div>
  )
}
