import { useEffect, useState } from "react";
import { SubgraphURL } from "../../../utils/Constants";
import { gql, GraphQLClient } from "graphql-request";

/* Types */
export type TTransferTxInfo = {
  from: string,
  to: string,
  value: string,
  blockTimestamp: string
  transactionHash: string
};

export type TTransferTxData = {
  transfers: TTransferTxInfo[]
};

/* Hooks */
export const useTransferTxGetter = () => {
  const [transferTxData, setTransferTxData] = useState<TTransferTxInfo[]>([]);

  /* Get subgraph data */
  const getTransferTxData = async () => {
    const graphQLClient = new GraphQLClient(SubgraphURL, {});
    const query = gql`
      query MyQuery {
        transfers(
          first: 5,
          where: {to_not: "0x0000000000000000000000000000000000000000", from_not: "0x0000000000000000000000000000000000000000"}
          orderBy: blockTimestamp
          orderDirection: desc
        ) {
          value
          blockTimestamp
          transactionHash
          from
          to
        }
      }
    `;

    const results = await graphQLClient.request(query) as TTransferTxData;
    return results.transfers;
  };

  useEffect(() => {
    getTransferTxData().then((res) => {
      setTransferTxData(res);
    });
  }, []);

  return {
    transferTxData,
  };
}
