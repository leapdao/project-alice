import * as Web3 from "web3";
import Web3Class from "web3";
import { WEB3_PROVIDER_BASE } from "./config";

let web3;

export default () => {
  if (!web3) {
    web3 = new (Web3 as any)(WEB3_PROVIDER_BASE);
  }

  return web3;
};