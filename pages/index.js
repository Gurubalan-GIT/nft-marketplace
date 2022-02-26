import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import LineLoader from "../components/LineLoader";
import RootLayout from "../Layout/RootLayout";
import { client as sanityClient } from "../lib/sanity-client";
import { NFT_BOODLE_COLLECTION_ID, ROOT_ROUTE } from "../localization";

const Home = () => {
  const [nftModuleMetaData, setNftModuleMetaData] = useState({});

  const fetchNFTModuleMetaDataFromSanity = async () => {
    const boodleNftCollectionQuery = `*[_type == "marketItems" && contractAddress == "${NFT_BOODLE_COLLECTION_ID}" ] {
      "imageUrl": profileImage.asset->url,
      "bannerImageUrl": bannerImage.asset->url,
      volumeTraded,
      createdBy,
      contractAddress,
      description,
      title
    }`;
    const metaData = await sanityClient.fetch(boodleNftCollectionQuery);
    setNftModuleMetaData(metaData[0]);
  };

  useEffect(() => {
    fetchNFTModuleMetaDataFromSanity();
  }, []);

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
