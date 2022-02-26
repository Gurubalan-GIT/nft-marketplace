import { DatabaseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { useState } from "react";
import { dummyTransactionEvents } from "../../utils/constants";
import NFTTransactionEvent from "./NFTTransactionEvent";
const style = {
  wrapper: `w-full mt-8 border border-[#151b22] rounded-xl bg-[#303339] overflow-hidden`,
  title: `bg-[#262b2f] px-6 py-4 flex items-center`,
  titleLeft: `flex-1 flex items-center text-xl font-bold`,
  titleIcon: `text-3xl mr-2 flex items-center justify-center`,
  titleRight: `text-xl hover:cursor-pointer`,
  tableHeader: `flex w-full bg-[#262b2f] border-y border-[#151b22] px-4 py-1`,
  eventItem: `flex px-4`,
  ethLogo: `h-5 mr-2`,
  accent: `text-[#2081e2]`,
};

const NFTActivity = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <div className={style.wrapper}>
      <div className={style.title} onClick={() => setToggle(!toggle)}>
        <div className={style.titleLeft}>
          <span className={style.titleIcon}>
            <DatabaseOutlined />
          </span>
          Item Activity
        </div>
        <div className={style.titleRight}>
          {toggle ? <UpOutlined /> : <DownOutlined />}
        </div>
      </div>
      {toggle && (
        <div className={style.activityTable}>
          <div className={style.tableHeader}>
            <div className={`${style.tableHeaderElement} flex-[2]`}>Event</div>
            <div className={`${style.tableHeaderElement} flex-[2]`}>Price</div>
            <div className={`${style.tableHeaderElement} flex-[3]`}>From</div>
            <div className={`${style.tableHeaderElement} flex-[3]`}>To</div>
            <div className={`${style.tableHeaderElement} flex-[2]`}>Date</div>
          </div>
          {dummyTransactionEvents.map((event, id) => (
            <NFTTransactionEvent key={id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NFTActivity;
