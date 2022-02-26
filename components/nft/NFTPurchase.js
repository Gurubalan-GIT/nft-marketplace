import { LoginOutlined, WalletOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { useEffect, useState } from "react";

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
}) => {
  const [selectedMarketNft, setSelectedMarketNft] = useState();
  const [enableButton, setEnableButton] = useState(false);
  const [buyingNFT, setBuyingNFT] = useState(false);
  const [isListedStatus, setIsListedStatus] = useState(isListed);

  useEffect(() => {
    if (!listings || isListed === "false") return;
    (async () => {
      setSelectedMarketNft(
        listings.find((marketNft) => marketNft.asset?.id === selectedNft.id)
      );
    })();
  }, [selectedNft, listings, isListed]);

  useEffect(() => {
    if (!selectedMarketNft || !selectedNft) return;

    setEnableButton(true);
  }, [selectedMarketNft, selectedNft]);

  const confirmPurchase = () => {
    setBuyingNFT(false);
    setIsListedStatus("false");
    message.success({
      content: `Welcome back ${result?.userName}!`,
      type: "success",
      duration: 2,
      className: "flex flex-col items-center justify-center ",
      icon: <LoginOutlined />,
    });
  };

  const buyItem = async (
    listingId = selectedMarketNft.id,
    quantityDesired = 1,
    module = marketPlaceModule
  ) => {
    setBuyingNFT(true);
    console.log(listingId, quantityDesired, module, "david");
    try {
      const result = await module.buyoutDirectListing({
        listingId: listingId,
        quantityDesired: quantityDesired,
      });
      console.log("result", result);
      confirmPurchase();
    } catch (error) {
      setBuyingNFT(false);
      console.warn(error);
    }
  };

  console.log("here", selectedMarketNft);

  return (
    <div className="flex h-20 w-full items-center rounded-lg border border-[#151c22] bg-[#303339] px-12">
      {isListedStatus === "true" ? (
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
        <div className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}>
          <WalletOutlined className={style.buttonIcon} />
          <div className={style.buttonText}>List Item</div>
        </div>
      )}
    </div>
  );
};

export default PurchaseNFT;
