import { useEffect, useState } from "react";
import { SubgraphURL } from "../../../utils/Constants";
import { gql, GraphQLClient } from "graphql-request";

/* Types */
export type TSellTxInfo = {
  from: string,
  value: string,
  blockTimestamp: string
  transactionHash: string
};

export type TSellTxData = {
  transfers: TSellTxInfo[]
};

/* Hooks */
export const useSellTxGetter = () => {
  const [sellTxData, setSellTxData] = useState<TSellTxInfo[]>([]);

  /* Get subgraph data */
  const getSellTxData = async () => {
    const graphQLClient = new GraphQLClient(SubgraphURL, {});
    const query = gql`
      query MyQuery {
        transfers(first: 5, where: {to: "0x0000000000000000000000000000000000000000"}) {
          value
          blockTimestamp
          transactionHash
          from
        }
      }
    `;

    const results = await graphQLClient.request(query) as TSellTxData;
    return results.transfers;
  };

  useEffect(() => {
    getSellTxData().then((res) => {
      setSellTxData(res);
    });
  }, []);

  return {
    sellTxData,
  };
}
