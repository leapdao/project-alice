import * as Web3 from "web3";
import { WEB3_PROVIDER_BASE, WEB3_PROVIDER_BASE_WS } from "./config";
import { helpers } from "parsec-lib";

let web3http;
let web3ws;

export default (ws = true) => {
  ws = ws ? WEB3_PROVIDER_BASE_WS !== WEB3_PROVIDER_BASE : false; // if supported

  if (ws && !web3ws) {
    web3ws = helpers.extendWeb3(new (Web3 as any)(WEB3_PROVIDER_BASE_WS));
  }

  if (!ws && !web3http) {
    web3http = helpers.extendWeb3(new (Web3 as any)(WEB3_PROVIDER_BASE));
  }

  return ws ? web3ws : web3http;
};