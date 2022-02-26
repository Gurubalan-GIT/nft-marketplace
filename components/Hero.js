/* eslint-disable @next/next/no-img-element */
import { useWeb3 } from "@3rdweb/hooks";
import React from "react";
import { Fragment } from "react/cjs/react.production.min";

const style = {
  wrapper: `relative`,
  container: `before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://lh3.googleusercontent.com/ujepnqpnL0nDQIHsWxlCXzyw4pf01yjz1Jmb4kAQHumJAPrSEj0-e3ABMZlZ1HEpJoqwOcY_kgnuJGzfXbd2Tijri66GXUtfN2MXQA=s250')] before:bg-cover before:bg-center before:opacity-30 before:blur`,
  contentWrapper: `flex h-screen relative justify-center flex-wrap items-center`,
  copyContainer: `w-1/2`,
  title: `relative text-white text-[46px] font-semibold`,
  description: `text-[#8a939b] container-[400px] text-2xl mt-[0.8rem] mb-[2.5rem]`,
  ctaContainer: `flex`,
  accentedButton: ` relative text-lg font-semibold px-12 py-4 bg-[#2181e2] rounded-lg mr-5 text-white hover:bg-[#42a0ff] cursor-pointer`,
  button: ` relative text-lg font-semibold px-12 py-4 bg-[#363840] rounded-lg mr-5 text-[#e4e8ea] hover:bg-[#4c505c] cursor-pointer`,
  cardContainer: `rounded-[3rem] bg-[#313338] hover:bg-black cursor-pointer`,
  infoContainer: `h-20 bg-[#1e1e1e] p-4 rounded-b-lg flex items-center text-white hover:bg-black cursor-pointer`,
  author: `flex flex-col justify-center ml-4`,
  name: ``,
  infoIcon: `flex justify-end items-center flex-1 text-[#8a939b] text-3xl font-bold`,
};

const Hero = ({ nftModuleMetaData }) => {
  const { address, connectWallet } = useWeb3();

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.contentWrapper}>
          <div className={style.copyContainer}>
            <div className={style.title}>
              Discover, collect, and sell extraordinary NFTs
            </div>
            <div className={style.description}>
              OpenSea is the world&apos;s first and largest NFT marketplace
            </div>
            <div className={style.ctaContainer}>
              {address ? (
                <Fragment>
                  <button className={style.accentedButton}>Explore</button>
                  <button className={style.button}>Create</button>
                </Fragment>
              ) : (
                <button
                  onClick={() => connectWallet("injected")}
                  className={style.accentedButton}
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
          <a
            href={`/collections/${nftModuleMetaData?.address}`}
            className={style.cardContainer}
          >
            <img
              className="rounded-t-lg"
              src={nftModuleMetaData?.metadata?.image}
              width="500px"
              alt="hero-bg"
            />
            <div className={style.infoContainer}>
              <img
                className="h-[2.25rem] rounded-full"
                src="https://lh3.googleusercontent.com/qQj55gGIWmT1EnMmGQBNUpIaj0qTyg4YZSQ2ymJVvwr_mXXjuFiHJG9d3MRgj5DVgyLa69u8Tq9ijSm_stsph8YmIJlJQ1e7n6xj=s64"
                alt="hero-asset"
              />
              <div className={style.author}>
                <span>{nftModuleMetaData?.metadata?.name}</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
