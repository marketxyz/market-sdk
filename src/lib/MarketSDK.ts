import Web3 from "web3";
import BN from "bn.js";

import Comptroller from "./Comptroller";
import MarketAdmin from "./MarketAdmin";
import CToken from "./CToken";
import PoolDirectory from "./PoolDirectory";

import { Pool, PoolAsset } from "./Pool";
import { PoolLensV1, PoolLensV2 } from "./PoolLens";

import MarketAddrs from "../constants/addrs";

export interface MarketOptions {
  poolDirectory: string;
  poolLens: string;
};

class MarketSDK {
  readonly web3: Web3;
  options?: MarketOptions;

  poolDirectory?: PoolDirectory;

  lens: {
    v1?: PoolLensV1,
    v2?: PoolLensV2
  } = {};

  constructor(web3: Web3, options?: MarketOptions){
    this.web3 = web3;
    this.options = options;
  }

  private checkInit(){
    if(!this.poolDirectory || !this.lens.v1){
      throw new Error("MarketSDK not initialized");
    }
  }

  async init(){
    if(!this.options){
      const chainId = await this.web3.eth.getChainId();
      this.options = MarketAddrs[chainId as keyof typeof MarketAddrs].v1;
    }
    const lensV1Address = this.options.poolLens;
    const poolDirectoryAddress = this.options.poolDirectory;

    this.lens.v1 = new PoolLensV1(this, lensV1Address);
    this.poolDirectory = new PoolDirectory(this, poolDirectoryAddress);
  }

  getAllPools(): Promise<{
    indexes: BN[];
    pools: Pool[];
    totalSupply: BN[];
    totalBorrow: BN[];
    underlyingTokens: string[][];
    underlyingSymbols: string[][];
    errored: boolean[];
  }> {
    this.checkInit();
    return this.lens.v1!.getPublicPoolsWithData();
  }

  getPoolsByOwner(owner: string){
    // TODO: implement
  }

  getPoolAssetsWithData(comptroller: Comptroller | string): Promise<PoolAsset[]> {
    this.checkInit();
    return this.lens.v1!.getPoolAssetsWithData(comptroller);
  }

  getCToken(address: string): CToken {
    return new CToken(this, address);
  }

  isMarketAdmin(address: string): Promise<boolean> {
    return new MarketAdmin(this, address).isMarketAdmin();
  }

  static async init(web3: Web3, options?: MarketOptions){
    const sdk = new MarketSDK(web3, options);
    await sdk.init();

    return sdk;
  }
}

export default MarketSDK;
