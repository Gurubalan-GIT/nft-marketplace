import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { client as sanityClient } from "../../lib/sanity-client";
import {
  ALCHEMY_HTTPS_API_KEY,
  NFT_MARKETPLACE_ADDRESS,
} from "../../localization";

const styles = {
  bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-screen px-4`,
  midRow: `w-full flex justify-center text-white`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
  socialIconsContainer: `flex text-3xl mb-[-2rem]`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
  socialIcon: `my-2`,
  divider: `border-r-2`,
  title: `text-5xl font-bold mb-4`,
  createdBy: `text-lg mb-4`,
  statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
  collectionStat: `w-1/4`,
  statValue: `text-3xl font-bold w-full flex items-center justify-center`,
  ethLogo: `h-6 mr-2`,
  statName: `text-lg w-full text-center mt-1`,
  description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
};

const Collection = () => {
  const router = useRouter();
  const { provider } = useWeb3();
  const { collectionId } = router.query;
  const [collection, setCollection] = useState({});
  const [nfts, setNfts] = useState([]);
  const [listings, setListings] = useState([]);
  const [nftModuleMetaData, setNftModuleMetaData] = useState({});

  const getNFTs = async () => {
    try {
      const nfts = await nftModule.getAll();
      setNfts(nfts);
    } catch (error) {
      console.warn(error);
    }
  };

  const getNFTModuleMetadata = async () => {
    try {
      const metaData = await nftModule.getMetadata();
      setNftModuleMetaData(metaData);
    } catch (e) {
      console.warn(e);
    }
  };

  const getListings = async () => {
    try {
      setListings(await marketPlaceModule.getAllListings());
    } catch (error) {
      console.warn(error);
    }
  };

  const createNFTModuleOnSanity = async () => {
    try {
      const nftModuleDoc = {
        _type: "marketItems",
        _id: nftModuleMetaData?.address,
        title: nftModuleMetaData?.metadata?.name,
        description: nftModuleMetaData?.metadata?.description,
        contractAddress: nftModuleMetaData?.address,
      };
      sanityClient.createIfNotExists(nftModuleDoc);
    } catch (error) {
      console.warn(error);
    }
  };

  const nftModule = useMemo(() => {
    if (!provider) return;

    const sdk = new ThirdwebSDK(provider.getSigner(), ALCHEMY_HTTPS_API_KEY);
    const nftModule = sdk.getNFTModule(collectionId);

    if (!nftModule) {
      router.replace("/404");
    }

    return nftModule;
  }, [provider, collectionId]);

  // Get all NFTs in the collection
  useEffect(() => {
    if (!nftModule) return;
    getNFTs();
    getNFTModuleMetadata();
  }, [nftModule]);

  // Get the entire Marketplace in which NFTs are listed
  const marketPlaceModule = useMemo(() => {
    if (!provider) return;

    const sdk = new ThirdwebSDK(provider.getSigner(), ALCHEMY_HTTPS_API_KEY);
    return sdk.getMarketplaceModule(NFT_MARKETPLACE_ADDRESS);
  }, [provider]);

  // Get all listings in the collection
  useEffect(() => {
    if (!marketPlaceModule) return;
    getListings();
  }, [marketPlaceModule]);

  useEffect(() => {
    if (isEmpty(nfts) || isEmpty(nftModuleMetaData)) return;
    createNFTModuleOnSanity();
  }, [nfts, listings, nftModuleMetaData]);

  console.log(collection, nfts, listings, nftModuleMetaData);

  return <div>Collection</div>;
};

export default Collection;
