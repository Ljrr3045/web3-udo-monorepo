import React from "react";
import { useRouter } from "next/router";
import { CgClose, CgDesktop, CgList, CgOptions, CgPen } from "react-icons/cg";
import { Button } from "../../components/Common/Button";
import { useAccount, useDisconnect } from "wagmi";
import { useDataGetter } from "./Hooks/useDataGetter";

export const SideMenu = ({
  onClose,
}:{
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 w-full min-h-screen flex z-10">
      <div className="fixed inset-0 w-full min-h-screen cursor-pointer bg-black/30" onClick={onClose} />
      <div className="w-full flex flex-col items-star justify-between p-4 z-20 bg-white rounded 2md:max-w-[25%] zero:max-w-[100%]">
        <div className="w-full flex flex-col items-star gap-4">
          <CloseButton onClose={onClose} />
          <NavigationOptions onClose={onClose} />
        </div>
        <ButtonsOptions onClose={onClose} />
      </div>
    </div>
  )
}

/* Internal components */
const CloseButton = ({
  onClose,
}:{
  onClose: () => void;
}) => {
  return (
    <div className="w-full flex flex-row items-end justify-end">
      <CgClose
        className="cursor-pointer text-blue-600"
        size={32}
        onClick={onClose}
      />
    </div>
  );
}

const NavigationOptions = ({
  onClose,
}:{
  onClose: () => void;
}) => {
  const router = useRouter();
  const { address } = useAccount();
  const { ownerAddress } = useDataGetter();

  const options = [
    {
      title: "Dashboard",
      icon: <CgDesktop size={32} className="text-blue-600" />,
      onClick: () => {
        router.push("/dashboard");
        onClose();
      },
    },
    {
      title: "Transactions",
      icon: <CgList size={32} className="text-blue-600" />,
      onClick: () => {
        router.push("/transactions");
        onClose();
      },
    },
    {
      title: "Vote",
      icon: <CgPen size={32} className="text-blue-600" />,
      onClick: () => {
        router.push("/vote");
        onClose();
      },
    },
    {
      title: "Settings",
      icon: <CgOptions size={32} className="text-blue-600" />,
      onClick: () => {
        router.push("/settings");
        onClose();
      },
    }
  ];

  return (
    <div className="w-full flex flex-col items-star gap-2">
        {options.map((option, index) => {
          if (option.title === "Settings" && address !== ownerAddress) return null;
          return (
            <div
              key={index}
              className="w-full flex flex-row items-center justify-start gap-4 p-2 border-b border-blue-600 cursor-pointer"
              onClick={option.onClick}
            >
              {option.icon}
              <p className="text-base font-bold text-blue-600">
                {option.title}
              </p>
            </div>
          )
        })}
    </div>
  );
}

const ButtonsOptions = ({
  onClose,
}:{
  onClose: () => void;
}) => {
  const router = useRouter();
  const { disconnect } = useDisconnect();

  const handleLogout = () => {
    disconnect();
    router.push("/");
    onClose();
  };

  return (
    <Button
      text="Logout"
      onClick={handleLogout}
    />
  );
}
