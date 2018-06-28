import * as Web3 from "web3";
import { WEB3_PROVIDER_BASE, WEB3_PROVIDER_BASE_WS } from "./config";
import { Outpoint } from "parsec-lib";

let web3http;
let web3ws;

const addCustomWeb3Methods = (web3) => {
  web3.extend({
    methods: [
      new web3.extend.Method({
        name: "getUnspent",
        call: "parsec_unspent",
        params: 1,
        inputFormatters: [
          web3.extend.formatters.inputAddressFormatter,
        ],
        outputFormatter: unspent => ({
          output: unspent.output,
          outpoint: Outpoint.fromRaw(unspent.outpoint),
        }),
      })
    ]
  });
  return web3;
};

export default (ws = true) => {
  if (ws && !web3ws) {
    if (WEB3_PROVIDER_BASE_WS === WEB3_PROVIDER_BASE) {
      web3ws = web3http || addCustomWeb3Methods(new (Web3 as any)(WEB3_PROVIDER_BASE));
    } else {
      web3ws = addCustomWeb3Methods(new (Web3 as any)(WEB3_PROVIDER_BASE_WS));
    }
  }
  if (!ws && !web3http) {
    web3http = addCustomWeb3Methods(new (Web3 as any)(WEB3_PROVIDER_BASE));
  }

  return ws ? web3ws : web3http;
};