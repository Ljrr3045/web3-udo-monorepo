import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Bar } from "../../components/Layout/Bar";
import { CgMenu } from "react-icons/cg";
import { useAccount } from "wagmi";

export const Header = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { isConnected } = useAccount();

/* Effects */
  useEffect(() => {
    if (isConnected) {
      setShowMenu(true);
    }
  }, [isConnected]);

  return (
    <Bar>
      <UdoLogo />
      {showMenu && (
        <SideMenu />
      )}
    </Bar>
  );
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
  );
}

const SideMenu = () => {
  return (
    <CgMenu
      size={30}
      className="cursor-pointer"
    />
  );
}

