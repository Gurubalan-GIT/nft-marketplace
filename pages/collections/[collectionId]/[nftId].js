import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import LineLoader from "../../../components/LineLoader";
import NFTActivity from "../../../components/nft/NFTActivity";
import NFTDetails from "../../../components/nft/NFTDetails";
import NFTImage from "../../../components/nft/NFTImage";
import PurchaseNFT from "../../../components/nft/NFTPurchase";
import RootLayout from "../../../Layout/RootLayout";
import { client as sanityClient } from "../../../lib/sanity-client";
import { NFT_MARKETPLACE_ADDRESS } from "../../../localization";

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
};

const Nft = () => {
  const { provider } = useWeb3();
  const [selectedNft, setSelectedNft] = useState();
  const [listings, setListings] = useState([]);
  const [nftTransactions, setNftTransactions] = useState([]);
  const router = useRouter();
  const { collectionId, nftId } = router.query;

  const getSelectedNftFromCollection = async () => {
    try {
      const nfts = await nftModule.getAll();
      const selectedNftItem = nfts.find((nft) => nft.id === router.query.nftId);
      if (!selectedNftItem) {
        router.push("/404");
      }
      setSelectedNft(selectedNftItem);
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

  const getAllNftTransactions = async () => {
    const nftTransactionsQuery = `*[_type == "transactions" && marketPlaceContractAddress == "${collectionId}" && nftId == ${Number(
      nftId
    )} ]{
      price,
      sellerContractAddress,
      buyerContractAddress,
      _createdAt
     }`;
    try {
      const nftTransactionsData = await sanityClient.fetch(
        nftTransactionsQuery
      );
      if (nftTransactionsData) setNftTransactions(nftTransactionsData);
    } catch (error) {
      console.warn(error);
    }
  };

  // Get the NFT Collection
  const nftModule = useMemo(() => {
    if (!provider) return;

    const sdk = new ThirdwebSDK(provider.getSigner());
    return sdk.getNFTModule(collectionId);
  }, [provider]);

  // get all NFTs in the collection
  useEffect(() => {
    if (!nftModule) return;
    getSelectedNftFromCollection();
  }, [nftModule]);

  const marketPlaceModule = useMemo(() => {
    if (!provider) return;
    const sdk = new ThirdwebSDK(provider.getSigner());
    return sdk.getMarketplaceModule(NFT_MARKETPLACE_ADDRESS);
  }, [provider]);

  // Get Listed NFTs from Marketplace
  useEffect(() => {
    if (!marketPlaceModule) return;
    getListings();
  }, [marketPlaceModule]);

  useEffect(() => {
    getAllNftTransactions();
  });

  return (
    <RootLayout>
      {isEmpty(listings) || !marketPlaceModule || !selectedNft ? (
        <LineLoader />
      ) : (
        <Fragment>
          <div className={style.wrapper}>
            <div className={style.container}>
              <div className={style.topContent}>
                <div className={style.nftImgContainer}>
                  <NFTImage selectedNft={selectedNft} />
                </div>
                <div className={style.detailsContainer}>
                  <NFTDetails
                    isListed={
                      listings.find(
                        (listing) => listing.asset.id === selectedNft.id
                      ) ?? false
                    }
                    selectedNft={selectedNft}
                    listings={listings}
                  />
                  <PurchaseNFT
                    nftTransactions={nftTransactions}
                    setNftTransactions={setNftTransactions}
                    isListed={
                      listings.find(
                        (listing) => listing.asset.id === selectedNft.id
                      ) ?? false
                    }
                    selectedNft={selectedNft}
                    listings={listings}
                    marketPlaceModule={marketPlaceModule}
                    price={
                      listings.find(
                        (listing) => listing.asset.id === selectedNft.id
                      )?.buyoutCurrencyValuePerToken?.displayValue
                    }
                  />
                </div>
              </div>
              <NFTActivity
                nftTransactions={nftTransactions}
                setNftTransactions={setNftTransactions}
              />
            </div>
          </div>
        </Fragment>
      )}
    </RootLayout>
  );
};

export default Nft;
