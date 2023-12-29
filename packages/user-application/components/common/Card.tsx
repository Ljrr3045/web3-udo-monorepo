import React from "react";

export const Card = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="flex min-h-[200px] w-full max-w-[566px] flex-col items-center justify-center gap-4 p-8 rounded-2xl border-2 border-blue-600">
      {children}
    </div>
  );
}
