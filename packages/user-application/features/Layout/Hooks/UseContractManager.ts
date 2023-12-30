import UDOT from "../../../utils/ABIs/UDOT.json";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useAccount, useContractRead } from "wagmi";
import { UDOTAddress } from "../../../utils/Constants";

export const UseContractManager = () => {
  const [balanceOfUser, setBalanceOfUser] = useState<string>("0.0");
  const { address } = useAccount();

  const { data } = useContractRead({
    address: UDOTAddress,
    abi: UDOT,
    functionName: "balanceOf",
    args: [address],
  });

    useEffect(() => {
      if (data) {
        setBalanceOfUser(ethers.formatEther(String(data)).toString());
      }
    }, [data]);

  return { balanceOfUser, UDOTAddress };
}
