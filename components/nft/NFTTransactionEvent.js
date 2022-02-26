import { ShoppingCartOutlined } from "@ant-design/icons";
import { ETH_SVG_PATH } from "../../localization";

const style = {
  eventItem: `flex px-4 py-5 font-medium`,
  event: `flex items-center`,
  eventIcon: `mr-2 text-xl flex items-center justify-center`,
  eventName: `text-lg font-semibold`,
  eventPrice: `flex items-center`,
  eventPriceValue: `text-lg`,
  ethLogo: `h-5 mr-2`,
  accent: `text-[#2081e2]`,
};

const NFTTransactionEvent = ({ event }) => {
  return (
    <div className={style.eventItem}>
      <div className={`${style.event} flex-[2]`}>
        <div className={style.eventIcon}>
          <ShoppingCartOutlined />
        </div>
        <div className={style.eventName}>Sale</div>
      </div>
      <div className={`${style.eventPrice} flex-[2]`}>
        <img src={ETH_SVG_PATH} alt="eth" className={style.ethLogo} />
        <div className={style.eventPriceValue}>{event.price}</div>
      </div>
      <div className={`${style.accent} flex-[3]`}>{event.from}</div>
      <div className={`${style.accent} flex-[3]`}>{event.to}</div>
      <div className={`${style.accent} flex-[2]`}>{event.date}</div>
    </div>
  );
};

export default NFTTransactionEvent;
