import React from "react";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Bar } from "../../components/Layout/Bar";

export const Header = () => {
  return (
    <Bar>
      <UdoLogo />
      <ConnectButton />
    </Bar>
  )
}

/* Internal components */
const UdoLogo = () => {
  return (
    <Image
      src="/images/udo-logo.png"
      alt="UDO Logo"
      width={40}
      height={40}
    />
  )
}
