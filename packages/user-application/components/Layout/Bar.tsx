import React from "react";

export const Bar = ({
  children,
  isHeader = false,
}: {
  children: React.ReactNode;
  isHeader?: boolean;
}) => {
  const borderDirection = isHeader ? "rounded-b" : "rounded-t";

  return (
    <div className={`w-full h-16 px-4 flex flex-row items-center justify-between bg-blue-600 text-white ${borderDirection}`}>
      {children}
    </div>
  )
}
