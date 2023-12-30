import React from "react";
import { WidgetCard } from "../../components/Common/WidgetCard";

export const Sell = () => {
  return (
    <WidgetCard
      title="Sell"
    >
      <div className="w-full flex items-start justify-start">
        <p className="text-sm font-normal text-black text-start">
          {`Sell your UDOT and receive Polygon's native currency (MATIC) in exchange.`}
        </p>
      </div>
    </WidgetCard>
  )
}
