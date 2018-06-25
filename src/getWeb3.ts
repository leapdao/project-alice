import * as Web3 from "web3";
import Web3Class from "web3";

let web3;

export default () => {
  if (!web3) {
    web3 = new (Web3 as any)("https://rinkeby.infura.io");
  }

  return web3;
};