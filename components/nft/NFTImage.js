import { HeartOutlined, RadarChartOutlined } from "@ant-design/icons";

const style = {
  topBar: `bg-[#303339] p-2 rounded-t-lg border-[#151c22] border`,
  topBarContent: `flex items-center`,
  likesCounter: `flex-1 flex items-center justify-end`,
  nftImage: `w-full h-full`,
};

const NFTImage = ({ selectedNft }) => {
  return (
    <div>
      <div className={style.topBar}>
        <div className={style.topBarContent}>
          <RadarChartOutlined />
          <div className={style.likesCounter}>
            <HeartOutlined />
            2.3K
          </div>
        </div>
      </div>
      <div>
        <img src={selectedNft?.image} className={style.nftImage} alt="nft" />
      </div>
    </div>
  );
};

export default NFTImage;
