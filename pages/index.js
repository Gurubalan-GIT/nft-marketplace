import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { isEmpty } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import Hero from "../components/Hero";
import LineLoader from "../components/LineLoader";
import RootLayout from "../Layout/RootLayout";
import { NFT_BOODLE_COLLECTION_ID, ROOT_ROUTE } from "../localization";

const Home = () => {
  const [nftModuleMetaData, setNftModuleMetaData] = useState({});
  const { provider } = useWeb3();

  const getNFTModuleMetadata = async () => {
    try {
      const metaData = await nftModule.getMetadata();
      setNftModuleMetaData(metaData);
    } catch (e) {
      console.warn(e);
    }
  };

  const nftModule = useMemo(() => {
    if (!provider) return;
    const sdk = new ThirdwebSDK(provider.getSigner());
    const nftModule = sdk.getNFTModule(NFT_BOODLE_COLLECTION_ID);

    return nftModule;
  }, [provider]);

  useEffect(() => {
    if (!nftModule) return;
    getNFTModuleMetadata();
  }, [nftModuleMetaData]);

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
