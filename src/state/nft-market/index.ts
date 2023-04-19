import { CreationValues } from "modules/CreationPage/CreationForm";
import { Contract } from "ethers";
import NFT_MARKET from "../../../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import useSigner from "state/signers";
import { TransactionResponse } from "@ethersproject/abstract-provider";
const NFT_MARKET_ADDRESS = process.env.NEXT_PUBLIC_NFT_MARKET_ADDRESS as string;

const useNFTMarket = () => {
  const { signer } = useSigner();
  const nftMarket = new Contract(NFT_MARKET_ADDRESS, NFT_MARKET.abi, signer);
  const createNFT = async (values: CreationValues) => {
    try {
      const data = new FormData();
      data.append("name", values.name);
      data.append("description", values.description);
      data.append("image", values.image!);
      const response = await fetch("/api/nft-storage", {
        method: "POST",
        body: data,
      });

      if (response.status == 201) {
        const json = await response.json();
        console.log("json :>> ", json);
        const transaction: TransactionResponse = await nftMarket.createNFT(
          json.uri
        );

        console.log("transaction :>> ", transaction);

        console.log(
          "🚀 ~ file: index.ts:32 ~ createNFT ~ await transaction.wait();:",
          await transaction.wait()
        );
        await transaction.wait();
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return { createNFT };
};

export default useNFTMarket;
