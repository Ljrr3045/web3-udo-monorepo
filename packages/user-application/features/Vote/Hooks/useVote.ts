import { ethers } from "ethers";
import { UDOTAddress } from "../../../utils/Constants";
import { useAccount, useBalance } from "wagmi";

export const useVote = () => {
  const { address } = useAccount();

  const { data: balanceData  } = useBalance({
    address: address,
    token: UDOTAddress
  });

  return {
    isVoteEnabled: ethers.parseEther(balanceData?.formatted ?? "0") === ethers.parseEther("1")
  }
}
