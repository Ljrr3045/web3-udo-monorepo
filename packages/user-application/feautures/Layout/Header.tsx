import React from "react";
import Image from "next/image";
import { CgMenu } from "react-icons/cg";
import { Bar } from "../../components/Layout/Bar";
import { useAccount } from "wagmi";

export const Header = () => {
  const { isConnected } = useAccount()

  return (
    <Bar>
      <UdoLogo />
      {isConnected && (
        <SideMenu />
      )}
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

const SideMenu = () => {
  return (
    <CgMenu
      size={30}
      className="cursor-pointer"
    />
  );
}

