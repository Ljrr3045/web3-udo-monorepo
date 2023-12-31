import UDOT_ABI from "../../../utils/ABIs/UDOT.json";
import { UDOTAddress } from "../../../utils/Constants";
import { useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

export const useManageTeachers = ({
  value
}:{
  value: string
}) => {
  const teacherAddress = value !== "" ? value : ethers.ZeroAddress;

/* Hooks interactions */
  const addTeacherWalletConfig = usePrepareContractWrite({
    address: UDOTAddress,
    abi: UDOT_ABI,
    functionName: "addTeacherWallet",
    args: [teacherAddress],
  });
  const removeTeacherWalletConfig = usePrepareContractWrite({
    address: UDOTAddress,
    abi: UDOT_ABI,
    functionName: "removeTeacherWallet",
    args: [teacherAddress],
  });

  const addTeacherWalletWrite = useContractWrite(addTeacherWalletConfig.config);
  const removeTeacherWalletWrite = useContractWrite(removeTeacherWalletConfig.config);

  const addTeacherWalletTxStatus = useWaitForTransaction({
    hash: addTeacherWalletWrite.data?.hash,
  });
  const removeTeacherWalletStatus = useWaitForTransaction({
    hash: removeTeacherWalletWrite.data?.hash,
  });

/* Internal functions */
  const sendTxAddTeacherWallet = () => {
    if (addTeacherWalletWrite.write) addTeacherWalletWrite.write();
  }
  const sendTxRemoveTeacherWalletConfig = () => {
    if (removeTeacherWalletWrite.write) removeTeacherWalletWrite.write();
  }

/* Effects */
    useEffect(() => {
      if (addTeacherWalletTxStatus.isLoading || removeTeacherWalletStatus.isLoading) {
        toast.info("Transaction in progress");
      }
    }, [addTeacherWalletTxStatus.isLoading, removeTeacherWalletStatus.isLoading]);

    useEffect(() => {
      if (addTeacherWalletTxStatus.isSuccess || removeTeacherWalletStatus.isSuccess) {
        toast.success("Transaction completed satisfactorily");
      }
    }, [addTeacherWalletTxStatus.isSuccess, removeTeacherWalletStatus.isSuccess]);

    useEffect(() => {
      if (addTeacherWalletTxStatus.isError || removeTeacherWalletStatus.isError) {
        toast.error("Transaction failed");
      }
    }, [addTeacherWalletTxStatus.isError, removeTeacherWalletStatus.isError]);

  return {
    sendTxAddTeacherWallet,
    sendTxRemoveTeacherWalletConfig,
  };
}
