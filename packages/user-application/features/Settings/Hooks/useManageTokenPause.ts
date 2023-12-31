import UDOT_ABI from "../../../utils/ABIs/UDOT.json";
import { UDOTAddress } from "../../../utils/Constants";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

export const useManageTokenPause = () => {
/* Read data */
  const { data: currentState } = useContractRead({
    address: UDOTAddress,
    abi: UDOT_ABI,
    functionName: "paused",
  });

/* Hooks interactions */
  const pauseConfig = usePrepareContractWrite({
    address: UDOTAddress,
    abi: UDOT_ABI,
    functionName: "pause",
  });
  const unpauseConfig = usePrepareContractWrite({
    address: UDOTAddress,
    abi: UDOT_ABI,
    functionName: "unpause",
  });

  const pauseWrite = useContractWrite(pauseConfig.config);
  const unpauseWrite = useContractWrite(unpauseConfig.config);

  const pauseTxStatus = useWaitForTransaction({
    hash: pauseWrite.data?.hash,
  });
  const unpauseTxStatus = useWaitForTransaction({
    hash: unpauseWrite.data?.hash,
  });

/* Internal functions */
  const sendTx = () => {
    if (Boolean(currentState) === true) {
      if (unpauseWrite.write) unpauseWrite.write();
    } else {
      if (pauseWrite.write) pauseWrite.write();
    }
  }

/* Effects */
  useEffect(() => {
    if (pauseTxStatus.isLoading || unpauseTxStatus.isLoading) {
      toast.info("Transaction in progress");
    }
  }, [pauseTxStatus.isLoading, unpauseTxStatus.isLoading]);

  useEffect(() => {
    if (pauseTxStatus.isSuccess || unpauseTxStatus.isSuccess) {
      toast.success("Transaction completed satisfactorily");
    }
  }, [pauseTxStatus.isSuccess, unpauseTxStatus.isSuccess]);

  useEffect(() => {
    if (pauseTxStatus.isError || unpauseTxStatus.isError) {
      toast.error("Transaction failed");
    }
  }, [pauseTxStatus.isError, unpauseTxStatus.isError]);

  return {
    sendTx,
    currentState: Boolean(currentState) === true ? "paused" : "activated",
  };
}
