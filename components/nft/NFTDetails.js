import {
  HeartOutlined,
  MoreOutlined,
  ReloadOutlined,
  SelectOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

const style = {
  wrapper: `flex`,
  infoContainer: `h-36 flex flex-col flex-1 justify-between mb-6`,
  accent: `text-[#2081e2]`,
  nftTitle: `text-3xl font-extrabold`,
  otherInfo: `flex`,
  ownedBy: `text-[#8a939b] mr-4`,
  likes: `flex items-center text-[#8a939b`,
  likeIcon: `mr-1`,
  actionButtonsContainer: `w-44`,
  actionButtons: `flex container justify-between text-[1.4rem] border-2 rounded-lg`,
  actionButton: `py-2 flex items-center w-full justify-center rounded-xl hover:cursor-pointer hover:bg-[#000000]`,
  divider: `border-r-2`,
};

const NFTDetails = ({ selectedNft, nftModuleMetaData, nftOwner }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.infoContainer}>
        <div className={style.accent}>{nftModuleMetaData?.metadata?.name}</div>
        <div className={style.nftTitle}>{selectedNft?.name}</div>
        <div className={style.otherInfo}>
          {nftOwner && (
            <div className={style.ownedBy}>
              Owned by{" "}
              <a
                href={`https://rinkeby.etherscan.io/address/${nftOwner}`}
                className={style.accent}
              >
                {nftOwner}
              </a>
            </div>
          )}
          <div className={style.likes}>
            <HeartOutlined className={style.likeIcon} />
            <span> 2.3K favorites</span>
          </div>
        </div>
      </div>
      <div className={style.actionButtonsContainer}>
        <div className={style.actionButtons}>
          <div className={style.actionButton}>
            <ReloadOutlined />
          </div>
          <div className={style.divider} />
          <div className={style.actionButton}>
            <SelectOutlined />
          </div>
          <div className={style.divider} />
          <div className={style.actionButton}>
            <ShareAltOutlined />
          </div>
          <div className={style.divider} />
          <div className={style.actionButton}>
            <MoreOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDetails;
