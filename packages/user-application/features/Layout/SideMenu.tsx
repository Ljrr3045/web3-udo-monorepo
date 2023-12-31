import React from "react";

export const SideMenu = ({
  onClose,
}:{
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 w-full min-h-screen flex z-50">
      <div className="fixed inset-0 w-full min-h-screen cursor-pointer bg-black/30" onClick={onClose} />
      <div className="w-full flex flex-col p-4 items-center bg-white z-10 rounded 2md:max-w-[30%] zero:max-w-[100%]">
        gola
      </div>
    </div>
  )
}
