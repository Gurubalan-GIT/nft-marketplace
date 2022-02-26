import { useWeb3 } from "@3rdweb/hooks";
import { LoginOutlined, WalletOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
}) => {
  const [selectedMarketNft, setSelectedMarketNft] = useState();
  const [enableButton, setEnableButton] = useState(false);
  const [buyingNFT, setBuyingNFT] = useState(false);
  const [isListedStatus, setIsListedStatus] = useState(isListed);
  const { address } = useWeb3();
  const router = useRouter();

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
      marketPlaceContractAddress: router.query.collectionId,
      nftId: Number(router.query.nftId),
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
    <div className="flex h-20 w-full items-center rounded-lg border border-[#151c22] bg-[#303339] px-12">
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
        <div>This is a one of one NFT and is already purchased.</div>
      )}
    </div>
  );
};

export default PurchaseNFT;
