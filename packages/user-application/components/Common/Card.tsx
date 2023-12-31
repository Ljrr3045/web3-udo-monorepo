import React from "react";

export const Card = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full min-h-[200px] max-w-[566px] flex flex-col items-center justify-center gap-4 p-8 rounded-xl border-2 border-blue-600">
      {children}
    </div>
  );
}
