import { useWeb3 } from "@3rdweb/hooks";
import React from "react";

const ConnectWallet = () => {
  const { connectWallet } = useWeb3();
  return (
    <div className="flex h-screen relative justify-center flex-wrap items-center">
      <div className="container-[400px]">
        <div
          onClick={() => connectWallet("injected")}
          className="w-full relative text-lg font-semibold px-12 py-4 bg-[#2181e2] rounded-lg mr-5 text-white hover:bg-[#42a0ff] cursor-pointer"
        >
          Connect Your Wallet
        </div>
        <div className="flex-col text-white mt-[20px] bg-black rounded-md px-10 py-10 w-full">
          <p className="text-red-500">Disclaimers:</p>
          <p>
            Please use a chrome based browser with a Metamask wallet account.
          </p>
          <p>Use the Test Chain Rinkeby ETH.</p>
          <p>
            You can get Rinkeby ETH from{" "}
            <a className="text-blue-400" href="https://fauceth.komputing.org/">
              here
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
