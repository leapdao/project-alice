/// <reference path="../node_modules/types-bn/index.d.ts" />

import * as BN from "bn.js";

export function toCents(n: number | string, decimals: number) {
  return new BN(n, 10).mul(new BN(10 ** decimals, 10)).toNumber();
}

export function fromCents(n: number | string, decimals: number) {
  return new BN(n, 10).div(new BN(10 ** (decimals - 2), 10)).toNumber() / 100;
}
