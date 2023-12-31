import { useAccount, useBalance } from "wagmi";
import { UDOTAddress } from "../../../utils/Constants";

export const useDataGetter = () => {
  const { address } = useAccount();

  const { data } = useBalance({
    address: address,
    token: UDOTAddress
  })

  return {
    balanceOfUser: data?.formatted ?? "0.0"
  };
}
