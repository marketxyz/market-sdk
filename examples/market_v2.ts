import Web3 from "web3";
import { MarketSDK, MarketAddrs } from "../src";

(async () => {
  const web3 = new Web3("https://matic-mainnet-full-rpc.bwarelabs.com");
  const chainId = await web3.eth.getChainId();
  const sdk = await MarketSDK.init(web3, MarketAddrs[chainId].v2); // default value for options is MarketAddrs[await web3.eth.getChainId()].v1

  // use sdk here. v2 addresses are not added to the sdk yet, this example will break
})();
