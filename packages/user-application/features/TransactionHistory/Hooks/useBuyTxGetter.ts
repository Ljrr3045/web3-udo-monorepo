import { useEffect, useState } from "react";
import { SubgraphURL } from "../../../utils/Constants";
import { gql, GraphQLClient } from "graphql-request";

/* Types */
export type TBuyTxInfo = {
  to: string,
  value: string,
  blockTimestamp: string
  transactionHash: string
};

export type TBuyTxData = {
  transfers: TBuyTxInfo[]
};

/* Hooks */
export const useBuyTxGetter = () => {
  const [buyTxData, setBuyTxData] = useState<TBuyTxInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /* Get subgraph data */
  const getBuyTxData = async () => {
    const graphQLClient = new GraphQLClient(SubgraphURL, {});
    const query = gql`
      query MyQuery {
        transfers(
          first: 5,
          where: {from: "0x0000000000000000000000000000000000000000"}
          orderBy: blockTimestamp
          orderDirection: desc
        ) {
          to
          value
          blockTimestamp
          transactionHash,
        }
      }
    `;

    const results = await graphQLClient.request(query) as TBuyTxData;
    return results.transfers;
  };

  useEffect(() => {
    getBuyTxData().then((res) => {
      setBuyTxData(res);
      setIsLoading(false);
    });
  }, []);

  return {
    buyTxData,
    isLoading,
  };
}
