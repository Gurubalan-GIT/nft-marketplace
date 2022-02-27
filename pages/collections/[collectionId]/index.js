import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import {
  GlobalOutlined,
  InstagramOutlined,
  MoreOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { isEmpty, min, uniq } from "lodash";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import LineLoader from "../../../components/LineLoader";
import NFTCard from "../../../components/NFTCard";
import RootLayout from "../../../Layout/RootLayout";
import { client as sanityClient } from "../../../lib/sanity-client";
import { ETH_SVG_PATH, NFT_MARKETPLACE_ADDRESS } from "../../../localization";

const styles = {
  rootContainer: `min-h-screen justify-center items-center`,
  bannerImageContainer: `h-[20vh] w-full flex justify-center items-center`,
  bannerImage: `w-full object-cover`,
  infoContainer: `w-full px-4`,
  midRow: `w-full flex justify-center text-white`,
  endRow: `w-full flex justify-end text-white`,
  profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
  socialIconsContainer: `flex text-3xl mb-[-2rem]`,
  socialIconsWrapper: `w-44`,
  socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg`,
  socialIcon: `py-2 flex items-center w-full justify-center rounded-xl hover:cursor-pointer hover:bg-[#000000]`,
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
  const [nftCollectionTradedVolume, setNftCollectionTradedVolume] = useState(0);
  const [nftOwners, setNftOwners] = useState([]);

  const getNFTs = async () => {
    try {
      const nfts = await nftModule.getAll();
      setNfts(nfts);
    } catch (error) {
      console.warn(error);
    }
  };

  const getAllNftOwners = async () => {
    try {
      const nftsWithOwners = await nftModule.getAllWithOwner();
      setNftOwners(uniq(nftsWithOwners.map((nft) => nft.owner)));
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

  const getNftTransactionsTradedVolume = async () => {
    const nftTransactionsQuery = `*[_type == "transactions" && marketPlaceContractAddress == "${collectionId}" ]{
      price
     }`;
    try {
      const nftTransactionsData = await sanityClient.fetch(
        nftTransactionsQuery
      );
      if (nftTransactionsData)
        setNftCollectionTradedVolume(
          nftTransactionsData
            .map((nftTransaction) => nftTransaction.price)
            .reduce((a, b) => a + b, 0)
        );
    } catch (error) {
      console.warn(error);
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

  const fetchNFTModuleMetaDataFromSanity = async () => {
    const marketItemsQuery = `*[_type == "marketItems" && contractAddress == "${collectionId}" ] {
      "imageUrl": profileImage.asset->url,
      "bannerImageUrl": bannerImage.asset->url,
      volumeTraded,
      createdBy,
      contractAddress,
      "creator": createdBy->userName,
      title, floorPrice,
      "allOwners": owners[]->,
      description
    }`;
    const collectionData = await sanityClient.fetch(marketItemsQuery);
    setCollection(collectionData[0]);
  };

  const nftModule = useMemo(() => {
    if (!provider) return;

    const sdk = new ThirdwebSDK(provider.getSigner());
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
    getAllNftOwners();
  }, [nftModule]);

  // Get the entire Marketplace in which NFTs are listed
  const marketPlaceModule = useMemo(() => {
    if (!provider) return;

    const sdk = new ThirdwebSDK(provider.getSigner());
    return sdk.getMarketplaceModule(NFT_MARKETPLACE_ADDRESS);
  }, [provider]);

  // Get all listings in the collection
  useEffect(() => {
    if (!marketPlaceModule) return;
    getListings();
  }, [marketPlaceModule]);

  // Create the NFT module on Sanity if not present for adding MetaData
  useEffect(() => {
    if (isEmpty(nfts) || isEmpty(nftModuleMetaData)) return;
    createNFTModuleOnSanity();
  }, [nfts, listings, nftModuleMetaData]);

  // Get the collection data
  useEffect(() => {
    fetchNFTModuleMetaDataFromSanity();
    getNftTransactionsTradedVolume();
  }, [collectionId]);

  const getFloorPrice = () => {
    const listedNftsFromModule = listings.filter((listing) =>
      nfts.map((nft) => nft.id).includes(listing.asset.id)
    );
    return min(
      listedNftsFromModule.map(
        (listing) => listing.buyoutCurrencyValuePerToken.displayValue
      )
    );
  };

  return (
    <RootLayout>
      {isEmpty(collection) || isEmpty(nfts) || isEmpty(listings) ? (
        <LineLoader />
      ) : (
        <Fragment>
          <div className={styles.bannerImageContainer}>
            <img
              className={styles.bannerImage}
              src={collection?.bannerImageUrl}
              alt="banner"
            />
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.midRow}>
              <img
                className={styles.profileImg}
                src={collection?.imageUrl}
                alt="profile image"
              />
            </div>
            <div className={styles.endRow}>
              <div className={styles.socialIconsContainer}>
                <div className={styles.socialIconsWrapper}>
                  <div className={styles.socialIconsContent}>
                    <div className={styles.socialIcon}>
                      <GlobalOutlined />
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.socialIcon}>
                      <InstagramOutlined />
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.socialIcon}>
                      <TwitterOutlined />
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.socialIcon}>
                      <MoreOutlined />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.midRow}>
              <div className={styles.title}>{collection?.title}</div>
            </div>
            <div className={styles.midRow}>
              <div className={styles.createdBy}>
                Created by{" "}
                <span className="text-[#2081e2]">{collection?.creator}</span>
              </div>
            </div>
            <div className={styles.midRow}>
              <div className={styles.statsContainer}>
                <div className={styles.collectionStat}>
                  <div className={styles.statValue}>{nfts.length}</div>
                  <div className={styles.statName}>items</div>
                </div>
                <div className={styles.collectionStat}>
                  <div className={styles.statValue}>
                    {nftOwners.length ?? 0}
                  </div>
                  <div className={styles.statName}>owners</div>
                </div>
                <div className={styles.collectionStat}>
                  <div className={styles.statValue}>
                    <img
                      src={ETH_SVG_PATH}
                      alt="eth"
                      className={styles.ethLogo}
                    />
                    {getFloorPrice()}
                  </div>
                  <div className={styles.statName}>floor price</div>
                </div>
                <div className={styles.collectionStat}>
                  <div className={styles.statValue}>
                    <img
                      src={ETH_SVG_PATH}
                      alt="eth"
                      className={styles.ethLogo}
                    />
                    {Math.ceil(nftCollectionTradedVolume)}
                  </div>
                  <div className={styles.statName}>volume traded</div>
                </div>
              </div>
            </div>
            <div className={styles.midRow}>
              <div className={styles.description}>
                {collection?.description}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap px-5">
            {nfts?.map((nftItem) => (
              <NFTCard
                key={nftItem.id}
                nftItem={nftItem}
                title={collection?.title}
                listings={listings}
                collectionId={collectionId}
              />
            ))}
          </div>
        </Fragment>
      )}
    </RootLayout>
  );
};

export default Collection;
