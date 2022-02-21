import { useWeb3 } from "@3rdweb/hooks";
import {
  SearchOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import openseaLogo from "../assets/opensea.png";

const styles = {
  wrapper: `bg-[#04111d] w-full px-[1.2rem] py-[0.8rem] flex `,
  logoContainer: `flex items-center cursor-pointer`,
  logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
  searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
  searchIcon: `text-[#8a939b] mx-3 flex items-center font-bold text-lg`,
  searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
  navItems: ` flex items-center justify-end`,
  navItem: `text-white px-4 font-bold flex items-center text-[#c8cacd] hover:text-white cursor-pointer`,
  navIcon: `text-[#8a939b] text-xl flex items-center font-black px-4 hover:text-white cursor-pointer`,
  loginButton: `bg-[#fafafa] flex items-center justify-center font-[#04111d] font-bold px-4 cursor-pointer rounded-md px-2 py-1 hover:bg-[#e6e8eb]`,
};

const Navbar = () => {
  const { address, connectWallet, disconnectWallet } = useWeb3();
  return (
    <Row className={styles.wrapper}>
      <Link passHref href="/">
        <div className={styles.logoContainer}>
          <Image alt="logo" src={openseaLogo} height={40} width={40} />
          <div className={styles.logoText}>Opensea</div>
        </div>
      </Link>
      <div className={styles.searchBar}>
        <div className={styles.searchIcon}>
          <SearchOutlined />
        </div>
        <input
          className={styles.searchInput}
          placeholder="Search items, collections, and accounts"
        />
      </div>
      <div className={styles.navItems}>
        <Link
          passHref
          href="/collections/0x66a576A977b7Bccf510630E0aA5e450EC11361Fa"
        >
          <div className={styles.navItem}> Collections </div>
        </Link>
        <div className={styles.navItem}> Stats </div>
        <div className={styles.navItem}> Resources </div>
        <div className={styles.navItem}> Create </div>
        {address ? (
          <Fragment>
            <div className={styles.navIcon}>
              <UserOutlined />
            </div>
            <div className={styles.navIcon}>
              <WalletOutlined />
            </div>
          </Fragment>
        ) : (
          <button
            onClick={() => connectWallet("injected")}
            className={styles.loginButton}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </Row>
  );
};

export default Navbar;
