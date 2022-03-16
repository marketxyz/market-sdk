# Market SDK

> Market's Software Development Kit, allows easy access to Market Protocol and our pool deployments!

## Usage

### Initialise the SDK

```ts
import Web3 from "web3";
import { MarketSDK, Comptroller, CToken } from "market-sdk"; // or "../src", if using examples

const web3 = new Web3("https://polygon-rpc.com");
const sdk = await MarketSDK.init(web3);
```

### Interacting with your pool

```ts
const comptrollerAddress = "SET_ADDRESS_HERE";
const comptroller = new Comptroller(sdk, comptrollerAddress);

/// gets all CToken addresses and makes a CToken instance
const cTokens = (await comptroller.getAllMarkets()).map(
  (address) => new CToken(sdk, address)
);

let i = 1;
for (const cToken of cTokens) {
  console.log(`cToken[${i}] address = `, cToken.address); /// 0x5a
  console.log(`cToken[${i}] name = `, await cToken.name()); /// Market Pool X USDC
  console.log(`cToken[${i}] symbol = `, await cToken.symbol()); /// mPXUSDC
  console.log(
    `cToken[${i}] LTV = `,
    (await comptroller.markets(cToken.address)).collateralFactorMantissa /// 5e17
  );
  console.log(
    `cToken[${i}] reserve factor = `,
    await cToken.reserveFactorMantissa() /// 5e16
  );

  ++i;
}
```

### Interacting with Market Admin

```ts
import BN from "bn.js";
import { MarketAdmin } from "market-sdk";

/// @dev only works if your provider is a wallet and not just RPC
/// @dev only works with the latest version of market, from 1 March 2022 onwards
const comptrollerAdminAddress = await comptroller.admin();
const comptrollerAdmin = new MarketAdmin(sdk, comptrollerAdminAddress);

const newLTV = new BN(0.6e18); /// 60% LTV

/// @notice the following function will set LTV / CF on your comptroller
const tx = await comptrollerAdmin.setCollateralFactor(
  "CToken_Address_Here",
  newLTV
);

console.log("tx hash: ", tx.hash);
```
