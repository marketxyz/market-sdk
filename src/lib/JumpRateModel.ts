import MarketSDK from "./MarketSDK";
import { JumpRateModel as JumpRateModelWeb3Interface } from "../types/JumpRateModel";
import JumpRateModelArtifact from "../abi/JumpRateModel.json";
import MarketContract from "./MarketContract";
import BN from "bn.js";

class JumpRateModelV1 extends MarketContract<JumpRateModelWeb3Interface> {
  constructor(sdk: MarketSDK, address: string) {
    super(sdk, address, JumpRateModelArtifact.abi);
  }
  baseRatePerBlock(): Promise<string> {
    return this.contract.methods.baseRatePerBlock().call();
  }
  blocksPerYear(): Promise<string> {
    return this.contract.methods.blocksPerYear().call();
  }
  getBorrowRate(
    cash: number | string | BN,
    borrows: number | string | BN,
    reserves: number | string | BN
  ): Promise<string> {
    return this.contract.methods.getBorrowRate(cash, borrows, reserves).call();
  }
  getSupplyRate(
    cash: number | string | BN,
    borrows: number | string | BN,
    reserves: number | string | BN,
    reserveFactorMantissa: number | string | BN
  ): Promise<string> {
    return this.contract.methods.getSupplyRate(cash, borrows, reserves, reserveFactorMantissa).call();
  }
  jumpMultiplierPerBlock(): Promise<string> {
    return this.contract.methods.jumpMultiplierPerBlock().call();
  }
  kink(): Promise<string> {
    return this.contract.methods.kink().call();
  }
  multiplierPerBlock(): Promise<string> {
    return this.contract.methods.multiplierPerBlock().call();
  }
  utilizationRate(
    cash: number | string | BN,
    borrows: number | string | BN,
    reserves: number | string | BN
  ): Promise<string> {
    return this.contract.methods.utilizationRate(cash, borrows, reserves).call();
  }
}

export { JumpRateModelV1 };