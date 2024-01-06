import UDOT_ABI from "../../../utils/ABIs/UDOT.json";
import { UDOTAddress } from "../../../utils/Constants";
import { useAccount, useBalance, useContractRead } from "wagmi";

export const useDataGetter = () => {
  const { address } = useAccount();

  const { data: balanceData  } = useBalance({
    address: address,
    token: UDOTAddress
  });

  const { data: ownerData } = useContractRead({
    address: UDOTAddress,
    abi: UDOT_ABI,
    functionName: "owner",
  });

  return {
    ownerAddress: String(ownerData) ?? "",
    balanceOfUser: balanceData?.formatted ?? "0.0"
  };
}
