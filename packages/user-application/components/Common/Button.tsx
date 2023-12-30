import React from "react";

export const Button = ({
  text,
  onClick,
  isDisabled = false
 }:{
  text: string;
  onClick: () => void;
  isDisabled?: boolean;
}) => {
  const opacity = isDisabled ? "opacity-60" : "opacity-100";
  const cursor = isDisabled ? "cursor-not-allowed" : "cursor-pointer";

/* Internal functions */
  const handleClick = () => {
    if (!isDisabled) {
      onClick();
    }
  }

  return (
    <button
      className={`w-full flex items-center justify-center p-4 rounded-xl bg-blue-600 select-none ${cursor} ${opacity}`}
      onClick={handleClick}
    >
      <p className="text-base font-normal text-white">
        {text}
      </p>
    </button>
  )
}
