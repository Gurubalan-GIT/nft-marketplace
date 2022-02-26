import { DatabaseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { useState } from "react";
import { transactionTableColumns } from "../../utils/constants";
const style = {
  wrapper: `w-full mt-8 border border-[#151b22] rounded-xl bg-[#fafafa] overflow-hidden`,
  title: `bg-[#fafafa] px-6 py-4 flex items-center hover:cursor-pointer`,
  titleLeft: `flex-1 flex items-center text-xl font-bold text-black`,
  titleIcon: `text-3xl mr-2 flex items-center justify-center text-black`,
  titleRight: `text-xl hover:cursor-pointer text-black`,
  eventItem: `flex px-4`,
  ethLogo: `h-5 mr-2`,
  accent: `text-[#2081e2]`,
};

const NFTActivity = ({ nftTransactions, setNftTransactions }) => {
  const [toggle, setToggle] = useState(true);

  const getTransactionDataSource = () => {
    let transactionDataSource = [];
    nftTransactions.map((transaction, transactionIndex) => {
      transactionDataSource.push({
        key: transactionIndex,
        price: transaction.price,
        from: transaction.sellerContractAddress,
        to: transaction.buyerContractAddress,
        date: transaction._createdAt,
      });
    });
    return transactionDataSource;
  };

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
          <Table
            columns={transactionTableColumns}
            dataSource={getTransactionDataSource(nftTransactions)}
          />
        </div>
      )}
    </div>
  );
};

export default NFTActivity;
