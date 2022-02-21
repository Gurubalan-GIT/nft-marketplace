import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import "../styles/globals.css";

// Chain ID 4 is the Rinkeby Testnet which we are using for development.
// "Injected" connector is a web3 connection method used by Metamask.

const supportedChainIds = [4];
const connectors = {
  injected: {},
};

const RootWrapper = ({ Component, pageProps }) => {
  return (
    <ThirdwebWeb3Provider
      supportedChainIds={supportedChainIds}
      connectors={connectors}
    >
      <Component {...pageProps} />
    </ThirdwebWeb3Provider>
  );
};

export default RootWrapper;
