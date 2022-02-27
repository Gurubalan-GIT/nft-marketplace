import { useWeb3 } from "@3rdweb/hooks";
import { LoginOutlined, TagFilled, WalletOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import { client as sanityClient } from "../../lib/sanity-client";

const style = {
  button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
  buttonIcon: `text-xl mr-2`,
  buttonText: `ml-2 text-lg font-semibold`,
};

const PurchaseNFT = ({
  isListed,
  selectedNft,
  listings,
  marketPlaceModule,
  price,
  nftTransactions,
  setNftTransactions,
  nftOwner,
}) => {
  const [selectedMarketNft, setSelectedMarketNft] = useState();
  const [enableButton, setEnableButton] = useState(false);
  const [buyingNFT, setBuyingNFT] = useState(false);
  const [isListedStatus, setIsListedStatus] = useState(isListed);
  const { address } = useWeb3();
  const router = useRouter();
  const { collectionId, nftId } = router.query;

  useEffect(() => {
    if (!listings || !isListed) return;
    setSelectedMarketNft(
      listings.find((marketNft) => marketNft.asset?.id === selectedNft.id)
    );
  }, [selectedNft, listings, isListed]);

  useEffect(() => {
    if (!selectedMarketNft || !selectedNft) return;

    setEnableButton(true);
  }, [selectedMarketNft, selectedNft]);

  const createTransactionOnSanity = async () => {
    const transactionDoc = {
      _type: "transactions",
      price: Number(price),
      sellerContractAddress: selectedMarketNft?.sellerAddress,
      buyerContractAddress: address,
      marketPlaceContractAddress: collectionId,
      nftId: Number(nftId),
    };
    const transactionData = await sanityClient.create(transactionDoc);
    const updatedNftTransactionsData = [...nftTransactions];
    updatedNftTransactionsData.unshift(transactionData);
    setNftTransactions(updatedNftTransactionsData);
  };

  const confirmPurchase = () => {
    setBuyingNFT(false);
    setIsListedStatus(false);
    createTransactionOnSanity();
    message.success({
      content: `Purchase successful`,
      type: "success",
      duration: 2,
      className: "flex flex-col items-center justify-center",
      icon: <LoginOutlined />,
    });
  };

  const buyItem = async (
    listingId = selectedMarketNft.id,
    quantityDesired = 1,
    module = marketPlaceModule
  ) => {
    setBuyingNFT(true);
    try {
      await module.buyoutDirectListing({
        listingId: listingId,
        quantityDesired: quantityDesired,
      });
      confirmPurchase();
    } catch (error) {
      setBuyingNFT(false);
      console.warn(error);
    }
  };

  return (
    <div className="flex h-fit w-full items-center rounded-lg border border-[#151c22] bg-[#303339] px-12 py-2">
      {isListedStatus ? (
        <Button
          icon={<WalletOutlined className={style.buttonIcon} />}
          onClick={() => buyItem(selectedMarketNft.id, 1)}
          className="bg-[#2081e2] hover:bg-[#42a0ff] text-white px-12 py-2 rounded-lg cursor-pointer mr-8 flex items-center"
          type="primary"
          size="large"
          disabled={!enableButton}
          loading={buyingNFT}
        >
          <div>{price} ETH Buy Now</div>
        </Button>
      ) : (
        <Fragment>
          {nftOwner === address ? (
            <div className="flex-col">
              <div className="mb-2">
                You Own this NFT and can list this on Testnet OpenSea.
              </div>
              <a
                href={`https://testnets.opensea.io/assets/${collectionId}/${nftId}`}
                className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff] items-center justify-center hover:text-white`}
              >
                <WalletOutlined className={style.buttonIcon} />
                <div className={style.buttonText}>List Item</div>
              </a>
            </div>
          ) : (
            <div className="flex-col">
              <div className="mb-2">
                This NFT has been purchased. You can make an offer on TestNet
                OpenSea.
              </div>
              <a
                href={`https://testnets.opensea.io/assets/${collectionId}/${nftId}`}
                className={`${style.button} border border-[#151c22]  bg-[#363840] hover:bg-[#4c505c] items-center justify-center hover:text-white`}
              >
                <TagFilled className={style.buttonIcon} />
                <div className={style.buttonText}>Make Offer</div>
              </a>
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default PurchaseNFT;
