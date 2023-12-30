import React from "react";

export const Button = ({
  text,
  onClick,
  isDisabled = false,
  isLoading = false,
 }:{
  text: string;
  onClick: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
}) => {
  const opacity = isDisabled || isLoading ? "opacity-60" : "opacity-100";
  const cursor = isDisabled || isLoading ? "cursor-not-allowed" : "cursor-pointer";
  const textToShow = isLoading ? "Loading..." : text;

/* Internal functions */
  const handleClick = () => {
    if (!isDisabled && !isLoading) {
      onClick();
    }
  }

  return (
    <button
      className={`w-full flex items-center justify-center p-4 rounded-xl bg-blue-600 select-none ${cursor} ${opacity}`}
      onClick={handleClick}
    >
      <p className="text-base font-normal text-white">
        {textToShow}
      </p>
    </button>
  )
}
