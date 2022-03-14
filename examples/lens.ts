import { MarketSDK } from "../src";
import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";
import { DEFAULT_RPC } from "./utils";

(async function () {
  try {
    const web3 = new Web3(DEFAULT_RPC);
    const sdk = await MarketSDK.init(web3);

    console.log(await sdk.lens.v1?.getPublicPoolsWithData());
  } catch (error) {
    console.error(error);
  }
})();
