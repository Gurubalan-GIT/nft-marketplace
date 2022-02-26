import { HeartOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ETH_SVG_PATH } from "../localization";
const styles = {
  wrapper: `bg-[#303339] flex-auto w-[14rem] h-[22rem] my-10 mx-5 overflow-hidden hover:cursor-pointer hover:bg-[#000000]`,
  imgContainer: `h-2/3 w-full overflow-hidden flex justify-center items-center`,
  nftImg: `w-full object-cover`,
  details: `p-3`,
  info: `flex justify-between text-[#e4e8eb] drop-shadow-xl`,
  infoLeft: `flex-0.6 flex-wrap`,
  collectionName: `font-semibold text-sm text-[#8a939b]`,
  assetName: `font-bold text-lg mt-2`,
  infoRight: `flex-0.4 text-right`,
  priceTag: `font-semibold text-sm text-[#8a939b]`,
  priceValue: `flex items-center text-xl font-bold mt-2`,
  ethLogo: `h-5 mr-2`,
  likes: `text-[#8a939b] font-bold flex items-center w-full justify-end mt-3`,
  likeIcon: `text-xl mr-2`,
};

const NFTCard = ({ nftItem, title, listings, collectionId }) => {
  const [isListed, setIsListed] = useState(false);
  const [price, setPrice] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const listing = listings.find((listing) => listing.asset.id === nftItem.id);
    if (Boolean(listing)) {
      setIsListed(true);
      setPrice(listing.buyoutCurrencyValuePerToken.displayValue);
    }
  }, [listings, nftItem]);

  return (
    <div
      className={styles.wrapper}
      onClick={() => {
        router.push({
          pathname: `/collections/${collectionId}/${nftItem.id}`,
          query: { isListed: isListed },
        });
      }}
    >
      <div className={styles.imgContainer}>
        <img src={nftItem.image} alt={nftItem.name} className={styles.nftImg} />
      </div>
      <div className={styles.details}>
        <div className={styles.info}>
          <div className={styles.infoLeft}>
            <div className={styles.collectionName}>{title}</div>
            <div className={styles.assetName}>{nftItem.name}</div>
          </div>
          {isListed && (
            <div className={styles.infoRight}>
              <div className={styles.priceTag}>Price</div>
              <div className={styles.priceValue}>
                <img src={ETH_SVG_PATH} alt="eth" className={styles.ethLogo} />
                {price}
              </div>
            </div>
          )}
        </div>
        <div className={styles.likes}>
          <span className={styles.likeIcon}>
            <HeartOutlined />
          </span>{" "}
          {nftItem.likes}
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
