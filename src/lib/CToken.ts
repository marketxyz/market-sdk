import { PromiEvent, TransactionReceipt } from "web3-core";
import BN from "bn.js";

import MarketContract from "./MarketContract";

import CTokenArtifact from "../abi/CToken.json";
import CTokenV2Artifact from "../abi/CTokenV2.json";

import { CToken as CTokenWeb3Interface } from "../types/CToken";
import { CTokenV2 as CTokenV2Web3Interface } from "../types/CTokenV2";

import { NonPayableTx } from "../types/types";

import { Comptroller, ComptrollerV2 } from "./Comptroller";
import MarketSDK from "./MarketSDK";

class CToken extends MarketContract<CTokenWeb3Interface> {
  constructor(sdk: MarketSDK, address: string){
    super(sdk, address, CTokenArtifact.abi);
  }

  _acceptAdmin(
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._acceptAdmin().send(tx);
  }

  _reduceReserves(
    redduceAmount: number | string | BN,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._reduceReserves(redduceAmount).send(tx);
  }

  _renounceAdminRights(
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._renounceAdminRights().send(tx);
  }

  _renounceFuseAdminRights(
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._renounceFuseAdminRights().send(tx);
  }

  _setAdminFee(
    newAdminFeeMantissa: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setAdminFee(newAdminFeeMantissa).send(tx);
  }

  _setComptroller(
    newComptroller: Comptroller,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setComptroller(newComptroller.address).send(tx);
  }

  _setFuseFee(
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setFuseFee().send(tx);
  }

  _setInterestRateModal(
    newInterestRateModel: string, // change to InterestRateModel class later
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setInterestRateModel(newInterestRateModel).send(tx);
  }

  _setPendingAdmin(
    newPendingAdmin: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setPendingAdmin(newPendingAdmin).send(tx);
  }

  _setReserveFactor(
    newReserveFactorMantissa: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setReserveFactor(newReserveFactorMantissa).send(tx);
  }

  _withdrawAdminFees(
    withdrawAmount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._withdrawAdminFees(withdrawAmount).send(tx);
  }

  _withdrawFuseFees(
    withdrawAmount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._withdrawFuseFees(withdrawAmount).send(tx);
  }

  accrualBlockNumber(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.accrualBlockNumber().call(tx);
  }

  accrueInterest(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.accrueInterest().call(tx);
  }

  admin(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.admin().call(tx);
  }

  adminFeeMantissa(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.adminFeeMantissa().call(tx);
  }

  adminHasRights(
    tx?: NonPayableTx
  ): Promise<boolean> {
    return this.contract.methods.adminHasRights().call(tx);
  }

  allowance(
    owner: string,
    spender: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.allowance(owner, spender).send(tx);
  }

  approve(
    spender: string,
    amount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.approve(spender, amount).send(tx);
  }

  balanceOf(
    owner: string,
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.balanceOf(owner).call(tx);
  }

  balanceOfUnderlying(
    owner: string,
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.balanceOfUnderlying(owner).call(tx);
  }

  borrow(
    borrowAmount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.borrow(borrowAmount).send(tx);
  }

  borrowBalanceCurrent(
    account: string,
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.borrowBalanceCurrent(account).call(tx);
  }

  borrowBalanceStored(
    account: string,
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.borrowBalanceStored(account).call(tx);
  }

  borrowIndex(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.borrowIndex().call(tx);
  }

  borrowRatePerBlock(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.borrowRatePerBlock().call(tx);
  }
  
  decimals(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.decimals().call(tx);
  }

  exchangeRateCurrent(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.exchangeRateCurrent().call(tx);
  }

  exchangeRateStored(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.exchangeRateStored().call(tx);
  }

  fuseAdminHasRights(
    tx?: NonPayableTx
  ): Promise<boolean> {
    return this.contract.methods.fuseAdminHasRights().call(tx);
  }

  fuseFeeMantissa(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.fuseFeeMantissa().call(tx);
  }

  getAccountSnapshot(
    account: string,
    tx?: NonPayableTx
  ): Promise<{
    0: string;
    1: string;
    2: string;
    3: string;
  }> {
    return this.contract.methods.getAccountSnapshot(account).call(tx);
  }

  getCash(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.getCash().call(tx);
  }

  interestRateModel(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.interestRateModel().call(tx);
  }

