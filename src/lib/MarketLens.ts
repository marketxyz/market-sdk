import BN from "bn.js";

import MarketSDK from "./MarketSDK";
import MarketContract from "./MarketContract";

import { MarketLens as MarketLensWeb3Interface } from "../types/MarketLens";
import { MarketLensSecondary as MarketLensSecondaryWeb3Interface } from "../types/MarketLensSecondary";
import MarketLensArtifact from "../abi/MarketLens.json";
import MarketLensSecondaryArtifact from "../abi/MarketLensSecondary.json";

import { ComptrollerV2 } from "./Comptroller";
import { CTokenOwnership, normalizePool, normalizePoolAsset, normalizePoolUser, Pool, PoolAsset, PoolUser } from "./Pool";
import { NonPayableTx } from "../types/types";
import { CTokenV2 } from "./CToken";
import { PoolDirectoryV2 } from "./PoolDirectory";

class MarketLens extends MarketContract<MarketLensWeb3Interface> {
  constructor(sdk: MarketSDK, address: string){
    super(sdk, address, MarketLensArtifact.abi);
  }

  getAllPoolsLength(
    directory: string,
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.getAllPoolsLength(directory).call(tx);
  }

  async getPoolAssetsWithData(
    comptroller: ComptrollerV2 | string,
    tx?: NonPayableTx
  ): Promise<PoolAsset[]> {
    comptroller = comptroller instanceof ComptrollerV2 ? comptroller.address : comptroller;

    const assetsRaw = await this.contract.methods.getPoolAssetsWithData(comptroller).call(tx);
    const assets: PoolAsset[] = [];

    for(const asset of assetsRaw){
      assets.push(normalizePoolAsset(asset, this.sdk));
    }
    return assets;
  }
  
  async getPoolSummary(
    comptroller: ComptrollerV2 | string,
    tx?: NonPayableTx
  ): Promise<{
    totalSupply: BN,
    totalBorrow: BN,
    underlyingTokens: string[],
    underlyingSymbols: string[],
  }> {
    comptroller = comptroller instanceof ComptrollerV2 ? comptroller.address : comptroller;
    const raw = await this.contract.methods.getPoolSummary(comptroller).call(tx);

    return {
      totalSupply: new BN(raw[0]),
      totalBorrow: new BN(raw[1]),
      underlyingTokens: raw[2],
      underlyingSymbols: raw[3],
    };
  }

  async getPoolUserSummary(
    comptroller: ComptrollerV2 | string,
    account: string,
    tx?: NonPayableTx
  ): Promise<{
    supplyBalance: BN,
    borrowBalance: BN
  }> {
    comptroller = comptroller instanceof ComptrollerV2 ? comptroller.address : comptroller;
    const raw = await this.contract.methods.getPoolUserSummary(comptroller, account).call(tx);

    return {
      supplyBalance: new BN(raw[0]),
      borrowBalance: new BN(raw[1]),
    };
  }

  async getPoolUsersWithData(
    comptroller: ComptrollerV2 | string,
    maxHealth: number | string | BN,
    tx?: NonPayableTx
  ): Promise<[
    PoolUser[],
    BN,
    BN
  ]> {
    comptroller = comptroller instanceof ComptrollerV2 ? comptroller.address : comptroller;
    const raw = await this.contract.methods.getPoolUsersWithData(comptroller, maxHealth).call(tx);

    const users: PoolUser[] = [];
    for(const user of raw[0]){
      users.push(normalizePoolUser(user, this.sdk));
    }

    return [
      users,
      new BN(raw[1]),
      new BN(raw[2]),
    ];
  }

  async getPublicPoolsWithData(
    directory: string,
    tx?: NonPayableTx
  ): Promise<{
    indexes: BN[];
    pools: Pool[];
    totalSupply: BN[];
    totalBorrow: BN[];
    underlyingTokens: string[][];
    underlyingSymbols: string[][];
    errored: boolean[];
  }> {
    const raw = await this.contract.methods.getPublicPoolsWithData(directory).call(tx);

    return {
      indexes: raw[0].map(el => new BN(el)),
      pools: raw[1].map(el => normalizePool(el, this.sdk)),
      totalSupply: raw[2].map(el => new BN(el)),
      totalBorrow: raw[3].map(el => new BN(el)),
      underlyingTokens: raw[4],
      underlyingSymbols: raw[5],
      errored: raw[6]
    };
  }

  wrappedNative(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.wrappedNative().call(tx);
  }
}

class MarketLensSecondary extends MarketContract<MarketLensSecondaryWeb3Interface> {
  constructor(sdk: MarketSDK, address: string){
    super(sdk, address, MarketLensSecondaryArtifact.abi);
  }
 
