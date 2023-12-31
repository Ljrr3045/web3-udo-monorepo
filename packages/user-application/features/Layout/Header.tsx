import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Bar } from "../../components/Layout/Bar";
import { CgMenu } from "react-icons/cg";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { useDataGetter } from "./Hooks/useDataGetter";
import { SideMenu } from "./SideMenu";
import { LanguageSelector } from "../Translate/LanguageSelector";

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
      <div className="flex flex-row items-center gap-6">
        <UdoLogo />
        <LanguageSelector />
      </div>
      {showMoreOptions && (
        <div className="flex flex-row items-center gap-6">
          <UserBalance />
          <MainSideMenu />
        </div>
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
      className="zero:hidden 2md:flex text-base font-bold text-white p-2 border-2 border-white rounded-xl cursor-pointer select-none"
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

