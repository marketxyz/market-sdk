import { MarketSDK, Comptroller, CToken } from "../src";
import Web3 from "web3";
import { DEFAULT_RPC } from "./utils";

const comptrollerAddress = "SET_COMPTROLLER_ADDRESS";
(async function () {
  const web3 = new Web3(DEFAULT_RPC);
  const sdk = await MarketSDK.init(web3);

  const comptroller = new Comptroller(sdk, comptrollerAddress);

  const cTokens = (await comptroller.getAllMarkets()).map(
    (x) => new CToken(sdk, x)
  );

  let i = 1;
  for (const cToken of cTokens) {
    console.log(`cToken[${i}] address = `, cToken.address);
    console.log(`cToken[${i}] name = `, await cToken.name());
    console.log(`cToken[${i}] symbol = `, await cToken.symbol());
    console.log(
      `cToken[${i}] LTV = `,
      (await comptroller.markets(cToken.address)).collateralFactorMantissa
    );
    console.log(
      `cToken[${i}] reserve factor = `,
      await cToken.reserveFactorMantissa()
    );
    ++i;
  }

  console.log(
    "Liquidation Incentive: ",
    await comptroller.liquidationIncentiveMantissa()
  );
})();
