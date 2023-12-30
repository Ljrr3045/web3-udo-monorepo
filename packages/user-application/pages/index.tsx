import React, { useEffect } from "react";
import Image from "next/image";
import type { NextPage } from "next";
import { Card } from "../components/common/Card";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      router.push("/dashboard");
    }
  }, [isConnected]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Card>
        <Image
          src="/images/udo-logo.png"
          width={100}
          height={100}
          alt="UDO logo"
        />
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <p className="text-base font-normal text-black text-center">
            {`Welcome to the UDOT project, a Web3 project of the University of Oriente Nucleus Monagas.`}
          </p>
          <p className="text-base font-normal text-black text-center">
            {`Connect your wallet to be part of our protocol.`}
          </p>
        </div>
        <ConnectButton />
      </Card>
    </div>
  );
};

export default Home;
