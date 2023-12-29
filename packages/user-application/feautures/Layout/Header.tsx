import React from "react";
import Image from "next/image";
import { Bar } from "../../components/Layout/Bar";
import { CgMenu } from "react-icons/cg";

export const Header = () => {
  return (
    <Bar>
      <UdoLogo />
      <SideMenu />
    </Bar>
  );
}

/* Internal components */
const UdoLogo = () => {
  return (
    <div className="w-auto h-auto">
      <Image
        src="/images/udo-logo.png"
        alt="UDO Logo"
        width={40}
        height={40}
      />
    </div>
  );
}

const SideMenu = () => {
  return (
    <div className="w-auto h-auto">
      <CgMenu
        size={30}
        cursor={"pointer"}
      />
    </div>
  );
}

