import * as Web3 from "web3";
import { WEB3_PROVIDER_BASE, WEB3_PROVIDER_BASE_WS } from "./config";

let web3;
let web3ws;

export default (ws = true) => {
  if (ws && !web3ws) {
    if (WEB3_PROVIDER_BASE_WS === WEB3_PROVIDER_BASE) {
      web3ws = web3 || new (Web3 as any)(WEB3_PROVIDER_BASE);
    } else {
      web3ws = new (Web3 as any)(WEB3_PROVIDER_BASE_WS);
    }
  }
  if (!ws && !web3) {
    web3 = new (Web3 as any)(WEB3_PROVIDER_BASE);
  }

  return ws ? web3ws : web3;
};