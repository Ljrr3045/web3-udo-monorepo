import UDOT_ABI from "../../../utils/ABIs/UDOT.json";
import { UDOTAddress } from "../../../utils/Constants";
import { useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

export const useBuy = ({
  value
}:{
  value: string
}) => {
  const mintAmount = value !== "" ? value : "0.0";

/* Hooks interactions */
  const { config } = usePrepareContractWrite({
    address: UDOTAddress,
    abi: UDOT_ABI,
    functionName: "mint",
    value: ethers.parseEther(mintAmount)
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data?.hash,
  });

/* Internal functions */
  const sendTransaction = () => {
    if (write) write();
  }

/* Effects */
    useEffect(() => {
      if (isLoading) {
        toast.info("Transaction in progress");
      }
    }, [isLoading]);

    useEffect(() => {
      if (isSuccess) {
        toast.success("Transaction completed satisfactorily");
      }
    }, [isSuccess]);

    useEffect(() => {
      if (isError) {
        toast.error("Transaction failed");
      }
    }, [isError]);

  return {
    sendTransaction,
  };
}