  isCEther(
    tx?: NonPayableTx
  ): Promise<boolean> {
    return this.contract.methods.isCEther().call(tx);
  }

  isCToken(
    tx?: NonPayableTx
  ): Promise<boolean> {
    return this.contract.methods.isCToken().call(tx);
  }

  liquidateBorrow(
    borrower: string,
    repayAmount: number | string | BN,
    cTokenCollateral: CToken | string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    if(cTokenCollateral instanceof CToken){
      cTokenCollateral = cTokenCollateral.address;
    }
    return this.contract.methods.liquidateBorrow(borrower, repayAmount, cTokenCollateral).send(tx);
  }

  mint(
    mintAmount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.mint(mintAmount).send(tx);
  }

  name(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.name().call(tx);
  }

  pendingAdmin(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.pendingAdmin().call(tx);
  }

  redeem(
    redeemTokens: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.redeem(redeemTokens).send(tx);
  }

  redeemUnderlying(
    redeemAdmount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.redeemUnderlying(redeemAdmount).send(tx);
  }

  repayBorrow(
    repayAmount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.repayBorrow(repayAmount).send(tx);
  }

  repayBorrowBehalf(
    borrower: string,
    repayAmount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.repayBorrowBehalf(borrower, repayAmount).send(tx);
  }

  reserveFactorMantissa(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.reserveFactorMantissa().call(tx);
  }

  seize(
    liquidator: string, 
    borrower: string,
    seizeTokens: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.seize(liquidator, borrower, seizeTokens).send(tx);
  }

  supplyRatePerBlock(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.supplyRatePerBlock().call(tx);
  }

  symbol(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.symbol().call(tx);
  }

  totalAdminFees(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.totalAdminFees().call(tx);
  }

  totalBorrows(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.totalBorrows().call(tx);
  }

  totalBorrowsCurrent(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.totalBorrowsCurrent().call(tx);
  }

  totalFuseFees(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.totalFuseFees().call(tx);
  }

  totalReserves(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.totalReserves().call(tx);
  }

  totalSupply(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.totalSupply().call(tx);
  }

  transfer(
    dst: string,
    amount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.transfer(dst, amount).send(tx);
  }

  transferFrom(
    src: string,
    dst: string,
    amount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.transferFrom(src, dst, amount).send(tx);
  }

  underlying(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.underlying().call(tx);
  }
}

class CTokenV2 extends MarketContract<CTokenV2Web3Interface> {
  constructor(sdk: MarketSDK, address: string){
    super(sdk, address, CTokenV2Artifact.abi);
  }
  
  _reduceReserves(
    redduceAmount: number | string | BN,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._reduceReserves(redduceAmount).send(tx);
  }
  
  _setAdminFee(
    newAdminFeeMantissa: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setAdminFee(newAdminFeeMantissa).send(tx);
  }
  
  _setInterestRateModal(
    newInterestRateModel: string, // change to InterestRateModel class later
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setInterestRateModel(newInterestRateModel).send(tx);
  }

  _setNameAndSymbol(
    name: string,
    symbol: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setNameAndSymbol(name, symbol).send(tx);
  }

  _setReserveFactor(
    newReserveFactorMantissa: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setReserveFactor(newReserveFactorMantissa).send(tx);
  }

  _withdrawAdminFees(
    withdrawAmount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._withdrawAdminFees(withdrawAmount).send(tx);
  }

  _withdrawFuseFees(
    withdrawAmount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._withdrawFuseFees(withdrawAmount).send(tx);
  }

  accrualBlockNumber(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.accrualBlockNumber().call(tx);
  }

  accrueInterest(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.accrueInterest().call(tx);
  }

  adminFeeMantissa(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.adminFeeMantissa().call(tx);
  }

  allowance(
    owner: string,
    spender: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.allowance(owner, spender).send(tx);
  }

  approve(
    spender: string,
    amount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.approve(spender, amount).send(tx);
  }

  balanceOf(
    owner: string,
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.balanceOf(owner).call(tx);
  }

  balanceOfUnderlying(
    owner: string,
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.balanceOfUnderlying(owner).call(tx);
  }

  borrow(
    borrowAmount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.borrow(borrowAmount).send(tx);
  }

  borrowBalanceCurrent(
    account: string,
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.borrowBalanceCurrent(account).call(tx);
  }

  borrowBalanceStored(
    account: string,
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.borrowBalanceStored(account).call(tx);
  }

