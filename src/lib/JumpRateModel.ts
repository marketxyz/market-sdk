import Web3 from "web3";
import BN from "bn.js";

import MarketSDK from "./MarketSDK";
import { JumpRateModel as JumpRateModelWeb3Interface } from "../types/JumpRateModel";
import JumpRateModelArtifact from "../abi/JumpRateModel.json";

import MarketContract from "./MarketContract";
import { CToken } from "./CToken";

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

  _getBorrowRate(utilizationRate: BN, kink: BN, multiplierPerBlock: BN, baseRatePerBlock: BN, jumpMultiplierPerBlock: BN) {
    if (utilizationRate.lte(kink)) {
      return utilizationRate
        .mul(multiplierPerBlock)
        .div(Web3.utils.toBN(1e18))
        .add(baseRatePerBlock);
    } else {
      const normalRate = kink.mul(multiplierPerBlock!)
        .div(Web3.utils.toBN(1e18))
        .add(baseRatePerBlock);
      const excessUtil = utilizationRate.sub(kink);

      return excessUtil
        .mul(jumpMultiplierPerBlock)
        .div(Web3.utils.toBN(1e18))
        .add(normalRate);
    }
  }
  _getSupplyRate(utilizationRate: BN, reserveFactorMantissa: BN, kink: BN, multiplierPerBlock: BN, baseRatePerBlock: BN, jumpMultiplierPerBlock: BN) {
    const oneMinusReserveFactor = this.sdk.web3.utils
      .toBN(1e18)
      .sub(Web3.utils.toBN(reserveFactorMantissa.toString()));
    const borrowRate = this._getBorrowRate(utilizationRate, kink, multiplierPerBlock, baseRatePerBlock, jumpMultiplierPerBlock);

    const rateToPool = borrowRate
      .mul(oneMinusReserveFactor)
      .div(Web3.utils.toBN(1e18));

    return utilizationRate.mul(rateToPool).div(Web3.utils.toBN(1e18));
  }

  async convertIRMtoCurve(cToken: CToken) {
    const [
      reserveFactorMantissa,
      baseRatePerBlock,
      kink,
      multiplierPerBlock,
      jumpMultiplierPerBlock
    ] = await Promise.all([
      cToken.reserveFactorMantissa(),
      this.baseRatePerBlock(),
      this.kink(),
      this.multiplierPerBlock(),
      this.jumpMultiplierPerBlock()
    ]);

    const borrowerRates: { x: number; y: number }[] = [];
    const supplierRates: { x: number; y: number }[] = [];

    for (let i = 0; i <= 100; i++) {
      const supplyLevel =
        (Math.pow(
          (Number(
            this._getSupplyRate(
              Web3.utils.toBN((i * 1e16).toString()),
              Web3.utils.toBN(reserveFactorMantissa),
              Web3.utils.toBN(kink),
              Web3.utils.toBN(multiplierPerBlock),
              Web3.utils.toBN(baseRatePerBlock),
              Web3.utils.toBN(jumpMultiplierPerBlock)
            ).toString(),
          ) /
            1e18) *
            (this.sdk.options!.blocksPerMin! * 60 * 24) +
            1,
          365,
        ) -
          1) *
        100;

      const borrowLevel =
        (Math.pow(
          (Number(
            this._getBorrowRate(
              Web3.utils.toBN((i * 1e16).toString()),
              Web3.utils.toBN(kink),
              Web3.utils.toBN(multiplierPerBlock),
              Web3.utils.toBN(baseRatePerBlock),
              Web3.utils.toBN(jumpMultiplierPerBlock)
            ).toString(),
          ) /
            1e18) *
            (this.sdk.options!.blocksPerMin! * 60 * 24) +
            1,
          365,
        ) -
          1) *
        100;

      supplierRates.push({ x: i, y: supplyLevel });
      borrowerRates.push({ x: i, y: borrowLevel });
    }
    return { borrowerRates, supplierRates };
  }
}

export { JumpRateModelV1 };