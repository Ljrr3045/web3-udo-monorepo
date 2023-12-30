import React from "react";
import QRCode from "react-qr-code";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { WidgetCard } from "../../components/common/WidgetCard";

export const Receive = () => {
  const { address } = useAccount();

  const handleCopy = () => {
    navigator.clipboard.writeText(address ?? "");
    toast.success("Address copied to clipboard");
  }

  return (
    <WidgetCard
      title="Receive"
    >
      <QRCode
        value={address ?? ""}
        size={320}
        className="rounded-xl"
      />
      <button
        className="w-full flex items-center justify-center p-4 rounded-xl bg-blue-600 cursor-pointer select-none"
        onClick={handleCopy}
      >
        <p className="text-base font-normal text-white">
          {`${address?.slice(0, 6)}...${address?.slice(-5)}`}
        </p>
      </button>
    </WidgetCard>
  )
}
