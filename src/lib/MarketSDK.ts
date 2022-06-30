import Web3 from "web3";
import { Addrs } from "..";
import MarketAdmin from "./MarketAdmin";

export interface MarketOptions {
  poolDirectory: string;
  poolLens: string;
  marketLens: string;
  blocksPerMin: number;
};

class MarketSDK {
  readonly web3: Web3;
  options?: Partial<MarketOptions>;

  constructor(web3: Web3, options?: Partial<MarketOptions>){
    this.web3 = web3;
    this.options = options;
  }
  isMarketAdmin(address: string): Promise<boolean> {
    return new MarketAdmin(this, address).isMarketAdmin();
  }
  async init(){
    if(!this.options){
      const chainId = await this.web3.eth.getChainId() as keyof typeof Addrs;

      // @ts-ignore
      if (Addrs[chainId].v2) {
        this.options = {
          // @ts-ignore
          poolDirectory: Addrs[chainId].v2.poolDirectory,
          // @ts-ignore
          poolLens: Addrs[chainId].v2.poolLens,
          // @ts-ignore
          marketLens: Addrs[chainId].v2.marketLens,
          blocksPerMin: Addrs[chainId].blocksPerMin
        };
      // @ts-ignore
      } else if(Addrs[chainId].v1) {
        this.options = {
          // @ts-ignore
          poolDirectory: Addrs[chainId].v1.poolDirectory,
          // @ts-ignore
          poolLens: Addrs[chainId].v1.poolLens,
          // @ts-ignore
          marketLens: Addrs[chainId].v1.marketLens,
          blocksPerMin: Addrs[chainId].blocksPerMin
        };
      }
    }
  }

  checkInit(){
    if(!this.options){
      throw new Error("SDK not initialized");
    }
  }
  static async init(web3: Web3, options?: Partial<MarketOptions>){
    const sdk = new MarketSDK(web3, options);
    await sdk.init();

    return sdk;
  }
}

export default MarketSDK;
