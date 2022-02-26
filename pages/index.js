import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { isEmpty } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import Hero from "../components/Hero";
import LineLoader from "../components/LineLoader";
import RootLayout from "../Layout/RootLayout";
import {
  NFT_COLLECTION_ID,
  NFT_MARKETPLACE_ADDRESS,
  ROOT_ROUTE,
} from "../localization";

const Home = () => {
  const [nftModuleMetaData, setNftModuleMetaData] = useState({});
  const { address, connectWallet, provider } = useWeb3();

  // Get the entire Marketplace in which NFTs are listed
  const marketPlaceModule = useMemo(() => {
    if (!provider) return;

    const sdk = new ThirdwebSDK(provider.getSigner());
    return sdk.getMarketplaceModule(NFT_MARKETPLACE_ADDRESS);
  }, [provider]);

  const getNFTModuleMetadata = async () => {
    try {
      const metaData = await nftModule.getMetadata();
      setNftModuleMetaData(metaData);
      console.log(metaData);
    } catch (e) {
      console.warn(e);
    }
  };

  const nftModule = useMemo(() => {
    if (!provider) return;
    const sdk = new ThirdwebSDK(provider.getSigner());
    const nftModule = sdk.getNFTModule(NFT_COLLECTION_ID);

    return nftModule;
  }, [provider]);

  useEffect(() => {
    if (!nftModule) return;
    getNFTModuleMetadata();
  }, [marketPlaceModule]);

  return (
    <RootLayout source={ROOT_ROUTE}>
      {isEmpty(nftModuleMetaData) ? (
        <LineLoader />
      ) : (
        <Hero nftModuleMetaData={nftModuleMetaData} />
      )}
    </RootLayout>
  );
};

export default Home;
