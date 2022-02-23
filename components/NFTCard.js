import { useState } from "react";

const styles = {
  wrapper: `bg-[#303339] flex-auto w-[14rem] h-[22rem] my-10 mx-5 rounded-2xl overflow-hidden cursor-pointer`,
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

const NFTCard = ({ nftItem, title, listings }) => {
  const [isListed, setIsListed] = useState(false);
  const [price, setPrice] = useState(0);

  // useEffect(() => {
  //   const listing = listings.find((listing) => listing.asset.id === nftItem.id)
  //   if (Boolean(listing)) {
  //     setIsListed(true)
  //     setPrice(listing.buyoutCurrencyValuePerToken.displayValue)
  //   }
  // }, [listings, nftItem])

  return (
    <div
      className={styles.wrapper}
      // onClick={() => {
      //   Router.push({
      //     pathname: `/nfts/${nftItem.id}`,
      //     query: { isListed: isListed },
      //   })
      // }}
    >
      <div className={styles.imgContainer}>
        <img src={nftItem.image} alt={nftItem.name} className={styles.nftImg} />
      </div>
      {/* <div className={styles.details}>
        <div className={styles.info}>
          <div className={styles.infoLeft}>
            <div className={styles.collectionName}>{title}</div>
            <div className={styles.assetName}>{nftItem.name}</div>
          </div>
          {isListed && (
            <div className={styles.infoRight}>
              <div className={styles.priceTag}>Price</div>
              <div className={styles.priceValue}>
                <img
                  src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="eth"
                  className={styles.ethLogo}
                />
                {price}
              </div>
            </div>
          )}
        </div>
        <div className={styles.likes}>
          <span className={styles.likeIcon}>
            <BiHeart />
          </span>{' '}
          {nftItem.likes}
        </div>
      </div> */}
    </div>
  );
};

export default NFTCard;
