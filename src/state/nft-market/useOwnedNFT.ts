import { gql, useQuery } from "@apollo/client";
import {
  GetOwnedNFTs,
  GetOwnedNFTsVariables,
} from "./__generated__/GetOwnedNFTs";
import useSigner from "state/signers";

const useOwnwdNFTs = () => {
  const { address } = useSigner();
  const { data } = useQuery<GetOwnedNFTs, GetOwnedNFTsVariables>(
    GET_OWNED_NFTS,
    { variables: { owner: address ?? "" }, skip: !address }
  );

  const ownedNFTs = data?.nfts;

  return { ownedNFTs };
};

const GET_OWNED_NFTS = gql`
  query GetOwnedNFTs($owner: String!) {
    nfts(where: { to: $owner }) {
      id
      from
      to
      tokenURI
      price
    }
  }
`;
