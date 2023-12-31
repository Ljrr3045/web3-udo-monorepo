import UDOT_ABI from "../../../utils/ABIs/UDOT.json";
import { UDOTAddress } from "../../../utils/Constants";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

export const useManageFees = ({
  value
}:{
  value: string
}) => {
  const fee = value !== "" ? (Number(value) * 100) : 0;

/* Read data */
  const { data: currentReceiverTax } = useContractRead({
    address: UDOTAddress,
    abi: UDOT_ABI,
    functionName: "receiverTax",
  });

  const { data: currentSenderTax } = useContractRead({
    address: UDOTAddress,
    abi: UDOT_ABI,
    functionName: "senderTax",
  });

/* Hooks interactions */
  const receiverTaxConfig = usePrepareContractWrite({
    address: UDOTAddress,
    abi: UDOT_ABI,
    functionName: "setReceiverTax",
    args: [fee],
  });
  const senderTaxConfig = usePrepareContractWrite({
    address: UDOTAddress,
    abi: UDOT_ABI,
    functionName: "setSenderTax",
    args: [fee],
  });

  const receiverTaxWrite = useContractWrite(receiverTaxConfig.config);
  const senderTaxWrite = useContractWrite(senderTaxConfig.config);

  const receiverTaxTxStatus = useWaitForTransaction({
    hash: receiverTaxWrite.data?.hash,
  });
  const senderTaxTxStatus = useWaitForTransaction({
    hash: senderTaxWrite.data?.hash,
  });

/* Internal functions */
  const sendTxReceiverTax = () => {
    if (receiverTaxWrite.write) receiverTaxWrite.write();
  }
  const sendTxSenderTax = () => {
    if (senderTaxWrite.write) senderTaxWrite.write();
  }

/* Effects */
    useEffect(() => {
      if (receiverTaxTxStatus.isLoading || senderTaxTxStatus.isLoading) {
        toast.info("Transaction in progress");
      }
    }, [receiverTaxTxStatus.isLoading, senderTaxTxStatus.isLoading]);

    useEffect(() => {
      if (receiverTaxTxStatus.isSuccess || senderTaxTxStatus.isSuccess) {
        toast.success("Transaction completed satisfactorily");
      }
    }, [receiverTaxTxStatus.isSuccess, senderTaxTxStatus.isSuccess]);

    useEffect(() => {
      if (receiverTaxTxStatus.isError || senderTaxTxStatus.isError) {
        toast.error("Transaction failed");
      }
    }, [receiverTaxTxStatus.isError, senderTaxTxStatus.isError]);

  return {
    sendTxReceiverTax,
    sendTxSenderTax,
    currentReceiverTax: (Number(currentReceiverTax) / 100) ?? 0,
    currentSenderTax: (Number(currentSenderTax) / 100) ?? 0,
  };
}
