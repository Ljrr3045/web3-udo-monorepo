import UDOT_ABI from "../../../utils/ABIs/UDOT.json";
import { SubgraphURL, UDOTAddress } from "../../../utils/Constants";
import { gql, GraphQLClient } from "graphql-request";
import { useBalance, useContractRead } from "wagmi";
import { useEffect, useState } from "react";

/* Types */
export type TDataDistributeRewards = {
  _amountDistributed: string,
  _date: string,
  _destination: number
};

export type TDistributeRewards = {
  distributeRewards: TDataDistributeRewards[]
};

/* Hooks */
export const useInfoGetter = () => {
  const [distributeRewardsData, setDistributeRewardsData] = useState<TDataDistributeRewards[]>([]);

  /* Get blockchain data */
  const { data: contractBalance } = useBalance({
    address: UDOTAddress,
    token: UDOTAddress
  });

  const { data: currentVoteWinner } = useContractRead({
    address: UDOTAddress,
    abi: UDOT_ABI,
    functionName: "getDestinationWithMoreVotes",
  });

  /* Get subgraph data */
  const getDistributeRewards = async () => {
    const graphQLClient = new GraphQLClient(SubgraphURL, {});
    const query = gql`
      query MyQuery {
        distributeRewards(
          first: 5
          orderBy: blockTimestamp
          orderDirection: desc
        ) {
          _amountDistributed
          _date
          _destination
        }
      }
    `;

    const results = await graphQLClient.request(query) as TDistributeRewards;
    return results.distributeRewards;
  };

  useEffect(() => {
    getDistributeRewards().then((res) => {
      setDistributeRewardsData(res);
    });
  }, []);

  return {
    distributeRewardsData,
    contractBalance: contractBalance?.formatted ?? "0.0",
    currentVoteWinner: currentVoteWinner?.toString() ?? "0",
  };
}
