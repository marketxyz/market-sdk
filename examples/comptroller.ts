import { MarketSDK, PoolDirectoryV1 } from "../src";
import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";
import { DEFAULT_RPC, getPrivateKey } from "./utils";

(async function () {
  try {
    const provider = new HDWalletProvider(getPrivateKey(), DEFAULT_RPC);
    const web3 = new Web3(provider);
    const sdk = await MarketSDK.init(web3);

    const directory = new PoolDirectoryV1(sdk, sdk.options!.poolDirectory);
    const pools = await directory.getAllPools();
    const comptroller = pools[0].comptroller;
    const admin = await comptroller.admin();

    // Use any comtroller method
    console.log(await comptroller.adminHasRights());
    console.log(
      await comptroller._setLiquidationIncentive(10, { from: admin })
    );
  } catch (error) {
    console.error(error);
  }
})();
