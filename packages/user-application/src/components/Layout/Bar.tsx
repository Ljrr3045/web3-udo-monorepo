import React from "react";

export const Bar = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="w-full p-4 flex flex-row items-center justify-between bg-blue-600 text-white">
      {children}
    </div>
  )
}