  borrowIndex(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.borrowIndex().call(tx);
  }

  borrowRatePerBlock(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.borrowRatePerBlock().call(tx);
  }
  
  decimals(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.decimals().call(tx);
  }

  exchangeRateCurrent(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.exchangeRateCurrent().call(tx);
  }

  exchangeRateStored(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.exchangeRateStored().call(tx);
  }

  fuseFeeMantissa(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.fuseFeeMantissa().call(tx);
  }

  getAccountSnapshot(
    account: string,
    tx?: NonPayableTx
  ): Promise<{
    0: string;
    1: string;
    2: string;
    3: string;
  }> {
    return this.contract.methods.getAccountSnapshot(account).call(tx);
  }

  getCash(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.getCash().call(tx);
  }

  "initialize(address,address,uint256,string,string,uint8,uint256,uint256)"(
    comptroller: ComptrollerV2 | string,
    interestRateModel: string,
    initialExchangeRateMantissa: number | string | BN,
    name: string,
    symbol: string,
    decimals: number | string | BN,
    reserveFactorMantissa: number | string | BN,
    adminFeeMantissa: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    comptroller = comptroller instanceof ComptrollerV2 ? comptroller.address : comptroller;

    return this.contract.methods["initialize(address,address,uint256,string,string,uint8,uint256,uint256)"](comptroller, interestRateModel, initialExchangeRateMantissa, name, symbol, decimals, reserveFactorMantissa, adminFeeMantissa).send(tx);
  }

  "initialize(address,address,string,string,uint256,uint256)"(
    comptroller: ComptrollerV2 | string,
    interestRateModel: string,
    name: string,
    symbol: string,
    reserveFactorMantissa: number | string | BN,
    adminFeeMantissa: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    comptroller = comptroller instanceof ComptrollerV2 ? comptroller.address : comptroller;

    return this.contract.methods["initialize(address,address,string,string,uint256,uint256)"](comptroller, interestRateModel, name, symbol, reserveFactorMantissa, adminFeeMantissa).send(tx);
  }

  
  interestRateModel(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.interestRateModel().call(tx);
  }

  isCEther(
    tx?: NonPayableTx
  ): Promise<boolean> {
    return this.contract.methods.isCEther().call(tx);
  }

  isCToken(
    tx?: NonPayableTx
  ): Promise<boolean> {
    return this.contract.methods.isCToken().call(tx);
  }

  liquidateBorrow(
    borrower: string,
    cTokenCollateral: CTokenV2 | string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    if(cTokenCollateral instanceof CTokenV2){
      cTokenCollateral = cTokenCollateral.address;
    }
    return this.contract.methods.liquidateBorrow(borrower, cTokenCollateral).send(tx);
  }

  mint(
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.mint().send(tx);
  }

  name(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.name().call(tx);
  }

  protocolSeizeShareMantissa(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.protocolSeizeShareMantissa().call(tx);
  }
  
  redeem(
    redeemTokens: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.redeem(redeemTokens).send(tx);
  }

  redeemUnderlying(
    redeemAdmount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.redeemUnderlying(redeemAdmount).send(tx);
  }

  repayBorrow(
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.repayBorrow().send(tx);
  }

  repayBorrowBehalf(
    borrower: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.repayBorrowBehalf(borrower).send(tx);
  }

  reserveFactorMantissa(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.reserveFactorMantissa().call(tx);
  }

  seize(
    liquidator: string, 
    borrower: string,
    seizeTokens: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.seize(liquidator, borrower, seizeTokens).send(tx);
  }

  supplyRatePerBlock(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.supplyRatePerBlock().call(tx);
  }

  symbol(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.symbol().call(tx);
  }

  totalAdminFees(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.totalAdminFees().call(tx);
  }

  totalBorrows(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.totalBorrows().call(tx);
  }

  totalBorrowsCurrent(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.totalBorrowsCurrent().call(tx);
  }

  totalFuseFees(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.totalFuseFees().call(tx);
  }

  totalReserves(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.totalReserves().call(tx);
  }

  totalSupply(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.totalSupply().call(tx);
  }

  transfer(
    dst: string,
    amount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.transfer(dst, amount).send(tx);
  }

  transferFrom(
    src: string,
    dst: string,
    amount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.transferFrom(src, dst, amount).send(tx);
  }

  underlying(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.underlying().call(tx);
  }
}

export { CToken, CTokenV2 };
