import React from "react";

export const InputAddress = ({
  value,
  onChange,
  isError,
  errorMessage,
  placeholder,
 }:{
  value: string;
  onChange: (value: string) => void;
  isError: boolean;
  errorMessage: string;
  placeholder?: string;
}) => {
  const borderColor = isError ? "border-red-600 focus:border-red-600" : "border-blue-600 focus:border-blue-600";

  return (
    <div className="w-full flex flex-col gap-1">
      <input
        className={
          `w-full p-4 text-base rounded-xl border-2 opacity-60 cursor-pointer focus:outline-none focus:opacity-100 ${borderColor}`
        }
        type="text"
        value={value}
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
