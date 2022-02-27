/* eslint-disable @next/next/no-img-element */
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Fragment } from "react";
import { ETH_SVG_PATH } from "../localization";
import { getTimeElapsedWithPerspective } from "./helpers";

export const transactionTableColumns = [
  {
    title: "Event",
    dataIndex: "event",
    key: "event",
    render: () => (
      <Fragment>
        <div className="flex items-center justify-start">
          <div className="mr-2 text-xl flex items-center justify-center">
            <ShoppingCartOutlined />
          </div>
          <div className="text-lg font-semibold">Sale</div>
        </div>
      </Fragment>
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price) => (
      <div className="flex items-center">
        <img src={ETH_SVG_PATH} alt="eth" className="h-5 mr-2" />
        <div>{price}</div>
      </div>
    ),
  },
  {
    title: "From",
    dataIndex: "from",
    key: "from",
    ellipsis: true,
    render: (from) => (
      <a href={`https://rinkeby.etherscan.io/address/${from}`}>{from}</a>
    ),
  },
  {
    title: "To",
    dataIndex: "to",
    key: "to",
    ellipsis: true,
    render: (to) => (
      <a href={`https://rinkeby.etherscan.io/address/${to}`}>{to}</a>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (date) => (
      <div>
        {Math.floor(getTimeElapsedWithPerspective(date).value)}{" "}
        {getTimeElapsedWithPerspective(date).timeUnit} ago
      </div>
    ),
  },
];
