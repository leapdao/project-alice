import * as Web3 from 'web3';
import { WEB3_PROVIDER_PLASMA, WEB3_PROVIDER_ROOT } from './config';
import { helpers, ExtendedWeb3 } from 'leap-core';

let web3plasma: ExtendedWeb3;
let web3root: ExtendedWeb3;

export default (root = false) => {
  if (root && !web3root) {
    web3root = helpers.extendWeb3(new (Web3 as any)(WEB3_PROVIDER_ROOT));
  }

  if (!root && !web3plasma) {
    web3plasma = helpers.extendWeb3(new (Web3 as any)(WEB3_PROVIDER_PLASMA));
  }

  return root ? web3root : web3plasma;
};
