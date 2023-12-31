import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { CgSpinnerAlt } from "react-icons/cg";
import { WidgetCard } from "../../components/Common/WidgetCard";
import { Button } from "../../components/Common/Button";

export const Receive = () => {
  const [addressToShow, setAddressToShow] = useState<string>("0x0");
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
          <Button
            text={addressToShow}
            onClick={handleCopy}
          />
        </div>
      )}
    </WidgetCard>
  )
}
