import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Bar } from "../../components/Layout/Bar";
import { CgMenu } from "react-icons/cg";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { useDataGetter } from "./Hooks/useDataGetter";
import { SideMenu } from "./SideMenu";

export const Header = () => {
  const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);
  const { isConnected } = useAccount();

/* Effects */
  useEffect(() => {
    if (isConnected) {
      setShowMoreOptions(true);
    } else {
      setShowMoreOptions(false);
    }
  }, [isConnected]);

  return (
    <Bar
      isHeader={true}
    >
      <UdoLogo />
      {showMoreOptions && (
        <>
          <UserBalance />
          <MainSideMenu />
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
  const { balanceOfUser } = useDataGetter();

  const handleCopy = () => {
    navigator.clipboard.writeText(balanceOfUser);
    toast.success("Balance copied to clipboard");
  }

  return (
    <p
      className="text-base font-bold text-white cursor-pointer select-none"
      onClick={handleCopy}
    >
      {`Balance: ${balanceOfUser} UDOT`}
    </p>
  );
}

const MainSideMenu = () => {
  const [openSideMenu, setOpenSideMenu] = useState<boolean>(false);

  const handleCloseAndOpen = () => {
    setOpenSideMenu(!openSideMenu)
  }

  return (
    <>
      <CgMenu
        size={30}
        className="cursor-pointer"
        onClick={handleCloseAndOpen}
      />
      {openSideMenu && (
        <SideMenu
          onClose={handleCloseAndOpen}
        />
      )}
    </>
  );
}

