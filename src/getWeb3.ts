import * as Web3 from "web3";
import { WEB3_PROVIDER_PLASMA, WEB3_PROVIDER_ROOT } from "./config";
import { helpers } from "parsec-lib";

let web3plasma;
let web3root;

export default (root = false) => {
  if (root && !web3root) {
    web3root = helpers.extendWeb3(new (Web3 as any)(WEB3_PROVIDER_ROOT));
  }

  if (!root && !web3plasma) {
    web3plasma = helpers.extendWeb3(new (Web3 as any)(WEB3_PROVIDER_PLASMA));
  }

  return root ? web3root : web3plasma;
};