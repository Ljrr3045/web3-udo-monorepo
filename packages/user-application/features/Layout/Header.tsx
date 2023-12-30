import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Bar } from "../../components/Layout/Bar";
import { CgMenu } from "react-icons/cg";
import { useAccount } from "wagmi";
import { UseContractManager } from "./Hooks/UseContractManager";

export const Header = () => {
  const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);
  const { isConnected } = useAccount();

/* Effects */
  useEffect(() => {
    if (isConnected) {
      setShowMoreOptions(true);
    }
  }, [isConnected]);

  return (
    <Bar>
      <UdoLogo />
      {showMoreOptions && (
        <>
          <UserBalance />
          <SideMenu />
        </>
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

const UserBalance = () => {
  const { balanceOfUser } = UseContractManager();

  return (
    <p className="text-base font-bold text-white select-none">
      {`Balance: ${balanceOfUser} UDOT`}
    </p>
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

