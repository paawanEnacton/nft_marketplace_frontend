import { CreationValues } from "modules/CreationPage/CreationForm";
import { Contract } from "ethers";

const NFT_MARKET_ADDRESS = process.env.NEXT_PUBLIC_NFT_MARKET_ADDRESS as string;

const useNFTMarket = () => {
  const nftMarket = new Contract(NFT_MARKET_ADDRESS);
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
        console.log("tokenURI: ", json.uri);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return { createNFT };
};

export default useNFTMarket;
