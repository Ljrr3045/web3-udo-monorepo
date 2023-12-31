import UDOT_ABI from "../../../utils/ABIs/UDOT.json";
import { UDOTAddress } from "../../../utils/Constants";
import { useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

export const useManageStudents = ({
  value
}:{
  value: string
}) => {
  const studentAddress = value !== "" ? value : ethers.ZeroAddress;

/* Hooks interactions */
  const addStudentWalletConfig = usePrepareContractWrite({
    address: UDOTAddress,
    abi: UDOT_ABI,
    functionName: "addStudentWallet",
    args: [studentAddress],
  });
  const removeStudentWalletConfig = usePrepareContractWrite({
    address: UDOTAddress,
    abi: UDOT_ABI,
    functionName: "removeStudentWallet",
    args: [studentAddress],
  });

  const addStudentWalletWrite = useContractWrite(addStudentWalletConfig.config);
  const removeStudentWalletWrite = useContractWrite(removeStudentWalletConfig.config);

  const addStudentWalletTxStatus = useWaitForTransaction({
    hash: addStudentWalletWrite.data?.hash,
  });
  const removeStudentWalletTxStatus = useWaitForTransaction({
    hash: removeStudentWalletWrite.data?.hash,
  });

/* Internal functions */
  const sendTxAddStudentWallet = () => {
    if (addStudentWalletWrite.write) addStudentWalletWrite.write();
  }
  const sendTxRemoveStudentWallet = () => {
    if (removeStudentWalletWrite.write) removeStudentWalletWrite.write();
  }

/* Effects */
    useEffect(() => {
      if (addStudentWalletTxStatus.isLoading || removeStudentWalletTxStatus.isLoading) {
        toast.info("Transaction in progress");
      }
    }, [addStudentWalletTxStatus.isLoading, removeStudentWalletTxStatus.isLoading]);

    useEffect(() => {
      if (addStudentWalletTxStatus.isSuccess || removeStudentWalletTxStatus.isSuccess) {
        toast.success("Transaction completed satisfactorily");
      }
    }, [addStudentWalletTxStatus.isSuccess, removeStudentWalletTxStatus.isSuccess]);

    useEffect(() => {
      if (addStudentWalletTxStatus.isError || removeStudentWalletTxStatus.isError) {
        toast.error("Transaction failed");
      }
    }, [addStudentWalletTxStatus.isError, removeStudentWalletTxStatus.isError]);

  return {
    sendTxAddStudentWallet,
    sendTxRemoveStudentWallet,
  };
}
