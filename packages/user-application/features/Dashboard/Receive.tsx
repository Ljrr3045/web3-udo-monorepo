import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { CgSpinnerAlt } from "react-icons/cg";
import { WidgetCard } from "../../components/Common/WidgetCard";

export const Receive = () => {
  const [addressToShow, setAddressToShow] = useState<string>("");
  const [showQR, setShowQR] = useState<boolean>(false);
  const { address } = useAccount();

/* Internal functions */
  const handleCopy = () => {
    navigator.clipboard.writeText(address ?? "");
    toast.success("Wallet address copied to clipboard");
  }

/* Effects */
  useEffect(() => {
    if (address) {
      setShowQR(true);
      setAddressToShow(`${address?.slice(0, 6)}...${address?.slice(-5)}`);
    }
  }, [address]);

  return (
    <WidgetCard
      title="Receive"
    >
      {!showQR && (
        <CgSpinnerAlt
          size={32}
          className="loading-icon"
        />
      )}
      {showQR && (
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <QRCode
            value={address ?? ""}
            className="rounded-xl"
          />
          <button
            className="w-full flex items-center justify-center p-4 rounded-xl bg-blue-600 cursor-pointer select-none"
            onClick={handleCopy}
          >
            <p className="text-base font-normal text-white">
              {addressToShow}
            </p>
          </button>
        </div>
      )}
    </WidgetCard>
  )
}
