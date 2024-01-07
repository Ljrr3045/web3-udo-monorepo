import UDOT_ABI from "../../../utils/ABIs/UDOT.json";
import { UDOTAddress } from "../../../utils/Constants";
import { useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import {
    useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from "wagmi";

export const useVote = ({
  value
}:{
  value?: string
}) => {
  const { address } = useAccount();
  const voteOption = ethers.toBigInt(value ?? "0");

/* Get blockchain data */
  const { data: isWalletAlreadyVoted, isLoading: isWalletAlreadyVotedLoading } = useContractRead({
    address: UDOTAddress,
    abi: UDOT_ABI,
    functionName: "isWalletAlreadyVoted",
    args: [address],
  });

/* Hooks interactions */
  const { config } = usePrepareContractWrite({
    address: UDOTAddress,
    abi: UDOT_ABI,
    functionName: "voteForDestination",
    args: [voteOption],
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
    isWalletAlreadyVoted,
    isWalletAlreadyVotedLoading,
  };
}
