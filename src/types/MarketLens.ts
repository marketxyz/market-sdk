/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { ContractOptions } from "web3-eth-contract";
import { EventLog } from "web3-core";
import { EventEmitter } from "events";
import {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "./types";

export interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export interface MarketLens extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): MarketLens;
  clone(): MarketLens;
  methods: {
    getPoolAssetsWithData(
      comptroller: string
    ): NonPayableTransactionObject<
      [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        boolean,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        boolean
      ][]
    >;

    getPoolSummary(comptroller: string): NonPayableTransactionObject<{
      0: string;
      1: string;
      2: string[];
      3: string[];
    }>;

    getPoolUserSummary(
      comptroller: string,
      account: string
    ): NonPayableTransactionObject<{
      0: string;
      1: string;
    }>;

    getPoolUsersWithData(
      comptroller: string,
      maxHealth: number | string | BN
    ): NonPayableTransactionObject<{
      0: [
        string,
        string,
        string,
        string,
        [
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          boolean,
          string,
          string,
          string,
          string,
          string,
          string,
          string,
          boolean
        ][]
      ][];
      1: string;
      2: string;
    }>;
  };
  events: {
    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };
}