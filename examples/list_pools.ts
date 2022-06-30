import { MarketSDK, PoolDirectoryV1 } from "../src";
import Web3 from "web3";
import { DEFAULT_RPC } from "./utils";

(async function () {
  const web3 = new Web3(DEFAULT_RPC);
  const sdk = await MarketSDK.init(web3);

  const directory = new PoolDirectoryV1(sdk, sdk.options!.poolDirectory!);
  const pools = await directory.getAllPools();

  console.log(pools); // list all pools on the polygon network
})();