  async getPoolOwnership(
    comptroller: ComptrollerV2 | string,
    tx?: NonPayableTx
  ): Promise<{
    comptrollerAdmin: string,
    comptrollerAdminHasRights: boolean,
    comptrollerFuseAdminHasRights: boolean,
    outliners: CTokenOwnership[],
  }> {
    comptroller = comptroller instanceof ComptrollerV2 ? comptroller.address : comptroller;

    const raw = await this.contract.methods.getPoolOwnership(comptroller).call(tx);
    const outlinersRaw = raw[3];
    const outliners: CTokenOwnership[] = [];

    for(const outliner of outlinersRaw){
      outliners.push({
        cToken: new CTokenV2(this.sdk, outliner[0]),
        admin: outliner[1],
        admingHasRights: outliner[2],
        fuseAdminHasRights: outliner[3],
      });
    }

    return {
      comptrollerAdmin: raw[0],
      comptrollerAdminHasRights: raw[1],
      comptrollerFuseAdminHasRights: raw[2],
      outliners: outliners
    };
  }

  getMaxRedeem(
    account: string,
    cTokenModify: CTokenV2 | string,
    tx?: NonPayableTx
  ): Promise<string> {
    cTokenModify = cTokenModify instanceof CTokenV2 ? cTokenModify.address : cTokenModify;
    return this.contract.methods.getMaxRedeem(account, cTokenModify).call(tx);
  }
  
  getMaxBorrow(
    account: string,
    cTokenModify: CTokenV2 | string,
    tx?: NonPayableTx
  ): Promise<string> {
    cTokenModify = cTokenModify instanceof CTokenV2 ? cTokenModify.address : cTokenModify;
    return this.contract.methods.getMaxBorrow(account, cTokenModify).call(tx);
  }

  async getRewardSpeedsByPool(
    comptroller: ComptrollerV2 | string,
    tx?: NonPayableTx
  ): Promise<{
    allMarkets: CTokenV2[],
    distributors: string[],
    rewardTokens: string[],
    supplySpeeds: string[][],
    borrowSpeeds: string[][]
  }> {
    comptroller = comptroller instanceof ComptrollerV2 ? comptroller.address : comptroller;
    const raw = await this.contract.methods.getRewardSpeedsByPool(comptroller).call(tx);

    return {
      allMarkets: raw[0].map(el => new CTokenV2(this.sdk, el)),
      distributors: raw[1],
      rewardTokens: raw[2],
      supplySpeeds: raw[3],
      borrowSpeeds: raw[4]
    };
  }

  async getRewardSpeedsByPools(
    comptrollers: ComptrollerV2[] | string[],
    tx?: NonPayableTx
  ): Promise<{
    allMarkets: CTokenV2[][],
    distributors: string[][],
    rewardTokens: string[][],
    supplySpeeds: string[][][],
    borrowSpeeds: string[][][]
  }> {
    const comptrollersAddresses = comptrollers.map(el => el instanceof ComptrollerV2 ? el.address : el);

    const raw = await this.contract.methods.getRewardSpeedsByPools(comptrollersAddresses).call(tx);

    return {
      allMarkets: raw[0].map(el => el.map(el2 => new CTokenV2(this.sdk, el2))),
      distributors: raw[1],
      rewardTokens: raw[2],
      supplySpeeds: raw[3],
      borrowSpeeds: raw[4]
    };
  }

  async getUnclaimedRewardsByDistributors(
    holder: string,
    distributors: string[]
  ): Promise<{
    rewardTokens: string[],
    commpUnclaimedTotal: string[],
    allMarkets: CTokenV2[][],
    rewardsUnaccrued: string[][][],
    distributorFunds: string[]
  }> {
    const raw = await this.contract.methods.getUnclaimedRewardsByDistributors(holder, distributors).call();

    return {
      rewardTokens: raw[0],
      commpUnclaimedTotal: raw[1],
      allMarkets: raw[2].map(el => el.map(el2 => new CTokenV2(this.sdk, el2))),
      rewardsUnaccrued: raw[3],
      distributorFunds: raw[4]
    };
  }

  async getRewardsDistributorsBySupplier(
    directory: PoolDirectoryV2 | string,
    supplier: string,
    tx?: NonPayableTx
  ): Promise<{
    indexes: string[],
    comptrollers: ComptrollerV2[],
    distributors: string[][]
  }> {
    directory = directory instanceof PoolDirectoryV2 ? directory.address : directory;
    const raw = await this.contract.methods.getRewardsDistributorsBySupplier(directory, supplier).call(tx);

    return {
      indexes: raw[0],
      comptrollers: raw[1].map(el => new ComptrollerV2(this.sdk, el)),
      distributors: raw[2]
    };
  }
}

export { MarketLens, MarketLensSecondary };
