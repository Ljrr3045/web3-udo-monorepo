import React from "react";

export const WidgetCard = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="w-full min-h-[200px] max-w-[566px] flex flex-col items-start gap-2">
      <p className="text-base font-bold text-black">
        {title}
      </p>
      <div className="w-full flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border-2 border-blue-600">
        {children}
      </div>
    </div>
  );
}
