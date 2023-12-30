import React from "react";
import { WidgetCard } from "../../components/Common/WidgetCard";

export const Buy = () => {
  return (
    <WidgetCard
      title="Buy"
    >
      <div className="w-full flex items-start justify-start">
        <p className="text-sm font-normal text-black text-start">
          {`Buy UDOT token using the Polygon's Native Currency (MATIC).`}
        </p>
      </div>
    </WidgetCard>
  )
}
