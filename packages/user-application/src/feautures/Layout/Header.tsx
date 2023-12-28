"use client";

import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Bar } from "@/components/Layout/Bar";

export const Header = () => {
  return (
    <Bar>
      <UdoLogo />
    </Bar>
  )
}

/* Internal components */
const UdoLogo = () => {
  return (
    <Image
      src="/udo-logo.png"
      alt="UDO Logo"
      className="cursor-pointer"
      width={40}
      height={40}
      onClick={() => redirect("/")}
    />
  )
}
